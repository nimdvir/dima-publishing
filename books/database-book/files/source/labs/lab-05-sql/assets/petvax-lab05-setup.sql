-- =====================================================================
-- Lab 05 PetVax setup script
-- Engine: SQLite (paste into SQLiteOnline.com or DB Browser for SQLite)
-- Loads: PETVAX_APPOINTMENTS (20 starter rows), SERVICE_RATES (4 rows)
-- Note: This is the Chapter 5 lab dataset. It is deliberately different
--       from the Chapter 4 (Lab 04) dataset so quiz answers cannot be
--       reused. New pets, new owners, new dates, new engineered facts.
-- =====================================================================

DROP TABLE IF EXISTS PETVAX_APPOINTMENTS;
DROP TABLE IF EXISTS SERVICE_RATES;

CREATE TABLE PETVAX_APPOINTMENTS (
    AppointmentID     INTEGER PRIMARY KEY,
    AppointmentDate   TEXT    NOT NULL,
    AppointmentTime   TEXT,
    PetName           TEXT    NOT NULL,
    OwnerName         TEXT    NOT NULL,
    OwnerEmail        TEXT,
    AnimalType        TEXT,
    BreedName         TEXT,
    WeightKg          REAL    CHECK (WeightKg BETWEEN 0 AND 100),
    ServiceType       TEXT    NOT NULL,
    VaccineDue        TEXT    CHECK (VaccineDue IN ('Yes', 'No')),
    AppointmentStatus TEXT    NOT NULL,
    ReminderSent      TEXT    CHECK (ReminderSent IN ('Yes', 'No')),
    PaymentAmount     REAL    CHECK (PaymentAmount >= 0),
    Notes             TEXT
);

CREATE TABLE SERVICE_RATES (
    ServiceType            TEXT PRIMARY KEY,
    StandardFee            REAL NOT NULL,
    RequiresVaccineTracking TEXT
);

-- ---------------------------------------------------------------------
-- SERVICE_RATES: four standard service categories. Grooming intentionally
-- omitted so the LEFT JOIN step in the lab will flag it as unmatched.
-- ---------------------------------------------------------------------
INSERT INTO SERVICE_RATES (ServiceType, StandardFee, RequiresVaccineTracking) VALUES
    ('Vaccination', 65,  'Yes'),
    ('Checkup',     80,  'No'),
    ('Dental',      220, 'No'),
    ('Emergency',   150, 'No');

-- ---------------------------------------------------------------------
-- PETVAX_APPOINTMENTS: 20 starter rows, April 6-22, 2026.
-- Engineered facts (the quiz keys off these):
--   * No-Show count           = 3   (rows 7, 14, 20)
--   * VaccineDue = 'Yes'      = 7   (rows 1, 3, 8, 12, 14, 16, 20)
--   * ReminderSent = 'No'     = 5   (rows 7, 11, 14, 16, 19)
--   * DISTINCT ServiceType    = 4   (Vaccination, Checkup, Emergency, Grooming)
--   * Top PaymentAmount       = Bruno (Emergency, $175) -- before in-lab insert
--   * Grooming rows (no match in SERVICE_RATES) = 3 (rows 6, 11, 17)
--   * PaymentAmount mismatches vs StandardFee:
--       row 5  Ginger Vaccination 50  (-15)
--       row 9  Ruby   Checkup    95  (+15)
--       row 15 Bruno  Emergency 175  (+25)
-- ---------------------------------------------------------------------
INSERT INTO PETVAX_APPOINTMENTS
    (AppointmentID, AppointmentDate, AppointmentTime, PetName, OwnerName, OwnerEmail,
     AnimalType, BreedName, WeightKg, ServiceType, VaccineDue, AppointmentStatus,
     ReminderSent, PaymentAmount, Notes)
VALUES
    ( 1, '2026-04-06', '9:00 AM',  'Hazel',   'Diego Ramirez',     'diego.ramirez@example.com',
      'Cat', 'Maine Coon',         6,  'Vaccination', 'Yes', 'Completed', 'Yes',  65, 'Rabies booster'),
    ( 2, '2026-04-06', '10:30 AM', 'Cooper',  'Aria Tanaka',       'aria.tanaka@example.com',
      'Dog', 'Border Collie',      18, 'Checkup',     'No',  'Completed', 'Yes',  80, 'Annual wellness'),
    ( 3, '2026-04-07', '11:00 AM', 'Olive',   'Jonah Foster',      'jonah.foster@example.com',
      'Cat', 'Tabby',              4,  'Vaccination', 'Yes', 'Completed', 'Yes',  65, 'Booster overdue'),
    ( 4, '2026-04-07', '1:30 PM',  'Finn',    'Maya Brooks',       'maya.brooks@example.com',
      'Dog', 'Australian Shepherd',22, 'Emergency',   'No',  'Completed', 'Yes', 150, 'Ate something toxic'),
    ( 5, '2026-04-08', '9:30 AM',  'Ginger',  'Ben Hayes',         'ben.hayes@example.com',
      'Cat', 'Calico',             5,  'Vaccination', 'No',  'Completed', 'Yes',  50, 'New-patient discount'),
    ( 6, '2026-04-08', '2:00 PM',  'Stella',  'Lila OBrien',       'lila.obrien@example.com',
      'Dog', 'Cavalier',           9,  'Grooming',    'No',  'Completed', 'Yes',  40, 'Bath and trim'),
    ( 7, '2026-04-09', '10:00 AM', 'Oscar',   'Ravi Patel-Mehta',  'ravi.mehta@example.com',
      'Dog', 'Pug',                8,  'Checkup',     'No',  'No-Show',   'No',   80, 'Did not arrive'),
    ( 8, '2026-04-09', '3:00 PM',  'Sadie',   'Kira Nguyen',       'kira.nguyen@example.com',
      'Dog', 'Lab Mix',            25, 'Vaccination', 'Yes', 'Completed', 'Yes',  65, 'Annual booster'),
    ( 9, '2026-04-10', '9:00 AM',  'Ruby',    'Theo Williams',     'theo.williams@example.com',
      'Cat', 'Russian Blue',       5,  'Checkup',     'No',  'Completed', 'Yes',  95, 'Extended exam'),
    (10, '2026-04-10', '11:00 AM', 'Nova',    'Camila Cohen',      'camila.cohen@example.com',
      'Dog', 'Boxer',              28, 'Emergency',   'No',  'Completed', 'Yes', 150, 'Laceration'),
    (11, '2026-04-13', '9:30 AM',  'Marble',  'Aaron Reed',        'aaron.reed@example.com',
      'Cat', 'Ragdoll',            7,  'Grooming',    'No',  'Completed', 'No',   55, 'Senior grooming'),
    (12, '2026-04-13', '1:00 PM',  'Toby',    'Nora Singh',        'nora.singh@example.com',
      'Dog', 'Shih Tzu',           6,  'Vaccination', 'Yes', 'Completed', 'Yes',  65, 'Booster'),
    (13, '2026-04-14', '10:00 AM', 'Penny',   'Eli Park',          'eli.park@example.com',
      'Dog', 'Pomeranian',         4,  'Checkup',     'No',  'Completed', 'Yes',  80, 'Routine'),
    (14, '2026-04-14', '2:00 PM',  'Loki',    'Zoe Bennett',       'zoe.bennett@example.com',
      'Cat', 'Bengal',             6,  'Vaccination', 'Yes', 'No-Show',   'No',   65, 'Owner rescheduled'),
    (15, '2026-04-15', '9:00 AM',  'Bruno',   'Marco Romero',      'marco.romero@example.com',
      'Dog', 'Doberman',           36, 'Emergency',   'No',  'Completed', 'Yes', 175, 'Required overnight observation'),
    (16, '2026-04-16', '10:30 AM', 'Cleo',    'Sienna Walsh',      'sienna.walsh@example.com',
      'Cat', 'Siberian',           5,  'Vaccination', 'Yes', 'Completed', 'No',   65, 'Rabies'),
    (17, '2026-04-16', '2:30 PM',  'Pixie',   'Caleb Frost',       'caleb.frost@example.com',
      'Dog', 'Yorkie',             3,  'Grooming',    'No',  'Completed', 'Yes',  35, 'Nail trim'),
    (18, '2026-04-20', '9:00 AM',  'Mochi',   'Iris Mendez-Hall',  'iris.mendez@example.com',
      'Dog', 'French Bulldog',     11, 'Emergency',   'No',  'Completed', 'Yes', 150, 'Breathing issue'),
    (19, '2026-04-21', '11:00 AM', 'Biscuit', 'Owen Vasquez',      'owen.vasquez@example.com',
      'Dog', 'Cocker Spaniel',     14, 'Emergency',   'No',  'Completed', 'No',  150, 'Eye issue'),
    (20, '2026-04-22', '1:30 PM',  'Willow',  'Priya Nair',        'priya.nair@example.com',
      'Cat', 'Persian',            5,  'Vaccination', 'Yes', 'No-Show',   'Yes',  65, 'Owner sick');

-- ---------------------------------------------------------------------
-- Quick sanity check (uncomment to run):
--   SELECT COUNT(*) FROM PETVAX_APPOINTMENTS;  -- expect 20
--   SELECT COUNT(*) FROM SERVICE_RATES;        -- expect 4
-- ---------------------------------------------------------------------
