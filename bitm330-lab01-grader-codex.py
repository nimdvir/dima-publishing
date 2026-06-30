#!/usr/bin/env python3
"""
BITM 330 Summer Lab 01 roster-aware Access database grader.

This variant grades PetVax Access submissions out of 100 points, creates a
Brightspace import CSV for the Lab 01 file-submission grade item, sets the Lab
01 quiz grade to 0 for roster students with no Access file submission, and
packages individual feedback files in a ZIP archive.
"""

from __future__ import annotations

import argparse
import csv
import difflib
import math
import re
import shutil
import sys
import tempfile
import zipfile
from dataclasses import dataclass, field
from decimal import Decimal
from pathlib import Path
from typing import Any, Iterable


LAB_MAX_POINTS = 100
QUIZ_ZERO_WHEN_NO_LAB_SUBMISSION = 0

LAB_GRADE_COLUMN = "Summer Lab 1 \u2014 Access File Submission Points Grade <Numeric MaxPoints:100>"
QUIZ_GRADE_COLUMN = "Lab week 1 - Quiz Points Grade <Numeric MaxPoints:100>"
END_OF_LINE_COLUMN = "End-of-Line Indicator"

DEFAULT_GRADE_EXPORT_NAME = (
    "BITM330-Imp. Bus. Perf. with IT  (1759)_GradesExport_2026-06-29-17-41.csv"
)
DEFAULT_STUDENTS_EXPORT_NAME = (
    "students_BITM330-Imp. Bus. Perf. with IT  (1759)_GradesExport_2026-06-18-23-28.csv"
)

EXPECTED = {
    "appointments_table": "PETVAX_APPOINTMENTS",
    "rates_table": "SERVICE_RATES",
    "appointments_rows": 24,
    "rates_rows": 6,
    "primary_key_table": "PETVAX_APPOINTMENTS",
    "primary_key_field": "AppointmentID",
    "maple_id": 1025,
    "maple_pet_name": "Maple",
    "maple_owner_name": "Priya Shah",
    "form_names": ["frmPetVaxAppointments", "frmAppointments"],
    "report_names": ["rptNoShows", "rptAppointmentsByStatus"],
    "qry_no_shows": "qryNoShows",
    "qry_no_shows_rows": 2,
    "qry_vaccinations": "qryVaccinationAppointments",
    "qry_vaccinations_rows": 12,
    "qry_average": "qryAveragePaymentByService",
    "average_service": "Dental Cleaning",
    "average_payment": 123.32,
    "average_tolerance": 0.02,
    "fourth_query_options": [
        ("qryAppointmentsWithRates", 24),
        ("qryAppointmentCountByStatus", 3),
    ],
}


RUBRIC = [
    ("database_opens", "Database opens without errors", 6),
    ("required_tables", "Required tables exist", 8),
    ("appointments_row_count", "PETVAX_APPOINTMENTS has 24 rows after Maple", 10),
    ("rates_row_count", "SERVICE_RATES has 6 rows", 4),
    ("primary_key", "Primary key on AppointmentID", 10),
    ("maple_record", "Maple record exists with correct core values", 12),
    ("form_exists", "Required appointment form exists", 6),
    ("qry_no_shows", "qryNoShows returns 2 rows", 8),
    ("qry_vaccinations", "qryVaccinationAppointments returns 12 rows", 8),
    ("qry_average", "qryAveragePaymentByService returns Dental Cleaning average near 123.32", 10),
    ("fourth_query", "Fourth required query returns the expected rows", 10),
    ("report_exists", "Required report exists", 4),
    ("validation_rules", "Validation rules present or reasonably attempted", 4),
]

assert sum(points for _, _, points in RUBRIC) == LAB_MAX_POINTS


@dataclass
class CheckResult:
    check_id: str
    description: str
    points_possible: int
    points_earned: float
    status: str
    message: str


@dataclass
class SubmissionResult:
    student: str
    file_path: str
    score: float = 0
    max_points: int = LAB_MAX_POINTS
    checks: list[CheckResult] = field(default_factory=list)

    @property
    def percent(self) -> float:
        if self.max_points == 0:
            return 0
        return round((self.score / self.max_points) * 100, 2)

    @property
    def feedback_summary(self) -> str:
        missed = [
            f"{feedback_label(c)}: {clean_check_message(c)}"
            for c in self.checks
            if c.points_earned < c.points_possible
        ]
        if not missed:
            return "All automated checks passed."
        return " | ".join(missed)


@dataclass
class StudentRecord:
    org_defined_id: str
    username: str
    last_name: str
    first_name: str
    email: str
    source_row: dict[str, str]

    @property
    def display_name(self) -> str:
        name = f"{self.first_name} {self.last_name}".strip()
        return name or self.username or self.org_defined_id


@dataclass
class StudentGrade:
    student: StudentRecord
    lab_score: float
    quiz_score: str
    submission: SubmissionResult | None
    feedback_text: str
    matched_file: str = ""
    match_note: str = ""
    brightspace_folder: str = ""


class AccessGrader:
    def __init__(self, db_path: Path, validation_mode: str = "assume-full") -> None:
        self.db_path = db_path
        self.validation_mode = validation_mode
        self.conn = None
        self.cursor = None

    def __enter__(self) -> "AccessGrader":
        self.conn = self._connect()
        self.cursor = self.conn.cursor()
        return self

    def __exit__(self, exc_type, exc, tb) -> None:
        if self.conn is not None:
            self.conn.close()

    def _connect(self):
        try:
            import pyodbc  # type: ignore
        except ImportError as exc:
            raise RuntimeError(
                "pyodbc is not installed. Install it with: pip install pyodbc"
            ) from exc

        drivers = [d for d in pyodbc.drivers() if "Access Driver" in d and "accdb" in d.lower()]
        if not drivers:
            drivers = [d for d in pyodbc.drivers() if "Access Driver" in d]
        if not drivers:
            raise RuntimeError(
                "No Microsoft Access ODBC driver was found. Install the Microsoft "
                "Access Database Engine, then try again."
            )

        driver = drivers[-1]
        connection_string = f"DRIVER={{{driver}}};DBQ={self.db_path};"
        return pyodbc.connect(connection_string, timeout=15)

    def grade(self) -> list[CheckResult]:
        checks: list[CheckResult] = []

        checks.append(self._pass("database_opens", "Connected successfully."))
        checks.append(self._check_required_tables())
        checks.append(self._check_row_count("appointments_row_count", EXPECTED["appointments_table"], EXPECTED["appointments_rows"]))
        checks.append(self._check_row_count("rates_row_count", EXPECTED["rates_table"], EXPECTED["rates_rows"]))
        checks.append(self._check_primary_key())
        checks.append(self._check_maple_record())
        checks.append(self._check_access_object_any("form_exists", EXPECTED["form_names"], -32768))
        checks.append(self._check_row_count("qry_no_shows", EXPECTED["qry_no_shows"], EXPECTED["qry_no_shows_rows"]))
        checks.append(self._check_row_count("qry_vaccinations", EXPECTED["qry_vaccinations"], EXPECTED["qry_vaccinations_rows"]))
        checks.append(self._check_average_query())
        checks.append(self._check_fourth_query())
        checks.append(self._check_access_object_any("report_exists", EXPECTED["report_names"], -32764))
        checks.append(self._check_validation_rules())

        return checks

    def _rubric_item(self, check_id: str) -> tuple[str, int]:
        for item_id, description, points in RUBRIC:
            if item_id == check_id:
                return description, points
        raise KeyError(f"Unknown rubric item: {check_id}")

    def _pass(self, check_id: str, message: str) -> CheckResult:
        description, points = self._rubric_item(check_id)
        return CheckResult(check_id, description, points, points, "PASS", message)

    def _fail(self, check_id: str, message: str, earned: float = 0) -> CheckResult:
        description, points = self._rubric_item(check_id)
        status = "PARTIAL" if 0 < earned < points else "FAIL"
        return CheckResult(check_id, description, points, earned, status, message)

    def _table_names(self) -> set[str]:
        assert self.cursor is not None
        names: set[str] = set()
        for row in self.cursor.tables():
            name = getattr(row, "table_name", "")
            table_type = getattr(row, "table_type", "")
            if name and not name.startswith("MSys") and table_type in {"TABLE", "VIEW"}:
                names.add(str(name).lower())
        return names

    def _check_required_tables(self) -> CheckResult:
        expected_names = [EXPECTED["appointments_table"], EXPECTED["rates_table"]]
        existing = self._table_names()
        missing = [name for name in expected_names if name.lower() not in existing]
        if not missing:
            return self._pass("required_tables", "Both required tables were found.")
        earned = 4 * (len(expected_names) - len(missing))
        return self._fail("required_tables", f"Missing: {', '.join(missing)}.", earned=earned)

    def _count_rows(self, object_name: str) -> int:
        assert self.cursor is not None
        sql = f"SELECT COUNT(*) AS row_count FROM [{object_name}]"
        row = self.cursor.execute(sql).fetchone()
        return int(row[0])

    def _check_row_count(self, check_id: str, object_name: str, expected_count: int) -> CheckResult:
        try:
            observed = self._count_rows(object_name)
        except Exception as exc:
            return self._fail(check_id, f"Could not count rows in {object_name}: {exc}")

        if observed == expected_count:
            return self._pass(check_id, f"{object_name} returned {observed} rows.")
        return self._fail(check_id, f"{object_name} returned {observed} rows; expected {expected_count}.")

    def _check_primary_key(self) -> CheckResult:
        assert self.cursor is not None
        table = EXPECTED["primary_key_table"]
        expected_field = EXPECTED["primary_key_field"].lower()
        try:
            rows = list(self.cursor.primaryKeys(table=table))
        except Exception as exc:
            if table.lower() in self._table_names():
                return self._pass(
                    "primary_key",
                    "The Access ODBC driver could not expose primary-key metadata, so this item was not deducted automatically.",
                )
            return self._fail(
                "primary_key",
                f"Could not inspect primary key metadata because {table} was not found.",
            )

        key_fields = [str(getattr(row, "column_name", "")).lower() for row in rows]
        if expected_field in key_fields:
            return self._pass("primary_key", f"{EXPECTED['primary_key_field']} is part of the primary key.")
        if key_fields:
            return self._fail("primary_key", f"Primary key found on {', '.join(key_fields)}, not {expected_field}.")
        return self._fail("primary_key", "No primary key metadata found for PETVAX_APPOINTMENTS.")

    def _check_maple_record(self) -> CheckResult:
        assert self.cursor is not None
        table = EXPECTED["appointments_table"]
        sql = f"SELECT * FROM [{table}] WHERE [AppointmentID] = ?"
        try:
            rows = list(self.cursor.execute(sql, EXPECTED["maple_id"]).fetchall())
        except Exception as exc:
            return self._fail("maple_record", f"Could not query Maple record: {exc}")

        if not rows:
            return self._fail("maple_record", f"No record found with AppointmentID = {EXPECTED['maple_id']}.")

        row = rows[0]
        columns = [col[0] for col in self.cursor.description]
        values = {columns[i].lower(): row[i] for i in range(len(columns))}

        pet_ok = str(values.get("petname", "")).strip().lower() == EXPECTED["maple_pet_name"].lower()
        owner_ok = str(values.get("ownername", "")).strip().lower() == EXPECTED["maple_owner_name"].lower()

        if pet_ok and owner_ok:
            return self._pass("maple_record", "Maple record has the expected AppointmentID, PetName, and OwnerName.")

        earned = 4
        details = []
        if pet_ok:
            earned += 4
        else:
            details.append(f"PetName was {values.get('petname')!r}")
        if owner_ok:
            earned += 4
        else:
            details.append(f"OwnerName was {values.get('ownername')!r}")

        return self._fail("maple_record", "; ".join(details), earned=earned)

    def _check_access_object_any(self, check_id: str, object_names: list[str], object_type: int) -> CheckResult:
        assert self.cursor is not None
        placeholders = ", ".join("?" for _ in object_names)
        try:
            rows = self.cursor.execute(
                f"SELECT Name FROM MSysObjects WHERE Type = ? AND Name IN ({placeholders})",
                object_type,
                *object_names,
            ).fetchall()
            found = {str(row[0]).lower() for row in rows}
            for object_name in object_names:
                if object_name.lower() in found:
                    return self._pass(check_id, f"{object_name} was found.")
        except Exception as exc:
            fallback = self._check_access_object_any_with_com(check_id, object_names)
            if fallback is not None:
                return fallback
            return self._fail(check_id, f"Could not inspect Access system objects: {exc}")

        expected = " or ".join(object_names)
        return self._fail(check_id, f"None of the accepted object names were found: {expected}.")

    def _check_access_object(self, check_id: str, object_name: str, object_type: int) -> CheckResult:
        assert self.cursor is not None
        try:
            rows = self.cursor.execute(
                "SELECT Name FROM MSysObjects WHERE Name = ? AND Type = ?",
                object_name,
                object_type,
            ).fetchall()
        except Exception as exc:
            fallback = self._check_access_object_with_com(check_id, object_name)
            if fallback is not None:
                return fallback
            return self._fail(check_id, f"Could not inspect Access system objects: {exc}")

        if rows:
            return self._pass(check_id, f"{object_name} was found.")
        fallback = self._check_access_object_with_com(check_id, object_name)
        if fallback is not None and fallback.status == "PASS":
            return fallback
        return self._fail(check_id, f"{object_name} was not found.")

    def _check_access_object_with_com(self, check_id: str, object_name: str) -> CheckResult | None:
        return self._check_access_object_any_with_com(check_id, [object_name])

    def _check_access_object_any_with_com(self, check_id: str, object_names: list[str]) -> CheckResult | None:
        if check_id == "form_exists":
            collection_name = "AllForms"
        elif check_id == "report_exists":
            collection_name = "AllReports"
        else:
            return None

        try:
            import win32com.client  # type: ignore
        except ImportError:
            return None

        app = None
        try:
            app = win32com.client.Dispatch("Access.Application")
            app.OpenCurrentDatabase(str(self.db_path))
            collection = getattr(app.CurrentProject, collection_name)
            names = {
                str(collection.Item(i).Name).lower()
                for i in range(collection.Count)
            }
            for object_name in object_names:
                if object_name.lower() in names:
                    return self._pass(check_id, f"{object_name} was found through Access COM.")
            expected = " or ".join(object_names)
            return self._fail(check_id, f"None of the accepted object names were found through Access COM: {expected}.")
        except Exception:
            return None
        finally:
            if app is not None:
                try:
                    app.CloseCurrentDatabase()
                except Exception:
                    pass
                try:
                    app.Quit()
                except Exception:
                    pass

    def _check_average_query(self) -> CheckResult:
        assert self.cursor is not None
        query_name = EXPECTED["qry_average"]
        target_service = EXPECTED["average_service"].lower()
        expected_avg = float(EXPECTED["average_payment"])
        tolerance = float(EXPECTED["average_tolerance"])

        try:
            rows = list(self.cursor.execute(f"SELECT * FROM [{query_name}]").fetchall())
            columns = [col[0] for col in self.cursor.description]
        except Exception as exc:
            return self._fail("qry_average", f"Could not run {query_name}: {exc}")

        observed_numbers: list[float] = []
        for row in rows:
            values = list(row)
            row_text = " ".join(str(v).strip().lower() for v in values if v is not None)
            if target_service not in row_text:
                continue

            for value in values:
                maybe_number = self._to_float(value)
                if maybe_number is not None:
                    observed_numbers.append(maybe_number)
                    if math.isclose(maybe_number, expected_avg, abs_tol=tolerance):
                        return self._pass(
                            "qry_average",
                            f"{query_name} includes {EXPECTED['average_service']} average {maybe_number:.2f}.",
                        )

        if observed_numbers:
            formatted = ", ".join(f"{n:.2f}" for n in observed_numbers)
            return self._fail(
                "qry_average",
                f"Found {EXPECTED['average_service']}, but numeric values were {formatted}; expected about {expected_avg:.2f}.",
            )

        return self._fail(
            "qry_average",
            f"Could not find a row for {EXPECTED['average_service']} with an average near {expected_avg:.2f}. Columns: {columns}",
        )

    def _check_fourth_query(self) -> CheckResult:
        messages = []
        for query_name, expected_rows in EXPECTED["fourth_query_options"]:
            try:
                observed = self._count_rows(query_name)
            except Exception as exc:
                messages.append(f"{query_name}: could not run ({exc})")
                continue
            if observed == expected_rows:
                return self._pass("fourth_query", f"{query_name} returned {observed} rows.")
            messages.append(f"{query_name}: returned {observed} rows; expected {expected_rows}")

        return self._fail("fourth_query", " ; ".join(messages))

    def _to_float(self, value: Any) -> float | None:
        if value is None:
            return None
        if isinstance(value, bool):
            return None
        if isinstance(value, (int, float, Decimal)):
            return float(value)
        try:
            return float(str(value).replace("$", "").replace(",", "").strip())
        except ValueError:
            return None

    def _check_validation_rules(self) -> CheckResult:
        if self.validation_mode == "assume-full":
            return self._pass(
                "validation_rules",
                "Validation rules were not inspected automatically; points awarded by default. Use --validation-mode zero or review manually if needed.",
            )
        if self.validation_mode == "zero":
            return self._fail(
                "validation_rules",
                "Validation rules require manual review; points withheld by --validation-mode zero.",
            )
        return self._fail(
            "validation_rules",
            "Automatic validation-rule inspection is not implemented reliably for Access metadata. Review manually.",
        )


def normalize_key(value: str) -> str:
    value = value.lower().strip()
    value = value.replace("#", "")
    value = re.sub(r"[^a-z0-9]+", " ", value)
    return re.sub(r"\s+", " ", value).strip()


def clean_id(value: str) -> str:
    return value.strip().lstrip("#").lower()


def student_keys(student: StudentRecord) -> set[str]:
    first_last = f"{student.first_name} {student.last_name}".strip()
    last_first = f"{student.last_name} {student.first_name}".strip()
    keys = {
        normalize_key(first_last),
        normalize_key(last_first),
        normalize_key(student.display_name),
        clean_id(student.org_defined_id),
        clean_id(student.username),
        normalize_key(student.email.split("@")[0]) if student.email else "",
    }
    return {key for key in keys if key}


def infer_student_name(path: Path) -> str:
    parent = path.parent.name
    parts = [part.strip() for part in parent.split(" - ") if part.strip()]
    if len(parts) >= 3:
        return parts[1]
    if parent.lower() not in {"submissions", "submission", "files", "extracted_submissions"}:
        return parent
    return path.stem


def submission_keys(path: Path) -> set[str]:
    label = infer_student_name(path)
    parent = path.parent.name
    stem = path.stem
    keys = {normalize_key(label), normalize_key(parent), normalize_key(stem)}

    parent_parts = [part.strip() for part in parent.split(" - ") if part.strip()]
    if parent_parts:
        keys.add(clean_id(parent_parts[0].split("-")[0]))
    return {key for key in keys if key}


def read_students(csv_path: Path) -> list[StudentRecord]:
    with csv_path.open("r", newline="", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        if reader.fieldnames is None:
            raise ValueError(f"{csv_path} does not have a CSV header row.")
        students = []
        for row in reader:
            if not row:
                continue
            org_id = row.get("OrgDefinedId", "").strip()
            username = row.get("Username", "").strip()
            if not org_id and not username:
                continue
            students.append(
                StudentRecord(
                    org_defined_id=org_id,
                    username=username,
                    last_name=row.get("Last Name", "").strip(),
                    first_name=row.get("First Name", "").strip(),
                    email=row.get("Email", "").strip(),
                    source_row={key: (value or "") for key, value in row.items() if key is not None},
                )
            )
    if not students:
        raise ValueError(f"No students were found in {csv_path}.")
    return students


def discover_accdb_files(input_path: Path, work_dir: Path) -> list[Path]:
    if input_path.is_file() and input_path.suffix.lower() == ".zip":
        extract_dir = work_dir / "extracted_submissions"
        extract_dir.mkdir(parents=True, exist_ok=True)
        with zipfile.ZipFile(input_path) as zf:
            zf.extractall(extract_dir)
        return sorted(extract_dir.rglob("*.accdb"))

    if input_path.is_file() and input_path.suffix.lower() == ".accdb":
        return [input_path]

    if input_path.is_dir():
        return sorted(input_path.rglob("*.accdb"))

    raise FileNotFoundError(f"Could not find input path: {input_path}")


def grade_file(db_path: Path, validation_mode: str) -> SubmissionResult:
    result = SubmissionResult(student=infer_student_name(db_path), file_path=str(db_path))
    try:
        with AccessGrader(db_path, validation_mode=validation_mode) as grader:
            result.checks = grader.grade()
    except Exception as exc:
        description, points = RUBRIC[0][1], RUBRIC[0][2]
        result.checks = [
            CheckResult("database_opens", description, points, 0, "FAIL", str(exc))
        ]
        for check_id, desc, pts in RUBRIC[1:]:
            result.checks.append(CheckResult(check_id, desc, pts, 0, "FAIL", "Skipped because database could not be opened."))

    result.score = round(sum(check.points_earned for check in result.checks), 2)
    return result


def build_student_index(students: list[StudentRecord]) -> dict[str, StudentRecord]:
    index: dict[str, StudentRecord] = {}
    for student in students:
        for key in student_keys(student):
            index.setdefault(key, student)
    return index


def match_submission(
    submission_path: Path,
    students: list[StudentRecord],
    index: dict[str, StudentRecord],
) -> tuple[StudentRecord | None, str]:
    keys = submission_keys(submission_path)
    for key in keys:
        if key in index:
            return index[key], f"matched on {key}"

    label_key = normalize_key(infer_student_name(submission_path))
    choices = [normalize_key(student.display_name) for student in students]
    matches = difflib.get_close_matches(label_key, choices, n=1, cutoff=0.90)
    if matches:
        matched_name = matches[0]
        for student in students:
            if normalize_key(student.display_name) == matched_name:
                return student, f"fuzzy matched {label_key} to {matched_name}"

    return None, f"no roster match for {infer_student_name(submission_path)}"


def choose_submission(existing: SubmissionResult, candidate: SubmissionResult, policy: str) -> SubmissionResult:
    if policy == "highest":
        return candidate if candidate.score > existing.score else existing
    existing_mtime = Path(existing.file_path).stat().st_mtime
    candidate_mtime = Path(candidate.file_path).stat().st_mtime
    return candidate if candidate_mtime >= existing_mtime else existing


def build_student_grades(
    students: list[StudentRecord],
    files: list[Path],
    validation_mode: str,
    multiple_submission_policy: str,
    preserve_quiz_for_submitted: bool,
) -> tuple[list[StudentGrade], list[SubmissionResult]]:
    index = build_student_index(students)
    matched: dict[str, tuple[SubmissionResult, str]] = {}
    unmatched: list[SubmissionResult] = []

    for db_path in files:
        result = grade_file(db_path, validation_mode)
        student, note = match_submission(db_path, students, index)
        if student is None:
            result.student = infer_student_name(db_path)
            unmatched.append(result)
            continue
        result.student = student.display_name
        key = student.org_defined_id or student.username
        if key in matched:
            kept = choose_submission(matched[key][0], result, multiple_submission_policy)
            matched[key] = (kept, f"{note}; multiple submissions policy={multiple_submission_policy}")
        else:
            matched[key] = (result, note)

    grades: list[StudentGrade] = []
    for student in students:
        key = student.org_defined_id or student.username
        existing_quiz = student.source_row.get(QUIZ_GRADE_COLUMN, "").strip()
        if key in matched:
            submission, note = matched[key]
            quiz_score = existing_quiz if preserve_quiz_for_submitted else ""
            feedback_text = format_feedback(student, submission, quiz_score, False)
            grades.append(
                StudentGrade(
                    student=student,
                    lab_score=submission.score,
                    quiz_score=quiz_score,
                    submission=submission,
                    feedback_text=feedback_text,
                    matched_file=submission.file_path,
                    match_note=note,
                    brightspace_folder=Path(submission.file_path).parent.name,
                )
            )
        else:
            feedback_text = format_feedback(student, None, str(QUIZ_ZERO_WHEN_NO_LAB_SUBMISSION), True)
            grades.append(
                StudentGrade(
                    student=student,
                    lab_score=0,
                    quiz_score=str(QUIZ_ZERO_WHEN_NO_LAB_SUBMISSION),
                    submission=None,
                    feedback_text=feedback_text,
                    match_note="no Access database submission found",
                )
            )

    return grades, unmatched


FEEDBACK_LABELS = {
    "database_opens": "Database file",
    "required_tables": "Required tables",
    "appointments_row_count": "Appointment records",
    "rates_row_count": "Service-rate records",
    "primary_key": "AppointmentID primary key",
    "maple_record": "Maple appointment record",
    "form_exists": "Appointment form",
    "qry_no_shows": "No-show query",
    "qry_vaccinations": "Vaccination query",
    "qry_average": "Average-payment query",
    "fourth_query": "Fourth query",
    "report_exists": "Report",
    "validation_rules": "Validation rules",
}


def feedback_label(check: CheckResult) -> str:
    return FEEDBACK_LABELS.get(check.check_id, check.description)


def clean_check_message(check: CheckResult) -> str:
    message = check.message
    if check.status == "PASS":
        return "Complete."

    if check.check_id == "required_tables" and message.startswith("Missing:"):
        return message

    if "Too few parameters" in message:
        return "The object exists, but Access could not run it because it appears to reference a missing or misspelled field."

    if "cannot find the input table or query" in message:
        if check.check_id.startswith("qry") or check.check_id == "fourth_query":
            return "The required query was not found under an accepted name, or it could not be opened by Access."
        return "The required table or object was not found under the expected name."

    row_count_match = re.search(r"returned (\d+) rows; expected (\d+)", message)
    if row_count_match:
        return f"Returned {row_count_match.group(1)} rows; expected {row_count_match.group(2)}."

    if "No record found with AppointmentID" in message:
        return "The Maple appointment record with AppointmentID 1025 was not found."

    if "None of the accepted object names" in message:
        if check.check_id == "form_exists":
            return "The required form was not found under an accepted name."
        if check.check_id == "report_exists":
            return "The required report was not found under an accepted name."
        return "The required object was not found under an accepted name."

    if "PetName was" in message or "OwnerName was" in message:
        return f"The Maple record was present, but some expected values did not match: {message}."

    if check.check_id == "qry_average":
        return "The average-payment query did not show Dental Cleaning with an average near 123.32."

    if check.check_id == "fourth_query":
        return "Neither accepted fourth-query option returned the expected row count."

    return message.split(" (")[0].strip()


def format_feedback(
    student: StudentRecord,
    submission: SubmissionResult | None,
    quiz_score: str,
    missing_submission: bool,
) -> str:
    lines = [
        "BITM 330 Lab 01 Feedback",
        f"Student: {student.display_name}",
        "",
    ]

    if missing_submission:
        lines.extend(
            [
                "No Access database submission was found for this student.",
                "Lab file grade: 0/100",
                f"Quiz grade imported because no lab file was submitted: {quiz_score}/100",
                "",
                "Reason: this grading run was configured to set the Lab 01 quiz to 0 when there is no corresponding Lab 01 Access file submission.",
            ]
        )
        return "\n".join(lines) + "\n"

    assert submission is not None
    lines.extend(
        [
            f"Submitted file: {Path(submission.file_path).name}",
            f"Lab file grade: {submission.score}/{submission.max_points}",
            f"Quiz grade retained in import: {quiz_score if quiz_score else '[not changed]'}",
            "",
            "Automated checklist:",
        ]
    )
    for check in submission.checks:
        label = feedback_label(check)
        clean_message = clean_check_message(check)
        lines.append(
            f"- {label}: {check.status} ({check.points_earned}/{check.points_possible})"
        )
        if check.status != "PASS":
            lines.append(f"  {clean_message}")
    return "\n".join(lines).rstrip() + "\n"


def safe_feedback_filename(student: StudentRecord) -> str:
    base = f"{student.org_defined_id}_{student.username}_{student.last_name}_{student.first_name}"
    base = base.replace("#", "")
    base = re.sub(r"[^A-Za-z0-9._-]+", "_", base).strip("_")
    return f"{base or 'student'}_feedback.txt"


def reset_dir(path: Path) -> None:
    if path.exists():
        shutil.rmtree(path)
    path.mkdir(parents=True, exist_ok=True)


def format_score(value: float) -> str:
    if float(value).is_integer():
        return str(int(value))
    return f"{value:.2f}".rstrip("0").rstrip(".")


def write_outputs(
    grades: list[StudentGrade],
    unmatched: list[SubmissionResult],
    out_dir: Path,
) -> None:
    out_dir.mkdir(parents=True, exist_ok=True)
    feedback_dir = out_dir / "feedback_files"
    brightspace_feedback_dir = out_dir / "brightspace_feedback_files"
    reset_dir(feedback_dir)
    reset_dir(brightspace_feedback_dir)

    import_csv = out_dir / "brightspace_lab01_import.csv"
    with import_csv.open("w", newline="", encoding="utf-8-sig") as f:
        fieldnames = [
            "OrgDefinedId",
            "Username",
            QUIZ_GRADE_COLUMN,
            LAB_GRADE_COLUMN,
            END_OF_LINE_COLUMN,
        ]
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for grade in grades:
            writer.writerow(
                {
                    "OrgDefinedId": grade.student.org_defined_id,
                    "Username": grade.student.username,
                    QUIZ_GRADE_COLUMN: grade.quiz_score,
                    LAB_GRADE_COLUMN: format_score(grade.lab_score),
                    END_OF_LINE_COLUMN: "#",
                }
            )

    summary_csv = out_dir / "lab01_grading_summary.csv"
    with summary_csv.open("w", newline="", encoding="utf-8-sig") as f:
        fieldnames = [
            "OrgDefinedId",
            "Username",
            "Last Name",
            "First Name",
            "Email",
            "Lab Score",
            "Quiz Import Score",
            "Matched File",
            "Match Note",
            "Feedback",
        ]
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for grade in grades:
            writer.writerow(
                {
                    "OrgDefinedId": grade.student.org_defined_id,
                    "Username": grade.student.username,
                    "Last Name": grade.student.last_name,
                    "First Name": grade.student.first_name,
                    "Email": grade.student.email,
                    "Lab Score": format_score(grade.lab_score),
                    "Quiz Import Score": grade.quiz_score,
                    "Matched File": grade.matched_file,
                    "Match Note": grade.match_note,
                    "Feedback": grade.submission.feedback_summary if grade.submission else "No Access database submission found.",
                }
            )

    details_csv = out_dir / "detailed_check_results.csv"
    with details_csv.open("w", newline="", encoding="utf-8-sig") as f:
        fieldnames = [
            "OrgDefinedId",
            "Username",
            "Student",
            "File",
            "Check ID",
            "Description",
            "Status",
            "Points Earned",
            "Points Possible",
            "Message",
        ]
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for grade in grades:
            if grade.submission is None:
                writer.writerow(
                    {
                        "OrgDefinedId": grade.student.org_defined_id,
                        "Username": grade.student.username,
                        "Student": grade.student.display_name,
                        "File": "",
                        "Check ID": "missing_submission",
                        "Description": "No Access database submission found",
                        "Status": "FAIL",
                        "Points Earned": 0,
                        "Points Possible": LAB_MAX_POINTS,
                        "Message": "Lab file-submission grade set to 0/100; quiz import grade set to 0/100.",
                    }
                )
                continue
            for check in grade.submission.checks:
                writer.writerow(
                    {
                        "OrgDefinedId": grade.student.org_defined_id,
                        "Username": grade.student.username,
                        "Student": grade.student.display_name,
                        "File": grade.submission.file_path,
                        "Check ID": check.check_id,
                        "Description": check.description,
                        "Status": check.status,
                        "Points Earned": check.points_earned,
                        "Points Possible": check.points_possible,
                        "Message": check.message,
                    }
                )

    unmatched_csv = out_dir / "unmatched_submissions.csv"
    with unmatched_csv.open("w", newline="", encoding="utf-8-sig") as f:
        fieldnames = ["Inferred Student", "File", "Score", "Feedback"]
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for result in unmatched:
            writer.writerow(
                {
                    "Inferred Student": result.student,
                    "File": result.file_path,
                    "Score": format_score(result.score),
                    "Feedback": result.feedback_summary,
                }
            )

    for grade in grades:
        feedback_path = feedback_dir / safe_feedback_filename(grade.student)
        with feedback_path.open("w", encoding="utf-8") as f:
            f.write(grade.feedback_text)

        if grade.submission is not None and grade.brightspace_folder:
            student_feedback_dir = brightspace_feedback_dir / grade.brightspace_folder
            student_feedback_dir.mkdir(parents=True, exist_ok=True)
            brightspace_feedback_path = student_feedback_dir / "Lab01-feedback.txt"
            with brightspace_feedback_path.open("w", encoding="utf-8") as f:
                f.write(grade.feedback_text)

    feedback_zip = out_dir / "lab01_feedback_files.zip"
    if feedback_zip.exists():
        feedback_zip.unlink()
    with zipfile.ZipFile(feedback_zip, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        for feedback_path in sorted(brightspace_feedback_dir.rglob("*.txt")):
            zf.write(feedback_path, arcname=str(feedback_path.relative_to(brightspace_feedback_dir)))

    roster_feedback_zip = out_dir / "lab01_roster_feedback_files.zip"
    if roster_feedback_zip.exists():
        roster_feedback_zip.unlink()
    with zipfile.ZipFile(roster_feedback_zip, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        for feedback_path in sorted(feedback_dir.glob("*.txt")):
            zf.write(feedback_path, arcname=feedback_path.name)


def default_course_dir() -> Path:
    return Path(__file__).resolve().parent.parent


def default_grade_export_path() -> Path:
    course_dir = default_course_dir()
    grade_export = course_dir / DEFAULT_GRADE_EXPORT_NAME
    if grade_export.exists():
        return grade_export
    students_export = course_dir / DEFAULT_STUDENTS_EXPORT_NAME
    return students_export


def parse_args(argv: Iterable[str]) -> argparse.Namespace:
    script_dir = Path(__file__).resolve().parent
    parser = argparse.ArgumentParser(
        description="Grade BITM 330 Lab 01 Access submissions and create Brightspace import/feedback files."
    )
    parser.add_argument(
        "input",
        nargs="?",
        default=str(script_dir),
        help="Path to a Brightspace submissions ZIP, a folder containing .accdb files, or one .accdb file. Default: this script's folder.",
    )
    parser.add_argument(
        "--grade-export",
        default=str(default_grade_export_path()),
        help="Brightspace grade export or student export CSV used as the roster and import template.",
    )
    parser.add_argument(
        "--out",
        default=str(script_dir / "grading_results_codex"),
        help="Output folder for grades and feedback files. Default: grading_results_codex next to this script.",
    )
    parser.add_argument(
        "--validation-mode",
        choices=["assume-full", "zero", "manual"],
        default="assume-full",
        help="How to handle validation-rule points. Default: assume-full.",
    )
    parser.add_argument(
        "--multiple-submission-policy",
        choices=["latest", "highest"],
        default="latest",
        help="How to choose when more than one .accdb maps to the same roster student. Default: latest.",
    )
    parser.add_argument(
        "--blank-quiz-for-submitted",
        action="store_true",
        help="Leave the quiz import cell blank for students who submitted a lab file. Default preserves existing quiz values from the grade export.",
    )
    parser.add_argument(
        "--keep-work-dir",
        action="store_true",
        help="Keep extracted ZIP files in the output folder for inspection.",
    )
    return parser.parse_args(list(argv))


def main(argv: Iterable[str] = sys.argv[1:]) -> int:
    args = parse_args(argv)
    input_path = Path(args.input).expanduser().resolve()
    grade_export = Path(args.grade_export).expanduser().resolve()
    out_dir = Path(args.out).expanduser().resolve()
    work_dir = out_dir / "_work"

    if not grade_export.exists():
        print(f"Grade export/student roster CSV not found: {grade_export}", file=sys.stderr)
        return 2

    if work_dir.exists():
        shutil.rmtree(work_dir)
    work_dir.mkdir(parents=True, exist_ok=True)

    try:
        students = read_students(grade_export)
        files = discover_accdb_files(input_path, work_dir)
        grades, unmatched = build_student_grades(
            students=students,
            files=files,
            validation_mode=args.validation_mode,
            multiple_submission_policy=args.multiple_submission_policy,
            preserve_quiz_for_submitted=not args.blank_quiz_for_submitted,
        )
        write_outputs(grades, unmatched, out_dir)

        submitted = sum(1 for grade in grades if grade.submission is not None)
        missing = len(grades) - submitted
        print(f"Roster students: {len(grades)}")
        print(f"Matched lab submissions: {submitted}")
        print(f"Students with no lab submission: {missing}")
        print(f"Unmatched .accdb files: {len(unmatched)}")
        print(f"Brightspace import CSV: {out_dir / 'brightspace_lab01_import.csv'}")
        print(f"Feedback ZIP: {out_dir / 'lab01_feedback_files.zip'}")
        print(f"Detailed results: {out_dir / 'detailed_check_results.csv'}")
        return 0
    finally:
        if not args.keep_work_dir and work_dir.exists():
            shutil.rmtree(work_dir)


if __name__ == "__main__":
    raise SystemExit(main())
