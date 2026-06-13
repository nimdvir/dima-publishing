-- =====================================================================
-- Lab 05 PetVax setup script
-- Engine: SQLite (paste into SQLiteOnline.com or DB Browser for SQLite)
-- Loads: PETVAX_APPOINTMENTS (24 starter rows), SERVICE_RATES (6 rows)
-- Continuity: This is the SAME PetVax clinic and the SAME appointment
--             data you used in Lab 04 (Access), now exported to SQLite.
--             Dates are stored as text in ISO format (YYYY-MM-DD).
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
    ServiceType             TEXT PRIMARY KEY,
    StandardFee             REAL NOT NULL,
    RequiresVaccineTracking TEXT
);

-- ---------------------------------------------------------------------
-- SERVICE_RATES: the clinic's six standard service categories.
-- (Same six fees you saw in Lab 04.)
-- ---------------------------------------------------------------------
INSERT INTO SERVICE_RATES (ServiceType, StandardFee, RequiresVaccineTracking) VALUES
    ('Vaccination',     64.91,  'Yes'),
    ('General Checkup', 90.29,  'No'),
    ('Dental Cleaning', 123.32, 'No'),
    ('Emergency Visit', 439,    'No'),
    ('Grooming - Basic', 80.36, 'No'),
    ('Follow-up',       0,      'No');

-- ---------------------------------------------------------------------
-- PETVAX_APPOINTMENTS: 24 starter rows (April 1-2, 2026).
-- Engineered facts (the quiz keys off these, before any in-lab inserts):
--   * No-show count            = 2   (1006 Mango, 1010 Max)
--   * VaccineDue = 'Yes'       = 11
--   * ReminderSent = 'No'      = 4   (1003, 1006, 1010, 1020)
--   * DISTINCT ServiceType     = 6
--   * Top PaymentAmount        = Daisy (Emergency Visit, 439)
--   * PaymentAmount >= 100     = 4   (3 Dental Cleaning + 1 Emergency Visit)
-- ---------------------------------------------------------------------
INSERT INTO PETVAX_APPOINTMENTS
    (AppointmentID, AppointmentDate, AppointmentTime, PetName, OwnerName, OwnerEmail,
     AnimalType, BreedName, WeightKg, ServiceType, VaccineDue, AppointmentStatus,
     ReminderSent, PaymentAmount, Notes)
VALUES
    (1001, '2026-04-01', '9:00 AM',  'Buddy',   'Sarah Perry',       'sarah.perry@example.com',
      'Dog', 'Beagle',            15,   'Vaccination',     'Yes', 'Completed', 'Yes',  64.91, 'Rabies booster due'),
    (1002, '2026-04-01', '9:30 AM',  'Misty',   'Stephanie Foley',   'stephanie.foley@example.com',
      'Cat', 'Siamese',           4.1,  'General Checkup', 'No',  'Completed', 'Yes',  90.29, 'Sneezing and ear wax'),
    (1003, '2026-04-01', '10:15 AM', 'Charlie', 'Barry Jones',       'barry.jones@example.com',
      'Dog', 'Labrador Retriever',34,   'Vaccination',     'Yes', 'Completed', 'No',   64.91, 'Same pet name as another record'),
    (1004, '2026-04-01', '11:00 AM', 'Charlie', 'Angela Garcia',     'angela.garcia@example.com',
      'Dog', 'Beagle',            11.5, 'Dental Cleaning', 'No',  'Completed', 'Yes', 123.32, 'Different Charlie'),
    (1005, '2026-04-01', '11:30 AM', 'Bandit',  'Sarah Perry',       'sarah.perry@example.com',
      'Dog', 'Yorkshire Terrier', 4.9,  'Dental Cleaning', 'No',  'Completed', 'Yes', 123.32, 'Sarah owns more than one pet'),
    (1006, '2026-04-01', '12:00 PM', 'Mango',   'Thomas Hernandez',  'thomas.hernandez@example.com',
      'Cat', 'Maine Coon',        8.8,  'Vaccination',     'Yes', 'No-show',   'No',    0,     'Missed appointment'),
    (1007, '2026-04-01', '1:00 PM',  'Coco',    'Alex Rivera',       'alex.rivera@example.com',
      'Dog', 'Poodle',            11,   'Vaccination',     'Yes', 'Completed', 'Yes',  64.91, 'Co-owner 1'),
    (1008, '2026-04-01', '1:30 PM',  'Coco',    'Jordan Rivera',     'jordan.rivera@example.com',
      'Dog', 'Poodle',            11,   'Vaccination',     'Yes', 'Completed', 'Yes',  64.91, 'Co-owner 2'),
    (1009, '2026-04-01', '2:00 PM',  'Luna',    'Wendy Henry',       'wendy.henry@example.com',
      'Cat', 'Ragdoll',           7.8,  'General Checkup', 'No',  'Completed', 'Yes',  90.29, 'Wendy owns more than one pet'),
    (1010, '2026-04-01', '2:30 PM',  'Max',     'Jenna Powell',      'jenna.powell@example.com',
      'Dog', 'Dachshund',         12,   'Vaccination',     'Yes', 'No-show',   'No',    0,     'Missed appointment'),
    (1011, '2026-04-01', '3:00 PM',  'Bella',   'Joyce Arnold',      'joyce.arnold@example.com',
      'Dog', 'Golden Retriever',  31.5, 'Vaccination',     'Yes', 'Completed', 'Yes',  64.91, ''),
    (1012, '2026-04-01', '3:30 PM',  'Milo',    'Wendy Henry',       'wendy.henry@example.com',
      'Dog', 'French Bulldog',    14.2, 'General Checkup', 'No',  'Completed', 'Yes',  90.29, 'Same owner as Luna'),
    (1013, '2026-04-01', '4:00 PM',  'Daisy',   'William Reid',      'william.reid@example.com',
      'Dog', 'Boxer',             29,   'Emergency Visit', 'No',  'Completed', 'Yes', 439,    'Vomiting and lethargy'),
    (1014, '2026-04-01', '4:30 PM',  'Rocky',   'Tammie Garcia',     'tammie.garcia@example.com',
      'Dog', 'Bulldog',           27,   'General Checkup', 'No',  'Completed', 'Yes',  90.29, ''),
    (1015, '2026-04-01', '5:00 PM',  'Nala',    'Vanessa Reed',      'vanessa.reed@example.com',
      'Cat', 'Persian',           5.6,  'Grooming - Basic','No',  'Completed', 'Yes',  80.36, ''),
    (1016, '2026-04-01', '5:30 PM',  'Oreo',    'Kelly Garcia',      'kelly.garcia@example.com',
      'Dog', 'Shih Tzu',          5.8,  'Vaccination',     'Yes', 'Completed', 'Yes',  64.91, ''),
    (1017, '2026-04-02', '9:00 AM',  'Buddy',   'Sarah Perry',       'sarah.perry@example.com',
      'Dog', 'Beagle',            15.1, 'Follow-up',       'No',  'Scheduled', 'Yes',   0,     'Six-week recheck'),
    (1018, '2026-04-02', '9:30 AM',  'Zeus',    'Andrew Lee',        'andrew.lee@example.com',
      'Dog', 'German Shepherd',   39.2, 'Vaccination',     'Yes', 'Completed', 'Yes',  64.91, ''),
    (1019, '2026-04-02', '10:00 AM', 'Pumpkin', 'Patrick Singh',     'patrick.singh@example.com',
      'Cat', 'Maine Coon',        9.2,  'General Checkup', 'No',  'Completed', 'Yes',  90.29, ''),
    (1020, '2026-04-02', '10:30 AM', 'Shadow',  'Gregory Lang',      'gregory.lang@example.com',
      'Dog', 'Border Collie',     19.1, 'Vaccination',     'Yes', 'Completed', 'No',   64.91, 'Reminder not sent'),
    (1021, '2026-04-02', '11:00 AM', 'Peanut',  'Lisa White',        'lisa.white@example.com',
      'Dog', 'Pug',               8.9,  'General Checkup', 'No',  'Completed', 'Yes',  90.29, ''),
    (1022, '2026-04-02', '11:30 AM', 'Angel',   'Mariah Davis',      'mariah.davis@example.com',
      'Cat', 'Sphynx',            3.9,  'Vaccination',     'Yes', 'Completed', 'Yes',  64.91, 'Only appointment for Angel'),
    (1023, '2026-04-02', '12:00 PM', 'Apollo',  'Richard Bowman',    'richard.bowman@example.com',
      'Dog', 'Labrador Retriever',28,   'Dental Cleaning', 'No',  'Completed', 'Yes', 123.32, ''),
    (1024, '2026-04-02', '12:30 PM', 'Coco',    'Alex Rivera',       'alex.rivera@example.com',
      'Dog', 'Poodle',            11.4, 'Follow-up',       'No',  'Scheduled', 'Yes',   0,     'Repeat visit for Coco');
