# SQL Core Concepts and Syntax Summary

> Converted from `SQL Core Concepts and Syntax Summary.xlsx` on 2026-06-13

---

## Table 1

| Concept | Category | Command or Operator | Description | Syntax Example | Purpose | Source |
| --- | --- | --- | --- | --- | --- | --- |
| Aggregation | Operator/Function | COUNT / SUM / AVG | Functions that perform calculations on a set of values to return a single value. | SELECT COUNT(*) FROM EMPLOYEE; | Calculating summaries of data | 1, 2 |
| Grouping | Clause | GROUP BY | Groups rows that have the same values in specified columns for aggregate functions. | SELECT Department, COUNT(*) FROM EMPLOYEE GROUP BY Department; | Working with summarized data | 1 |
| Aggregate Filtering | Clause | HAVING | Specifies conditions that apply to fields summarized in a SELECT statement. | SELECT Department FROM EMPLOYEE GROUP BY Department HAVING COUNT(*) > 1; | Filtering groups after aggregation | 1 |
| Filtering | Clause | WHERE | Specifies field criteria that must be met for a record to be included in results. | SELECT * FROM Contacts WHERE City = 'Seattle'; | Filtering rows based on specified criteria | 1 |
| Sorting | Clause | ORDER BY | Specifies how to sort the results, defaults to ascending order. | SELECT * FROM STUDENT ORDER BY Grade DESC; | Sorting query results | 1 |
| Joins | Operator | INNER JOIN / LEFT JOIN | Used to retrieve related data spread across multiple tables. | SELECT * FROM table1 INNER JOIN table2 ON table1.ID = table2.ID; | Combining information from multiple tables | 1 |
| Comparison | Operator | LIKE | Matches a pattern of characters using wildcards like % and _. | WHERE ProjectName LIKE '2019 Q_ Portfolio%'; | Pattern matching in text data | 1 |
| Set Operations | Operator | UNION | Combines the results of two or more SELECT statements and removes duplicates. | SELECT ID FROM Table1 UNION SELECT ID FROM Table2; | Combining query results into a single set | 1 |
| Data Retrieval | DML | SELECT | Lists the fields that contain data of interest to be retrieved from the database. | SELECT FirstName, LastName FROM STUDENT; | Querying data from a single or multiple tables | 1 |
| Data Insertion | DML | INSERT | Adds new records (rows) to a table. | INSERT INTO Persons (FirstName, LastName) VALUES ('Lars', 'Monsen'); | Adding data to a database | 1 |
| Data Modification | DML | UPDATE | Modifies existing data within a table based on a condition. | UPDATE EMPLOYEE SET OfficePhone = '360-285-8620' WHERE EmployeeNumber = 13; | Modifying existing records | 1 |
| Data Deletion | DML | DELETE | Removes existing records from a table. | DELETE FROM PROJECT WHERE Department = 'Sales and Marketing'; | Deleting data from a database | 1 |
| Database Structure Creation | DDL | CREATE | Used to create database objects like tables, views, and indexes. | CREATE TABLE STUDENT (StudentID INTEGER PRIMARY KEY, FirstName TEXT NOT NULL); | Creating database structures | 1 |
| Database Structure Modification | DDL | ALTER | Modifies the structure and/or characteristics of existing database objects. | ALTER TABLE Assignment ADD COLUMN AssignmentID INTEGER; | Modifying existing database structures | 1 |
| Database Object Removal | DDL | DROP | Permanently deletes database objects such as tables. | DROP TABLE ASSIGNMENT; | Deleting database objects | 1 |
| Transaction Control | TCL | BEGIN / COMMIT / ROLLBACK | Statements used to mark transaction boundaries and ensure data integrity. | BEGIN; SQL Statements; COMMIT; | Ensuring groups of changes succeed or fail together | 1, 2 |
| Data Control | DCL | GRANT / REVOKE | Used to manage database permissions and access control. | GRANT SELECT ON STUDENT TO User1; | Granting and revoking database permissions | 1, 2 |
|  |  |  |  |  |  |  |
|  | 3 |  |  |  |  |  |

## Source References

| Index | Reference |
| --- | --- |
| 1 | BITM330-SQL-Combined.pdf |
| 2 | bitm 330 -sql-examples.pdf |

## pet_hospital_bundle - Breeds

| BreedID | BreedName | Size | AnimalType | MinWeightLb | MaxWeightLb |
| --- | --- | --- | --- | --- | --- |
| 1.0 | Abyssinian | Small | Cat | 8.0 | 12.0 |
| 2.0 | American Bobtail | Small | Cat | 7.0 | 16.0 |
| 3.0 | American Curl | Large | Cat | 5.0 | 10.0 |
| 4.0 | American Shorthair | Large | Cat | 10.0 | 15.0 |
| 5.0 | Balinese | Small | Cat | 5.0 | 10.0 |
| 6.0 | Bengal | Large | Cat | 8.0 | 15.0 |
| 7.0 | Birman | Medium | Cat | 8.0 | 12.0 |
| 8.0 | Bombay | Medium | Cat | 8.0 | 15.0 |
| 9.0 | British Shorthair | Medium | Cat | 9.0 | 18.0 |
| 10.0 | Burmese | Medium | Cat | 8.0 | 12.0 |
| 11.0 | Chartreux | Large | Cat | 12.0 | 16.0 |
| 12.0 | Cornish Rex | Large | Cat | 6.0 | 10.0 |
| 13.0 | Devon Rex | Small | Cat | 5.0 | 9.0 |
| 14.0 | Egyptian Mau | Small | Cat | 6.0 | 11.0 |
| 15.0 | Exotic Shorthair | Medium | Cat | 7.0 | 14.0 |
| 16.0 | Himalayan | Large | Cat | 7.0 | 12.0 |
| 17.0 | Japanese Bobtail | Medium | Cat | 6.0 | 10.0 |
| 18.0 | Korat | Medium | Cat | 6.0 | 10.0 |
| 19.0 | Maine Coon | Medium | Cat | 10.0 | 25.0 |
| 20.0 | Manx | Large | Cat | 8.0 | 13.0 |
| 21.0 | Norwegian Forest | Medium | Cat | 12.0 | 20.0 |
| 22.0 | Ocicat | Medium | Cat | 7.0 | 15.0 |
| 23.0 | Oriental | Medium | Cat | 5.0 | 10.0 |
| 24.0 | Persian | Small | Cat | 7.0 | 12.0 |
| 25.0 | Ragdoll | Small | Cat | 10.0 | 20.0 |
| 26.0 | Russian Blue | Large | Cat | 7.0 | 12.0 |
| 27.0 | Scottish Fold | Large | Cat | 6.0 | 13.0 |
| 28.0 | Selkirk Rex | Small | Cat | 6.0 | 16.0 |
| 29.0 | Siamese | Large | Cat | 6.0 | 10.0 |
| 30.0 | Siberian | Large | Cat | 12.0 | 20.0 |
| 31.0 | Singapura | Medium | Cat | 4.0 | 8.0 |
| 32.0 | Somali | Small | Cat | 6.0 | 12.0 |
| 33.0 | Sphynx | Small | Cat | 6.0 | 12.0 |
| 34.0 | Tonkinese | Small | Cat | 6.0 | 12.0 |
| 35.0 | Turkish Angora | Large | Cat | 5.0 | 10.0 |
| 36.0 | Turkish Van | Medium | Cat | 10.0 | 20.0 |
| 37.0 | Beagle | Medium | Dog | 20.0 | 30.0 |
| 38.0 | Border Collie | Small | Dog | 30.0 | 45.0 |
| 39.0 | Boxer | Large | Dog | 55.0 | 80.0 |
| 40.0 | Bulldog | Medium | Dog | 40.0 | 55.0 |
| 41.0 | Chihuahua | Medium | Dog | 3.0 | 6.0 |
| 42.0 | Cocker Spaniel | Small | Dog | 20.0 | 30.0 |
| 43.0 | Dachshund | Small | Dog | 16.0 | 32.0 |
| 44.0 | Dalmatian | Small | Dog | 45.0 | 70.0 |
| 45.0 | Doberman Pinscher | Large | Dog | 60.0 | 100.0 |
| 46.0 | French Bulldog | Large | Dog | 16.0 | 28.0 |
| 47.0 | German Shepherd | Small | Dog | 50.0 | 90.0 |
| 48.0 | Golden Retriever | Large | Dog | 55.0 | 75.0 |
| 49.0 | Great Dane | Large | Dog | 110.0 | 175.0 |
| 50.0 | Greyhound | Large | Dog | 60.0 | 85.0 |
| 51.0 | Labrador Retriever | Large | Dog | 55.0 | 80.0 |
| 52.0 | Maltese | Medium | Dog | 4.0 | 7.0 |
| 53.0 | Newfoundland | Medium | Dog | 100.0 | 150.0 |
| 54.0 | Papillon | Medium | Dog | 5.0 | 10.0 |
| 55.0 | Pekingese | Large | Dog | 7.0 | 14.0 |
| 56.0 | Pomeranian | Small | Dog | 3.0 | 7.0 |
| 57.0 | Poodle | Medium | Dog | 45.0 | 70.0 |
| 58.0 | Pug | Small | Dog | 14.0 | 18.0 |
| 59.0 | Rottweiler | Medium | Dog | 80.0 | 135.0 |
| 60.0 | Saint Bernard | Medium | Dog | 120.0 | 180.0 |
| 61.0 | Samoyed | Medium | Dog | 35.0 | 65.0 |
| 62.0 | Schnauzer | Large | Dog | 30.0 | 50.0 |
| 63.0 | Shiba Inu | Large | Dog | 17.0 | 23.0 |
| 64.0 | Shih Tzu | Medium | Dog | 9.0 | 16.0 |
| 65.0 | Siberian Husky | Large | Dog | 35.0 | 60.0 |
| 66.0 | Staffordshire Terrier | Large | Dog | 40.0 | 70.0 |
| 67.0 | Weimaraner | Large | Dog | 55.0 | 90.0 |
| 68.0 | Whippet | Large | Dog | 25.0 | 40.0 |
| 69.0 | Yorkshire Terrier | Medium | Dog | 4.0 | 7.0 |
| 70.0 | Akita | Small | Dog | 70.0 | 130.0 |
| 71.0 | Australian Shepherd | Large | Dog | 40.0 | 65.0 |
| 72.0 | Basset Hound | Medium | Dog | 40.0 | 65.0 |
| 73.0 | Bernese Mountain Dog | Medium | Dog | 70.0 | 115.0 |
| 74.0 | Boston Terrier | Small | Dog | 12.0 | 25.0 |
| 75.0 | Cane Corso | Small | Dog | 90.0 | 120.0 |
| 76.0 | Cavalier King Charles Spaniel | Small | Dog | 13.0 | 18.0 |
| 77.0 | English Setter | Large | Dog | 45.0 | 80.0 |
| 78.0 | Irish Setter | Large | Dog | 60.0 | 70.0 |
| 79.0 | Leonberger | Small | Dog | 100.0 | 170.0 |
| 80.0 | Lhasa Apso | Medium | Dog | 12.0 | 18.0 |
| 81.0 | Pointer | Small | Dog | 45.0 | 75.0 |
| 82.0 | Saluki | Medium | Dog | 40.0 | 65.0 |
| 83.0 | Vizsla | Medium | Dog | 45.0 | 65.0 |
| 84.0 | West Highland White Terrier | Medium | Dog | 15.0 | 20.0 |
| 85.0 | Alaskan Malamute | Medium | Dog | 75.0 | 100.0 |
| 86.0 | American Eskimo Dog | Large | Dog | 15.0 | 35.0 |
| 87.0 | Belgian Malinois | Small | Dog | 55.0 | 75.0 |
| 88.0 | Rottweiler Variant | Large | Dog | 80.0 | 135.0 |
| 89.0 | Somali Variant | Medium | Cat | 6.0 | 12.0 |
| 90.0 | Alaskan Malamute Variant | Large | Dog | 75.0 | 100.0 |
| 91.0 | Border Collie Variant | Medium | Dog | 30.0 | 45.0 |
| 92.0 | Alaskan Malamute Variant Variant | Small | Dog | 75.0 | 100.0 |
| 93.0 | Rottweiler Variant Variant | Large | Dog | 80.0 | 135.0 |
| 94.0 | Somali Variant | Medium | Cat | 6.0 | 12.0 |
| 95.0 | Vizsla Variant | Small | Dog | 45.0 | 65.0 |
| 96.0 | Somali Variant Variant | Large | Cat | 6.0 | 12.0 |
| 97.0 | Norwegian Forest Variant | Medium | Cat | 12.0 | 20.0 |
| 98.0 | Pug Variant | Large | Dog | 14.0 | 18.0 |
| 99.0 | Border Collie Variant Variant | Medium | Dog | 30.0 | 45.0 |
| 100.0 | German Shepherd Variant | Small | Dog | 50.0 | 90.0 |

## Breeds

| BreedID | BreedName | Size | AnimalType |
| --- | --- | --- | --- |
| 1.0 | Abyssinian | Small | Cat |
| 2.0 | American Bobtail | Small | Cat |
| 3.0 | American Curl | Large | Cat |
| 4.0 | American Shorthair | Large | Cat |
| 5.0 | Balinese | Small | Cat |
| 6.0 | Bengal | Large | Cat |
| 7.0 | Birman | Medium | Cat |
| 8.0 | Bombay | Medium | Cat |
| 9.0 | British Shorthair | Medium | Cat |
| 10.0 | Burmese | Medium | Cat |
| 11.0 | Chartreux | Large | Cat |
| 12.0 | Cornish Rex | Large | Cat |
| 13.0 | Devon Rex | Small | Cat |
| 14.0 | Egyptian Mau | Small | Cat |
| 15.0 | Exotic Shorthair | Medium | Cat |
| 16.0 | Himalayan | Large | Cat |
| 17.0 | Japanese Bobtail | Medium | Cat |
| 18.0 | Korat | Medium | Cat |
| 19.0 | Maine Coon | Medium | Cat |
| 20.0 | Manx | Large | Cat |
| 21.0 | Norwegian Forest | Medium | Cat |
| 22.0 | Ocicat | Medium | Cat |
| 23.0 | Oriental | Medium | Cat |
| 24.0 | Persian | Small | Cat |
| 25.0 | Ragdoll | Small | Cat |
| 26.0 | Russian Blue | Large | Cat |
| 27.0 | Scottish Fold | Large | Cat |
| 28.0 | Selkirk Rex | Small | Cat |
| 29.0 | Siamese | Large | Cat |
| 30.0 | Siberian | Large | Cat |
| 31.0 | Singapura | Medium | Cat |
| 32.0 | Somali | Small | Cat |
| 33.0 | Sphynx | Small | Cat |
| 34.0 | Tonkinese | Small | Cat |
| 35.0 | Turkish Angora | Large | Cat |
| 36.0 | Turkish Van | Medium | Cat |
| 37.0 | Beagle | Medium | Dog |
| 38.0 | Border Collie | Small | Dog |
| 39.0 | Boxer | Large | Dog |
| 40.0 | Bulldog | Medium | Dog |
| 41.0 | Chihuahua | Medium | Dog |
| 42.0 | Cocker Spaniel | Small | Dog |
| 43.0 | Dachshund | Small | Dog |
| 44.0 | Dalmatian | Small | Dog |
| 45.0 | Doberman Pinscher | Large | Dog |
| 46.0 | French Bulldog | Large | Dog |
| 47.0 | German Shepherd | Small | Dog |
| 48.0 | Golden Retriever | Large | Dog |
| 49.0 | Great Dane | Large | Dog |
| 50.0 | Greyhound | Large | Dog |
| 51.0 | Labrador Retriever | Large | Dog |
| 52.0 | Maltese | Medium | Dog |
| 53.0 | Newfoundland | Medium | Dog |
| 54.0 | Papillon | Medium | Dog |
| 55.0 | Pekingese | Large | Dog |
| 56.0 | Pomeranian | Small | Dog |
| 57.0 | Poodle | Medium | Dog |
| 58.0 | Pug | Small | Dog |
| 59.0 | Rottweiler | Medium | Dog |
| 60.0 | Saint Bernard | Medium | Dog |
| 61.0 | Samoyed | Medium | Dog |
| 62.0 | Schnauzer | Large | Dog |
| 63.0 | Shiba Inu | Large | Dog |
| 64.0 | Shih Tzu | Medium | Dog |
| 65.0 | Siberian Husky | Large | Dog |
| 66.0 | Staffordshire Terrier | Large | Dog |
| 67.0 | Weimaraner | Large | Dog |
| 68.0 | Whippet | Large | Dog |
| 69.0 | Yorkshire Terrier | Medium | Dog |
| 70.0 | Akita | Small | Dog |
| 71.0 | Australian Shepherd | Large | Dog |
| 72.0 | Basset Hound | Medium | Dog |
| 73.0 | Bernese Mountain Dog | Medium | Dog |
| 74.0 | Boston Terrier | Small | Dog |
| 75.0 | Cane Corso | Small | Dog |
| 76.0 | Cavalier King Charles Spaniel | Small | Dog |
| 77.0 | English Setter | Large | Dog |
| 78.0 | Irish Setter | Large | Dog |
| 79.0 | Leonberger | Small | Dog |
| 80.0 | Lhasa Apso | Medium | Dog |
| 81.0 | Pointer | Small | Dog |
| 82.0 | Saluki | Medium | Dog |
| 83.0 | Vizsla | Medium | Dog |
| 84.0 | West Highland White Terrier | Medium | Dog |
| 85.0 | Alaskan Malamute | Medium | Dog |
| 86.0 | American Eskimo Dog | Large | Dog |
| 87.0 | Belgian Malinois | Small | Dog |
| 88.0 | Rottweiler Variant | Large | Dog |
| 89.0 | Somali Variant | Medium | Cat |
| 90.0 | Alaskan Malamute Variant | Large | Dog |
| 91.0 | Border Collie Variant | Medium | Dog |
| 92.0 | Alaskan Malamute Variant Variant | Small | Dog |
| 93.0 | Rottweiler Variant Variant | Large | Dog |
| 94.0 | Somali Variant | Medium | Cat |
| 95.0 | Vizsla Variant | Small | Dog |
| 96.0 | Somali Variant Variant | Large | Cat |
| 97.0 | Norwegian Forest Variant | Medium | Cat |
| 98.0 | Pug Variant | Large | Dog |
| 99.0 | Border Collie Variant Variant | Medium | Dog |
| 100.0 | German Shepherd Variant | Small | Dog |

## Pets

| PetID | PetName | BreedID | Weight | OwnerID | Column 1 | Column 2 |
| --- | --- | --- | --- | --- | --- | --- |
| 1.0 | Charlie | 59.0 | 21.4 | 59.0 | Barry | Jones |
| 2.0 | Daisy | 75.0 | 7.5 | 211.0 | William | Reid |
| 3.0 | Cleo | 43.0 | 3.6 | 9.0 | Sarah | Koch |
| 4.0 | Rocky | 40.0 | 18.0 | 207.0 | Tammie | Garcia |
| 5.0 | Apollo | 84.0 | 24.4 | 81.0 | Richard | Bowman |
| 6.0 | Misty | 91.0 | 19.6 | 103.0 | David | Hampton |
| 7.0 | Chloe | 7.0 | 4.4 | 69.0 | Kristin | Harris |
| 8.0 | Blue | 98.0 | 40.2 | 17.0 | Beth | Williams |
| 9.0 | Mochi | 99.0 | 17.6 | 55.0 | Natasha | Shields |
| 10.0 | Luna | 49.0 | 35.3 | 146.0 | Patrick | Singh |
| 11.0 | Finn | 64.0 | 17.1 | 225.0 | Emily | Meadows |
| 12.0 | Sasha | 63.0 | 49.5 | 184.0 | Paula | Ellis |
| 13.0 | Hunter | 63.0 | 29.0 | 81.0 | Richard | Bowman |
| 14.0 | Charlie | 47.0 | 3.8 | 55.0 | Natasha | Shields |
| 15.0 | Ginger | 23.0 | 5.1 | 168.0 | Laura | Sanders |
| 16.0 | Luna | 89.0 | 4.2 | 128.0 | Bryan | Kelley |
| 17.0 | Cleo | 34.0 | 3.5 | 102.0 | Cassie | Shelton |
| 18.0 | Peanut | 52.0 | 21.1 | 227.0 | Lisa | White |
| 19.0 | Toby | 61.0 | 14.3 | 165.0 | Hannah | Callahan |
| 20.0 | Hunter | 72.0 | 16.4 | 118.0 | Devin | Clark |
| 21.0 | Chloe | 11.0 | 6.2 | 37.0 | Danny | Gould |
| 22.0 | Zeus | 62.0 | 46.1 | 68.0 | Stephanie | Foley |
| 23.0 | Mochi | 19.0 | 5.0 | 36.0 | Zoe | Bell |
| 24.0 | Tiger | 67.0 | 46.0 | 64.0 | Julie | Thompson |
| 25.0 | Pixie | 26.0 | 7.9 | 191.0 | Nicole | Fox |
| 26.0 | Bandit | 59.0 | 17.9 | 144.0 | Albert | Jackson |
| 27.0 | Prince | 100.0 | 8.6 | 138.0 | Amanda | Howard |
| 28.0 | Misty | 2.0 | 3.6 | 68.0 | Stephanie | Foley |
| 29.0 | Poppy | 54.0 | 11.2 | 192.0 | Luis | Robinson |
| 30.0 | Sammy | 93.0 | 41.6 | 150.0 | Adriana | Jennings |
| 31.0 | Poppy | 1.0 | 2.2 | 110.0 | Vanessa | Reed |
| 32.0 | Sunny | 83.0 | 11.5 | 230.0 | Darlene | Hernandez |
| 33.0 | Nala | 80.0 | 24.1 | 150.0 | Adriana | Jennings |
| 34.0 | Sunny | 58.0 | 2.2 | 103.0 | David | Hampton |
| 35.0 | Buddy | 17.0 | 5.9 | 93.0 | Sarah | Perry |
| 36.0 | Ruby | 34.0 | 2.2 | 57.0 | Vanessa | Sparks |
| 37.0 | Rosie | 7.0 | 5.1 | 36.0 | Zoe | Bell |
| 38.0 | Blue | 6.0 | 7.1 | 131.0 | Tiffany | Brewer |
| 39.0 | Nala | 77.0 | 42.5 | 127.0 | Eric | Adkins |
| 40.0 | Cleo | 90.0 | 27.6 | 24.0 | Andrew | Lee |
| 41.0 | Simba | 46.0 | 43.7 | 194.0 | Amber | Thompson |
| 42.0 | Ruby | 88.0 | 30.5 | 13.0 | Denise | Lucas |
| 43.0 | Luna | 21.0 | 5.1 | 221.0 | Wendy | Henry |
| 44.0 | Prince | 24.0 | 2.0 | 29.0 | Cheryl | Mack |
| 45.0 | Zoe | 83.0 | 20.9 | 40.0 | Joshua | Hayes |
| 46.0 | Rocky | 19.0 | 5.3 | 161.0 | Donald | Edwards |
| 47.0 | Oreo | 75.0 | 3.4 | 41.0 | Alejandro | Vaughan |
| 48.0 | Stella | 67.0 | 32.2 | 203.0 | Sean | Baker |
| 49.0 | Misty | 41.0 | 20.6 | 175.0 | Allison | Levine |
| 50.0 | Cookie | 34.0 | 3.2 | 109.0 | Dawn | Turner |
| 51.0 | Buddy | 16.0 | 7.4 | 153.0 | Nicholas | Velasquez |
| 52.0 | Mango | 71.0 | 29.8 | 17.0 | Beth | Williams |
| 53.0 | Whiskers | 38.0 | 2.4 | 99.0 | Michelle | Rivera |
| 54.0 | Daisy | 26.0 | 6.5 | 98.0 | Benjamin | Harris |
| 55.0 | Bandit | 27.0 | 7.1 | 153.0 | Nicholas | Velasquez |
| 56.0 | Sunny | 2.0 | 3.4 | 120.0 | Stephanie | Ballard |
| 57.0 | Toby | 42.0 | 9.2 | 136.0 | Dennis | Sanchez |
| 58.0 | Sammy | 10.0 | 5.9 | 65.0 | Jennifer | Whitney |
| 59.0 | Toby | 56.0 | 8.2 | 142.0 | Alyssa | Hill |
| 60.0 | Misty | 71.0 | 40.1 | 221.0 | Wendy | Henry |
| 61.0 | Misty | 95.0 | 2.3 | 3.0 | Joseph | Williams |
| 62.0 | Snowball | 22.0 | 4.8 | 175.0 | Allison | Levine |
| 63.0 | Oreo | 11.0 | 7.7 | 185.0 | Kelly | Rosales |
| 64.0 | Luna | 98.0 | 36.3 | 30.0 | Steven | Grant |
| 65.0 | Sasha | 59.0 | 10.7 | 175.0 | Allison | Levine |
| 66.0 | Finn | 60.0 | 19.2 | 227.0 | Lisa | White |
| 67.0 | Sunny | 30.0 | 8.6 | 138.0 | Amanda | Howard |
| 68.0 | Daisy | 28.0 | 2.7 | 193.0 | Michael | Combs |
| 69.0 | Rex | 51.0 | 25.2 | 69.0 | Kristin | Harris |
| 70.0 | Oreo | 21.0 | 4.7 | 197.0 | Ian | Flores |
| 71.0 | Coco | 75.0 | 2.2 | 165.0 | Hannah | Callahan |
| 72.0 | Poppy | 89.0 | 4.1 | 88.0 | Elizabeth | Calderon |
| 73.0 | Zeus | 25.0 | 2.6 | 29.0 | Cheryl | Mack |
| 74.0 | Max | 82.0 | 22.2 | 76.0 | Michael | Farmer |
| 75.0 | Rosie | 43.0 | 4.9 | 112.0 | Tammy | Lewis |
| 76.0 | Mochi | 13.0 | 3.1 | 41.0 | Alejandro | Vaughan |
| 77.0 | Shadow | 51.0 | 25.4 | 117.0 | Lorraine | Allen |
| 78.0 | Hunter | 15.0 | 5.4 | 1.0 | Danielle | Johnson |
| 79.0 | Peanut | 86.0 | 49.4 | 185.0 | Kelly | Rosales |
| 80.0 | Charlie | 74.0 | 3.9 | 225.0 | Emily | Meadows |
| 81.0 | Sasha | 38.0 | 7.2 | 185.0 | Kelly | Rosales |
| 82.0 | Poppy | 95.0 | 7.9 | 68.0 | Stephanie | Foley |
| 83.0 | Leo | 1.0 | 3.5 | 129.0 | Christopher | Dixon |
| 84.0 | Peanut | 16.0 | 8.7 | 196.0 | Stacy | Conner |
| 85.0 | Sammy | 58.0 | 2.7 | 46.0 | Angela | Butler |
| 86.0 | Cleo | 61.0 | 23.9 | 130.0 | Lisa | Reese |
| 87.0 | Luna | 91.0 | 23.1 | 28.0 | Scott | Lowe |
| 88.0 | Mango | 80.0 | 23.1 | 223.0 | Thomas | Hernandez |
| 89.0 | Hunter | 16.0 | 8.0 | 161.0 | Donald | Edwards |
| 90.0 | Tiger | 88.0 | 40.1 | 77.0 | Kathryn | Dorsey |
| 91.0 | Pixie | 28.0 | 2.8 | 216.0 | Kelly | Ruiz |
| 92.0 | Chloe | 63.0 | 26.6 | 164.0 | Veronica | Garcia |
| 93.0 | Snowball | 15.0 | 5.7 | 130.0 | Lisa | Reese |
| 94.0 | Jasper | 67.0 | 25.2 | 156.0 | Vincent | Cooper |
| 95.0 | Thor | 59.0 | 22.7 | 51.0 | Howard | Richards |
| 96.0 | Mango | 19.0 | 4.1 | 40.0 | Joshua | Hayes |
| 97.0 | Mochi | 15.0 | 4.5 | 96.0 | Ashley | Lopez |
| 98.0 | Mochi | 57.0 | 22.8 | 196.0 | Stacy | Conner |
| 99.0 | Charlie | 28.0 | 2.1 | 42.0 | Kelly | Sullivan |
| 100.0 | Mochi | 27.0 | 6.7 | 139.0 | Jose | Donovan |
| 101.0 | Simba | 51.0 | 42.3 | 200.0 | Jessica | Payne |
| 102.0 | Angel | 57.0 | 20.0 | 136.0 | Dennis | Sanchez |
| 103.0 | Rosie | 86.0 | 31.0 | 1.0 | Danielle | Johnson |
| 104.0 | Whiskers | 91.0 | 24.5 | 154.0 | Kevin | King |
| 105.0 | Max | 24.0 | 3.9 | 83.0 | Curtis | Scott |
| 106.0 | Zeus | 18.0 | 5.6 | 126.0 | Jennifer | Smith |
| 107.0 | Charlie | 12.0 | 8.8 | 5.0 | Veronica | Bowman |
| 108.0 | Coco | 41.0 | 13.6 | 29.0 | Cheryl | Mack |
| 109.0 | Bandit | 85.0 | 11.1 | 93.0 | Sarah | Perry |
| 110.0 | Whiskers | 48.0 | 33.6 | 225.0 | Emily | Meadows |
| 111.0 | Sammy | 9.0 | 5.4 | 213.0 | Johnny | Trujillo |
| 112.0 | Max | 14.0 | 3.8 | 207.0 | Tammie | Garcia |
| 113.0 | Buddy | 24.0 | 3.6 | 79.0 | Jason | Hunt |
| 114.0 | Rocky | 9.0 | 4.6 | 62.0 | John | Armstrong |
| 115.0 | Finn | 22.0 | 5.6 | 15.0 | Franklin | Smith |
| 116.0 | Loki | 66.0 | 30.6 | 62.0 | John | Armstrong |
| 117.0 | Tiger | 38.0 | 2.8 | 225.0 | Emily | Meadows |
| 118.0 | Pumpkin | 86.0 | 38.0 | 146.0 | Patrick | Singh |
| 119.0 | Shadow | 69.0 | 19.7 | 21.0 | Joyce | Arnold |
| 120.0 | Angel | 20.0 | 9.0 | 22.0 | Jason | Wright |
| 121.0 | Peanut | 80.0 | 22.0 | 188.0 | Andrea | Davis |
| 122.0 | Charlie | 91.0 | 21.9 | 125.0 | Penny | Wilcox |
| 123.0 | Cookie | 60.0 | 19.3 | 209.0 | Dennis | Mccann |
| 124.0 | Coco | 19.0 | 4.2 | 18.0 | Leslie | Walton |
| 125.0 | Shadow | 78.0 | 50.0 | 195.0 | Gregory | Lang |
| 126.0 | Buddy | 68.0 | 25.6 | 137.0 | Emily | Robinson |
| 127.0 | Poppy | 59.0 | 23.2 | 197.0 | Ian | Flores |
| 128.0 | Stella | 93.0 | 38.9 | 33.0 | Andrew | Gilmore |
| 129.0 | Leo | 37.0 | 13.7 | 33.0 | Andrew | Gilmore |
| 130.0 | Mochi | 92.0 | 9.9 | 169.0 | Cory | Bowers |
| 131.0 | Luna | 8.0 | 5.3 | 122.0 | Tiffany | Moore |
| 132.0 | Luna | 57.0 | 15.5 | 141.0 | Derrick | Mccoy |
| 133.0 | Sammy | 3.0 | 6.4 | 43.0 | James | Wilson |
| 134.0 | Daisy | 67.0 | 44.5 | 68.0 | Stephanie | Foley |
| 135.0 | Rocky | 19.0 | 5.3 | 136.0 | Dennis | Sanchez |
| 136.0 | Sunny | 21.0 | 5.9 | 224.0 | James | Gonzalez |
| 137.0 | Buddy | 5.0 | 2.0 | 156.0 | Vincent | Cooper |
| 138.0 | Leo | 34.0 | 3.2 | 109.0 | Dawn | Turner |
| 139.0 | Poppy | 96.0 | 6.6 | 55.0 | Natasha | Shields |
| 140.0 | Simba | 84.0 | 20.4 | 139.0 | Jose | Donovan |
| 141.0 | Cleo | 65.0 | 45.4 | 194.0 | Amber | Thompson |
| 142.0 | Milo | 68.0 | 34.8 | 187.0 | Mary | Murphy |
| 143.0 | Snowball | 30.0 | 8.6 | 177.0 | Holly | Blair |
| 144.0 | Oreo | 20.0 | 8.3 | 52.0 | Darrell | Barton |
| 145.0 | Bella | 54.0 | 20.9 | 183.0 | Cynthia | Steele |
| 146.0 | Leo | 88.0 | 35.0 | 80.0 | Keith | Wilson |
| 147.0 | Cookie | 21.0 | 4.7 | 103.0 | David | Hampton |
| 148.0 | Tiger | 23.0 | 4.4 | 172.0 | Patrick | Li |
| 149.0 | Pepper | 2.0 | 3.5 | 167.0 | Charles | Norton |
| 150.0 | Sammy | 65.0 | 32.6 | 96.0 | Ashley | Lopez |
| 151.0 | Buddy | 53.0 | 16.5 | 113.0 | Michael | Morales |
| 152.0 | Ruby | 92.0 | 4.3 | 133.0 | Arthur | Harper |
| 153.0 | Leo | 85.0 | 12.8 | 116.0 | Brandy | Robles |
| 154.0 | Max | 54.0 | 12.4 | 31.0 | Phyllis | Manning |
| 155.0 | Blue | 16.0 | 7.9 | 64.0 | Julie | Thompson |
| 156.0 | Mango | 51.0 | 27.1 | 58.0 | Jennifer | Ortiz |
| 157.0 | Whiskers | 38.0 | 7.5 | 17.0 | Beth | Williams |
| 158.0 | Apollo | 92.0 | 8.9 | 87.0 | Mark | Grant |
| 159.0 | Daisy | 98.0 | 42.8 | 6.0 | Leonard | Rios |
| 160.0 | Apollo | 73.0 | 21.6 | 151.0 | Johnathan | Wright |
| 161.0 | Sammy | 40.0 | 14.0 | 142.0 | Alyssa | Hill |
| 162.0 | Finn | 50.0 | 47.2 | 59.0 | Barry | Jones |
| 163.0 | Coco | 54.0 | 24.2 | 151.0 | Johnathan | Wright |
| 164.0 | Ginger | 43.0 | 3.0 | 57.0 | Vanessa | Sparks |
| 165.0 | Sasha | 42.0 | 3.3 | 2.0 | Anna | Baldwin |
| 166.0 | Loki | 27.0 | 6.3 | 19.0 | Justin | Kim |
| 167.0 | Angel | 73.0 | 18.6 | 182.0 | Alan | Gonzalez |
| 168.0 | Charlie | 93.0 | 44.3 | 162.0 | Jennifer | Wallace |
| 169.0 | Sammy | 64.0 | 22.9 | 16.0 | Wesley | Farrell |
| 170.0 | Pixie | 78.0 | 25.3 | 59.0 | Barry | Jones |
| 171.0 | Cookie | 23.0 | 4.9 | 18.0 | Leslie | Walton |
| 172.0 | Poppy | 38.0 | 5.6 | 9.0 | Sarah | Koch |
| 173.0 | Milo | 67.0 | 42.5 | 221.0 | Wendy | Henry |
| 174.0 | Oreo | 14.0 | 2.2 | 85.0 | Deanna | Madden |
| 175.0 | Rex | 80.0 | 19.9 | 19.0 | Justin | Kim |
| 176.0 | Buddy | 1.0 | 2.7 | 132.0 | Katelyn | Good |
| 177.0 | Prince | 61.0 | 18.8 | 61.0 | Steve | Estrada |
| 178.0 | Prince | 49.0 | 33.4 | 72.0 | Daniel | Joseph |
| 179.0 | Shadow | 14.0 | 3.1 | 172.0 | Patrick | Li |
| 180.0 | Charlie | 52.0 | 20.6 | 125.0 | Penny | Wilcox |
| 181.0 | Chloe | 28.0 | 4.0 | 55.0 | Natasha | Shields |
| 182.0 | Cleo | 24.0 | 2.6 | 139.0 | Jose | Donovan |
| 183.0 | Whiskers | 3.0 | 6.8 | 34.0 | Elizabeth | Yates |
| 184.0 | Max | 45.0 | 31.0 | 186.0 | David | Howard |
| 185.0 | Daisy | 86.0 | 33.7 | 226.0 | Michael | Rhodes |
| 186.0 | Pepper | 32.0 | 3.6 | 147.0 | Anthony | Nelson |
| 187.0 | Ginger | 80.0 | 15.5 | 148.0 | Peter | Ward |
| 188.0 | Snowball | 11.0 | 6.3 | 122.0 | Tiffany | Moore |
| 189.0 | Apollo | 86.0 | 31.7 | 63.0 | Dana | Oliver |
| 190.0 | Sammy | 87.0 | 3.0 | 201.0 | Jamie | Lee |
| 191.0 | Rosie | 35.0 | 9.0 | 122.0 | Tiffany | Moore |
| 192.0 | Pumpkin | 67.0 | 48.7 | 207.0 | Tammie | Garcia |
| 193.0 | Chloe | 39.0 | 29.4 | 105.0 | Linda | Arnold |
| 194.0 | Rocky | 12.0 | 6.7 | 49.0 | Margaret | Jones |
| 195.0 | Daisy | 60.0 | 17.5 | 25.0 | Kristin | Graham |
| 196.0 | Nova | 97.0 | 5.2 | 25.0 | Kristin | Graham |
| 197.0 | Milo | 66.0 | 29.7 | 169.0 | Cory | Bowers |
| 198.0 | Buddy | 28.0 | 3.3 | 111.0 | Kelly | Cruz |
| 199.0 | Mango | 74.0 | 8.8 | 91.0 | Amanda | Collins |
| 200.0 | Toby | 47.0 | 8.2 | 109.0 | Dawn | Turner |
| 201.0 | Coco | 29.0 | 7.9 | 106.0 | Steven | Holmes |
| 202.0 | Bandit | 61.0 | 19.0 | 120.0 | Stephanie | Ballard |
| 203.0 | Whiskers | 96.0 | 8.1 | 222.0 | Laura | Brooks |
| 204.0 | Pixie | 8.0 | 4.6 | 187.0 | Mary | Murphy |
| 205.0 | Ruby | 71.0 | 42.2 | 14.0 | Lindsey | Chase |
| 206.0 | Stella | 46.0 | 35.8 | 173.0 | Kaitlin | Gillespie |
| 207.0 | Rocky | 7.0 | 4.2 | 168.0 | Laura | Sanders |
| 208.0 | Tiger | 9.0 | 4.1 | 166.0 | Lisa | Taylor |
| 209.0 | Rocky | 1.0 | 3.6 | 26.0 | Samantha | Hanson |
| 210.0 | Luna | 27.0 | 8.6 | 16.0 | Wesley | Farrell |
| 211.0 | Hunter | 18.0 | 4.4 | 104.0 | Kelly | Evans |
| 212.0 | Thor | 69.0 | 18.5 | 187.0 | Mary | Murphy |
| 213.0 | Sunny | 81.0 | 5.8 | 87.0 | Mark | Grant |
| 214.0 | Max | 69.0 | 14.5 | 205.0 | Lindsey | Martinez |
| 215.0 | Snowball | 27.0 | 6.2 | 221.0 | Wendy | Henry |
| 216.0 | Mochi | 41.0 | 22.6 | 28.0 | Scott | Lowe |
| 217.0 | Stella | 31.0 | 5.4 | 64.0 | Julie | Thompson |
| 218.0 | Rex | 59.0 | 22.8 | 50.0 | Jessica | Munoz |
| 219.0 | Toby | 74.0 | 2.4 | 49.0 | Margaret | Jones |
| 220.0 | Jasper | 35.0 | 6.6 | 138.0 | Amanda | Howard |
| 221.0 | Zeus | 27.0 | 6.9 | 115.0 | Eduardo | Barry |
| 222.0 | Hunter | 19.0 | 5.3 | 36.0 | Zoe | Bell |
| 223.0 | Pixie | 86.0 | 28.5 | 109.0 | Dawn | Turner |
| 224.0 | Blue | 96.0 | 6.6 | 47.0 | Susan | Garcia |
| 225.0 | Nova | 85.0 | 13.6 | 72.0 | Daniel | Joseph |
| 226.0 | Cookie | 2.0 | 3.3 | 119.0 | Jeffrey | Dudley |
| 227.0 | Snowball | 65.0 | 41.7 | 64.0 | Julie | Thompson |
| 228.0 | Snowball | 84.0 | 14.4 | 224.0 | James | Gonzalez |
| 229.0 | Pumpkin | 94.0 | 4.4 | 20.0 | Jennifer | Harris |
| 230.0 | Loki | 7.0 | 5.8 | 114.0 | Laura | Morgan |
| 231.0 | Milo | 24.0 | 2.7 | 207.0 | Tammie | Garcia |
| 232.0 | Mango | 60.0 | 20.4 | 221.0 | Wendy | Henry |
| 233.0 | Daisy | 73.0 | 21.7 | 220.0 | Jessica | Perez |
| 234.0 | Charlie | 15.0 | 4.9 | 141.0 | Derrick | Mccoy |
| 235.0 | Buddy | 24.0 | 3.4 | 26.0 | Samantha | Hanson |
| 236.0 | Simba | 62.0 | 48.8 | 13.0 | Denise | Lucas |
| 237.0 | Ruby | 95.0 | 3.2 | 167.0 | Charles | Norton |
| 238.0 | Oreo | 58.0 | 4.1 | 139.0 | Jose | Donovan |
| 239.0 | Charlie | 54.0 | 23.9 | 215.0 | Tyler | Phillips |
| 240.0 | Charlie | 96.0 | 8.3 | 4.0 | Melissa | Delacruz |
| 241.0 | Jasper | 66.0 | 39.5 | 24.0 | Andrew | Lee |
| 242.0 | Charlie | 96.0 | 6.2 | 193.0 | Michael | Combs |
| 243.0 | Loki | 78.0 | 28.5 | 218.0 | Robert | Hudson |
| 244.0 | Cookie | 76.0 | 8.9 | 61.0 | Steve | Estrada |
| 245.0 | Blue | 19.0 | 5.5 | 43.0 | James | Wilson |
| 246.0 | Toby | 94.0 | 4.7 | 105.0 | Linda | Arnold |
| 247.0 | Sammy | 35.0 | 6.4 | 125.0 | Penny | Wilcox |
| 248.0 | Shadow | 36.0 | 4.1 | 124.0 | Troy | Mays |
| 249.0 | Snowball | 27.0 | 9.0 | 55.0 | Natasha | Shields |
| 250.0 | Simba | 63.0 | 49.9 | 222.0 | Laura | Brooks |
| 251.0 | Mochi | 54.0 | 12.8 | 103.0 | David | Hampton |
| 252.0 | Sunny | 100.0 | 2.2 | 16.0 | Wesley | Farrell |
| 253.0 | Thor | 84.0 | 23.6 | 43.0 | James | Wilson |
| 254.0 | Poppy | 4.0 | 8.4 | 98.0 | Benjamin | Harris |
| 255.0 | Apollo | 53.0 | 17.2 | 1.0 | Danielle | Johnson |
| 256.0 | Cleo | 16.0 | 6.8 | 100.0 | Kelly | Garcia |
| 257.0 | Oreo | 82.0 | 10.1 | 68.0 | Stephanie | Foley |
| 258.0 | Rocky | 79.0 | 7.0 | 201.0 | Jamie | Lee |
| 259.0 | Sammy | 32.0 | 2.8 | 201.0 | Jamie | Lee |
| 260.0 | Whiskers | 44.0 | 8.9 | 117.0 | Lorraine | Allen |
| 261.0 | Jasper | 16.0 | 7.6 | 74.0 | Jessica | Edwards |
| 262.0 | Poppy | 27.0 | 8.5 | 109.0 | Dawn | Turner |
| 263.0 | Pixie | 48.0 | 34.0 | 179.0 | Victor | Bradley |
| 264.0 | Daisy | 47.0 | 8.1 | 188.0 | Andrea | Davis |
| 265.0 | Angel | 29.0 | 8.2 | 201.0 | Jamie | Lee |
| 266.0 | Ruby | 75.0 | 3.2 | 143.0 | Joseph | Sanders |
| 267.0 | Charlie | 40.0 | 13.8 | 170.0 | Diamond | Wright |
| 268.0 | Buddy | 49.0 | 45.1 | 184.0 | Paula | Ellis |
| 269.0 | Toby | 34.0 | 2.8 | 125.0 | Penny | Wilcox |
| 270.0 | Nova | 6.0 | 7.6 | 40.0 | Joshua | Hayes |
| 271.0 | Chloe | 77.0 | 34.1 | 49.0 | Margaret | Jones |
| 272.0 | Loki | 6.0 | 8.7 | 76.0 | Michael | Farmer |
| 273.0 | Zoe | 30.0 | 7.2 | 56.0 | Nicholas | Cantu |
| 274.0 | Jasper | 7.0 | 4.6 | 15.0 | Franklin | Smith |
| 275.0 | Sasha | 5.0 | 3.8 | 149.0 | Dakota | Davis |
| 276.0 | Bandit | 87.0 | 6.3 | 189.0 | Wendy | Gonzalez |
| 277.0 | Coco | 69.0 | 12.8 | 139.0 | Jose | Donovan |
| 278.0 | Rocky | 34.0 | 2.3 | 16.0 | Wesley | Farrell |
| 279.0 | Pumpkin | 36.0 | 5.8 | 192.0 | Luis | Robinson |
| 280.0 | Zoe | 84.0 | 13.7 | 81.0 | Richard | Bowman |
| 281.0 | Stella | 28.0 | 2.6 | 15.0 | Franklin | Smith |
| 282.0 | Zeus | 96.0 | 7.7 | 13.0 | Denise | Lucas |
| 283.0 | Stella | 40.0 | 14.4 | 150.0 | Adriana | Jennings |
| 284.0 | Loki | 78.0 | 34.5 | 123.0 | Wendy | Sanders |
| 285.0 | Nova | 18.0 | 4.2 | 129.0 | Christopher | Dixon |
| 286.0 | Zoe | 75.0 | 5.8 | 219.0 | Kristen | Chan |
| 287.0 | Shadow | 38.0 | 6.4 | 136.0 | Dennis | Sanchez |
| 288.0 | Ruby | 41.0 | 16.9 | 41.0 | Alejandro | Vaughan |
| 289.0 | Pumpkin | 86.0 | 26.1 | 15.0 | Franklin | Smith |
| 290.0 | Stella | 93.0 | 30.7 | 131.0 | Tiffany | Brewer |
| 291.0 | Pixie | 23.0 | 4.3 | 21.0 | Joyce | Arnold |
| 292.0 | Cleo | 63.0 | 41.4 | 218.0 | Robert | Hudson |
| 293.0 | Zeus | 26.0 | 7.9 | 48.0 | Brittney | Carter |
| 294.0 | Charlie | 78.0 | 40.2 | 18.0 | Leslie | Walton |
| 295.0 | Milo | 58.0 | 5.7 | 153.0 | Nicholas | Velasquez |
| 296.0 | Stella | 53.0 | 25.0 | 18.0 | Leslie | Walton |
| 297.0 | Mango | 65.0 | 31.3 | 173.0 | Kaitlin | Gillespie |
| 298.0 | Loki | 71.0 | 43.3 | 221.0 | Wendy | Henry |
| 299.0 | Loki | 65.0 | 43.8 | 61.0 | Steve | Estrada |
| 300.0 | Sunny | 9.0 | 4.8 | 104.0 | Kelly | Evans |
| 301.0 | Rosie | 97.0 | 4.3 | 31.0 | Phyllis | Manning |
| 302.0 | Max | 55.0 | 29.6 | 228.0 | Cheryl | Maxwell |
| 303.0 | Apollo | 12.0 | 6.4 | 146.0 | Patrick | Singh |
| 304.0 | Zeus | 36.0 | 5.4 | 64.0 | Julie | Thompson |
| 305.0 | Peanut | 33.0 | 3.8 | 149.0 | Dakota | Davis |
| 306.0 | Cookie | 76.0 | 6.1 | 153.0 | Nicholas | Velasquez |
| 307.0 | Simba | 69.0 | 15.9 | 11.0 | Brianna | Hall |
| 308.0 | Rocky | 33.0 | 3.6 | 159.0 | Mark | Ellis |
| 309.0 | Bella | 75.0 | 4.4 | 21.0 | Joyce | Arnold |
| 310.0 | Nova | 78.0 | 40.5 | 108.0 | George | Weber |
| 311.0 | Misty | 33.0 | 3.4 | 169.0 | Cory | Bowers |
| 312.0 | Daisy | 41.0 | 22.1 | 150.0 | Adriana | Jennings |
| 313.0 | Pumpkin | 79.0 | 4.5 | 145.0 | Antonio | Mcfarland |
| 314.0 | Nala | 99.0 | 13.9 | 134.0 | Lisa | Dennis |
| 315.0 | Leo | 91.0 | 24.9 | 81.0 | Richard | Bowman |
| 316.0 | Peanut | 86.0 | 26.9 | 67.0 | Jimmy | Medina |
| 317.0 | Stella | 40.0 | 13.0 | 53.0 | Joseph | Anderson |
| 318.0 | Misty | 48.0 | 49.4 | 172.0 | Patrick | Li |
| 319.0 | Rex | 87.0 | 3.1 | 184.0 | Paula | Ellis |
| 320.0 | Milo | 39.0 | 26.3 | 81.0 | Richard | Bowman |
| 321.0 | Whiskers | 69.0 | 21.6 | 62.0 | John | Armstrong |
| 322.0 | Snowball | 32.0 | 3.3 | 68.0 | Stephanie | Foley |
| 323.0 | Charlie | 20.0 | 7.6 | 102.0 | Cassie | Shelton |
| 324.0 | Whiskers | 62.0 | 48.1 | 34.0 | Elizabeth | Yates |
| 325.0 | Bella | 51.0 | 39.1 | 172.0 | Patrick | Li |
| 326.0 | Cookie | 77.0 | 30.5 | 166.0 | Lisa | Taylor |
| 327.0 | Cookie | 58.0 | 5.0 | 77.0 | Kathryn | Dorsey |
| 328.0 | Sunny | 36.0 | 5.8 | 118.0 | Devin | Clark |
| 329.0 | Peanut | 99.0 | 14.0 | 81.0 | Richard | Bowman |
| 330.0 | Shadow | 83.0 | 18.6 | 193.0 | Michael | Combs |
| 331.0 | Snowball | 56.0 | 3.8 | 19.0 | Justin | Kim |
| 332.0 | Bandit | 83.0 | 23.7 | 3.0 | Joseph | Williams |
| 333.0 | Thor | 75.0 | 8.0 | 118.0 | Devin | Clark |
| 334.0 | Simba | 36.0 | 4.8 | 160.0 | Emily | Edwards |
| 335.0 | Blue | 55.0 | 33.3 | 145.0 | Antonio | Mcfarland |
| 336.0 | Angel | 97.0 | 4.5 | 26.0 | Samantha | Hanson |
| 337.0 | Loki | 17.0 | 5.3 | 19.0 | Justin | Kim |
| 338.0 | Snowball | 78.0 | 43.8 | 138.0 | Amanda | Howard |
| 339.0 | Leo | 37.0 | 13.5 | 55.0 | Natasha | Shields |
| 340.0 | Nala | 30.0 | 6.5 | 130.0 | Lisa | Reese |
| 341.0 | Rex | 14.0 | 2.3 | 68.0 | Stephanie | Foley |
| 342.0 | Poppy | 86.0 | 42.0 | 34.0 | Elizabeth | Yates |
| 343.0 | Pixie | 45.0 | 26.9 | 90.0 | Henry | Schwartz |
| 344.0 | Cookie | 5.0 | 3.7 | 226.0 | Michael | Rhodes |
| 345.0 | Coco | 88.0 | 41.5 | 18.0 | Leslie | Walton |
| 346.0 | Whiskers | 83.0 | 14.3 | 226.0 | Michael | Rhodes |
| 347.0 | Prince | 79.0 | 5.6 | 63.0 | Dana | Oliver |
| 348.0 | Pixie | 23.0 | 5.9 | 95.0 | Danielle | Dean |
| 349.0 | Simba | 48.0 | 42.2 | 73.0 | Shawn | Jacobs |
| 350.0 | Max | 76.0 | 4.1 | 41.0 | Alejandro | Vaughan |
| 351.0 | Ginger | 67.0 | 32.4 | 113.0 | Michael | Morales |
| 352.0 | Snowball | 46.0 | 35.8 | 214.0 | Gabrielle | Olson |
| 353.0 | Ginger | 52.0 | 20.2 | 140.0 | Gary | Norton |
| 354.0 | Leo | 100.0 | 8.7 | 181.0 | Nathan | Shaw |
| 355.0 | Prince | 83.0 | 17.7 | 78.0 | Eric | Collins |
| 356.0 | Cleo | 24.0 | 2.9 | 157.0 | Carlos | Williams |
| 357.0 | Oreo | 95.0 | 9.8 | 207.0 | Tammie | Garcia |
| 358.0 | Max | 60.0 | 15.0 | 168.0 | Laura | Sanders |
| 359.0 | Rex | 85.0 | 12.4 | 136.0 | Dennis | Sanchez |
| 360.0 | Loki | 95.0 | 5.1 | 3.0 | Joseph | Williams |
| 361.0 | Milo | 24.0 | 2.2 | 171.0 | Sean | Smith |
| 362.0 | Max | 14.0 | 3.5 | 210.0 | Jenna | Powell |
| 363.0 | Leo | 17.0 | 4.5 | 142.0 | Alyssa | Hill |
| 364.0 | Apollo | 25.0 | 2.2 | 77.0 | Kathryn | Dorsey |
| 365.0 | Blue | 63.0 | 36.6 | 170.0 | Diamond | Wright |
| 366.0 | Rosie | 35.0 | 7.2 | 27.0 | Elizabeth | Gray |
| 367.0 | Pixie | 81.0 | 8.8 | 225.0 | Emily | Meadows |
| 368.0 | Prince | 98.0 | 28.6 | 35.0 | Hunter | Green |
| 369.0 | Bandit | 42.0 | 5.4 | 68.0 | Stephanie | Foley |
| 370.0 | Pumpkin | 71.0 | 40.1 | 30.0 | Steven | Grant |
| 371.0 | Toby | 68.0 | 34.1 | 228.0 | Cheryl | Maxwell |
| 372.0 | Cleo | 16.0 | 8.2 | 28.0 | Scott | Lowe |
| 373.0 | Hunter | 46.0 | 43.7 | 191.0 | Nicole | Fox |
| 374.0 | Finn | 43.0 | 4.7 | 142.0 | Alyssa | Hill |
| 375.0 | Rocky | 91.0 | 24.4 | 40.0 | Joshua | Hayes |
| 376.0 | Rosie | 76.0 | 3.0 | 70.0 | Amber | Lindsey |
| 377.0 | Charlie | 78.0 | 41.1 | 73.0 | Shawn | Jacobs |
| 378.0 | Jasper | 37.0 | 24.5 | 155.0 | Deborah | Williams |
| 379.0 | Mochi | 97.0 | 4.5 | 54.0 | Stacey | Holland |
| 380.0 | Blue | 49.0 | 40.5 | 184.0 | Paula | Ellis |
| 381.0 | Ginger | 93.0 | 25.4 | 88.0 | Elizabeth | Calderon |
| 382.0 | Ginger | 20.0 | 8.0 | 53.0 | Joseph | Anderson |
| 383.0 | Zoe | 30.0 | 8.9 | 176.0 | William | Fuller |
| 384.0 | Ruby | 79.0 | 6.5 | 163.0 | Julia | Cannon |
| 385.0 | Pumpkin | 70.0 | 3.2 | 219.0 | Kristen | Chan |
| 386.0 | Pumpkin | 57.0 | 22.6 | 68.0 | Stephanie | Foley |
| 387.0 | Bella | 91.0 | 24.6 | 130.0 | Lisa | Reese |
| 388.0 | Mochi | 59.0 | 24.3 | 126.0 | Jennifer | Smith |
| 389.0 | Finn | 42.0 | 6.0 | 65.0 | Jennifer | Whitney |
| 390.0 | Rex | 11.0 | 6.4 | 217.0 | Thomas | Delacruz |
| 391.0 | Cleo | 97.0 | 4.7 | 14.0 | Lindsey | Chase |
| 392.0 | Mochi | 35.0 | 7.2 | 24.0 | Andrew | Lee |
| 393.0 | Zoe | 78.0 | 39.6 | 163.0 | Julia | Cannon |
| 394.0 | Sasha | 3.0 | 8.5 | 109.0 | Dawn | Turner |
| 395.0 | Chloe | 88.0 | 41.4 | 213.0 | Johnny | Trujillo |
| 396.0 | Peanut | 79.0 | 5.7 | 71.0 | Julie | Alvarez |
| 397.0 | Ruby | 59.0 | 21.1 | 12.0 | Selena | Duncan |
| 398.0 | Thor | 90.0 | 34.0 | 1.0 | Danielle | Johnson |
| 399.0 | Coco | 49.0 | 28.9 | 86.0 | Debbie | Williams |
| 400.0 | Rosie | 94.0 | 4.6 | 198.0 | Daisy | Mccarty |
| 401.0 | Luna | 83.0 | 21.4 | 34.0 | Elizabeth | Yates |
| 402.0 | Snowball | 16.0 | 6.7 | 164.0 | Veronica | Garcia |
| 403.0 | Bella | 97.0 | 4.8 | 68.0 | Stephanie | Foley |
| 404.0 | Pepper | 92.0 | 6.3 | 42.0 | Kelly | Sullivan |
| 405.0 | Milo | 4.0 | 6.0 | 190.0 | Jason | Lopez |
| 406.0 | Cleo | 72.0 | 11.0 | 114.0 | Laura | Morgan |
| 407.0 | Cookie | 60.0 | 18.9 | 142.0 | Alyssa | Hill |
| 408.0 | Toby | 24.0 | 3.8 | 181.0 | Nathan | Shaw |
| 409.0 | Jasper | 62.0 | 31.9 | 110.0 | Vanessa | Reed |
| 410.0 | Sunny | 22.0 | 6.0 | 144.0 | Albert | Jackson |
| 411.0 | Mango | 91.0 | 14.0 | 3.0 | Joseph | Williams |
| 412.0 | Leo | 90.0 | 49.9 | 29.0 | Cheryl | Mack |
| 413.0 | Leo | 8.0 | 5.8 | 20.0 | Jennifer | Harris |
| 414.0 | Jasper | 36.0 | 4.3 | 227.0 | Lisa | White |
| 415.0 | Sasha | 64.0 | 19.5 | 177.0 | Holly | Blair |
| 416.0 | Jasper | 67.0 | 34.8 | 39.0 | Melissa | Short |
| 417.0 | Stella | 68.0 | 49.3 | 140.0 | Gary | Norton |
| 418.0 | Ruby | 48.0 | 35.8 | 10.0 | Rodney | Lewis |
| 419.0 | Sammy | 74.0 | 3.3 | 214.0 | Gabrielle | Olson |
| 420.0 | Sasha | 15.0 | 4.6 | 95.0 |  |  |
| 421.0 | Bandit | 49.0 | 49.6 | 150.0 |  |  |
| 422.0 | Mochi | 47.0 | 5.9 | 142.0 |  |  |
| 423.0 | Angel | 64.0 | 15.9 | 38.0 |  |  |
| 424.0 | Oreo | 72.0 | 22.1 | 111.0 |  |  |
| 425.0 | Peanut | 59.0 | 15.8 | 33.0 |  |  |
| 426.0 | Mochi | 38.0 | 3.0 | 11.0 |  |  |
| 427.0 | Coco | 31.0 | 5.0 | 79.0 |  |  |
| 428.0 | Leo | 87.0 | 9.8 | 94.0 |  |  |
| 429.0 | Angel | 89.0 | 4.7 | 204.0 |  |  |
| 430.0 | Zoe | 60.0 | 14.6 | 221.0 |  |  |
| 431.0 | Thor | 91.0 | 14.4 | 11.0 |  |  |
| 432.0 | Charlie | 55.0 | 30.5 | 92.0 |  |  |
| 433.0 | Cleo | 91.0 | 11.0 | 54.0 |  |  |
| 434.0 | Misty | 93.0 | 34.3 | 175.0 |  |  |
| 435.0 | Hunter | 75.0 | 6.2 | 64.0 |  |  |
| 436.0 | Apollo | 42.0 | 6.5 | 171.0 |  |  |
| 437.0 | Ruby | 94.0 | 5.8 | 27.0 |  |  |
| 438.0 | Toby | 67.0 | 43.8 | 91.0 |  |  |
| 439.0 | Daisy | 85.0 | 10.6 | 200.0 |  |  |
| 440.0 | Shadow | 3.0 | 6.8 | 144.0 |  |  |
| 441.0 | Whiskers | 56.0 | 5.7 | 227.0 |  |  |
| 442.0 | Peanut | 91.0 | 11.1 | 224.0 |  |  |
| 443.0 | Sammy | 30.0 | 8.4 | 105.0 |  |  |
| 444.0 | Pepper | 80.0 | 21.8 | 159.0 |  |  |
| 445.0 | Cleo | 28.0 | 2.1 | 192.0 |  |  |
| 446.0 | Snowball | 62.0 | 28.2 | 40.0 |  |  |
| 447.0 | Mochi | 97.0 | 5.7 | 61.0 |  |  |
| 448.0 | Cleo | 64.0 | 19.6 | 222.0 |  |  |
| 449.0 | Snowball | 55.0 | 42.2 | 42.0 |  |  |
| 450.0 | Shadow | 9.0 | 4.2 | 205.0 |  |  |
| 451.0 | Daisy | 33.0 | 2.3 | 208.0 |  |  |
| 452.0 | Loki | 88.0 | 31.5 | 46.0 |  |  |
| 453.0 | Snowball | 17.0 | 4.2 | 226.0 |  |  |
| 454.0 | Simba | 68.0 | 49.2 | 106.0 |  |  |
| 455.0 | Nala | 53.0 | 17.6 | 7.0 |  |  |
| 456.0 | Sammy | 5.0 | 2.5 | 46.0 |  |  |
| 457.0 | Tiger | 47.0 | 9.5 | 189.0 |  |  |
| 458.0 | Daisy | 19.0 | 5.4 | 86.0 |  |  |
| 459.0 | Charlie | 25.0 | 3.0 | 201.0 |  |  |
| 460.0 | Jasper | 20.0 | 6.1 | 106.0 |  |  |
| 461.0 | Misty | 44.0 | 7.3 | 206.0 |  |  |
| 462.0 | Max | 21.0 | 4.6 | 172.0 |  |  |
| 463.0 | Angel | 83.0 | 20.5 | 222.0 |  |  |
| 464.0 | Buddy | 78.0 | 43.0 | 189.0 |  |  |
| 465.0 | Rosie | 82.0 | 19.7 | 208.0 |  |  |
| 466.0 | Stella | 42.0 | 9.7 | 64.0 |  |  |
| 467.0 | Sunny | 64.0 | 12.9 | 69.0 |  |  |
| 468.0 | Blue | 99.0 | 14.7 | 41.0 |  |  |
| 469.0 | Charlie | 83.0 | 13.9 | 202.0 |  |  |
| 470.0 | Rex | 63.0 | 46.5 | 180.0 |  |  |
| 471.0 | Finn | 45.0 | 25.4 | 28.0 |  |  |
| 472.0 | Sammy | 24.0 | 2.1 | 98.0 |  |  |
| 473.0 | Cleo | 59.0 | 23.2 | 224.0 |  |  |
| 474.0 | Finn | 99.0 | 19.0 | 10.0 |  |  |
| 475.0 | Sasha | 76.0 | 5.7 | 220.0 |  |  |
| 476.0 | Coco | 100.0 | 6.5 | 121.0 |  |  |
| 477.0 | Pixie | 88.0 | 34.2 | 57.0 |  |  |
| 478.0 | Oreo | 75.0 | 2.6 | 52.0 |  |  |
| 479.0 | Nala | 58.0 | 4.9 | 210.0 |  |  |
| 480.0 | Nala | 79.0 | 6.5 | 118.0 |  |  |
| 481.0 | Finn | 25.0 | 3.0 | 90.0 |  |  |
| 482.0 | Poppy | 53.0 | 19.2 | 79.0 |  |  |
| 483.0 | Ginger | 74.0 | 10.0 | 211.0 |  |  |
| 484.0 | Ginger | 63.0 | 34.2 | 204.0 |  |  |
| 485.0 | Snowball | 93.0 | 32.9 | 224.0 |  |  |
| 486.0 | Apollo | 76.0 | 5.5 | 59.0 |  |  |
| 487.0 | Hunter | 83.0 | 11.3 | 58.0 |  |  |
| 488.0 | Misty | 6.0 | 8.1 | 7.0 |  |  |
| 489.0 | Pumpkin | 43.0 | 9.7 | 169.0 |  |  |
| 490.0 | Bella | 31.0 | 4.3 | 50.0 |  |  |
| 491.0 | Rex | 46.0 | 26.8 | 103.0 |  |  |
| 492.0 | Ginger | 34.0 | 3.9 | 85.0 |  |  |
| 493.0 | Snowball | 39.0 | 45.7 | 72.0 |  |  |
| 494.0 | Zoe | 23.0 | 4.8 | 222.0 |  |  |
| 495.0 | Zoe | 53.0 | 10.1 | 18.0 |  |  |
| 496.0 | Rocky | 85.0 | 22.9 | 198.0 |  |  |
| 497.0 | Daisy | 95.0 | 8.0 | 72.0 |  |  |
| 498.0 | Loki | 89.0 | 5.7 | 90.0 |  |  |
| 499.0 | Milo | 82.0 | 24.9 | 165.0 |  |  |
| 500.0 | Leo | 83.0 | 15.5 | 131.0 |  |  |
| 501.0 | Mango | 63.0 | 26.8 | 103.0 |  |  |
| 502.0 | Stella | 34.0 | 2.4 | 174.0 |  |  |
| 503.0 | Milo | 31.0 | 4.5 | 216.0 |  |  |
| 504.0 | Misty | 65.0 | 49.2 | 138.0 |  |  |
| 505.0 | Loki | 23.0 | 5.0 | 85.0 |  |  |
| 506.0 | Buddy | 23.0 | 5.6 | 8.0 |  |  |
| 507.0 | Finn | 77.0 | 26.1 | 30.0 |  |  |
| 508.0 | Snowball | 99.0 | 18.8 | 225.0 |  |  |
| 509.0 | Shadow | 36.0 | 4.3 | 67.0 |  |  |
| 510.0 | Chloe | 17.0 | 4.3 | 46.0 |  |  |
| 511.0 | Snowball | 57.0 | 22.3 | 149.0 |  |  |
| 512.0 | Stella | 41.0 | 23.7 | 68.0 |  |  |
| 513.0 | Ruby | 99.0 | 16.4 | 10.0 |  |  |
| 514.0 | Snowball | 47.0 | 7.5 | 28.0 |  |  |
| 515.0 | Buddy | 59.0 | 12.7 | 153.0 |  |  |
| 516.0 | Hunter | 82.0 | 12.4 | 112.0 |  |  |
| 517.0 | Tiger | 70.0 | 6.8 | 89.0 |  |  |
| 518.0 | Pepper | 43.0 | 6.2 | 187.0 |  |  |
| 519.0 | Snowball | 86.0 | 28.9 | 202.0 |  |  |
| 520.0 | Buddy | 73.0 | 19.5 | 81.0 |  |  |
| 521.0 | Simba | 41.0 | 20.9 | 112.0 |  |  |
| 522.0 | Poppy | 87.0 | 7.5 | 156.0 |  |  |
| 523.0 | Luna | 9.0 | 5.1 | 131.0 |  |  |
| 524.0 | Stella | 80.0 | 21.9 | 30.0 |  |  |
| 525.0 | Bandit | 84.0 | 14.9 | 99.0 |  |  |
| 526.0 | Cleo | 53.0 | 17.9 | 148.0 |  |  |
| 527.0 | Max | 94.0 | 5.1 | 49.0 |  |  |
| 528.0 | Bandit | 38.0 | 6.5 | 66.0 |  |  |
| 529.0 | Rex | 12.0 | 6.4 | 12.0 |  |  |
| 530.0 | Stella | 81.0 | 9.6 | 182.0 |  |  |
| 531.0 | Zoe | 58.0 | 3.1 | 112.0 |  |  |
| 532.0 | Sasha | 76.0 | 5.0 | 1.0 |  |  |
| 533.0 | Leo | 90.0 | 39.4 | 134.0 |  |  |
| 534.0 | Thor | 73.0 | 11.6 | 207.0 |  |  |
| 535.0 | Sunny | 26.0 | 6.6 | 138.0 |  |  |
| 536.0 | Misty | 98.0 | 34.0 | 176.0 |  |  |
| 537.0 | Misty | 75.0 | 5.1 | 185.0 |  |  |
| 538.0 | Apollo | 56.0 | 2.6 | 190.0 |  |  |
| 539.0 | Snowball | 2.0 | 2.6 | 189.0 |  |  |
| 540.0 | Tiger | 12.0 | 8.9 | 172.0 |  |  |
| 541.0 | Sasha | 25.0 | 3.0 | 51.0 |  |  |
| 542.0 | Milo | 14.0 | 2.9 | 94.0 |  |  |
| 543.0 | Stella | 77.0 | 49.3 | 111.0 |  |  |
| 544.0 | Coco | 56.0 | 6.2 | 18.0 |  |  |
| 545.0 | Ginger | 5.0 | 3.1 | 171.0 |  |  |
| 546.0 | Zoe | 25.0 | 2.6 | 85.0 |  |  |
| 547.0 | Whiskers | 76.0 | 8.8 | 160.0 |  |  |
| 548.0 | Max | 24.0 | 3.3 | 81.0 |  |  |
| 549.0 | Mango | 21.0 | 5.0 | 170.0 |  |  |
| 550.0 | Pumpkin | 79.0 | 8.6 | 218.0 |  |  |
| 551.0 | Apollo | 92.0 | 3.6 | 32.0 |  |  |
| 552.0 | Loki | 55.0 | 37.0 | 185.0 |  |  |
| 553.0 | Cleo | 13.0 | 2.9 | 77.0 |  |  |
| 554.0 | Tiger | 5.0 | 3.6 | 130.0 |  |  |
| 555.0 | Mango | 68.0 | 35.5 | 80.0 |  |  |
| 556.0 | Oreo | 82.0 | 22.0 | 171.0 |  |  |
| 557.0 | Tiger | 59.0 | 10.8 | 105.0 |  |  |
| 558.0 | Leo | 7.0 | 5.8 | 84.0 |  |  |
| 559.0 | Leo | 46.0 | 36.0 | 104.0 |  |  |
| 560.0 | Peanut | 86.0 | 27.3 | 179.0 |  |  |
| 561.0 | Jasper | 85.0 | 22.7 | 76.0 |  |  |
| 562.0 | Loki | 34.0 | 2.3 | 142.0 |  |  |
| 563.0 | Blue | 44.0 | 5.8 | 33.0 |  |  |
| 564.0 | Cookie | 81.0 | 6.2 | 50.0 |  |  |
| 565.0 | Zoe | 76.0 | 3.6 | 108.0 |  |  |
| 566.0 | Oreo | 64.0 | 22.4 | 171.0 |  |  |
| 567.0 | Charlie | 19.0 | 4.3 | 98.0 |  |  |
| 568.0 | Blue | 68.0 | 43.7 | 174.0 |  |  |
| 569.0 | Sunny | 42.0 | 5.9 | 192.0 |  |  |
| 570.0 | Milo | 76.0 | 9.2 | 45.0 |  |  |
| 571.0 | Mochi | 93.0 | 30.8 | 158.0 |  |  |
| 572.0 | Snowball | 91.0 | 13.4 | 146.0 |  |  |
| 573.0 | Pepper | 100.0 | 6.6 | 78.0 |  |  |
| 574.0 | Rosie | 93.0 | 47.2 | 104.0 |  |  |
| 575.0 | Poppy | 82.0 | 22.4 | 141.0 |  |  |
| 576.0 | Misty | 24.0 | 3.5 | 214.0 |  |  |
| 577.0 | Snowball | 62.0 | 26.4 | 1.0 |  |  |
| 578.0 | Whiskers | 35.0 | 7.6 | 78.0 |  |  |
| 579.0 | Nala | 29.0 | 7.0 | 74.0 |  |  |
| 580.0 | Mango | 40.0 | 21.1 | 54.0 |  |  |
| 581.0 | Hunter | 100.0 | 6.3 | 111.0 |  |  |
| 582.0 | Jasper | 97.0 | 5.3 | 202.0 |  |  |
| 583.0 | Sunny | 7.0 | 4.2 | 149.0 |  |  |
| 584.0 | Misty | 70.0 | 3.8 | 156.0 |  |  |
| 585.0 | Mochi | 50.0 | 27.7 | 168.0 |  |  |
| 586.0 | Mochi | 26.0 | 8.4 | 83.0 |  |  |
| 587.0 | Luna | 88.0 | 25.0 | 120.0 |  |  |
| 588.0 | Finn | 12.0 | 7.4 | 114.0 |  |  |
| 589.0 | Rosie | 88.0 | 27.2 | 114.0 |  |  |
| 590.0 | Blue | 84.0 | 21.8 | 173.0 |  |  |
| 591.0 | Oreo | 1.0 | 3.4 | 55.0 |  |  |
| 592.0 | Rex | 76.0 | 6.2 | 131.0 |  |  |
| 593.0 | Ginger | 43.0 | 7.9 | 122.0 |  |  |
| 594.0 | Chloe | 84.0 | 19.3 | 204.0 |  |  |
| 595.0 | Rocky | 54.0 | 23.3 | 204.0 |  |  |
| 596.0 | Thor | 74.0 | 7.6 | 189.0 |  |  |
| 597.0 | Loki | 96.0 | 6.7 | 44.0 |  |  |
| 598.0 | Pixie | 49.0 | 30.9 | 169.0 |  |  |
| 599.0 | Peanut | 7.0 | 5.6 | 22.0 |  |  |
| 600.0 | Misty | 23.0 | 5.3 | 73.0 |  |  |

## Pivot Table 1

*No data in this sheet.*

## Owners

| OwnerID | FirstName | LastName | Email | Birthdate | Address | City | Zipcode |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1.0 | Danielle | Johnson | danielle.johnson@example.com | 1963-06-14 | 21819 Johnson Course | East William | 3979.0 |
| 2.0 | Anna | Baldwin | anna.baldwin@example.com | 1992-06-17 | 79402 Peterson Drives Apt. 511 | Davisstad | 79632.0 |
| 3.0 | Joseph | Williams | joseph.williams@example.com | 1976-01-01 | 1849 Ray Squares | North Donnaport | 10959.0 |
| 4.0 | Melissa | Delacruz | melissa.delacruz@example.com | 1970-08-09 | 5255 Elizabeth Squares Apt. 928 | East Steven | 35883.0 |
| 5.0 | Veronica | Bowman | veronica.bowman@example.com | 1982-08-21 | 503 Linda Locks | Carlshire | 94599.0 |
| 6.0 | Leonard | Rios | leonard.rios@example.com | 1971-08-29 | 42388 Burgess Meadow Suite 532 | Daviston | 14872.0 |
| 7.0 | Eric | Moore | eric.moore@example.com | 1991-01-16 | 166 Rice Plaza Apt. 184 | Danielchester | 21231.0 |
| 8.0 | Shawn | Mckay | shawn.mckay@example.com | 2004-05-03 | 281 Skinner Parkways Apt. 252 | New Mariotown | 15163.0 |
| 9.0 | Sarah | Koch | sarah.koch@example.com | 2001-05-01 | 03911 Cabrera Trace Apt. 278 | West Allison | 80008.0 |
| 10.0 | Rodney | Lewis | rodney.lewis@example.com | 1981-06-08 | 465 Lam Mission | East Jeffreymouth | 3258.0 |
| 11.0 | Brianna | Hall | brianna.hall@example.com | 1959-09-21 | 03105 Willie Harbors | Lewisberg | 95312.0 |
| 12.0 | Selena | Duncan | selena.duncan@example.com | 1976-11-25 | 6311 Gomez Loop | Shieldston | 88760.0 |
| 13.0 | Denise | Lucas | denise.lucas@example.com | 1948-11-10 | 513 James Mission Apt. 624 | Wrightland | 58583.0 |
| 14.0 | Lindsey | Chase | lindsey.chase@example.com | 1951-05-26 | 801 Gabriel Oval | Lewisfurt | 8186.0 |
| 15.0 | Franklin | Smith | franklin.smith@example.com | 1971-04-21 | 4687 James Forge Apt. 980 | Brianshire | 62994.0 |
| 16.0 | Wesley | Farrell | wesley.farrell@example.com | 1955-06-14 | 121 Emma Freeway | Wilsonshire | 32772.0 |
| 17.0 | Beth | Williams | beth.williams@example.com | 1950-04-25 | 998 Donovan Ford Suite 346 | Lake Debbie | 60430.0 |
| 18.0 | Leslie | Walton | leslie.walton@example.com | 1949-09-03 | 9911 William Curve | Nicolebury | 48935.0 |
| 19.0 | Justin | Kim | justin.kim@example.com | 1981-09-13 | 808 Huynh Cove Apt. 411 | West Juan | 28108.0 |
| 20.0 | Jennifer | Harris | jennifer.harris@example.com | 1987-11-24 | 740 Cynthia Village Suite 005 | Lake Tina | 21679.0 |
| 21.0 | Joyce | Arnold | joyce.arnold@example.com | 1973-11-03 | 12805 Russell Canyon | Michaelton | 47399.0 |
| 22.0 | Jason | Wright | jason.wright@example.com | 1951-09-24 | 692 Michelle Union Apt. 602 | Kimberlychester | 88307.0 |
| 23.0 | Michelle | Cochran | michelle.cochran@example.com | 1962-11-22 | 160 Walker Viaduct | Baileybury | 29720.0 |
| 24.0 | Andrew | Lee | andrew.lee@example.com | 1967-01-27 | 45868 Crosby Crescent Suite 294 | North Candacestad | 95992.0 |
| 25.0 | Kristin | Graham | kristin.graham@example.com | 1979-07-16 | 9340 Smith Valley | West Ryan | 87563.0 |
| 26.0 | Samantha | Hanson | samantha.hanson@example.com | 1989-11-17 | 484 Nguyen Square | Angelaborough | 55609.0 |
| 27.0 | Elizabeth | Gray | elizabeth.gray@example.com | 1995-08-24 | 946 Kevin Fords | Floydmouth | 61447.0 |
| 28.0 | Scott | Lowe | scott.lowe@example.com | 1979-07-10 | 214 Davis Terrace Apt. 433 | North Brandon | 62778.0 |
| 29.0 | Cheryl | Mack | cheryl.mack@example.com | 1975-09-23 | 936 Ross Drive Apt. 163 | Port Susan | 68390.0 |
| 30.0 | Steven | Grant | steven.grant@example.com | 2007-03-03 | 2788 Dodson Mills | Rivasside | 58947.0 |
| 31.0 | Phyllis | Manning | phyllis.manning@example.com | 1977-01-14 | 3487 Joshua Club Suite 345 | Patricialand | 18637.0 |
| 32.0 | Edward | Reyes | edward.reyes@example.com | 1955-02-18 | 66587 Brown Village | Priceshire | 91664.0 |
| 33.0 | Andrew | Gilmore | andrew.gilmore@example.com | 1983-11-29 | 0546 Medina Street Apt. 734 | Tuckerfurt | 44558.0 |
| 34.0 | Elizabeth | Yates | elizabeth.yates@example.com | 1994-01-06 | 2980 Vargas Shore | North Dawnberg | 61016.0 |
| 35.0 | Hunter | Green | hunter.green@example.com | 1967-01-05 | 5564 King Common | Smithside | 7327.0 |
| 36.0 | Zoe | Bell | zoe.bell@example.com | 1988-12-23 | 003 Mary Road | East David | 88248.0 |
| 37.0 | Danny | Gould | danny.gould@example.com | 1976-05-19 | 2991 Tami Coves Apt. 496 | Davidborough | 10462.0 |
| 38.0 | Brittany | Rivas | brittany.rivas@example.com | 1961-04-06 | 491 Michael Meadow | Caseymouth | 2159.0 |
| 39.0 | Melissa | Short | melissa.short@example.com | 1951-12-02 | 7262 Gilbert Plain Suite 769 | Marcusbury | 11860.0 |
| 40.0 | Joshua | Hayes | joshua.hayes@example.com | 1995-10-22 | 965 Troy Islands Apt. 735 | Matthewview | 73349.0 |
| 41.0 | Alejandro | Vaughan | alejandro.vaughan@example.com | 1950-07-24 | 678 Hannah Rue | Westtown | 12697.0 |
| 42.0 | Kelly | Sullivan | kelly.sullivan@example.com | 1961-04-17 | 957 Coleman Summit Suite 574 | Johnville | 95041.0 |
| 43.0 | James | Wilson | james.wilson@example.com | 1981-03-14 | 37498 Hooper Village | West Jeremy | 24020.0 |
| 44.0 | Kevin | Erickson | kevin.erickson@example.com | 1953-05-08 | 08427 Monique Ports Suite 777 | Jackton | 33593.0 |
| 45.0 | Shelley | Woods | shelley.woods@example.com | 2000-09-05 | 7190 Edward Port | Christopherbury | 16026.0 |
| 46.0 | Angela | Butler | angela.butler@example.com | 1985-04-20 | 677 Dalton Meadow | Ashleyton | 80406.0 |
| 47.0 | Susan | Garcia | susan.garcia@example.com | 1996-08-21 | 341 John Plaza | East Aaronmouth | 90858.0 |
| 48.0 | Brittney | Carter | brittney.carter@example.com | 1960-06-27 | 471 Sandra Turnpike Apt. 618 | Lake Edward | 35317.0 |
| 49.0 | Margaret | Jones | margaret.jones@example.com | 1956-01-11 | 947 Taylor Hollow Suite 488 | Kimton | 57127.0 |
| 50.0 | Jessica | Munoz | jessica.munoz@example.com | 1946-06-30 | 99049 Kathryn Extensions | Stonemouth | 36959.0 |
| 51.0 | Howard | Richards | howard.richards@example.com | 1987-12-07 | 75655 Mia Isle Suite 746 | South Christopherview | 42873.0 |
| 52.0 | Darrell | Barton | darrell.barton@example.com | 2003-08-05 | 876 Jacob Lake | Garrettton | 27181.0 |
| 53.0 | Joseph | Anderson | joseph.anderson@example.com | 1964-05-03 | 710 Jennifer Inlet Apt. 861 | Port Robin | 60983.0 |
| 54.0 | Stacey | Holland | stacey.holland@example.com | 1955-03-19 | 484 Davenport Mountains Apt. 782 | Leehaven | 98319.0 |
| 55.0 | Natasha | Shields | natasha.shields@example.com | 1963-07-15 | 8404 Monroe Prairie Suite 278 | Reedside | 71729.0 |
| 56.0 | Nicholas | Cantu | nicholas.cantu@example.com | 2003-11-30 | 396 Melissa Loop | West Juliefurt | 51105.0 |
| 57.0 | Vanessa | Sparks | vanessa.sparks@example.com | 1989-02-08 | 0289 Kane Well | Garciamouth | 2512.0 |
| 58.0 | Jennifer | Ortiz | jennifer.ortiz@example.com | 1989-04-17 | 74596 Melissa Walk | Finleyfort | 71413.0 |
| 59.0 | Barry | Jones | barry.jones@example.com | 1987-09-08 | 16117 Heather Burgs Apt. 504 | Nicholasberg | 32508.0 |
| 60.0 | Amanda | Knight | amanda.knight@example.com | 1998-09-01 | 21969 Tyler Prairie | East Steven | 33790.0 |
| 61.0 | Steve | Estrada | steve.estrada@example.com | 2005-11-27 | 8217 Huerta Hills Suite 474 | South Melissa | 14480.0 |
| 62.0 | John | Armstrong | john.armstrong@example.com | 1983-11-08 | 406 Smith Way Apt. 974 | New Laurie | 29206.0 |
| 63.0 | Dana | Oliver | dana.oliver@example.com | 1990-11-09 | 104 Johnson Lakes | North Renee | 43324.0 |
| 64.0 | Julie | Thompson | julie.thompson@example.com | 1953-09-23 | 842 Sloan Orchard Suite 517 | East Karenbury | 89148.0 |
| 65.0 | Jennifer | Whitney | jennifer.whitney@example.com | 2002-04-16 | 60481 Richardson Summit Suite 965 | Lake Jesustown | 81706.0 |
| 66.0 | Nicole | Hoffman | nicole.hoffman@example.com | 2007-01-07 | 174 Wilson Cape | West Wendyville | 13240.0 |
| 67.0 | Jimmy | Medina | jimmy.medina@example.com | 1971-03-08 | 8692 Pena Village Suite 964 | Lake Mitchellmouth | 58788.0 |
| 68.0 | Stephanie | Foley | stephanie.foley@example.com | 1951-07-01 | 506 Lopez Crossing Suite 139 | North Kristinbury | 17006.0 |
| 69.0 | Kristin | Harris | kristin.harris@example.com | 2001-03-16 | 335 Kristina Ranch | West Micheleberg | 17539.0 |
| 70.0 | Amber | Lindsey | amber.lindsey@example.com | 1952-03-20 | 05395 Grant Center | Lake Robert | 15397.0 |
| 71.0 | Julie | Alvarez | julie.alvarez@example.com | 1997-09-05 | 917 Sonia Cape Suite 700 | Boonechester | 90429.0 |
| 72.0 | Daniel | Joseph | daniel.joseph@example.com | 1974-12-02 | 59212 Weber Prairie | Oscarhaven | 39153.0 |
| 73.0 | Shawn | Jacobs | shawn.jacobs@example.com | 1951-06-27 | 836 Beasley Loop | Mariafurt | 55025.0 |
| 74.0 | Jessica | Edwards | jessica.edwards@example.com | 1966-01-01 | 2711 Christopher Court Suite 280 | Elizabethchester | 46847.0 |
| 75.0 | Morgan | Pugh | morgan.pugh@example.com | 1973-07-08 | 9451 Eric Orchard | Port Daniel | 73411.0 |
| 76.0 | Michael | Farmer | michael.farmer@example.com | 1983-10-21 | 8998 Chelsea Shoals | Anthonyview | 92605.0 |
| 77.0 | Kathryn | Dorsey | kathryn.dorsey@example.com | 1968-08-15 | 29612 Christopher Pines | South Robert | 45182.0 |
| 78.0 | Eric | Collins | eric.collins@example.com | 1966-10-23 | 22901 Ramos Manors | Lawsonchester | 36305.0 |
| 79.0 | Jason | Hunt | jason.hunt@example.com | 1968-03-23 | 49784 Jeffrey Rapid Apt. 034 | Port Derrick | 33992.0 |
| 80.0 | Keith | Wilson | keith.wilson@example.com | 1978-08-01 | 26838 Jones Wall Apt. 607 | Port Lawrencechester | 75657.0 |
| 81.0 | Richard | Bowman | richard.bowman@example.com | 1964-06-08 | 0529 Collier Lake | South Meganbury | 57605.0 |
| 82.0 | Brianna | Warren | brianna.warren@example.com | 1971-09-01 | 535 Charles Roads Apt. 883 | Michaelberg | 31469.0 |
| 83.0 | Curtis | Scott | curtis.scott@example.com | 1956-07-17 | 127 Webster Trace | Maldonadoshire | 84779.0 |
| 84.0 | Cynthia | Weber | cynthia.weber@example.com | 2003-07-19 | 71774 Vargas Knoll Apt. 477 | North Miguelport | 10558.0 |
| 85.0 | Deanna | Madden | deanna.madden@example.com | 1950-11-18 | 9807 Marc Mountains Apt. 071 | Toniland | 66633.0 |
| 86.0 | Debbie | Williams | debbie.williams@example.com | 1992-11-21 | 8892 Watson Haven Suite 659 | Port Crystalmouth | 9140.0 |
| 87.0 | Mark | Grant | mark.grant@example.com | 1971-01-16 | 9251 Sabrina Inlet Suite 291 | Angelicamouth | 17251.0 |
| 88.0 | Elizabeth | Calderon | elizabeth.calderon@example.com | 1995-01-04 | 685 Michael Falls | West Stacey | 64237.0 |
| 89.0 | James | Cooke | james.cooke@example.com | 1955-04-13 | 1888 Ebony Wells | New Nicholas | 21767.0 |
| 90.0 | Henry | Schwartz | henry.schwartz@example.com | 1987-04-02 | 706 Rhodes Freeway | Bishopmouth | 31172.0 |
| 91.0 | Amanda | Collins | amanda.collins@example.com | 1999-10-06 | 59774 Shaw Manor Apt. 392 | Brettfort | 49156.0 |
| 92.0 | Angela | Garcia | angela.garcia@example.com | 2002-04-19 | 1247 Mariah Course | Port Shannon | 46321.0 |
| 93.0 | Sarah | Perry | sarah.perry@example.com | 1971-09-18 | 61530 Galvan Villages Suite 220 | Samanthafort | 91736.0 |
| 94.0 | Mariah | Blake | mariah.blake@example.com | 1976-08-28 | 010 Lewis Drive Suite 143 | Davidbury | 55528.0 |
| 95.0 | Danielle | Dean | danielle.dean@example.com | 1949-01-04 | 9808 Jennifer Highway | Smithstad | 32032.0 |
| 96.0 | Ashley | Lopez | ashley.lopez@example.com | 1990-03-17 | 518 Peter Mountains | Lake Paulstad | 33747.0 |
| 97.0 | Julie | Kelly | julie.kelly@example.com | 1949-05-02 | 19520 Payne Via Apt. 772 | North Jennifer | 60489.0 |
| 98.0 | Benjamin | Harris | benjamin.harris@example.com | 1998-07-28 | 54868 King Terrace | West Michael | 6766.0 |
| 99.0 | Michelle | Rivera | michelle.rivera@example.com | 1953-03-16 | 6765 Tyler Parks Suite 841 | Millerburgh | 71997.0 |
| 100.0 | Kelly | Garcia | kelly.garcia@example.com | 1967-01-19 | 7962 Bell Canyon Suite 964 | North Emilyfurt | 48120.0 |
| 101.0 | William | Brady | william.brady@example.com | 1955-08-16 | 97021 Kimberly Lakes | Patrickshire | 4745.0 |
| 102.0 | Cassie | Shelton | cassie.shelton@example.com | 1969-12-24 | 1928 Sanders Run Suite 310 | South April | 74120.0 |
| 103.0 | David | Hampton | david.hampton@example.com | 1992-08-23 | 94731 Melissa Mission Apt. 715 | Jennaside | 71564.0 |
| 104.0 | Kelly | Evans | kelly.evans@example.com | 1955-06-15 | 8313 Joel Park | West Angelastad | 61764.0 |
| 105.0 | Linda | Arnold | linda.arnold@example.com | 1986-05-19 | 46786 Morrow Cliffs | West Dawn | 59480.0 |
| 106.0 | Steven | Holmes | steven.holmes@example.com | 1953-06-20 | 68018 Kevin Estates | Sarahbury | 45854.0 |
| 107.0 | Stacey | Stone | stacey.stone@example.com | 1964-01-25 | 3842 Mendez Course | New Shelly | 20711.0 |
| 108.0 | George | Weber | george.weber@example.com | 2006-02-12 | 001 Stacy Trail Suite 396 | South Pamelaside | 38468.0 |
| 109.0 | Dawn | Turner | dawn.turner@example.com | 1961-05-26 | 7102 Perry Mountain Apt. 592 | Michellemouth | 96734.0 |
| 110.0 | Vanessa | Reed | vanessa.reed@example.com | 1971-11-14 | 8815 Steven Grove | Wrightville | 7133.0 |
| 111.0 | Kelly | Cruz | kelly.cruz@example.com | 1986-08-12 | 25953 Tyrone Passage Suite 747 | North Sierrahaven | 60431.0 |
| 112.0 | Tammy | Lewis | tammy.lewis@example.com | 1968-10-01 | 47974 Melanie Meadows | West Jessica | 53356.0 |
| 113.0 | Michael | Morales | michael.morales@example.com | 1983-07-18 | 8416 Duran Harbors | East Theresafurt | 49416.0 |
| 114.0 | Laura | Morgan | laura.morgan@example.com | 1969-08-13 | 98680 Benjamin Station | Lindahaven | 60399.0 |
| 115.0 | Eduardo | Barry | eduardo.barry@example.com | 1954-04-01 | 526 Wheeler Parkways Suite 947 | West Markville | 55097.0 |
| 116.0 | Brandy | Robles | brandy.robles@example.com | 1994-02-04 | 749 Jennifer Prairie | Jacksonfurt | 19870.0 |
| 117.0 | Lorraine | Allen | lorraine.allen@example.com | 1983-09-13 | 07562 Vaughn Loop | Salaston | 93008.0 |
| 118.0 | Devin | Clark | devin.clark@example.com | 1966-11-09 | 652 Barr Junctions Suite 497 | East Joshua | 39625.0 |
| 119.0 | Jeffrey | Dudley | jeffrey.dudley@example.com | 1964-12-27 | 375 Bailey Underpass Suite 419 | Huangfurt | 45738.0 |
| 120.0 | Stephanie | Ballard | stephanie.ballard@example.com | 1964-07-02 | 1574 Lewis Views | Sarahview | 18493.0 |
| 121.0 | Daniel | Yang | daniel.yang@example.com | 1961-01-07 | 83301 Rivera Mountains | Lake Kellitown | 72636.0 |
| 122.0 | Tiffany | Moore | tiffany.moore@example.com | 1989-03-01 | 3454 Rebecca Corners Apt. 802 | Khanburgh | 5264.0 |
| 123.0 | Wendy | Sanders | wendy.sanders@example.com | 1978-06-12 | 400 Bradley Coves | Justinside | 69224.0 |
| 124.0 | Troy | Mays | troy.mays@example.com | 2002-08-26 | 3152 Wong Stravenue Apt. 054 | East Cheryl | 84220.0 |
| 125.0 | Penny | Wilcox | penny.wilcox@example.com | 1979-10-20 | 61227 Boyle Avenue Suite 637 | Stephanieport | 76845.0 |
| 126.0 | Jennifer | Smith | jennifer.smith@example.com | 1989-03-21 | 301 Parker Lodge Suite 145 | East Susan | 63177.0 |
| 127.0 | Eric | Adkins | eric.adkins@example.com | 1985-12-15 | 8783 Erin Ranch Apt. 878 | Christianshire | 15208.0 |
| 128.0 | Bryan | Kelley | bryan.kelley@example.com | 1979-02-18 | 822 Bond Mills | Lake Jamieshire | 64572.0 |
| 129.0 | Christopher | Dixon | christopher.dixon@example.com | 1999-10-08 | 2867 Angelica Spring | Jenniferfurt | 33853.0 |
| 130.0 | Lisa | Reese | lisa.reese@example.com | 1984-02-03 | 65180 Valerie Mountains | West Robertberg | 84586.0 |
| 131.0 | Tiffany | Brewer | tiffany.brewer@example.com | 1973-05-05 | 7661 Desiree Keys Apt. 286 | Lake Tiffany | 956.0 |
| 132.0 | Katelyn | Good | katelyn.good@example.com | 1976-03-30 | 633 Reed Harbor Apt. 106 | East Jamieville | 78350.0 |
| 133.0 | Arthur | Harper | arthur.harper@example.com | 1992-08-05 | 06738 Karen Trail | East Williamport | 31193.0 |
| 134.0 | Lisa | Dennis | lisa.dennis@example.com | 1966-06-09 | 42836 Hill Point Apt. 687 | West Shellyfurt | 69243.0 |
| 135.0 | Lucas | Butler | lucas.butler@example.com | 1954-11-21 | 2873 Kevin Station Apt. 708 | Faulknerside | 69968.0 |
| 136.0 | Dennis | Sanchez | dennis.sanchez@example.com | 1958-07-28 | 175 Amanda Village Apt. 046 | Port Charlesshire | 95437.0 |
| 137.0 | Emily | Robinson | emily.robinson@example.com | 1958-12-13 | 0331 Rocha Square Apt. 638 | Kimberlyfurt | 61613.0 |
| 138.0 | Amanda | Howard | amanda.howard@example.com | 1962-07-15 | 771 Gill Island Apt. 556 | New Michelleberg | 2626.0 |
| 139.0 | Jose | Donovan | jose.donovan@example.com | 1984-02-23 | 2353 Hudson Gardens Suite 854 | Levyfort | 60902.0 |
| 140.0 | Gary | Norton | gary.norton@example.com | 1956-04-03 | 872 Alexandria Villages | Port Elizabethtown | 54554.0 |
| 141.0 | Derrick | Mccoy | derrick.mccoy@example.com | 1949-05-12 | 38750 Hopkins Brook | New Andreatown | 2693.0 |
| 142.0 | Alyssa | Hill | alyssa.hill@example.com | 1964-03-30 | 621 Alice Garden | New Alisha | 46958.0 |
| 143.0 | Joseph | Sanders | joseph.sanders@example.com | 1970-02-14 | 9334 Desiree Walks Apt. 166 | Tranton | 83960.0 |
| 144.0 | Albert | Jackson | albert.jackson@example.com | 1978-10-02 | 591 Jerry Ways Suite 401 | Rachelshire | 86760.0 |
| 145.0 | Antonio | Mcfarland | antonio.mcfarland@example.com | 1966-02-19 | 92614 Anne Port | Rhodesside | 43981.0 |
| 146.0 | Patrick | Singh | patrick.singh@example.com | 1998-07-12 | 501 Hall Club | Cassiefurt | 43279.0 |
| 147.0 | Anthony | Nelson | anthony.nelson@example.com | 1975-05-25 | 58662 Miller River Suite 311 | Ericberg | 97449.0 |
| 148.0 | Peter | Ward | peter.ward@example.com | 1950-12-18 | 7541 Christopher Meadows | Hawkinshaven | 53984.0 |
| 149.0 | Dakota | Davis | dakota.davis@example.com | 1982-06-14 | 956 Kelly Loaf | Lake Rachelbury | 75468.0 |
| 150.0 | Adriana | Jennings | adriana.jennings@example.com | 1956-04-08 | 4472 Gary Harbor | Evansland | 47834.0 |
| 151.0 | Johnathan | Wright | johnathan.wright@example.com | 1987-04-09 | 937 Derek Avenue Suite 596 | Scottchester | 85833.0 |
| 152.0 | Terri | Taylor | terri.taylor@example.com | 1966-07-23 | 5265 Navarro Roads | Faulknerbury | 43215.0 |
| 153.0 | Nicholas | Velasquez | nicholas.velasquez@example.com | 1971-06-23 | 93982 Stephanie Mountain Apt. 741 | Chambersberg | 83513.0 |
| 154.0 | Kevin | King | kevin.king@example.com | 1955-03-24 | 1797 Ferguson Ways Suite 805 | North Kaylastad | 22303.0 |
| 155.0 | Deborah | Williams | deborah.williams@example.com | 1988-08-18 | 6101 Walker Summit Apt. 756 | Bartonshire | 90997.0 |
| 156.0 | Vincent | Cooper | vincent.cooper@example.com | 1946-05-29 | 46112 Collins Motorway Apt. 875 | Davismouth | 42301.0 |
| 157.0 | Carlos | Williams | carlos.williams@example.com | 1993-02-07 | 51238 Andrea Isle | Mullenbury | 53591.0 |
| 158.0 | Crystal | Lopez | crystal.lopez@example.com | 1989-06-19 | 0937 Price Squares Apt. 341 | Port Monicaburgh | 48446.0 |
| 159.0 | Mark | Ellis | mark.ellis@example.com | 1962-08-03 | 596 Matthews Keys Suite 792 | Samanthashire | 11609.0 |
| 160.0 | Emily | Edwards | emily.edwards@example.com | 1960-12-20 | 25286 Carlson Ports Suite 627 | New Garrett | 38359.0 |
| 161.0 | Donald | Edwards | donald.edwards@example.com | 1975-06-05 | 0723 Maynard Parkways | Ortizfort | 54978.0 |
| 162.0 | Jennifer | Wallace | jennifer.wallace@example.com | 1956-02-13 | 034 Joshua Plain | Garymouth | 74641.0 |
| 163.0 | Julia | Cannon | julia.cannon@example.com | 1982-02-22 | 148 Weaver Throughway | Port Jenniferside | 29145.0 |
| 164.0 | Veronica | Garcia | veronica.garcia@example.com | 2001-03-22 | 0745 Scott Crest | East Lisa | 77561.0 |
| 165.0 | Hannah | Callahan | hannah.callahan@example.com | 1986-04-07 | 92330 Patel Ranch Apt. 544 | Stephaniehaven | 89538.0 |
| 166.0 | Lisa | Taylor | lisa.taylor@example.com | 1995-10-12 | 42232 Poole Trace Suite 729 | Courtneyfurt | 59744.0 |
| 167.0 | Charles | Norton | charles.norton@example.com | 1997-01-21 | 8457 Murphy Alley | Lake Teresastad | 8801.0 |
| 168.0 | Laura | Sanders | laura.sanders@example.com | 1973-12-21 | 4545 Ashlee Oval | Patriciaton | 6522.0 |
| 169.0 | Cory | Bowers | cory.bowers@example.com | 1976-01-04 | 27706 Wendy Curve | Erikview | 12735.0 |
| 170.0 | Diamond | Wright | diamond.wright@example.com | 1970-01-15 | 64361 Aaron Neck | East Brittneyhaven | 89627.0 |
| 171.0 | Sean | Smith | sean.smith@example.com | 1968-02-12 | 2713 Davis Valley | North Lawrenceport | 18474.0 |
| 172.0 | Patrick | Li | patrick.li@example.com | 2004-03-30 | 218 Chelsey Expressway | Bellborough | 82824.0 |
| 173.0 | Kaitlin | Gillespie | kaitlin.gillespie@example.com | 1986-08-29 | 11219 Bell Meadow Suite 234 | East Angelaport | 91003.0 |
| 174.0 | Anthony | Boone | anthony.boone@example.com | 2004-05-02 | 89836 Lucas Tunnel Apt. 761 | South Danielle | 9808.0 |
| 175.0 | Allison | Levine | allison.levine@example.com | 1969-04-23 | 69658 Kathryn Trail Apt. 091 | West Jasonton | 52664.0 |
| 176.0 | William | Fuller | william.fuller@example.com | 1978-10-31 | 6188 Joshua Inlet Apt. 832 | Peterland | 41155.0 |
| 177.0 | Holly | Blair | holly.blair@example.com | 2002-05-04 | 31617 Kyle Streets | North Alexander | 18485.0 |
| 178.0 | Jacqueline | Martin | jacqueline.martin@example.com | 1968-04-30 | 52410 Roman Groves Apt. 491 | Gibsonstad | 7767.0 |
| 179.0 | Victor | Bradley | victor.bradley@example.com | 1969-10-03 | 1913 Bradley Wall | East Brandonstad | 50698.0 |
| 180.0 | Samantha | White | samantha.white@example.com | 2003-02-01 | 635 Robert Stravenue | Josephland | 75413.0 |
| 181.0 | Nathan | Shaw | nathan.shaw@example.com | 2006-02-10 | 38061 Cline Trail | Markside | 60367.0 |
| 182.0 | Alan | Gonzalez | alan.gonzalez@example.com | 1983-02-07 | 937 Vargas Park Apt. 832 | South Andrewside | 45907.0 |
| 183.0 | Cynthia | Steele | cynthia.steele@example.com | 1945-05-22 | 64138 Robert Circle Apt. 410 | Port April | 92362.0 |
| 184.0 | Paula | Ellis | paula.ellis@example.com | 1995-08-19 | 182 Jones Port | South Elaineberg | 31535.0 |
| 185.0 | Kelly | Rosales | kelly.rosales@example.com | 1999-03-26 | 557 Hall Flats Apt. 912 | East Shannonmouth | 53783.0 |
| 186.0 | David | Howard | david.howard@example.com | 1997-02-26 | 4741 Eric Spur | Margaretton | 28684.0 |
| 187.0 | Mary | Murphy | mary.murphy@example.com | 1950-12-11 | 6804 Wilkins Extensions | South Melissaside | 98553.0 |
| 188.0 | Andrea | Davis | andrea.davis@example.com | 1951-09-02 | 00323 Watson Roads | New Brendaland | 3358.0 |
| 189.0 | Wendy | Gonzalez | wendy.gonzalez@example.com | 1988-09-11 | 15107 Gary Ports Suite 670 | Vegaburgh | 46893.0 |
| 190.0 | Jason | Lopez | jason.lopez@example.com | 1963-10-12 | 09993 Porter Plaza Suite 014 | Taylorborough | 84734.0 |
| 191.0 | Nicole | Fox | nicole.fox@example.com | 1987-08-29 | 5787 Durham Parkway | Paulburgh | 3917.0 |
| 192.0 | Luis | Robinson | luis.robinson@example.com | 2005-09-10 | 78593 Craig Shoals Apt. 480 | New Meghan | 51412.0 |
| 193.0 | Michael | Combs | michael.combs@example.com | 2002-04-03 | 39559 Jade Knoll | New Stacy | 65018.0 |
| 194.0 | Amber | Thompson | amber.thompson@example.com | 1947-04-27 | 39308 Smith Ridges | Port David | 94471.0 |
| 195.0 | Gregory | Lang | gregory.lang@example.com | 2003-10-26 | 02921 Yu Landing Suite 915 | Marcusburgh | 96491.0 |
| 196.0 | Stacy | Conner | stacy.conner@example.com | 1977-11-21 | 89539 Nicholas Street Suite 220 | Rosalesshire | 4745.0 |
| 197.0 | Ian | Flores | ian.flores@example.com | 1999-10-11 | 917 Mark Club | West Toni | 22506.0 |
| 198.0 | Daisy | Mccarty | daisy.mccarty@example.com | 2000-08-25 | 0433 Michael Turnpike Apt. 006 | Oconnorburgh | 54767.0 |
| 199.0 | Trevor | Gray | trevor.gray@example.com | 1981-11-22 | 79327 Lauren Bypass Suite 054 | North Matthewfurt | 21591.0 |
| 200.0 | Jessica | Payne | jessica.payne@example.com | 2005-11-07 | 9970 Dunlap Expressway | Mooreville | 43898.0 |
| 201.0 | Jamie | Lee | jamie.lee@example.com | 1992-03-06 | 443 Brandon Ports Suite 205 | South Christopherfort | 26672.0 |
| 202.0 | Collin | Clark | collin.clark@example.com | 1988-03-01 | 71467 Jacobson Greens Apt. 862 | Nicolestad | 24956.0 |
| 203.0 | Sean | Baker | sean.baker@example.com | 1976-05-20 | 49021 Elizabeth Valley Suite 938 | Port Paulhaven | 55371.0 |
| 204.0 | Tammy | Mcdaniel | tammy.mcdaniel@example.com | 1977-01-17 | 4160 David Throughway | Thompsonburgh | 28273.0 |
| 205.0 | Lindsey | Martinez | lindsey.martinez@example.com | 1973-07-19 | 632 Flores Stream | North Paulfurt | 72859.0 |
| 206.0 | Mark | Hill | mark.hill@example.com | 1975-11-30 | 998 Rodriguez Drive | New Brianna | 99903.0 |
| 207.0 | Tammie | Garcia | tammie.garcia@example.com | 1951-12-04 | 8564 Pena Ports | Johnsonview | 53319.0 |
| 208.0 | Douglas | Franklin | douglas.franklin@example.com | 1991-12-10 | 65307 Prince Brooks Suite 444 | Garrisonville | 30379.0 |
| 209.0 | Dennis | Mccann | dennis.mccann@example.com | 1974-11-21 | 6913 Lewis View Suite 785 | New Laceyland | 41280.0 |
| 210.0 | Jenna | Powell | jenna.powell@example.com | 1997-11-06 | 33030 Williams Lake | West Micheal | 61347.0 |
| 211.0 | William | Reid | william.reid@example.com | 1953-03-01 | 57972 Matthews Keys | Frankview | 98668.0 |
| 212.0 | Mariah | Davis | mariah.davis@example.com | 1946-08-09 | 29333 Joseph Lodge Apt. 072 | New Lauren | 29830.0 |
| 213.0 | Johnny | Trujillo | johnny.trujillo@example.com | 1965-07-10 | 6574 Steven Springs Suite 910 | Annaport | 39622.0 |
| 214.0 | Gabrielle | Olson | gabrielle.olson@example.com | 1967-08-15 | 544 Lopez Path Apt. 096 | Erintown | 86405.0 |
| 215.0 | Tyler | Phillips | tyler.phillips@example.com | 2006-06-14 | 6099 Matthew Station Apt. 875 | Meganside | 24242.0 |
| 216.0 | Kelly | Ruiz | kelly.ruiz@example.com | 1995-02-26 | 825 Jeffrey Fork Suite 655 | Brendamouth | 15938.0 |
| 217.0 | Thomas | Delacruz | thomas.delacruz@example.com | 1984-06-12 | 3816 Gutierrez Ways | East Victoria | 45415.0 |
| 218.0 | Robert | Hudson | robert.hudson@example.com | 2006-06-07 | 52175 Lawrence Centers Apt. 743 | New Kathy | 64670.0 |
| 219.0 | Kristen | Chan | kristen.chan@example.com | 1953-07-17 | 666 Reyes Camp Apt. 505 | North Erica | 82642.0 |
| 220.0 | Jessica | Perez | jessica.perez@example.com | 2004-05-31 | 2168 Jackson View Apt. 447 | Ryanberg | 45423.0 |
| 221.0 | Wendy | Henry | wendy.henry@example.com | 1995-10-13 | 60332 Jessica Radial | North Michael | 85768.0 |
| 222.0 | Laura | Brooks | laura.brooks@example.com | 1988-04-23 | 909 Ebony Shoal Apt. 016 | Jamesside | 33627.0 |
| 223.0 | Thomas | Hernandez | thomas.hernandez@example.com | 1992-01-17 | 6184 Robert Cove | West Danielville | 65740.0 |
| 224.0 | James | Gonzalez | james.gonzalez@example.com | 1962-08-19 | 6420 Lozano Spurs | Riveratown | 2172.0 |
| 225.0 | Emily | Meadows | emily.meadows@example.com | 2001-07-28 | 18114 Stephen Hill Suite 701 | Port Benjamin | 38586.0 |
| 226.0 | Michael | Rhodes | michael.rhodes@example.com | 1973-09-22 | 00225 Kline Road | Natalieland | 49341.0 |
| 227.0 | Lisa | White | lisa.white@example.com | 1972-01-04 | 4676 Daniel Square Apt. 216 | Phammouth | 24259.0 |
| 228.0 | Cheryl | Maxwell | cheryl.maxwell@example.com | 1986-05-04 | 277 Paige Mill | North Josemouth | 2121.0 |
| 229.0 | Janet | Gregory | janet.gregory@example.com | 1996-12-19 | 588 Ryan Stream | South Michael | 89144.0 |
| 230.0 | Darlene | Hernandez | darlene.hernandez@example.com | 2000-12-22 | 28772 Karen Islands | West Tara | 7100.0 |

## Services

| ServiceID | ServiceName | Price |
| --- | --- | --- |
| 1.0 | General Checkup | 90.29 |
| 2.0 | Vaccination | 64.91 |
| 3.0 | Spay/Neuter Surgery | 235.06 |
| 4.0 | Dental Cleaning | 123.32 |
| 5.0 | X-Ray | 292.3 |
| 6.0 | Ultrasound | 217.32 |
| 7.0 | Blood Test | 47.42 |
| 8.0 | Microchipping | 28.39 |
| 9.0 | Emergency Visit | 439.0 |
| 10.0 | Overnight Stay | 150.47 |
| 11.0 | Grooming - Basic | 80.36 |
| 12.0 | Grooming - Full | 131.08 |
| 13.0 | Parasite Treatment | 67.54 |
| 14.0 | Allergy Testing | 245.97 |
| 15.0 | Physical Therapy | 94.07 |
| 16.0 | Nutritional Consultation | 88.64 |
| 17.0 | Behavioral Consultation | 177.82 |
| 18.0 | Chemotherapy Session | 447.41 |

## Vets

| VetID | FirstName | LastName | Specialization | PhoneNumber | Email | YearsExperience |
| --- | --- | --- | --- | --- | --- | --- |
| 1.0 | William | Pierce | Oncology | (631)779-7177x5170 | william.pierce@pethospital.com | 13.0 |
| 2.0 | Curtis | Gutierrez | Surgery | +1-801-994-8837 | curtis.gutierrez@pethospital.com | 3.0 |
| 3.0 | Stephanie | Cox | Dermatology | 3758997571 | stephanie.cox@pethospital.com | 19.0 |
| 4.0 | Connor | Hopkins | Surgery | 5548851027 | connor.hopkins@pethospital.com | 15.0 |
| 5.0 | Donald | Love | Surgery | 001-614-933-1637x3516 | donald.love@pethospital.com | 25.0 |
| 6.0 | Brandon | Schultz | Cardiology | +1-917-798-2708x08697 | brandon.schultz@pethospital.com | 30.0 |
| 7.0 | Sandra | Norman | Oncology | (922)169-9586 | sandra.norman@pethospital.com | 11.0 |
| 8.0 | Robert | Lynch | Oncology | 001-346-547-2269x848 | robert.lynch@pethospital.com | 23.0 |
| 9.0 | Michelle | Joseph | Dermatology | +1-333-945-2288 | michelle.joseph@pethospital.com | 18.0 |
| 10.0 | Heather | Morris | Surgery | 587-996-8460 | heather.morris@pethospital.com | 11.0 |
| 11.0 | Alexandra | Johnson | Anesthesiology | (003)424-4204 | alexandra.johnson@pethospital.com | 16.0 |
| 12.0 | James | Weaver | Dentistry | (719)838-6384x066 | james.weaver@pethospital.com | 30.0 |
| 13.0 | Robert | French | Orthopedics | +1-580-043-9735x98933 | robert.french@pethospital.com | 18.0 |
| 14.0 | Kelly | Thompson | Anesthesiology | +1-122-816-0648x42294 | kelly.thompson@pethospital.com | 15.0 |
| 15.0 | Adam | Owens | Oncology | (025)909-4798 | adam.owens@pethospital.com | 4.0 |

## Treatments

| TreatmentID | PetID | OwnerID | VetID | ServiceID | Date | Cost |
| --- | --- | --- | --- | --- | --- | --- |
| 1.0 | 398.0 | 1.0 | 9.0 | 10.0 | 2023-11-10 | 150.47 |
| 2.0 | 185.0 | 226.0 | 2.0 | 2.0 | 2024-06-02 | 64.91 |
| 3.0 | 320.0 | 81.0 | 11.0 | 15.0 | 2023-12-31 | 94.07 |
| 4.0 | 374.0 | 142.0 | 4.0 | 8.0 | 2024-08-15 | 28.39 |
| 5.0 | 412.0 | 29.0 | 3.0 | 11.0 | 2025-08-07 | 80.36 |
| 6.0 | 510.0 | 46.0 | 1.0 | 18.0 | 2024-05-13 | 447.41 |
| 7.0 | 218.0 | 50.0 | 8.0 | 4.0 | 2025-04-30 | 123.32 |
| 8.0 | 308.0 | 159.0 | 8.0 | 3.0 | 2023-06-01 | 235.06 |
| 9.0 | 3.0 | 9.0 | 15.0 | 16.0 | 2024-08-24 | 88.64 |
| 10.0 | 566.0 | 171.0 | 12.0 | 16.0 | 2023-08-02 | 88.64 |
| 11.0 | 520.0 | 81.0 | 8.0 | 4.0 | 2023-07-01 | 123.32 |
| 12.0 | 562.0 | 142.0 | 4.0 | 13.0 | 2024-11-28 | 67.54 |
| 13.0 | 300.0 | 104.0 | 11.0 | 11.0 | 2025-09-15 | 80.36 |
| 14.0 | 371.0 | 228.0 | 15.0 | 9.0 | 2025-02-20 | 439.0 |
| 15.0 | 98.0 | 196.0 | 13.0 | 3.0 | 2023-05-10 | 235.06 |
| 16.0 | 574.0 | 104.0 | 4.0 | 6.0 | 2024-10-01 | 217.32 |
| 17.0 | 176.0 | 132.0 | 13.0 | 18.0 | 2022-11-01 | 447.41 |
| 18.0 | 433.0 | 54.0 | 8.0 | 11.0 | 2025-06-16 | 80.36 |
| 19.0 | 59.0 | 142.0 | 9.0 | 16.0 | 2024-05-04 | 88.64 |
| 20.0 | 48.0 | 203.0 | 15.0 | 5.0 | 2025-01-21 | 292.3 |
| 21.0 | 523.0 | 131.0 | 8.0 | 5.0 | 2024-12-27 | 292.3 |
| 22.0 | 87.0 | 28.0 | 13.0 | 6.0 | 2023-02-18 | 217.32 |
| 23.0 | 597.0 | 44.0 | 11.0 | 14.0 | 2022-10-05 | 245.97 |
| 24.0 | 341.0 | 68.0 | 9.0 | 11.0 | 2023-12-17 | 80.36 |
| 25.0 | 134.0 | 68.0 | 13.0 | 14.0 | 2023-04-04 | 245.97 |
| 26.0 | 535.0 | 138.0 | 10.0 | 5.0 | 2022-11-28 | 292.3 |
| 27.0 | 206.0 | 173.0 | 7.0 | 4.0 | 2023-03-28 | 123.32 |
| 28.0 | 411.0 | 3.0 | 15.0 | 8.0 | 2024-11-05 | 28.39 |
| 29.0 | 105.0 | 83.0 | 12.0 | 9.0 | 2023-01-28 | 439.0 |
| 30.0 | 39.0 | 127.0 | 8.0 | 17.0 | 2024-04-14 | 177.82 |
| 31.0 | 282.0 | 13.0 | 13.0 | 18.0 | 2024-05-08 | 447.41 |
| 32.0 | 169.0 | 16.0 | 14.0 | 3.0 | 2024-03-08 | 235.06 |
| 33.0 | 521.0 | 112.0 | 13.0 | 18.0 | 2022-10-25 | 447.41 |
| 34.0 | 294.0 | 18.0 | 8.0 | 7.0 | 2024-05-25 | 47.42 |
| 35.0 | 404.0 | 42.0 | 5.0 | 9.0 | 2023-04-10 | 439.0 |
| 36.0 | 141.0 | 194.0 | 2.0 | 1.0 | 2024-02-19 | 90.29 |
| 37.0 | 153.0 | 116.0 | 4.0 | 9.0 | 2024-03-19 | 439.0 |
| 38.0 | 520.0 | 81.0 | 6.0 | 17.0 | 2023-12-12 | 177.82 |
| 39.0 | 132.0 | 141.0 | 15.0 | 12.0 | 2025-04-14 | 131.08 |
| 40.0 | 293.0 | 48.0 | 3.0 | 1.0 | 2024-11-22 | 90.29 |
| 41.0 | 24.0 | 64.0 | 4.0 | 15.0 | 2023-08-04 | 94.07 |
| 42.0 | 68.0 | 193.0 | 12.0 | 6.0 | 2024-11-18 | 217.32 |
| 43.0 | 129.0 | 33.0 | 12.0 | 6.0 | 2024-07-15 | 217.32 |
| 44.0 | 481.0 | 90.0 | 2.0 | 6.0 | 2023-05-31 | 217.32 |
| 45.0 | 520.0 | 81.0 | 7.0 | 16.0 | 2023-11-19 | 88.64 |
| 46.0 | 408.0 | 181.0 | 9.0 | 7.0 | 2023-02-15 | 47.42 |
| 47.0 | 423.0 | 38.0 | 7.0 | 12.0 | 2025-05-22 | 131.08 |
| 48.0 | 13.0 | 81.0 | 4.0 | 2.0 | 2023-05-20 | 64.91 |
| 49.0 | 97.0 | 96.0 | 7.0 | 12.0 | 2025-08-17 | 131.08 |
| 50.0 | 217.0 | 64.0 | 14.0 | 3.0 | 2023-08-09 | 235.06 |
| 51.0 | 439.0 | 200.0 | 8.0 | 3.0 | 2025-09-14 | 235.06 |
| 52.0 | 225.0 | 72.0 | 6.0 | 7.0 | 2024-01-24 | 47.42 |
| 53.0 | 596.0 | 189.0 | 13.0 | 2.0 | 2023-07-21 | 64.91 |
| 54.0 | 244.0 | 61.0 | 14.0 | 16.0 | 2023-05-22 | 88.64 |
| 55.0 | 520.0 | 81.0 | 9.0 | 14.0 | 2024-07-02 | 245.97 |
| 56.0 | 27.0 | 138.0 | 8.0 | 3.0 | 2024-07-04 | 235.06 |
| 57.0 | 149.0 | 167.0 | 5.0 | 7.0 | 2023-04-18 | 47.42 |
| 58.0 | 543.0 | 111.0 | 8.0 | 3.0 | 2025-07-29 | 235.06 |
| 59.0 | 180.0 | 125.0 | 7.0 | 7.0 | 2023-11-08 | 47.42 |
| 60.0 | 283.0 | 150.0 | 11.0 | 5.0 | 2023-06-21 | 292.3 |
| 61.0 | 380.0 | 184.0 | 12.0 | 10.0 | 2024-10-23 | 150.47 |
| 62.0 | 501.0 | 103.0 | 14.0 | 6.0 | 2023-02-12 | 217.32 |
| 63.0 | 166.0 | 19.0 | 15.0 | 12.0 | 2025-01-08 | 131.08 |
| 64.0 | 282.0 | 13.0 | 10.0 | 4.0 | 2022-09-29 | 123.32 |
| 65.0 | 547.0 | 160.0 | 1.0 | 1.0 | 2023-07-13 | 90.29 |
| 66.0 | 422.0 | 142.0 | 10.0 | 17.0 | 2025-08-02 | 177.82 |
| 67.0 | 131.0 | 122.0 | 2.0 | 4.0 | 2023-05-03 | 123.32 |
| 68.0 | 308.0 | 159.0 | 3.0 | 9.0 | 2023-02-24 | 439.0 |
| 69.0 | 152.0 | 133.0 | 3.0 | 11.0 | 2025-06-16 | 80.36 |
| 70.0 | 474.0 | 10.0 | 5.0 | 2.0 | 2023-08-12 | 64.91 |
| 71.0 | 76.0 | 41.0 | 6.0 | 13.0 | 2024-07-20 | 67.54 |
| 72.0 | 3.0 | 9.0 | 8.0 | 3.0 | 2023-11-27 | 235.06 |
| 73.0 | 379.0 | 54.0 | 6.0 | 18.0 | 2023-08-12 | 447.41 |
| 74.0 | 266.0 | 143.0 | 5.0 | 7.0 | 2023-05-17 | 47.42 |
| 75.0 | 493.0 | 72.0 | 5.0 | 11.0 | 2025-04-12 | 80.36 |
| 76.0 | 288.0 | 41.0 | 8.0 | 17.0 | 2025-08-18 | 177.82 |
| 77.0 | 40.0 | 24.0 | 12.0 | 9.0 | 2025-06-12 | 439.0 |
| 78.0 | 348.0 | 95.0 | 6.0 | 16.0 | 2024-06-24 | 88.64 |
| 79.0 | 336.0 | 26.0 | 11.0 | 2.0 | 2025-05-09 | 64.91 |
| 80.0 | 347.0 | 63.0 | 13.0 | 1.0 | 2025-07-06 | 90.29 |
| 81.0 | 360.0 | 3.0 | 13.0 | 2.0 | 2025-07-25 | 64.91 |
| 82.0 | 464.0 | 189.0 | 4.0 | 9.0 | 2024-08-14 | 439.0 |
| 83.0 | 58.0 | 65.0 | 14.0 | 5.0 | 2025-08-16 | 292.3 |
| 84.0 | 258.0 | 201.0 | 10.0 | 14.0 | 2024-11-18 | 245.97 |
| 85.0 | 28.0 | 68.0 | 4.0 | 12.0 | 2025-01-11 | 131.08 |
| 86.0 | 305.0 | 149.0 | 8.0 | 15.0 | 2025-02-04 | 94.07 |
| 87.0 | 400.0 | 198.0 | 10.0 | 17.0 | 2024-07-07 | 177.82 |
| 88.0 | 352.0 | 214.0 | 8.0 | 3.0 | 2024-04-20 | 235.06 |
| 89.0 | 523.0 | 131.0 | 13.0 | 11.0 | 2023-09-02 | 80.36 |
| 90.0 | 304.0 | 64.0 | 3.0 | 11.0 | 2025-02-04 | 80.36 |
| 91.0 | 366.0 | 27.0 | 13.0 | 3.0 | 2024-10-26 | 235.06 |
| 92.0 | 242.0 | 193.0 | 5.0 | 14.0 | 2025-02-17 | 245.97 |
| 93.0 | 569.0 | 192.0 | 10.0 | 3.0 | 2025-08-05 | 235.06 |
| 94.0 | 298.0 | 221.0 | 15.0 | 18.0 | 2023-12-28 | 447.41 |
| 95.0 | 526.0 | 148.0 | 10.0 | 9.0 | 2023-08-20 | 439.0 |
| 96.0 | 157.0 | 17.0 | 7.0 | 10.0 | 2024-08-16 | 150.47 |
| 97.0 | 324.0 | 34.0 | 2.0 | 1.0 | 2024-05-17 | 90.29 |
| 98.0 | 133.0 | 43.0 | 2.0 | 14.0 | 2024-01-18 | 245.97 |
| 99.0 | 209.0 | 26.0 | 14.0 | 6.0 | 2025-01-22 | 217.32 |
| 100.0 | 510.0 | 46.0 | 13.0 | 1.0 | 2025-07-04 | 90.29 |
| 101.0 | 545.0 | 171.0 | 6.0 | 3.0 | 2022-10-01 | 235.06 |
| 102.0 | 502.0 | 174.0 | 7.0 | 13.0 | 2023-08-30 | 67.54 |
| 103.0 | 94.0 | 156.0 | 2.0 | 14.0 | 2022-11-25 | 245.97 |
| 104.0 | 49.0 | 175.0 | 11.0 | 10.0 | 2023-10-29 | 150.47 |
| 105.0 | 87.0 | 28.0 | 1.0 | 6.0 | 2023-05-20 | 217.32 |
| 106.0 | 351.0 | 113.0 | 14.0 | 18.0 | 2022-12-28 | 447.41 |
| 107.0 | 439.0 | 200.0 | 2.0 | 1.0 | 2023-04-23 | 90.29 |
| 108.0 | 328.0 | 118.0 | 6.0 | 14.0 | 2023-02-28 | 245.97 |
| 109.0 | 126.0 | 137.0 | 12.0 | 9.0 | 2024-11-17 | 439.0 |
| 110.0 | 514.0 | 28.0 | 7.0 | 18.0 | 2024-10-01 | 447.41 |
| 111.0 | 413.0 | 20.0 | 12.0 | 4.0 | 2022-10-24 | 123.32 |
| 112.0 | 242.0 | 193.0 | 11.0 | 2.0 | 2024-03-22 | 64.91 |
| 113.0 | 21.0 | 37.0 | 10.0 | 10.0 | 2023-01-10 | 150.47 |
| 114.0 | 489.0 | 169.0 | 8.0 | 14.0 | 2023-04-18 | 245.97 |
| 115.0 | 454.0 | 106.0 | 14.0 | 3.0 | 2024-03-26 | 235.06 |
| 116.0 | 450.0 | 205.0 | 6.0 | 4.0 | 2024-05-12 | 123.32 |
| 117.0 | 44.0 | 29.0 | 14.0 | 13.0 | 2025-04-02 | 67.54 |
| 118.0 | 173.0 | 221.0 | 5.0 | 2.0 | 2023-03-18 | 64.91 |
| 119.0 | 577.0 | 1.0 | 4.0 | 1.0 | 2023-02-18 | 90.29 |
| 120.0 | 379.0 | 54.0 | 10.0 | 16.0 | 2023-08-12 | 88.64 |
| 121.0 | 66.0 | 227.0 | 6.0 | 11.0 | 2025-07-30 | 80.36 |
| 122.0 | 82.0 | 68.0 | 8.0 | 5.0 | 2023-12-01 | 292.3 |
| 123.0 | 316.0 | 67.0 | 3.0 | 2.0 | 2023-01-02 | 64.91 |
| 124.0 | 368.0 | 35.0 | 4.0 | 10.0 | 2023-10-01 | 150.47 |
| 125.0 | 244.0 | 61.0 | 13.0 | 6.0 | 2024-04-15 | 217.32 |
| 126.0 | 379.0 | 54.0 | 6.0 | 10.0 | 2024-03-03 | 150.47 |
| 127.0 | 334.0 | 160.0 | 15.0 | 13.0 | 2024-03-10 | 67.54 |
| 128.0 | 297.0 | 173.0 | 9.0 | 4.0 | 2025-09-06 | 123.32 |
| 129.0 | 143.0 | 177.0 | 9.0 | 16.0 | 2024-08-31 | 88.64 |
| 130.0 | 102.0 | 136.0 | 2.0 | 2.0 | 2024-05-20 | 64.91 |
| 131.0 | 334.0 | 160.0 | 12.0 | 17.0 | 2023-06-17 | 177.82 |
| 132.0 | 163.0 | 151.0 | 8.0 | 8.0 | 2024-05-22 | 28.39 |
| 133.0 | 256.0 | 100.0 | 12.0 | 13.0 | 2023-01-25 | 67.54 |
| 134.0 | 545.0 | 171.0 | 11.0 | 4.0 | 2022-12-26 | 123.32 |
| 135.0 | 456.0 | 46.0 | 8.0 | 7.0 | 2025-08-22 | 47.42 |
| 136.0 | 17.0 | 102.0 | 2.0 | 1.0 | 2024-02-02 | 90.29 |
| 137.0 | 391.0 | 14.0 | 4.0 | 8.0 | 2023-06-21 | 28.39 |
| 138.0 | 416.0 | 39.0 | 12.0 | 13.0 | 2024-05-16 | 67.54 |
| 139.0 | 71.0 | 165.0 | 5.0 | 8.0 | 2023-09-02 | 28.39 |
| 140.0 | 184.0 | 186.0 | 8.0 | 13.0 | 2022-10-05 | 67.54 |
| 141.0 | 254.0 | 98.0 | 6.0 | 1.0 | 2023-05-09 | 90.29 |
| 142.0 | 415.0 | 177.0 | 12.0 | 8.0 | 2023-11-19 | 28.39 |
| 143.0 | 548.0 | 81.0 | 6.0 | 13.0 | 2023-03-12 | 67.54 |
| 144.0 | 563.0 | 33.0 | 5.0 | 16.0 | 2024-01-08 | 88.64 |
| 145.0 | 266.0 | 143.0 | 5.0 | 9.0 | 2024-06-11 | 439.0 |
| 146.0 | 33.0 | 150.0 | 2.0 | 13.0 | 2024-08-28 | 67.54 |
| 147.0 | 292.0 | 218.0 | 6.0 | 13.0 | 2025-01-25 | 67.54 |
| 148.0 | 299.0 | 61.0 | 12.0 | 1.0 | 2024-09-12 | 90.29 |
| 149.0 | 495.0 | 18.0 | 4.0 | 2.0 | 2024-07-10 | 64.91 |
| 150.0 | 60.0 | 221.0 | 12.0 | 16.0 | 2023-01-09 | 88.64 |
| 151.0 | 68.0 | 193.0 | 5.0 | 2.0 | 2022-10-18 | 64.91 |
| 152.0 | 201.0 | 106.0 | 10.0 | 9.0 | 2024-02-25 | 439.0 |
| 153.0 | 596.0 | 189.0 | 2.0 | 14.0 | 2024-08-25 | 245.97 |
| 154.0 | 283.0 | 150.0 | 5.0 | 13.0 | 2024-06-18 | 67.54 |
| 155.0 | 421.0 | 150.0 | 6.0 | 2.0 | 2024-09-24 | 64.91 |
| 156.0 | 73.0 | 29.0 | 5.0 | 4.0 | 2025-08-29 | 123.32 |
| 157.0 | 362.0 | 210.0 | 12.0 | 12.0 | 2022-09-29 | 131.08 |
| 158.0 | 132.0 | 141.0 | 3.0 | 2.0 | 2024-03-14 | 64.91 |
| 159.0 | 505.0 | 85.0 | 1.0 | 11.0 | 2025-06-07 | 80.36 |
| 160.0 | 563.0 | 33.0 | 9.0 | 10.0 | 2024-02-06 | 150.47 |
| 161.0 | 553.0 | 77.0 | 12.0 | 8.0 | 2025-01-11 | 28.39 |
| 162.0 | 418.0 | 10.0 | 11.0 | 3.0 | 2022-12-26 | 235.06 |
| 163.0 | 459.0 | 201.0 | 2.0 | 5.0 | 2025-09-01 | 292.3 |
| 164.0 | 138.0 | 109.0 | 10.0 | 18.0 | 2024-02-22 | 447.41 |
| 165.0 | 506.0 | 8.0 | 8.0 | 7.0 | 2023-01-20 | 47.42 |
| 166.0 | 413.0 | 20.0 | 8.0 | 15.0 | 2023-10-30 | 94.07 |
| 167.0 | 317.0 | 53.0 | 3.0 | 15.0 | 2025-06-13 | 94.07 |
| 168.0 | 587.0 | 120.0 | 5.0 | 18.0 | 2023-01-22 | 447.41 |
| 169.0 | 540.0 | 172.0 | 2.0 | 8.0 | 2025-05-16 | 28.39 |
| 170.0 | 283.0 | 150.0 | 7.0 | 18.0 | 2022-12-24 | 447.41 |
| 171.0 | 198.0 | 111.0 | 2.0 | 11.0 | 2025-06-09 | 80.36 |
| 172.0 | 13.0 | 81.0 | 3.0 | 14.0 | 2024-11-25 | 245.97 |
| 173.0 | 92.0 | 164.0 | 13.0 | 13.0 | 2024-01-13 | 67.54 |
| 174.0 | 352.0 | 214.0 | 2.0 | 12.0 | 2024-05-06 | 131.08 |
| 175.0 | 473.0 | 224.0 | 2.0 | 4.0 | 2023-05-28 | 123.32 |
| 176.0 | 491.0 | 103.0 | 10.0 | 18.0 | 2024-06-21 | 447.41 |
| 177.0 | 78.0 | 1.0 | 13.0 | 13.0 | 2022-10-22 | 67.54 |
| 178.0 | 453.0 | 226.0 | 7.0 | 9.0 | 2023-03-19 | 439.0 |
| 179.0 | 291.0 | 21.0 | 15.0 | 16.0 | 2023-04-04 | 88.64 |
| 180.0 | 317.0 | 53.0 | 5.0 | 8.0 | 2023-05-02 | 28.39 |
| 181.0 | 13.0 | 81.0 | 5.0 | 3.0 | 2025-05-26 | 235.06 |
| 182.0 | 325.0 | 172.0 | 10.0 | 15.0 | 2025-03-07 | 94.07 |
| 183.0 | 229.0 | 20.0 | 13.0 | 14.0 | 2024-07-28 | 245.97 |
| 184.0 | 365.0 | 170.0 | 11.0 | 13.0 | 2024-07-21 | 67.54 |
| 185.0 | 404.0 | 42.0 | 5.0 | 18.0 | 2025-04-13 | 447.41 |
| 186.0 | 171.0 | 18.0 | 3.0 | 2.0 | 2024-05-23 | 64.91 |
| 187.0 | 145.0 | 183.0 | 3.0 | 4.0 | 2025-04-26 | 123.32 |
| 188.0 | 439.0 | 200.0 | 3.0 | 17.0 | 2025-09-21 | 177.82 |
| 189.0 | 544.0 | 18.0 | 7.0 | 10.0 | 2023-03-19 | 150.47 |
| 190.0 | 154.0 | 31.0 | 12.0 | 15.0 | 2023-02-07 | 94.07 |
| 191.0 | 574.0 | 104.0 | 5.0 | 12.0 | 2025-07-22 | 131.08 |
| 192.0 | 38.0 | 131.0 | 4.0 | 13.0 | 2024-02-14 | 67.54 |
| 193.0 | 52.0 | 17.0 | 12.0 | 12.0 | 2024-02-25 | 131.08 |
| 194.0 | 583.0 | 149.0 | 12.0 | 15.0 | 2023-03-12 | 94.07 |
| 195.0 | 266.0 | 143.0 | 2.0 | 15.0 | 2024-06-05 | 94.07 |
| 196.0 | 405.0 | 190.0 | 15.0 | 15.0 | 2024-04-03 | 94.07 |
| 197.0 | 464.0 | 189.0 | 13.0 | 3.0 | 2024-08-17 | 235.06 |
| 198.0 | 469.0 | 202.0 | 7.0 | 6.0 | 2025-02-03 | 217.32 |
| 199.0 | 254.0 | 98.0 | 9.0 | 15.0 | 2024-06-23 | 94.07 |
| 200.0 | 570.0 | 45.0 | 11.0 | 7.0 | 2024-11-25 | 47.42 |
| 201.0 | 389.0 | 65.0 | 15.0 | 16.0 | 2024-03-31 | 88.64 |
| 202.0 | 538.0 | 190.0 | 14.0 | 12.0 | 2024-12-09 | 131.08 |
| 203.0 | 202.0 | 120.0 | 2.0 | 15.0 | 2025-05-27 | 94.07 |
| 204.0 | 118.0 | 146.0 | 3.0 | 9.0 | 2024-01-06 | 439.0 |
| 205.0 | 62.0 | 175.0 | 10.0 | 18.0 | 2024-02-13 | 447.41 |
| 206.0 | 277.0 | 139.0 | 8.0 | 10.0 | 2025-01-15 | 150.47 |
| 207.0 | 399.0 | 86.0 | 8.0 | 10.0 | 2024-01-13 | 150.47 |
| 208.0 | 526.0 | 148.0 | 12.0 | 18.0 | 2023-06-25 | 447.41 |
| 209.0 | 343.0 | 90.0 | 5.0 | 17.0 | 2022-12-07 | 177.82 |
| 210.0 | 255.0 | 1.0 | 9.0 | 1.0 | 2022-12-20 | 90.29 |
| 211.0 | 589.0 | 114.0 | 8.0 | 10.0 | 2025-04-15 | 150.47 |
| 212.0 | 555.0 | 80.0 | 10.0 | 6.0 | 2025-07-07 | 217.32 |
| 213.0 | 585.0 | 168.0 | 15.0 | 11.0 | 2023-04-26 | 80.36 |
| 214.0 | 387.0 | 130.0 | 12.0 | 1.0 | 2023-12-06 | 90.29 |
| 215.0 | 529.0 | 12.0 | 10.0 | 14.0 | 2024-05-02 | 245.97 |
| 216.0 | 319.0 | 184.0 | 1.0 | 12.0 | 2025-03-23 | 131.08 |
| 217.0 | 74.0 | 76.0 | 4.0 | 15.0 | 2025-08-15 | 94.07 |
| 218.0 | 128.0 | 33.0 | 13.0 | 4.0 | 2024-03-24 | 123.32 |
| 219.0 | 13.0 | 81.0 | 10.0 | 1.0 | 2025-07-06 | 90.29 |
| 220.0 | 335.0 | 145.0 | 13.0 | 5.0 | 2024-10-03 | 292.3 |
| 221.0 | 291.0 | 21.0 | 8.0 | 6.0 | 2022-10-30 | 217.32 |
| 222.0 | 540.0 | 172.0 | 11.0 | 1.0 | 2023-04-05 | 90.29 |
| 223.0 | 99.0 | 42.0 | 15.0 | 14.0 | 2024-03-06 | 245.97 |
| 224.0 | 384.0 | 163.0 | 3.0 | 10.0 | 2023-04-18 | 150.47 |
| 225.0 | 59.0 | 142.0 | 11.0 | 11.0 | 2022-12-24 | 80.36 |
| 226.0 | 485.0 | 224.0 | 2.0 | 17.0 | 2023-02-07 | 177.82 |
| 227.0 | 123.0 | 209.0 | 6.0 | 15.0 | 2023-06-13 | 94.07 |
| 228.0 | 215.0 | 221.0 | 6.0 | 5.0 | 2023-12-09 | 292.3 |
| 229.0 | 405.0 | 190.0 | 11.0 | 15.0 | 2025-02-24 | 94.07 |
| 230.0 | 482.0 | 79.0 | 14.0 | 2.0 | 2024-11-01 | 64.91 |
| 231.0 | 266.0 | 143.0 | 6.0 | 18.0 | 2023-06-06 | 447.41 |
| 232.0 | 570.0 | 45.0 | 12.0 | 17.0 | 2022-12-17 | 177.82 |
| 233.0 | 410.0 | 144.0 | 5.0 | 17.0 | 2023-06-29 | 177.82 |
| 234.0 | 569.0 | 192.0 | 14.0 | 5.0 | 2025-07-13 | 292.3 |
| 235.0 | 600.0 | 73.0 | 8.0 | 14.0 | 2025-03-30 | 245.97 |
| 236.0 | 286.0 | 219.0 | 6.0 | 1.0 | 2024-04-28 | 90.29 |
| 237.0 | 551.0 | 32.0 | 6.0 | 3.0 | 2025-02-01 | 235.06 |
| 238.0 | 428.0 | 94.0 | 13.0 | 8.0 | 2023-06-22 | 28.39 |
| 239.0 | 389.0 | 65.0 | 14.0 | 4.0 | 2022-11-08 | 123.32 |
| 240.0 | 93.0 | 130.0 | 14.0 | 2.0 | 2025-09-24 | 64.91 |
| 241.0 | 413.0 | 20.0 | 11.0 | 18.0 | 2023-02-23 | 447.41 |
| 242.0 | 1.0 | 59.0 | 7.0 | 6.0 | 2025-06-07 | 217.32 |
| 243.0 | 399.0 | 86.0 | 4.0 | 10.0 | 2022-10-31 | 150.47 |
| 244.0 | 14.0 | 55.0 | 6.0 | 10.0 | 2022-12-11 | 150.47 |
| 245.0 | 69.0 | 69.0 | 11.0 | 11.0 | 2023-04-05 | 80.36 |
| 246.0 | 55.0 | 153.0 | 13.0 | 3.0 | 2025-06-13 | 235.06 |
| 247.0 | 495.0 | 18.0 | 4.0 | 7.0 | 2024-03-29 | 47.42 |
| 248.0 | 267.0 | 170.0 | 9.0 | 7.0 | 2025-01-01 | 47.42 |
| 249.0 | 358.0 | 168.0 | 15.0 | 10.0 | 2024-02-15 | 150.47 |
| 250.0 | 552.0 | 185.0 | 8.0 | 13.0 | 2023-01-08 | 67.54 |
| 251.0 | 403.0 | 68.0 | 2.0 | 10.0 | 2025-07-29 | 150.47 |
| 252.0 | 137.0 | 156.0 | 11.0 | 11.0 | 2024-05-24 | 80.36 |
| 253.0 | 568.0 | 174.0 | 12.0 | 9.0 | 2024-11-06 | 439.0 |
| 254.0 | 374.0 | 142.0 | 5.0 | 18.0 | 2025-08-29 | 447.41 |
| 255.0 | 461.0 | 206.0 | 9.0 | 5.0 | 2023-06-14 | 292.3 |
| 256.0 | 454.0 | 106.0 | 2.0 | 14.0 | 2024-06-23 | 245.97 |
| 257.0 | 170.0 | 59.0 | 14.0 | 5.0 | 2025-02-06 | 292.3 |
| 258.0 | 145.0 | 183.0 | 8.0 | 12.0 | 2025-01-29 | 131.08 |
| 259.0 | 411.0 | 3.0 | 11.0 | 16.0 | 2024-11-15 | 88.64 |
| 260.0 | 496.0 | 198.0 | 8.0 | 10.0 | 2024-02-07 | 150.47 |
| 261.0 | 231.0 | 207.0 | 9.0 | 15.0 | 2024-03-16 | 94.07 |
| 262.0 | 523.0 | 131.0 | 7.0 | 18.0 | 2023-01-12 | 447.41 |
| 263.0 | 596.0 | 189.0 | 8.0 | 2.0 | 2024-05-15 | 64.91 |
| 264.0 | 403.0 | 68.0 | 8.0 | 2.0 | 2024-12-04 | 64.91 |
| 265.0 | 580.0 | 54.0 | 7.0 | 12.0 | 2024-09-01 | 131.08 |
| 266.0 | 370.0 | 30.0 | 15.0 | 4.0 | 2022-11-21 | 123.32 |
| 267.0 | 531.0 | 112.0 | 12.0 | 7.0 | 2024-12-21 | 47.42 |
| 268.0 | 251.0 | 103.0 | 14.0 | 17.0 | 2025-05-07 | 177.82 |
| 269.0 | 498.0 | 90.0 | 5.0 | 13.0 | 2023-05-31 | 67.54 |
| 270.0 | 570.0 | 45.0 | 6.0 | 1.0 | 2022-11-22 | 90.29 |
| 271.0 | 295.0 | 153.0 | 5.0 | 4.0 | 2025-09-21 | 123.32 |
| 272.0 | 423.0 | 38.0 | 5.0 | 5.0 | 2024-01-24 | 292.3 |
| 273.0 | 373.0 | 191.0 | 14.0 | 6.0 | 2022-12-29 | 217.32 |
| 274.0 | 504.0 | 138.0 | 14.0 | 8.0 | 2024-11-26 | 28.39 |
| 275.0 | 455.0 | 7.0 | 8.0 | 10.0 | 2023-01-09 | 150.47 |
| 276.0 | 142.0 | 187.0 | 6.0 | 11.0 | 2023-11-16 | 80.36 |
| 277.0 | 353.0 | 140.0 | 9.0 | 17.0 | 2023-08-16 | 177.82 |
| 278.0 | 360.0 | 3.0 | 8.0 | 13.0 | 2023-12-07 | 67.54 |
| 279.0 | 533.0 | 134.0 | 14.0 | 7.0 | 2024-09-05 | 47.42 |
| 280.0 | 57.0 | 136.0 | 12.0 | 18.0 | 2024-05-25 | 447.41 |
| 281.0 | 144.0 | 52.0 | 10.0 | 18.0 | 2023-08-04 | 447.41 |
| 282.0 | 26.0 | 144.0 | 4.0 | 13.0 | 2023-06-08 | 67.54 |
| 283.0 | 599.0 | 22.0 | 1.0 | 12.0 | 2023-12-15 | 131.08 |
| 284.0 | 591.0 | 55.0 | 12.0 | 17.0 | 2023-02-01 | 177.82 |
| 285.0 | 128.0 | 33.0 | 12.0 | 16.0 | 2023-08-08 | 88.64 |
| 286.0 | 143.0 | 177.0 | 7.0 | 10.0 | 2024-11-19 | 150.47 |
| 287.0 | 420.0 | 95.0 | 8.0 | 12.0 | 2025-07-13 | 131.08 |
| 288.0 | 177.0 | 61.0 | 3.0 | 18.0 | 2022-12-03 | 447.41 |
| 289.0 | 455.0 | 7.0 | 10.0 | 17.0 | 2023-11-17 | 177.82 |
| 290.0 | 563.0 | 33.0 | 14.0 | 17.0 | 2025-03-05 | 177.82 |
| 291.0 | 197.0 | 169.0 | 14.0 | 3.0 | 2023-04-09 | 235.06 |
| 292.0 | 376.0 | 70.0 | 2.0 | 10.0 | 2022-10-15 | 150.47 |
| 293.0 | 24.0 | 64.0 | 15.0 | 9.0 | 2023-03-06 | 439.0 |
| 294.0 | 496.0 | 198.0 | 1.0 | 10.0 | 2024-12-05 | 150.47 |
| 295.0 | 301.0 | 31.0 | 7.0 | 4.0 | 2024-11-14 | 123.32 |
| 296.0 | 502.0 | 174.0 | 2.0 | 12.0 | 2023-02-08 | 131.08 |
| 297.0 | 446.0 | 40.0 | 13.0 | 10.0 | 2024-04-02 | 150.47 |
| 298.0 | 581.0 | 111.0 | 6.0 | 7.0 | 2023-07-05 | 47.42 |
| 299.0 | 198.0 | 111.0 | 11.0 | 5.0 | 2025-04-15 | 292.3 |
| 300.0 | 361.0 | 171.0 | 14.0 | 5.0 | 2023-11-24 | 292.3 |
| 301.0 | 253.0 | 43.0 | 14.0 | 7.0 | 2022-09-30 | 47.42 |
| 302.0 | 58.0 | 65.0 | 7.0 | 6.0 | 2023-12-18 | 217.32 |
| 303.0 | 426.0 | 11.0 | 11.0 | 11.0 | 2023-01-01 | 80.36 |
| 304.0 | 325.0 | 172.0 | 14.0 | 3.0 | 2025-07-15 | 235.06 |
| 305.0 | 198.0 | 111.0 | 10.0 | 4.0 | 2025-05-09 | 123.32 |
| 306.0 | 65.0 | 175.0 | 4.0 | 15.0 | 2024-02-16 | 94.07 |
| 307.0 | 331.0 | 19.0 | 4.0 | 9.0 | 2025-03-25 | 439.0 |
| 308.0 | 340.0 | 130.0 | 7.0 | 14.0 | 2025-03-09 | 245.97 |
| 309.0 | 474.0 | 10.0 | 13.0 | 18.0 | 2025-03-05 | 447.41 |
| 310.0 | 300.0 | 104.0 | 8.0 | 13.0 | 2024-10-21 | 67.54 |
| 311.0 | 173.0 | 221.0 | 12.0 | 4.0 | 2024-01-22 | 123.32 |
| 312.0 | 387.0 | 130.0 | 15.0 | 7.0 | 2025-07-29 | 47.42 |
| 313.0 | 225.0 | 72.0 | 1.0 | 5.0 | 2023-12-02 | 292.3 |
| 314.0 | 161.0 | 142.0 | 13.0 | 14.0 | 2025-06-04 | 245.97 |
| 315.0 | 70.0 | 197.0 | 5.0 | 3.0 | 2023-09-23 | 235.06 |
| 316.0 | 197.0 | 169.0 | 6.0 | 9.0 | 2023-04-28 | 439.0 |
| 317.0 | 180.0 | 125.0 | 3.0 | 9.0 | 2024-05-14 | 439.0 |
| 318.0 | 182.0 | 139.0 | 9.0 | 3.0 | 2023-06-06 | 235.06 |
| 319.0 | 205.0 | 14.0 | 10.0 | 10.0 | 2024-09-23 | 150.47 |
| 320.0 | 215.0 | 221.0 | 3.0 | 15.0 | 2024-10-03 | 94.07 |
| 321.0 | 156.0 | 58.0 | 2.0 | 15.0 | 2023-08-05 | 94.07 |
| 322.0 | 185.0 | 226.0 | 10.0 | 6.0 | 2024-05-21 | 217.32 |
| 323.0 | 103.0 | 1.0 | 8.0 | 4.0 | 2024-12-07 | 123.32 |
| 324.0 | 464.0 | 189.0 | 4.0 | 9.0 | 2023-02-25 | 439.0 |
| 325.0 | 497.0 | 72.0 | 11.0 | 4.0 | 2024-04-24 | 123.32 |
| 326.0 | 193.0 | 105.0 | 8.0 | 8.0 | 2024-04-22 | 28.39 |
| 327.0 | 446.0 | 40.0 | 11.0 | 2.0 | 2025-09-07 | 64.91 |
| 328.0 | 63.0 | 185.0 | 15.0 | 14.0 | 2023-02-17 | 245.97 |
| 329.0 | 36.0 | 57.0 | 15.0 | 1.0 | 2024-02-15 | 90.29 |
| 330.0 | 146.0 | 80.0 | 11.0 | 7.0 | 2024-11-07 | 47.42 |
| 331.0 | 26.0 | 144.0 | 2.0 | 9.0 | 2023-04-06 | 439.0 |
| 332.0 | 144.0 | 52.0 | 6.0 | 7.0 | 2024-01-23 | 47.42 |
| 333.0 | 404.0 | 42.0 | 11.0 | 9.0 | 2023-05-12 | 439.0 |
| 334.0 | 164.0 | 57.0 | 12.0 | 9.0 | 2024-05-02 | 439.0 |
| 335.0 | 230.0 | 114.0 | 8.0 | 18.0 | 2024-01-17 | 447.41 |
| 336.0 | 430.0 | 221.0 | 4.0 | 13.0 | 2023-08-01 | 67.54 |
| 337.0 | 581.0 | 111.0 | 14.0 | 10.0 | 2023-01-11 | 150.47 |
| 338.0 | 17.0 | 102.0 | 2.0 | 1.0 | 2024-05-29 | 90.29 |
| 339.0 | 46.0 | 161.0 | 7.0 | 15.0 | 2023-09-22 | 94.07 |
| 340.0 | 453.0 | 226.0 | 10.0 | 16.0 | 2024-01-30 | 88.64 |
| 341.0 | 310.0 | 108.0 | 12.0 | 3.0 | 2024-01-31 | 235.06 |
| 342.0 | 578.0 | 78.0 | 1.0 | 12.0 | 2023-07-09 | 131.08 |
| 343.0 | 216.0 | 28.0 | 5.0 | 1.0 | 2025-09-10 | 90.29 |
| 344.0 | 318.0 | 172.0 | 10.0 | 17.0 | 2025-06-18 | 177.82 |
| 345.0 | 233.0 | 220.0 | 15.0 | 7.0 | 2022-12-14 | 47.42 |
| 346.0 | 455.0 | 7.0 | 14.0 | 10.0 | 2024-02-18 | 150.47 |
| 347.0 | 148.0 | 172.0 | 13.0 | 12.0 | 2024-06-12 | 131.08 |
| 348.0 | 585.0 | 168.0 | 10.0 | 18.0 | 2023-10-06 | 447.41 |
| 349.0 | 449.0 | 42.0 | 4.0 | 11.0 | 2024-09-02 | 80.36 |
| 350.0 | 518.0 | 187.0 | 10.0 | 3.0 | 2024-05-01 | 235.06 |
| 351.0 | 163.0 | 151.0 | 11.0 | 9.0 | 2024-12-20 | 439.0 |
| 352.0 | 63.0 | 185.0 | 11.0 | 12.0 | 2025-03-12 | 131.08 |
| 353.0 | 81.0 | 185.0 | 15.0 | 8.0 | 2025-07-08 | 28.39 |
| 354.0 | 161.0 | 142.0 | 5.0 | 12.0 | 2023-04-08 | 131.08 |
| 355.0 | 438.0 | 91.0 | 1.0 | 15.0 | 2023-09-10 | 94.07 |
| 356.0 | 207.0 | 168.0 | 12.0 | 5.0 | 2024-12-31 | 292.3 |
| 357.0 | 418.0 | 10.0 | 2.0 | 16.0 | 2024-01-31 | 88.64 |
| 358.0 | 557.0 | 105.0 | 6.0 | 7.0 | 2023-05-30 | 47.42 |
| 359.0 | 497.0 | 72.0 | 3.0 | 15.0 | 2024-08-11 | 94.07 |
| 360.0 | 102.0 | 136.0 | 3.0 | 10.0 | 2023-09-08 | 150.47 |
| 361.0 | 252.0 | 16.0 | 9.0 | 11.0 | 2022-12-04 | 80.36 |
| 362.0 | 57.0 | 136.0 | 15.0 | 11.0 | 2024-03-17 | 80.36 |
| 363.0 | 247.0 | 125.0 | 14.0 | 2.0 | 2024-10-25 | 64.91 |
| 364.0 | 572.0 | 146.0 | 5.0 | 4.0 | 2023-01-14 | 123.32 |
| 365.0 | 329.0 | 81.0 | 13.0 | 6.0 | 2024-01-31 | 217.32 |
| 366.0 | 395.0 | 213.0 | 12.0 | 9.0 | 2023-11-03 | 439.0 |
| 367.0 | 225.0 | 72.0 | 13.0 | 16.0 | 2025-02-03 | 88.64 |
| 368.0 | 408.0 | 181.0 | 8.0 | 9.0 | 2025-04-25 | 439.0 |
| 369.0 | 8.0 | 17.0 | 3.0 | 16.0 | 2024-06-21 | 88.64 |
| 370.0 | 316.0 | 67.0 | 14.0 | 6.0 | 2023-07-06 | 217.32 |
| 371.0 | 350.0 | 41.0 | 14.0 | 5.0 | 2023-09-08 | 292.3 |
| 372.0 | 365.0 | 170.0 | 2.0 | 8.0 | 2023-07-11 | 28.39 |
| 373.0 | 216.0 | 28.0 | 1.0 | 12.0 | 2024-04-03 | 131.08 |
| 374.0 | 289.0 | 15.0 | 9.0 | 18.0 | 2025-01-16 | 447.41 |
| 375.0 | 17.0 | 102.0 | 8.0 | 11.0 | 2023-09-03 | 80.36 |
| 376.0 | 94.0 | 156.0 | 11.0 | 3.0 | 2024-04-08 | 235.06 |
| 377.0 | 532.0 | 1.0 | 10.0 | 10.0 | 2023-08-08 | 150.47 |
| 378.0 | 341.0 | 68.0 | 14.0 | 14.0 | 2023-08-28 | 245.97 |
| 379.0 | 517.0 | 89.0 | 2.0 | 5.0 | 2024-06-05 | 292.3 |
| 380.0 | 259.0 | 201.0 | 8.0 | 8.0 | 2025-08-06 | 28.39 |
| 381.0 | 383.0 | 176.0 | 10.0 | 17.0 | 2023-11-25 | 177.82 |
| 382.0 | 467.0 | 69.0 | 15.0 | 15.0 | 2024-06-30 | 94.07 |
| 383.0 | 385.0 | 219.0 | 11.0 | 3.0 | 2025-05-20 | 235.06 |
| 384.0 | 351.0 | 113.0 | 11.0 | 7.0 | 2023-02-19 | 47.42 |
| 385.0 | 484.0 | 204.0 | 15.0 | 5.0 | 2024-01-17 | 292.3 |
| 386.0 | 300.0 | 104.0 | 11.0 | 1.0 | 2023-06-13 | 90.29 |
| 387.0 | 36.0 | 57.0 | 2.0 | 15.0 | 2024-12-14 | 94.07 |
| 388.0 | 405.0 | 190.0 | 1.0 | 16.0 | 2025-07-12 | 88.64 |
| 389.0 | 149.0 | 167.0 | 5.0 | 3.0 | 2022-12-23 | 235.06 |
| 390.0 | 549.0 | 170.0 | 2.0 | 13.0 | 2025-03-11 | 67.54 |
| 391.0 | 457.0 | 189.0 | 4.0 | 4.0 | 2024-12-23 | 123.32 |
| 392.0 | 541.0 | 51.0 | 7.0 | 8.0 | 2023-03-12 | 28.39 |
| 393.0 | 245.0 | 43.0 | 6.0 | 13.0 | 2023-05-22 | 67.54 |
| 394.0 | 406.0 | 114.0 | 10.0 | 17.0 | 2024-11-14 | 177.82 |
| 395.0 | 560.0 | 179.0 | 15.0 | 1.0 | 2023-05-31 | 90.29 |
| 396.0 | 66.0 | 227.0 | 11.0 | 10.0 | 2025-03-08 | 150.47 |
| 397.0 | 39.0 | 127.0 | 14.0 | 4.0 | 2022-12-29 | 123.32 |
| 398.0 | 518.0 | 187.0 | 10.0 | 10.0 | 2023-06-14 | 150.47 |
| 399.0 | 253.0 | 43.0 | 5.0 | 1.0 | 2025-07-21 | 90.29 |
| 400.0 | 482.0 | 79.0 | 12.0 | 5.0 | 2023-08-30 | 292.3 |
| 401.0 | 155.0 | 64.0 | 4.0 | 9.0 | 2023-04-02 | 439.0 |
| 402.0 | 552.0 | 185.0 | 8.0 | 11.0 | 2024-05-31 | 80.36 |
| 403.0 | 71.0 | 165.0 | 14.0 | 14.0 | 2023-09-15 | 245.97 |
| 404.0 | 519.0 | 202.0 | 2.0 | 5.0 | 2023-09-05 | 292.3 |
| 405.0 | 367.0 | 225.0 | 9.0 | 17.0 | 2023-09-23 | 177.82 |
| 406.0 | 364.0 | 77.0 | 1.0 | 8.0 | 2023-07-04 | 28.39 |
| 407.0 | 580.0 | 54.0 | 5.0 | 8.0 | 2024-09-03 | 28.39 |
| 408.0 | 486.0 | 59.0 | 2.0 | 8.0 | 2023-03-10 | 28.39 |
| 409.0 | 449.0 | 42.0 | 2.0 | 9.0 | 2024-07-19 | 439.0 |
| 410.0 | 104.0 | 154.0 | 11.0 | 17.0 | 2025-08-14 | 177.82 |
| 411.0 | 23.0 | 36.0 | 1.0 | 15.0 | 2023-11-13 | 94.07 |
| 412.0 | 454.0 | 106.0 | 4.0 | 7.0 | 2025-01-12 | 47.42 |
| 413.0 | 479.0 | 210.0 | 13.0 | 16.0 | 2024-08-02 | 88.64 |
| 414.0 | 462.0 | 172.0 | 2.0 | 9.0 | 2024-07-29 | 439.0 |
| 415.0 | 393.0 | 163.0 | 10.0 | 14.0 | 2024-07-11 | 245.97 |
| 416.0 | 565.0 | 108.0 | 14.0 | 12.0 | 2024-06-06 | 131.08 |
| 417.0 | 408.0 | 181.0 | 6.0 | 1.0 | 2024-11-28 | 90.29 |
| 418.0 | 474.0 | 10.0 | 13.0 | 13.0 | 2025-09-21 | 67.54 |
| 419.0 | 398.0 | 1.0 | 5.0 | 10.0 | 2024-12-04 | 150.47 |
| 420.0 | 482.0 | 79.0 | 3.0 | 10.0 | 2024-05-01 | 150.47 |
| 421.0 | 584.0 | 156.0 | 13.0 | 8.0 | 2024-10-04 | 28.39 |
| 422.0 | 441.0 | 227.0 | 2.0 | 5.0 | 2025-08-05 | 292.3 |
| 423.0 | 216.0 | 28.0 | 3.0 | 10.0 | 2025-08-27 | 150.47 |
| 424.0 | 502.0 | 174.0 | 6.0 | 6.0 | 2024-05-27 | 217.32 |
| 425.0 | 335.0 | 145.0 | 10.0 | 12.0 | 2023-12-03 | 131.08 |
| 426.0 | 409.0 | 110.0 | 1.0 | 6.0 | 2024-10-05 | 217.32 |
| 427.0 | 293.0 | 48.0 | 5.0 | 15.0 | 2025-06-11 | 94.07 |
| 428.0 | 160.0 | 151.0 | 3.0 | 7.0 | 2023-05-18 | 47.42 |
| 429.0 | 534.0 | 207.0 | 9.0 | 4.0 | 2025-02-06 | 123.32 |
| 430.0 | 252.0 | 16.0 | 12.0 | 15.0 | 2025-05-19 | 94.07 |
| 431.0 | 356.0 | 157.0 | 8.0 | 8.0 | 2023-03-23 | 28.39 |
| 432.0 | 198.0 | 111.0 | 13.0 | 5.0 | 2023-09-16 | 292.3 |
| 433.0 | 469.0 | 202.0 | 9.0 | 16.0 | 2025-02-15 | 88.64 |
| 434.0 | 366.0 | 27.0 | 8.0 | 1.0 | 2022-11-30 | 90.29 |
| 435.0 | 86.0 | 130.0 | 4.0 | 9.0 | 2025-06-30 | 439.0 |
| 436.0 | 260.0 | 117.0 | 12.0 | 11.0 | 2022-10-25 | 80.36 |
| 437.0 | 29.0 | 192.0 | 5.0 | 9.0 | 2023-03-03 | 439.0 |
| 438.0 | 426.0 | 11.0 | 11.0 | 15.0 | 2025-07-25 | 94.07 |
| 439.0 | 101.0 | 200.0 | 1.0 | 14.0 | 2023-01-20 | 245.97 |
| 440.0 | 479.0 | 210.0 | 14.0 | 15.0 | 2023-06-27 | 94.07 |
| 441.0 | 308.0 | 159.0 | 7.0 | 9.0 | 2025-02-17 | 439.0 |
| 442.0 | 536.0 | 176.0 | 8.0 | 4.0 | 2023-04-02 | 123.32 |
| 443.0 | 600.0 | 73.0 | 2.0 | 16.0 | 2025-04-14 | 88.64 |
| 444.0 | 175.0 | 19.0 | 6.0 | 1.0 | 2024-11-27 | 90.29 |
| 445.0 | 539.0 | 189.0 | 2.0 | 6.0 | 2025-01-11 | 217.32 |
| 446.0 | 455.0 | 7.0 | 5.0 | 13.0 | 2023-12-01 | 67.54 |
| 447.0 | 115.0 | 15.0 | 7.0 | 8.0 | 2022-10-06 | 28.39 |
| 448.0 | 151.0 | 113.0 | 5.0 | 3.0 | 2023-03-12 | 235.06 |
| 449.0 | 94.0 | 156.0 | 9.0 | 10.0 | 2023-04-29 | 150.47 |
| 450.0 | 162.0 | 59.0 | 2.0 | 16.0 | 2025-02-04 | 88.64 |
| 451.0 | 259.0 | 201.0 | 14.0 | 15.0 | 2024-07-13 | 94.07 |
| 452.0 | 127.0 | 197.0 | 7.0 | 2.0 | 2023-03-17 | 64.91 |
| 453.0 | 366.0 | 27.0 | 15.0 | 4.0 | 2024-06-16 | 123.32 |
| 454.0 | 594.0 | 204.0 | 7.0 | 17.0 | 2023-11-02 | 177.82 |
| 455.0 | 450.0 | 205.0 | 14.0 | 2.0 | 2023-03-13 | 64.91 |
| 456.0 | 481.0 | 90.0 | 7.0 | 6.0 | 2023-05-29 | 217.32 |
| 457.0 | 182.0 | 139.0 | 12.0 | 6.0 | 2025-03-16 | 217.32 |
| 458.0 | 302.0 | 228.0 | 6.0 | 14.0 | 2023-05-06 | 245.97 |
| 459.0 | 166.0 | 19.0 | 6.0 | 12.0 | 2024-04-22 | 131.08 |
| 460.0 | 418.0 | 10.0 | 6.0 | 16.0 | 2024-11-18 | 88.64 |
| 461.0 | 480.0 | 118.0 | 11.0 | 11.0 | 2023-01-29 | 80.36 |
| 462.0 | 184.0 | 186.0 | 2.0 | 1.0 | 2025-03-24 | 90.29 |
| 463.0 | 9.0 | 55.0 | 14.0 | 12.0 | 2025-04-05 | 131.08 |
| 464.0 | 589.0 | 114.0 | 2.0 | 12.0 | 2023-04-26 | 131.08 |
| 465.0 | 426.0 | 11.0 | 2.0 | 8.0 | 2023-08-25 | 28.39 |
| 466.0 | 120.0 | 22.0 | 13.0 | 13.0 | 2025-01-03 | 67.54 |
| 467.0 | 332.0 | 3.0 | 9.0 | 4.0 | 2025-05-27 | 123.32 |
| 468.0 | 18.0 | 227.0 | 10.0 | 2.0 | 2023-11-21 | 64.91 |
| 469.0 | 311.0 | 169.0 | 11.0 | 14.0 | 2025-01-19 | 245.97 |
| 470.0 | 491.0 | 103.0 | 7.0 | 5.0 | 2023-10-03 | 292.3 |
| 471.0 | 93.0 | 130.0 | 14.0 | 8.0 | 2023-05-14 | 28.39 |
| 472.0 | 351.0 | 113.0 | 14.0 | 13.0 | 2025-06-13 | 67.54 |
| 473.0 | 130.0 | 169.0 | 5.0 | 15.0 | 2023-12-27 | 94.07 |
| 474.0 | 98.0 | 196.0 | 6.0 | 3.0 | 2025-02-26 | 235.06 |
| 475.0 | 24.0 | 64.0 | 10.0 | 13.0 | 2022-11-22 | 67.54 |
| 476.0 | 511.0 | 149.0 | 4.0 | 8.0 | 2024-11-14 | 28.39 |
| 477.0 | 166.0 | 19.0 | 11.0 | 4.0 | 2023-01-13 | 123.32 |
| 478.0 | 557.0 | 105.0 | 4.0 | 14.0 | 2025-02-17 | 245.97 |
| 479.0 | 320.0 | 81.0 | 6.0 | 9.0 | 2023-09-05 | 439.0 |
| 480.0 | 435.0 | 64.0 | 2.0 | 17.0 | 2024-03-05 | 177.82 |
| 481.0 | 531.0 | 112.0 | 10.0 | 4.0 | 2024-06-20 | 123.32 |
| 482.0 | 312.0 | 150.0 | 13.0 | 16.0 | 2023-05-02 | 88.64 |
| 483.0 | 168.0 | 162.0 | 14.0 | 11.0 | 2025-08-04 | 80.36 |
| 484.0 | 208.0 | 166.0 | 10.0 | 4.0 | 2024-03-28 | 123.32 |
| 485.0 | 166.0 | 19.0 | 1.0 | 9.0 | 2024-09-22 | 439.0 |
| 486.0 | 361.0 | 171.0 | 5.0 | 14.0 | 2024-01-03 | 245.97 |
| 487.0 | 423.0 | 38.0 | 15.0 | 10.0 | 2023-11-01 | 150.47 |
| 488.0 | 44.0 | 29.0 | 6.0 | 5.0 | 2025-09-14 | 292.3 |
| 489.0 | 508.0 | 225.0 | 3.0 | 10.0 | 2024-12-07 | 150.47 |
| 490.0 | 490.0 | 50.0 | 10.0 | 18.0 | 2023-06-29 | 447.41 |
| 491.0 | 350.0 | 41.0 | 2.0 | 17.0 | 2024-12-10 | 177.82 |
| 492.0 | 137.0 | 156.0 | 12.0 | 1.0 | 2025-07-26 | 90.29 |
| 493.0 | 229.0 | 20.0 | 2.0 | 17.0 | 2022-10-06 | 177.82 |
| 494.0 | 208.0 | 166.0 | 4.0 | 16.0 | 2023-08-18 | 88.64 |
| 495.0 | 351.0 | 113.0 | 7.0 | 7.0 | 2023-03-12 | 47.42 |
| 496.0 | 378.0 | 155.0 | 6.0 | 5.0 | 2024-11-08 | 292.3 |
| 497.0 | 544.0 | 18.0 | 6.0 | 4.0 | 2023-12-28 | 123.32 |
| 498.0 | 556.0 | 171.0 | 12.0 | 16.0 | 2023-12-02 | 88.64 |
| 499.0 | 370.0 | 30.0 | 13.0 | 2.0 | 2025-04-06 | 64.91 |
| 500.0 | 202.0 | 120.0 | 15.0 | 10.0 | 2025-06-11 | 150.47 |
| 501.0 | 408.0 | 181.0 | 3.0 | 3.0 | 2024-11-08 | 235.06 |
| 502.0 | 135.0 | 136.0 | 13.0 | 2.0 | 2025-06-17 | 64.91 |
| 503.0 | 479.0 | 210.0 | 11.0 | 13.0 | 2025-04-12 | 67.54 |
| 504.0 | 542.0 | 94.0 | 5.0 | 13.0 | 2023-04-03 | 67.54 |
| 505.0 | 354.0 | 181.0 | 11.0 | 16.0 | 2023-05-12 | 88.64 |
| 506.0 | 130.0 | 169.0 | 8.0 | 10.0 | 2023-04-05 | 150.47 |
| 507.0 | 477.0 | 57.0 | 7.0 | 4.0 | 2024-03-16 | 123.32 |
| 508.0 | 345.0 | 18.0 | 4.0 | 9.0 | 2022-11-12 | 439.0 |
| 509.0 | 224.0 | 47.0 | 2.0 | 17.0 | 2023-10-21 | 177.82 |
| 510.0 | 371.0 | 228.0 | 7.0 | 16.0 | 2025-02-11 | 88.64 |
| 511.0 | 451.0 | 208.0 | 5.0 | 2.0 | 2023-01-04 | 64.91 |
| 512.0 | 102.0 | 136.0 | 9.0 | 15.0 | 2024-01-04 | 94.07 |
| 513.0 | 23.0 | 36.0 | 1.0 | 18.0 | 2024-07-02 | 447.41 |
| 514.0 | 45.0 | 40.0 | 7.0 | 8.0 | 2025-06-06 | 28.39 |
| 515.0 | 63.0 | 185.0 | 1.0 | 5.0 | 2024-08-04 | 292.3 |
| 516.0 | 454.0 | 106.0 | 5.0 | 1.0 | 2024-07-21 | 90.29 |
| 517.0 | 466.0 | 64.0 | 13.0 | 7.0 | 2024-12-19 | 47.42 |
| 518.0 | 371.0 | 228.0 | 13.0 | 14.0 | 2024-04-21 | 245.97 |
| 519.0 | 596.0 | 189.0 | 5.0 | 5.0 | 2023-11-25 | 292.3 |
| 520.0 | 67.0 | 138.0 | 2.0 | 5.0 | 2025-09-11 | 292.3 |
| 521.0 | 5.0 | 81.0 | 8.0 | 14.0 | 2023-04-29 | 245.97 |
| 522.0 | 510.0 | 46.0 | 3.0 | 15.0 | 2025-01-05 | 94.07 |
| 523.0 | 551.0 | 32.0 | 7.0 | 1.0 | 2022-10-02 | 90.29 |
| 524.0 | 376.0 | 70.0 | 12.0 | 16.0 | 2024-06-12 | 88.64 |
| 525.0 | 368.0 | 35.0 | 9.0 | 11.0 | 2023-10-02 | 80.36 |
| 526.0 | 490.0 | 50.0 | 2.0 | 2.0 | 2023-07-06 | 64.91 |
| 527.0 | 334.0 | 160.0 | 14.0 | 4.0 | 2025-07-02 | 123.32 |
| 528.0 | 426.0 | 11.0 | 7.0 | 11.0 | 2025-08-19 | 80.36 |
| 529.0 | 502.0 | 174.0 | 8.0 | 17.0 | 2025-04-20 | 177.82 |
| 530.0 | 85.0 | 46.0 | 14.0 | 14.0 | 2023-12-25 | 245.97 |
| 531.0 | 591.0 | 55.0 | 10.0 | 11.0 | 2023-05-01 | 80.36 |
| 532.0 | 587.0 | 120.0 | 10.0 | 3.0 | 2023-06-21 | 235.06 |
| 533.0 | 596.0 | 189.0 | 12.0 | 8.0 | 2023-05-25 | 28.39 |
| 534.0 | 50.0 | 109.0 | 5.0 | 15.0 | 2025-02-03 | 94.07 |
| 535.0 | 447.0 | 61.0 | 7.0 | 17.0 | 2025-08-15 | 177.82 |
| 536.0 | 306.0 | 153.0 | 6.0 | 12.0 | 2024-10-10 | 131.08 |
| 537.0 | 126.0 | 137.0 | 13.0 | 11.0 | 2023-02-27 | 80.36 |
| 538.0 | 392.0 | 24.0 | 14.0 | 5.0 | 2023-09-16 | 292.3 |
| 539.0 | 169.0 | 16.0 | 2.0 | 12.0 | 2023-04-16 | 131.08 |
| 540.0 | 546.0 | 85.0 | 14.0 | 1.0 | 2025-02-22 | 90.29 |
| 541.0 | 596.0 | 189.0 | 4.0 | 15.0 | 2023-04-18 | 94.07 |
| 542.0 | 82.0 | 68.0 | 10.0 | 14.0 | 2023-06-29 | 245.97 |
| 543.0 | 475.0 | 220.0 | 9.0 | 4.0 | 2025-04-18 | 123.32 |
| 544.0 | 96.0 | 40.0 | 7.0 | 8.0 | 2023-12-31 | 28.39 |
| 545.0 | 169.0 | 16.0 | 12.0 | 9.0 | 2023-11-01 | 439.0 |
| 546.0 | 39.0 | 127.0 | 4.0 | 5.0 | 2023-11-14 | 292.3 |
| 547.0 | 151.0 | 113.0 | 13.0 | 18.0 | 2024-10-17 | 447.41 |
| 548.0 | 242.0 | 193.0 | 2.0 | 3.0 | 2022-11-16 | 235.06 |
| 549.0 | 577.0 | 1.0 | 11.0 | 5.0 | 2025-02-05 | 292.3 |
| 550.0 | 570.0 | 45.0 | 9.0 | 13.0 | 2022-11-17 | 67.54 |
| 551.0 | 89.0 | 161.0 | 4.0 | 17.0 | 2023-10-12 | 177.82 |
| 552.0 | 43.0 | 221.0 | 6.0 | 7.0 | 2024-11-28 | 47.42 |
| 553.0 | 274.0 | 15.0 | 4.0 | 1.0 | 2025-02-28 | 90.29 |
| 554.0 | 418.0 | 10.0 | 3.0 | 14.0 | 2024-04-20 | 245.97 |
| 555.0 | 338.0 | 138.0 | 4.0 | 10.0 | 2024-10-06 | 150.47 |
| 556.0 | 130.0 | 169.0 | 10.0 | 1.0 | 2024-11-17 | 90.29 |
| 557.0 | 151.0 | 113.0 | 13.0 | 12.0 | 2025-04-25 | 131.08 |
| 558.0 | 479.0 | 210.0 | 3.0 | 2.0 | 2022-12-20 | 64.91 |
| 559.0 | 455.0 | 7.0 | 8.0 | 16.0 | 2023-03-22 | 88.64 |
| 560.0 | 360.0 | 3.0 | 11.0 | 11.0 | 2023-12-05 | 80.36 |
| 561.0 | 355.0 | 78.0 | 14.0 | 15.0 | 2023-12-19 | 94.07 |
| 562.0 | 537.0 | 185.0 | 3.0 | 10.0 | 2023-04-10 | 150.47 |
| 563.0 | 372.0 | 28.0 | 2.0 | 12.0 | 2023-02-09 | 131.08 |
| 564.0 | 453.0 | 226.0 | 8.0 | 4.0 | 2024-01-15 | 123.32 |
| 565.0 | 393.0 | 163.0 | 13.0 | 6.0 | 2024-03-13 | 217.32 |
| 566.0 | 493.0 | 72.0 | 10.0 | 18.0 | 2025-06-03 | 447.41 |
| 567.0 | 379.0 | 54.0 | 6.0 | 12.0 | 2022-11-22 | 131.08 |
| 568.0 | 561.0 | 76.0 | 2.0 | 5.0 | 2023-12-31 | 292.3 |
| 569.0 | 413.0 | 20.0 | 8.0 | 2.0 | 2023-03-16 | 64.91 |
| 570.0 | 74.0 | 76.0 | 1.0 | 15.0 | 2025-06-02 | 94.07 |
| 571.0 | 241.0 | 24.0 | 6.0 | 7.0 | 2024-02-17 | 47.42 |
| 572.0 | 196.0 | 25.0 | 2.0 | 6.0 | 2025-03-26 | 217.32 |
| 573.0 | 61.0 | 3.0 | 10.0 | 12.0 | 2022-11-23 | 131.08 |
| 574.0 | 204.0 | 187.0 | 7.0 | 11.0 | 2023-02-22 | 80.36 |
| 575.0 | 273.0 | 56.0 | 10.0 | 2.0 | 2025-07-04 | 64.91 |
| 576.0 | 133.0 | 43.0 | 8.0 | 5.0 | 2024-09-06 | 292.3 |
| 577.0 | 358.0 | 168.0 | 6.0 | 18.0 | 2023-01-26 | 447.41 |
| 578.0 | 532.0 | 1.0 | 9.0 | 9.0 | 2024-11-22 | 439.0 |
| 579.0 | 76.0 | 41.0 | 1.0 | 4.0 | 2023-03-19 | 123.32 |
| 580.0 | 166.0 | 19.0 | 2.0 | 13.0 | 2023-10-24 | 67.54 |
| 581.0 | 443.0 | 105.0 | 12.0 | 15.0 | 2025-04-07 | 94.07 |
| 582.0 | 303.0 | 146.0 | 9.0 | 14.0 | 2024-10-08 | 245.97 |
| 583.0 | 75.0 | 112.0 | 1.0 | 12.0 | 2024-05-07 | 131.08 |
| 584.0 | 442.0 | 224.0 | 12.0 | 8.0 | 2023-04-14 | 28.39 |
| 585.0 | 88.0 | 223.0 | 8.0 | 4.0 | 2022-10-19 | 123.32 |
| 586.0 | 114.0 | 62.0 | 9.0 | 12.0 | 2024-11-05 | 131.08 |
| 587.0 | 254.0 | 98.0 | 6.0 | 8.0 | 2023-08-25 | 28.39 |
| 588.0 | 542.0 | 94.0 | 15.0 | 16.0 | 2024-02-25 | 88.64 |
| 589.0 | 471.0 | 28.0 | 7.0 | 16.0 | 2023-06-12 | 88.64 |
| 590.0 | 518.0 | 187.0 | 13.0 | 10.0 | 2023-11-04 | 150.47 |
| 591.0 | 325.0 | 172.0 | 11.0 | 4.0 | 2025-06-11 | 123.32 |
| 592.0 | 548.0 | 81.0 | 13.0 | 9.0 | 2023-11-11 | 439.0 |
| 593.0 | 98.0 | 196.0 | 2.0 | 10.0 | 2023-11-21 | 150.47 |
| 594.0 | 310.0 | 108.0 | 2.0 | 3.0 | 2023-07-28 | 235.06 |
| 595.0 | 210.0 | 16.0 | 5.0 | 8.0 | 2024-04-28 | 28.39 |
| 596.0 | 11.0 | 225.0 | 12.0 | 5.0 | 2024-11-23 | 292.3 |
| 597.0 | 309.0 | 21.0 | 6.0 | 7.0 | 2025-04-13 | 47.42 |
| 598.0 | 48.0 | 203.0 | 10.0 | 16.0 | 2024-12-11 | 88.64 |
| 599.0 | 386.0 | 68.0 | 15.0 | 9.0 | 2023-10-11 | 439.0 |
| 600.0 | 142.0 | 187.0 | 5.0 | 11.0 | 2023-07-17 | 80.36 |
| 601.0 | 304.0 | 64.0 | 3.0 | 7.0 | 2025-04-06 | 47.42 |
| 602.0 | 89.0 | 161.0 | 5.0 | 11.0 | 2023-08-17 | 80.36 |
| 603.0 | 12.0 | 184.0 | 11.0 | 1.0 | 2023-11-24 | 90.29 |
| 604.0 | 538.0 | 190.0 | 14.0 | 8.0 | 2025-01-08 | 28.39 |
| 605.0 | 353.0 | 140.0 | 11.0 | 2.0 | 2022-10-14 | 64.91 |
| 606.0 | 337.0 | 19.0 | 2.0 | 5.0 | 2023-05-13 | 292.3 |
| 607.0 | 250.0 | 222.0 | 9.0 | 18.0 | 2023-09-16 | 447.41 |
| 608.0 | 148.0 | 172.0 | 1.0 | 18.0 | 2023-09-15 | 447.41 |
| 609.0 | 520.0 | 81.0 | 5.0 | 2.0 | 2024-09-22 | 64.91 |
| 610.0 | 154.0 | 31.0 | 4.0 | 16.0 | 2023-10-28 | 88.64 |
| 611.0 | 443.0 | 105.0 | 13.0 | 5.0 | 2023-01-05 | 292.3 |
| 612.0 | 376.0 | 70.0 | 4.0 | 9.0 | 2024-06-20 | 439.0 |
| 613.0 | 187.0 | 148.0 | 3.0 | 9.0 | 2024-11-13 | 439.0 |
| 614.0 | 44.0 | 29.0 | 2.0 | 2.0 | 2024-01-30 | 64.91 |
| 615.0 | 251.0 | 103.0 | 14.0 | 16.0 | 2025-03-03 | 88.64 |
| 616.0 | 175.0 | 19.0 | 9.0 | 9.0 | 2022-10-14 | 439.0 |
| 617.0 | 437.0 | 27.0 | 1.0 | 8.0 | 2023-11-07 | 28.39 |
| 618.0 | 465.0 | 208.0 | 15.0 | 8.0 | 2025-01-01 | 28.39 |
| 619.0 | 464.0 | 189.0 | 10.0 | 5.0 | 2023-08-17 | 292.3 |
| 620.0 | 33.0 | 150.0 | 3.0 | 4.0 | 2024-10-29 | 123.32 |
| 621.0 | 442.0 | 224.0 | 3.0 | 8.0 | 2024-10-22 | 28.39 |
| 622.0 | 570.0 | 45.0 | 12.0 | 17.0 | 2023-04-14 | 177.82 |
| 623.0 | 301.0 | 31.0 | 1.0 | 13.0 | 2023-06-08 | 67.54 |
| 624.0 | 262.0 | 109.0 | 6.0 | 4.0 | 2024-05-28 | 123.32 |
| 625.0 | 244.0 | 61.0 | 8.0 | 15.0 | 2024-02-21 | 94.07 |
| 626.0 | 56.0 | 120.0 | 13.0 | 9.0 | 2023-03-22 | 439.0 |
| 627.0 | 413.0 | 20.0 | 4.0 | 10.0 | 2022-09-29 | 150.47 |
| 628.0 | 385.0 | 219.0 | 4.0 | 4.0 | 2024-01-02 | 123.32 |
| 629.0 | 1.0 | 59.0 | 13.0 | 12.0 | 2023-02-09 | 131.08 |
| 630.0 | 451.0 | 208.0 | 15.0 | 6.0 | 2024-08-25 | 217.32 |
| 631.0 | 289.0 | 15.0 | 6.0 | 13.0 | 2023-04-08 | 67.54 |
| 632.0 | 74.0 | 76.0 | 8.0 | 6.0 | 2024-02-27 | 217.32 |
| 633.0 | 593.0 | 122.0 | 13.0 | 7.0 | 2023-08-06 | 47.42 |
| 634.0 | 560.0 | 179.0 | 9.0 | 10.0 | 2022-10-12 | 150.47 |
| 635.0 | 585.0 | 168.0 | 7.0 | 12.0 | 2024-10-30 | 131.08 |
| 636.0 | 292.0 | 218.0 | 14.0 | 9.0 | 2024-08-14 | 439.0 |
| 637.0 | 322.0 | 68.0 | 13.0 | 7.0 | 2024-12-17 | 47.42 |
| 638.0 | 518.0 | 187.0 | 14.0 | 17.0 | 2024-05-02 | 177.82 |
| 639.0 | 311.0 | 169.0 | 1.0 | 18.0 | 2023-01-16 | 447.41 |
| 640.0 | 345.0 | 18.0 | 14.0 | 2.0 | 2023-08-28 | 64.91 |
| 641.0 | 354.0 | 181.0 | 9.0 | 7.0 | 2025-02-28 | 47.42 |
| 642.0 | 287.0 | 136.0 | 12.0 | 13.0 | 2022-11-05 | 67.54 |
| 643.0 | 486.0 | 59.0 | 14.0 | 14.0 | 2025-01-14 | 245.97 |
| 644.0 | 393.0 | 163.0 | 5.0 | 9.0 | 2025-04-08 | 439.0 |
| 645.0 | 581.0 | 111.0 | 13.0 | 15.0 | 2024-11-02 | 94.07 |
| 646.0 | 334.0 | 160.0 | 5.0 | 5.0 | 2023-03-21 | 292.3 |
| 647.0 | 234.0 | 141.0 | 15.0 | 17.0 | 2022-11-10 | 177.82 |
| 648.0 | 466.0 | 64.0 | 3.0 | 3.0 | 2023-04-15 | 235.06 |
| 649.0 | 503.0 | 216.0 | 2.0 | 2.0 | 2024-06-29 | 64.91 |
| 650.0 | 82.0 | 68.0 | 14.0 | 2.0 | 2023-03-18 | 64.91 |
| 651.0 | 534.0 | 207.0 | 15.0 | 16.0 | 2023-10-12 | 88.64 |
| 652.0 | 172.0 | 9.0 | 15.0 | 13.0 | 2025-08-03 | 67.54 |
| 653.0 | 48.0 | 203.0 | 7.0 | 8.0 | 2025-06-09 | 28.39 |
| 654.0 | 297.0 | 173.0 | 7.0 | 6.0 | 2022-12-03 | 217.32 |
| 655.0 | 254.0 | 98.0 | 6.0 | 11.0 | 2024-06-01 | 80.36 |
| 656.0 | 178.0 | 72.0 | 7.0 | 5.0 | 2025-04-12 | 292.3 |
| 657.0 | 535.0 | 138.0 | 6.0 | 13.0 | 2024-06-24 | 67.54 |
| 658.0 | 427.0 | 79.0 | 1.0 | 10.0 | 2023-12-14 | 150.47 |
| 659.0 | 271.0 | 49.0 | 15.0 | 9.0 | 2025-03-08 | 439.0 |
| 660.0 | 45.0 | 40.0 | 14.0 | 3.0 | 2023-11-10 | 235.06 |
| 661.0 | 451.0 | 208.0 | 13.0 | 14.0 | 2024-12-01 | 245.97 |
| 662.0 | 307.0 | 11.0 | 3.0 | 16.0 | 2025-07-10 | 88.64 |
| 663.0 | 303.0 | 146.0 | 5.0 | 7.0 | 2023-02-02 | 47.42 |
| 664.0 | 396.0 | 71.0 | 12.0 | 14.0 | 2024-12-16 | 245.97 |
| 665.0 | 546.0 | 85.0 | 13.0 | 4.0 | 2023-02-09 | 123.32 |
| 666.0 | 25.0 | 191.0 | 8.0 | 16.0 | 2025-09-16 | 88.64 |
| 667.0 | 247.0 | 125.0 | 15.0 | 9.0 | 2025-04-17 | 439.0 |
| 668.0 | 270.0 | 40.0 | 1.0 | 11.0 | 2024-04-20 | 80.36 |
| 669.0 | 157.0 | 17.0 | 4.0 | 10.0 | 2024-11-24 | 150.47 |
| 670.0 | 135.0 | 136.0 | 9.0 | 7.0 | 2022-10-12 | 47.42 |
| 671.0 | 412.0 | 29.0 | 7.0 | 16.0 | 2025-02-11 | 88.64 |
| 672.0 | 72.0 | 88.0 | 13.0 | 15.0 | 2024-02-14 | 94.07 |
| 673.0 | 238.0 | 139.0 | 4.0 | 8.0 | 2024-01-19 | 28.39 |
| 674.0 | 104.0 | 154.0 | 2.0 | 6.0 | 2025-06-21 | 217.32 |
| 675.0 | 578.0 | 78.0 | 4.0 | 4.0 | 2023-05-21 | 123.32 |
| 676.0 | 385.0 | 219.0 | 11.0 | 8.0 | 2023-03-05 | 28.39 |
| 677.0 | 238.0 | 139.0 | 2.0 | 9.0 | 2025-02-11 | 439.0 |
| 678.0 | 189.0 | 63.0 | 14.0 | 18.0 | 2022-12-08 | 447.41 |
| 679.0 | 553.0 | 77.0 | 10.0 | 15.0 | 2025-08-24 | 94.07 |
| 680.0 | 277.0 | 139.0 | 11.0 | 14.0 | 2022-11-06 | 245.97 |
| 681.0 | 504.0 | 138.0 | 10.0 | 15.0 | 2024-05-19 | 94.07 |
| 682.0 | 110.0 | 225.0 | 12.0 | 15.0 | 2024-12-06 | 94.07 |
| 683.0 | 295.0 | 153.0 | 5.0 | 16.0 | 2023-05-01 | 88.64 |
| 684.0 | 396.0 | 71.0 | 1.0 | 13.0 | 2023-10-05 | 67.54 |
| 685.0 | 302.0 | 228.0 | 4.0 | 5.0 | 2023-05-27 | 292.3 |
| 686.0 | 89.0 | 161.0 | 3.0 | 14.0 | 2025-04-04 | 245.97 |
| 687.0 | 218.0 | 50.0 | 9.0 | 11.0 | 2023-09-19 | 80.36 |
| 688.0 | 22.0 | 68.0 | 2.0 | 15.0 | 2022-10-15 | 94.07 |
| 689.0 | 291.0 | 21.0 | 9.0 | 3.0 | 2022-11-22 | 235.06 |
| 690.0 | 302.0 | 228.0 | 13.0 | 2.0 | 2022-11-22 | 64.91 |
| 691.0 | 322.0 | 68.0 | 9.0 | 11.0 | 2025-08-16 | 80.36 |
| 692.0 | 122.0 | 125.0 | 7.0 | 14.0 | 2023-02-07 | 245.97 |
| 693.0 | 593.0 | 122.0 | 1.0 | 7.0 | 2023-07-27 | 47.42 |
| 694.0 | 126.0 | 137.0 | 6.0 | 3.0 | 2024-04-25 | 235.06 |
| 695.0 | 419.0 | 214.0 | 12.0 | 3.0 | 2025-08-24 | 235.06 |
| 696.0 | 355.0 | 78.0 | 6.0 | 18.0 | 2025-05-11 | 447.41 |
| 697.0 | 559.0 | 104.0 | 6.0 | 13.0 | 2024-05-21 | 67.54 |
| 698.0 | 219.0 | 49.0 | 12.0 | 9.0 | 2025-02-26 | 439.0 |
| 699.0 | 107.0 | 5.0 | 13.0 | 7.0 | 2023-11-16 | 47.42 |
| 700.0 | 578.0 | 78.0 | 3.0 | 11.0 | 2025-06-28 | 80.36 |
| 701.0 | 163.0 | 151.0 | 6.0 | 15.0 | 2023-11-03 | 94.07 |
| 702.0 | 348.0 | 95.0 | 14.0 | 4.0 | 2024-10-03 | 123.32 |
| 703.0 | 85.0 | 46.0 | 14.0 | 10.0 | 2023-02-18 | 150.47 |
| 704.0 | 64.0 | 30.0 | 12.0 | 8.0 | 2023-01-20 | 28.39 |
| 705.0 | 231.0 | 207.0 | 11.0 | 17.0 | 2024-09-18 | 177.82 |
| 706.0 | 90.0 | 77.0 | 13.0 | 7.0 | 2024-12-24 | 47.42 |
| 707.0 | 224.0 | 47.0 | 2.0 | 7.0 | 2023-03-04 | 47.42 |
| 708.0 | 290.0 | 131.0 | 1.0 | 1.0 | 2024-02-04 | 90.29 |
| 709.0 | 585.0 | 168.0 | 4.0 | 18.0 | 2025-06-29 | 447.41 |
| 710.0 | 433.0 | 54.0 | 13.0 | 3.0 | 2024-08-14 | 235.06 |
| 711.0 | 429.0 | 204.0 | 15.0 | 16.0 | 2025-07-03 | 88.64 |
| 712.0 | 585.0 | 168.0 | 6.0 | 9.0 | 2023-12-31 | 439.0 |
| 713.0 | 462.0 | 172.0 | 9.0 | 7.0 | 2023-07-04 | 47.42 |
| 714.0 | 13.0 | 81.0 | 14.0 | 6.0 | 2023-01-31 | 217.32 |
| 715.0 | 549.0 | 170.0 | 5.0 | 14.0 | 2025-07-14 | 245.97 |
| 716.0 | 596.0 | 189.0 | 13.0 | 1.0 | 2024-08-31 | 90.29 |
| 717.0 | 448.0 | 222.0 | 5.0 | 12.0 | 2023-09-26 | 131.08 |
| 718.0 | 525.0 | 99.0 | 14.0 | 7.0 | 2025-06-21 | 47.42 |
| 719.0 | 405.0 | 190.0 | 14.0 | 13.0 | 2023-11-17 | 67.54 |
| 720.0 | 28.0 | 68.0 | 5.0 | 17.0 | 2025-01-15 | 177.82 |
| 721.0 | 206.0 | 173.0 | 13.0 | 16.0 | 2023-09-04 | 88.64 |
| 722.0 | 485.0 | 224.0 | 7.0 | 9.0 | 2023-06-30 | 439.0 |
| 723.0 | 262.0 | 109.0 | 12.0 | 4.0 | 2023-04-10 | 123.32 |
| 724.0 | 536.0 | 176.0 | 15.0 | 3.0 | 2023-07-28 | 235.06 |
| 725.0 | 230.0 | 114.0 | 6.0 | 17.0 | 2024-09-09 | 177.82 |
| 726.0 | 203.0 | 222.0 | 8.0 | 11.0 | 2022-12-13 | 80.36 |
| 727.0 | 324.0 | 34.0 | 6.0 | 7.0 | 2022-10-29 | 47.42 |
| 728.0 | 129.0 | 33.0 | 5.0 | 2.0 | 2025-04-10 | 64.91 |
| 729.0 | 317.0 | 53.0 | 12.0 | 18.0 | 2023-05-11 | 447.41 |
| 730.0 | 464.0 | 189.0 | 2.0 | 5.0 | 2023-04-29 | 292.3 |
| 731.0 | 397.0 | 12.0 | 10.0 | 16.0 | 2024-09-22 | 88.64 |
| 732.0 | 172.0 | 9.0 | 9.0 | 15.0 | 2024-02-03 | 94.07 |
| 733.0 | 159.0 | 6.0 | 6.0 | 5.0 | 2025-02-28 | 292.3 |
| 734.0 | 260.0 | 117.0 | 2.0 | 16.0 | 2023-11-25 | 88.64 |
| 735.0 | 485.0 | 224.0 | 11.0 | 9.0 | 2024-01-30 | 439.0 |
| 736.0 | 514.0 | 28.0 | 5.0 | 18.0 | 2023-03-28 | 447.41 |
| 737.0 | 241.0 | 24.0 | 10.0 | 1.0 | 2023-05-08 | 90.29 |
| 738.0 | 394.0 | 109.0 | 3.0 | 16.0 | 2023-04-01 | 88.64 |
| 739.0 | 360.0 | 3.0 | 6.0 | 5.0 | 2023-03-26 | 292.3 |
| 740.0 | 184.0 | 186.0 | 1.0 | 17.0 | 2023-10-05 | 177.82 |
| 741.0 | 519.0 | 202.0 | 10.0 | 2.0 | 2023-04-20 | 64.91 |
| 742.0 | 65.0 | 175.0 | 5.0 | 15.0 | 2025-06-01 | 94.07 |
| 743.0 | 352.0 | 214.0 | 2.0 | 1.0 | 2023-06-18 | 90.29 |
| 744.0 | 190.0 | 201.0 | 6.0 | 15.0 | 2022-11-11 | 94.07 |
| 745.0 | 446.0 | 40.0 | 13.0 | 18.0 | 2024-11-03 | 447.41 |
| 746.0 | 334.0 | 160.0 | 1.0 | 16.0 | 2024-12-08 | 88.64 |
| 747.0 | 478.0 | 52.0 | 14.0 | 1.0 | 2023-04-13 | 90.29 |
| 748.0 | 124.0 | 18.0 | 1.0 | 16.0 | 2025-01-11 | 88.64 |
| 749.0 | 28.0 | 68.0 | 2.0 | 1.0 | 2024-05-31 | 90.29 |
| 750.0 | 436.0 | 171.0 | 13.0 | 5.0 | 2023-09-07 | 292.3 |
| 751.0 | 511.0 | 149.0 | 6.0 | 5.0 | 2023-08-04 | 292.3 |
| 752.0 | 54.0 | 98.0 | 10.0 | 18.0 | 2025-07-22 | 447.41 |
| 753.0 | 560.0 | 179.0 | 10.0 | 9.0 | 2024-11-16 | 439.0 |
| 754.0 | 443.0 | 105.0 | 11.0 | 2.0 | 2023-03-20 | 64.91 |
| 755.0 | 446.0 | 40.0 | 6.0 | 3.0 | 2023-08-27 | 235.06 |
| 756.0 | 483.0 | 211.0 | 8.0 | 1.0 | 2025-04-22 | 90.29 |
| 757.0 | 441.0 | 227.0 | 10.0 | 4.0 | 2024-12-19 | 123.32 |
| 758.0 | 335.0 | 145.0 | 9.0 | 1.0 | 2023-09-06 | 90.29 |
| 759.0 | 585.0 | 168.0 | 7.0 | 1.0 | 2023-12-23 | 90.29 |
| 760.0 | 310.0 | 108.0 | 11.0 | 3.0 | 2024-03-05 | 235.06 |
| 761.0 | 434.0 | 175.0 | 4.0 | 8.0 | 2025-02-06 | 28.39 |
| 762.0 | 552.0 | 185.0 | 1.0 | 18.0 | 2024-09-10 | 447.41 |
| 763.0 | 91.0 | 216.0 | 8.0 | 2.0 | 2022-11-01 | 64.91 |
| 764.0 | 396.0 | 71.0 | 7.0 | 4.0 | 2025-01-28 | 123.32 |
| 765.0 | 176.0 | 132.0 | 5.0 | 17.0 | 2024-04-11 | 177.82 |
| 766.0 | 318.0 | 172.0 | 12.0 | 6.0 | 2023-03-28 | 217.32 |
| 767.0 | 445.0 | 192.0 | 4.0 | 7.0 | 2024-02-20 | 47.42 |
| 768.0 | 205.0 | 14.0 | 12.0 | 10.0 | 2022-12-26 | 150.47 |
| 769.0 | 84.0 | 196.0 | 4.0 | 3.0 | 2025-01-18 | 235.06 |
| 770.0 | 585.0 | 168.0 | 3.0 | 9.0 | 2025-04-28 | 439.0 |
| 771.0 | 134.0 | 68.0 | 8.0 | 17.0 | 2024-10-08 | 177.82 |
| 772.0 | 240.0 | 4.0 | 15.0 | 10.0 | 2023-03-30 | 150.47 |
| 773.0 | 28.0 | 68.0 | 2.0 | 5.0 | 2023-12-12 | 292.3 |
| 774.0 | 213.0 | 87.0 | 11.0 | 10.0 | 2023-10-16 | 150.47 |
| 775.0 | 81.0 | 185.0 | 12.0 | 9.0 | 2025-05-17 | 439.0 |
| 776.0 | 465.0 | 208.0 | 9.0 | 2.0 | 2024-02-10 | 64.91 |
| 777.0 | 536.0 | 176.0 | 15.0 | 16.0 | 2024-01-21 | 88.64 |
| 778.0 | 405.0 | 190.0 | 14.0 | 10.0 | 2024-11-08 | 150.47 |
| 779.0 | 193.0 | 105.0 | 12.0 | 12.0 | 2024-10-05 | 131.08 |
| 780.0 | 600.0 | 73.0 | 13.0 | 16.0 | 2023-09-17 | 88.64 |
| 781.0 | 545.0 | 171.0 | 9.0 | 17.0 | 2024-06-24 | 177.82 |
| 782.0 | 365.0 | 170.0 | 2.0 | 6.0 | 2024-08-11 | 217.32 |
| 783.0 | 545.0 | 171.0 | 13.0 | 18.0 | 2024-12-16 | 447.41 |
| 784.0 | 60.0 | 221.0 | 4.0 | 18.0 | 2022-12-20 | 447.41 |
| 785.0 | 530.0 | 182.0 | 1.0 | 2.0 | 2023-09-18 | 64.91 |
| 786.0 | 487.0 | 58.0 | 9.0 | 6.0 | 2023-09-02 | 217.32 |
| 787.0 | 398.0 | 1.0 | 8.0 | 11.0 | 2025-01-04 | 80.36 |
| 788.0 | 568.0 | 174.0 | 10.0 | 8.0 | 2025-04-03 | 28.39 |
| 789.0 | 418.0 | 10.0 | 2.0 | 4.0 | 2024-01-02 | 123.32 |
| 790.0 | 423.0 | 38.0 | 7.0 | 5.0 | 2023-01-20 | 292.3 |
| 791.0 | 486.0 | 59.0 | 9.0 | 9.0 | 2023-06-08 | 439.0 |
| 792.0 | 178.0 | 72.0 | 13.0 | 8.0 | 2023-06-11 | 28.39 |
| 793.0 | 573.0 | 78.0 | 14.0 | 10.0 | 2025-04-28 | 150.47 |
| 794.0 | 565.0 | 108.0 | 3.0 | 15.0 | 2023-12-17 | 94.07 |
| 795.0 | 121.0 | 188.0 | 11.0 | 2.0 | 2025-04-28 | 64.91 |
| 796.0 | 201.0 | 106.0 | 8.0 | 5.0 | 2023-02-15 | 292.3 |
| 797.0 | 177.0 | 61.0 | 11.0 | 6.0 | 2022-11-02 | 217.32 |
| 798.0 | 35.0 | 93.0 | 6.0 | 15.0 | 2025-01-07 | 94.07 |
| 799.0 | 279.0 | 192.0 | 15.0 | 6.0 | 2024-09-19 | 217.32 |
| 800.0 | 90.0 | 77.0 | 13.0 | 2.0 | 2025-01-05 | 64.91 |
| 801.0 | 70.0 | 197.0 | 7.0 | 12.0 | 2022-12-02 | 131.08 |
| 802.0 | 210.0 | 16.0 | 15.0 | 8.0 | 2025-06-05 | 28.39 |
| 803.0 | 258.0 | 201.0 | 14.0 | 4.0 | 2025-01-15 | 123.32 |
| 804.0 | 422.0 | 142.0 | 9.0 | 5.0 | 2024-11-17 | 292.3 |
| 805.0 | 158.0 | 87.0 | 5.0 | 4.0 | 2024-10-24 | 123.32 |
| 806.0 | 367.0 | 225.0 | 3.0 | 8.0 | 2023-12-06 | 28.39 |
| 807.0 | 54.0 | 98.0 | 15.0 | 9.0 | 2024-06-22 | 439.0 |
| 808.0 | 440.0 | 144.0 | 6.0 | 16.0 | 2022-10-30 | 88.64 |
| 809.0 | 155.0 | 64.0 | 15.0 | 18.0 | 2024-02-23 | 447.41 |
| 810.0 | 210.0 | 16.0 | 14.0 | 7.0 | 2025-04-18 | 47.42 |
| 811.0 | 141.0 | 194.0 | 5.0 | 2.0 | 2024-08-20 | 64.91 |
| 812.0 | 596.0 | 189.0 | 11.0 | 7.0 | 2024-03-13 | 47.42 |
| 813.0 | 597.0 | 44.0 | 3.0 | 7.0 | 2024-01-15 | 47.42 |
| 814.0 | 200.0 | 109.0 | 10.0 | 13.0 | 2022-09-30 | 67.54 |
| 815.0 | 391.0 | 14.0 | 2.0 | 5.0 | 2022-12-02 | 292.3 |
| 816.0 | 350.0 | 41.0 | 11.0 | 16.0 | 2024-10-16 | 88.64 |
| 817.0 | 368.0 | 35.0 | 10.0 | 1.0 | 2024-11-15 | 90.29 |
| 818.0 | 579.0 | 74.0 | 3.0 | 10.0 | 2023-11-05 | 150.47 |
| 819.0 | 193.0 | 105.0 | 14.0 | 13.0 | 2025-07-04 | 67.54 |
| 820.0 | 532.0 | 1.0 | 14.0 | 14.0 | 2025-07-30 | 245.97 |
| 821.0 | 40.0 | 24.0 | 2.0 | 17.0 | 2025-06-25 | 177.82 |
| 822.0 | 172.0 | 9.0 | 11.0 | 17.0 | 2024-04-02 | 177.82 |
| 823.0 | 279.0 | 192.0 | 11.0 | 1.0 | 2024-07-22 | 90.29 |
| 824.0 | 312.0 | 150.0 | 13.0 | 5.0 | 2023-05-27 | 292.3 |
| 825.0 | 400.0 | 198.0 | 10.0 | 2.0 | 2025-07-26 | 64.91 |
| 826.0 | 282.0 | 13.0 | 8.0 | 7.0 | 2024-02-11 | 47.42 |
| 827.0 | 348.0 | 95.0 | 11.0 | 5.0 | 2024-01-17 | 292.3 |
| 828.0 | 68.0 | 193.0 | 8.0 | 16.0 | 2024-05-13 | 88.64 |
| 829.0 | 349.0 | 73.0 | 13.0 | 13.0 | 2023-06-18 | 67.54 |
| 830.0 | 124.0 | 18.0 | 5.0 | 14.0 | 2023-03-13 | 245.97 |
| 831.0 | 82.0 | 68.0 | 2.0 | 4.0 | 2025-05-27 | 123.32 |
| 832.0 | 243.0 | 218.0 | 3.0 | 12.0 | 2023-04-10 | 131.08 |
| 833.0 | 107.0 | 5.0 | 7.0 | 17.0 | 2023-01-09 | 177.82 |
| 834.0 | 91.0 | 216.0 | 8.0 | 11.0 | 2024-08-05 | 80.36 |
| 835.0 | 267.0 | 170.0 | 6.0 | 4.0 | 2024-12-06 | 123.32 |
| 836.0 | 281.0 | 15.0 | 6.0 | 7.0 | 2023-12-13 | 47.42 |
| 837.0 | 253.0 | 43.0 | 12.0 | 1.0 | 2023-10-20 | 90.29 |
| 838.0 | 10.0 | 146.0 | 7.0 | 14.0 | 2025-01-02 | 245.97 |
| 839.0 | 312.0 | 150.0 | 13.0 | 12.0 | 2023-08-30 | 131.08 |
| 840.0 | 578.0 | 78.0 | 9.0 | 2.0 | 2025-02-21 | 64.91 |
| 841.0 | 72.0 | 88.0 | 6.0 | 3.0 | 2024-05-19 | 235.06 |
| 842.0 | 268.0 | 184.0 | 8.0 | 10.0 | 2025-01-19 | 150.47 |
| 843.0 | 230.0 | 114.0 | 5.0 | 10.0 | 2023-03-21 | 150.47 |
| 844.0 | 108.0 | 29.0 | 4.0 | 7.0 | 2024-12-12 | 47.42 |
| 845.0 | 504.0 | 138.0 | 2.0 | 2.0 | 2025-06-15 | 64.91 |
| 846.0 | 428.0 | 94.0 | 5.0 | 12.0 | 2023-08-02 | 131.08 |
| 847.0 | 34.0 | 103.0 | 14.0 | 6.0 | 2023-05-24 | 217.32 |
| 848.0 | 234.0 | 141.0 | 4.0 | 12.0 | 2024-11-03 | 131.08 |
| 849.0 | 519.0 | 202.0 | 14.0 | 10.0 | 2023-11-26 | 150.47 |
| 850.0 | 190.0 | 201.0 | 15.0 | 15.0 | 2023-12-26 | 94.07 |
| 851.0 | 197.0 | 169.0 | 4.0 | 17.0 | 2024-11-04 | 177.82 |
| 852.0 | 438.0 | 91.0 | 8.0 | 6.0 | 2022-11-07 | 217.32 |
| 853.0 | 500.0 | 131.0 | 8.0 | 12.0 | 2022-12-10 | 131.08 |
| 854.0 | 65.0 | 175.0 | 15.0 | 4.0 | 2024-01-04 | 123.32 |
| 855.0 | 582.0 | 202.0 | 8.0 | 5.0 | 2025-08-10 | 292.3 |
| 856.0 | 145.0 | 183.0 | 2.0 | 4.0 | 2023-07-14 | 123.32 |
| 857.0 | 17.0 | 102.0 | 9.0 | 12.0 | 2023-03-05 | 131.08 |
| 858.0 | 536.0 | 176.0 | 4.0 | 4.0 | 2024-07-13 | 123.32 |
| 859.0 | 281.0 | 15.0 | 10.0 | 6.0 | 2023-10-05 | 217.32 |
| 860.0 | 30.0 | 150.0 | 1.0 | 13.0 | 2025-06-15 | 67.54 |
| 861.0 | 173.0 | 221.0 | 5.0 | 8.0 | 2022-12-18 | 28.39 |
| 862.0 | 27.0 | 138.0 | 10.0 | 5.0 | 2023-02-06 | 292.3 |
| 863.0 | 168.0 | 162.0 | 5.0 | 16.0 | 2025-09-10 | 88.64 |
| 864.0 | 98.0 | 196.0 | 14.0 | 17.0 | 2025-02-18 | 177.82 |
| 865.0 | 166.0 | 19.0 | 7.0 | 9.0 | 2024-12-26 | 439.0 |
| 866.0 | 326.0 | 166.0 | 15.0 | 1.0 | 2024-04-03 | 90.29 |
| 867.0 | 293.0 | 48.0 | 12.0 | 18.0 | 2023-09-08 | 447.41 |
| 868.0 | 476.0 | 121.0 | 13.0 | 14.0 | 2023-06-24 | 245.97 |
| 869.0 | 385.0 | 219.0 | 6.0 | 14.0 | 2025-06-26 | 245.97 |
| 870.0 | 376.0 | 70.0 | 7.0 | 4.0 | 2025-06-14 | 123.32 |
| 871.0 | 541.0 | 51.0 | 10.0 | 17.0 | 2024-08-24 | 177.82 |
| 872.0 | 239.0 | 215.0 | 6.0 | 13.0 | 2024-02-13 | 67.54 |
| 873.0 | 570.0 | 45.0 | 2.0 | 17.0 | 2023-07-28 | 177.82 |
| 874.0 | 162.0 | 59.0 | 9.0 | 16.0 | 2023-03-19 | 88.64 |
| 875.0 | 330.0 | 193.0 | 13.0 | 8.0 | 2024-03-03 | 28.39 |
| 876.0 | 342.0 | 34.0 | 14.0 | 2.0 | 2025-01-26 | 64.91 |
| 877.0 | 542.0 | 94.0 | 3.0 | 1.0 | 2025-03-12 | 90.29 |
| 878.0 | 384.0 | 163.0 | 7.0 | 15.0 | 2023-08-24 | 94.07 |
| 879.0 | 325.0 | 172.0 | 13.0 | 2.0 | 2023-11-02 | 64.91 |
| 880.0 | 391.0 | 14.0 | 9.0 | 4.0 | 2023-09-09 | 123.32 |
| 881.0 | 366.0 | 27.0 | 13.0 | 10.0 | 2024-12-05 | 150.47 |
| 882.0 | 491.0 | 103.0 | 4.0 | 9.0 | 2022-11-19 | 439.0 |
| 883.0 | 254.0 | 98.0 | 7.0 | 17.0 | 2022-12-07 | 177.82 |
| 884.0 | 202.0 | 120.0 | 1.0 | 1.0 | 2025-06-26 | 90.29 |
| 885.0 | 274.0 | 15.0 | 1.0 | 13.0 | 2024-12-20 | 67.54 |
| 886.0 | 70.0 | 197.0 | 12.0 | 8.0 | 2023-11-14 | 28.39 |
| 887.0 | 168.0 | 162.0 | 13.0 | 18.0 | 2023-01-30 | 447.41 |
| 888.0 | 471.0 | 28.0 | 9.0 | 10.0 | 2023-03-06 | 150.47 |
| 889.0 | 591.0 | 55.0 | 3.0 | 13.0 | 2022-11-06 | 67.54 |
| 890.0 | 154.0 | 31.0 | 3.0 | 9.0 | 2023-11-25 | 439.0 |
| 891.0 | 253.0 | 43.0 | 15.0 | 5.0 | 2023-12-14 | 292.3 |
| 892.0 | 544.0 | 18.0 | 3.0 | 2.0 | 2023-07-15 | 64.91 |
| 893.0 | 424.0 | 111.0 | 10.0 | 11.0 | 2024-01-23 | 80.36 |
| 894.0 | 580.0 | 54.0 | 10.0 | 9.0 | 2023-11-08 | 439.0 |
| 895.0 | 402.0 | 164.0 | 9.0 | 18.0 | 2022-11-18 | 447.41 |
| 896.0 | 323.0 | 102.0 | 9.0 | 10.0 | 2022-12-28 | 150.47 |
| 897.0 | 443.0 | 105.0 | 12.0 | 15.0 | 2024-01-22 | 94.07 |
| 898.0 | 43.0 | 221.0 | 8.0 | 17.0 | 2025-08-23 | 177.82 |
| 899.0 | 530.0 | 182.0 | 6.0 | 1.0 | 2023-11-18 | 90.29 |
| 900.0 | 212.0 | 187.0 | 11.0 | 4.0 | 2025-02-14 | 123.32 |
| 901.0 | 157.0 | 17.0 | 7.0 | 9.0 | 2024-01-05 | 439.0 |
| 902.0 | 331.0 | 19.0 | 13.0 | 9.0 | 2025-08-03 | 439.0 |
| 903.0 | 408.0 | 181.0 | 10.0 | 3.0 | 2023-01-29 | 235.06 |
| 904.0 | 422.0 | 142.0 | 5.0 | 13.0 | 2024-06-17 | 67.54 |
| 905.0 | 529.0 | 12.0 | 12.0 | 8.0 | 2025-06-13 | 28.39 |
| 906.0 | 231.0 | 207.0 | 10.0 | 15.0 | 2023-01-17 | 94.07 |
| 907.0 | 495.0 | 18.0 | 3.0 | 7.0 | 2022-10-19 | 47.42 |
| 908.0 | 306.0 | 153.0 | 11.0 | 1.0 | 2023-08-10 | 90.29 |
| 909.0 | 427.0 | 79.0 | 3.0 | 17.0 | 2024-05-18 | 177.82 |
| 910.0 | 260.0 | 117.0 | 1.0 | 6.0 | 2025-02-13 | 217.32 |
| 911.0 | 533.0 | 134.0 | 4.0 | 1.0 | 2025-08-19 | 90.29 |
| 912.0 | 526.0 | 148.0 | 8.0 | 12.0 | 2023-12-24 | 131.08 |
| 913.0 | 387.0 | 130.0 | 7.0 | 8.0 | 2024-11-20 | 28.39 |
| 914.0 | 127.0 | 197.0 | 7.0 | 6.0 | 2024-08-05 | 217.32 |
| 915.0 | 443.0 | 105.0 | 7.0 | 14.0 | 2022-12-04 | 245.97 |
| 916.0 | 349.0 | 73.0 | 13.0 | 1.0 | 2023-02-04 | 90.29 |
| 917.0 | 561.0 | 76.0 | 14.0 | 5.0 | 2025-05-22 | 292.3 |
| 918.0 | 305.0 | 149.0 | 12.0 | 8.0 | 2024-12-18 | 28.39 |
| 919.0 | 194.0 | 49.0 | 9.0 | 12.0 | 2024-07-29 | 131.08 |
| 920.0 | 175.0 | 19.0 | 9.0 | 16.0 | 2023-12-01 | 88.64 |
| 921.0 | 154.0 | 31.0 | 11.0 | 9.0 | 2023-01-21 | 439.0 |
| 922.0 | 368.0 | 35.0 | 9.0 | 9.0 | 2023-08-17 | 439.0 |
| 923.0 | 32.0 | 230.0 | 6.0 | 11.0 | 2024-10-07 | 80.36 |
| 924.0 | 305.0 | 149.0 | 8.0 | 14.0 | 2022-10-01 | 245.97 |
| 925.0 | 50.0 | 109.0 | 6.0 | 12.0 | 2023-10-02 | 131.08 |
| 926.0 | 532.0 | 1.0 | 11.0 | 10.0 | 2024-04-03 | 150.47 |
| 927.0 | 109.0 | 93.0 | 10.0 | 5.0 | 2023-01-09 | 292.3 |
| 928.0 | 348.0 | 95.0 | 4.0 | 15.0 | 2024-05-10 | 94.07 |
| 929.0 | 469.0 | 202.0 | 5.0 | 6.0 | 2024-01-24 | 217.32 |
| 930.0 | 106.0 | 126.0 | 4.0 | 4.0 | 2024-01-26 | 123.32 |
| 931.0 | 593.0 | 122.0 | 13.0 | 11.0 | 2024-02-13 | 80.36 |
| 932.0 | 220.0 | 138.0 | 12.0 | 8.0 | 2024-07-29 | 28.39 |
| 933.0 | 123.0 | 209.0 | 12.0 | 1.0 | 2022-12-30 | 90.29 |
| 934.0 | 406.0 | 114.0 | 6.0 | 5.0 | 2023-01-18 | 292.3 |
| 935.0 | 402.0 | 164.0 | 6.0 | 15.0 | 2024-03-15 | 94.07 |
| 936.0 | 588.0 | 114.0 | 5.0 | 18.0 | 2025-01-20 | 447.41 |
| 937.0 | 199.0 | 91.0 | 10.0 | 14.0 | 2023-08-11 | 245.97 |
| 938.0 | 104.0 | 154.0 | 15.0 | 6.0 | 2023-07-11 | 217.32 |
| 939.0 | 207.0 | 168.0 | 14.0 | 16.0 | 2023-10-21 | 88.64 |
| 940.0 | 283.0 | 150.0 | 13.0 | 11.0 | 2024-12-01 | 80.36 |
| 941.0 | 380.0 | 184.0 | 5.0 | 1.0 | 2025-07-02 | 90.29 |
| 942.0 | 559.0 | 104.0 | 5.0 | 2.0 | 2025-04-18 | 64.91 |
| 943.0 | 254.0 | 98.0 | 6.0 | 7.0 | 2023-04-05 | 47.42 |
| 944.0 | 343.0 | 90.0 | 11.0 | 14.0 | 2024-04-19 | 245.97 |
| 945.0 | 185.0 | 226.0 | 12.0 | 4.0 | 2023-01-19 | 123.32 |
| 946.0 | 568.0 | 174.0 | 4.0 | 4.0 | 2024-08-09 | 123.32 |
| 947.0 | 423.0 | 38.0 | 14.0 | 2.0 | 2024-03-20 | 64.91 |
| 948.0 | 325.0 | 172.0 | 15.0 | 16.0 | 2024-03-19 | 88.64 |
| 949.0 | 308.0 | 159.0 | 3.0 | 18.0 | 2025-02-15 | 447.41 |
| 950.0 | 134.0 | 68.0 | 10.0 | 14.0 | 2024-05-24 | 245.97 |
| 951.0 | 351.0 | 113.0 | 4.0 | 3.0 | 2025-06-15 | 235.06 |
| 952.0 | 371.0 | 228.0 | 11.0 | 14.0 | 2022-10-05 | 245.97 |
| 953.0 | 384.0 | 163.0 | 4.0 | 10.0 | 2024-06-07 | 150.47 |
| 954.0 | 43.0 | 221.0 | 1.0 | 17.0 | 2025-03-05 | 177.82 |
| 955.0 | 535.0 | 138.0 | 7.0 | 8.0 | 2023-11-20 | 28.39 |
| 956.0 | 167.0 | 182.0 | 12.0 | 12.0 | 2023-02-02 | 131.08 |
| 957.0 | 192.0 | 207.0 | 2.0 | 16.0 | 2024-12-19 | 88.64 |
| 958.0 | 43.0 | 221.0 | 1.0 | 1.0 | 2024-11-07 | 90.29 |
| 959.0 | 405.0 | 190.0 | 7.0 | 2.0 | 2023-01-26 | 64.91 |
| 960.0 | 37.0 | 36.0 | 8.0 | 10.0 | 2024-08-14 | 150.47 |
| 961.0 | 75.0 | 112.0 | 13.0 | 18.0 | 2024-02-16 | 447.41 |
| 962.0 | 7.0 | 69.0 | 6.0 | 10.0 | 2024-02-20 | 150.47 |
| 963.0 | 544.0 | 18.0 | 11.0 | 5.0 | 2025-05-28 | 292.3 |
| 964.0 | 35.0 | 93.0 | 15.0 | 16.0 | 2025-03-27 | 88.64 |
| 965.0 | 447.0 | 61.0 | 11.0 | 13.0 | 2024-06-08 | 67.54 |
| 966.0 | 588.0 | 114.0 | 9.0 | 8.0 | 2025-07-12 | 28.39 |
| 967.0 | 299.0 | 61.0 | 15.0 | 10.0 | 2024-10-03 | 150.47 |
| 968.0 | 73.0 | 29.0 | 7.0 | 8.0 | 2024-10-01 | 28.39 |
| 969.0 | 15.0 | 168.0 | 15.0 | 4.0 | 2025-07-14 | 123.32 |
| 970.0 | 194.0 | 49.0 | 14.0 | 18.0 | 2023-07-06 | 447.41 |
| 971.0 | 56.0 | 120.0 | 13.0 | 3.0 | 2022-12-17 | 235.06 |
| 972.0 | 320.0 | 81.0 | 3.0 | 10.0 | 2024-02-12 | 150.47 |
| 973.0 | 171.0 | 18.0 | 15.0 | 16.0 | 2025-07-12 | 88.64 |
| 974.0 | 242.0 | 193.0 | 1.0 | 10.0 | 2024-01-24 | 150.47 |
| 975.0 | 457.0 | 189.0 | 10.0 | 14.0 | 2025-02-19 | 245.97 |
| 976.0 | 517.0 | 89.0 | 15.0 | 12.0 | 2023-11-10 | 131.08 |
| 977.0 | 534.0 | 207.0 | 5.0 | 18.0 | 2023-03-11 | 447.41 |
| 978.0 | 474.0 | 10.0 | 11.0 | 2.0 | 2022-10-19 | 64.91 |
| 979.0 | 200.0 | 109.0 | 8.0 | 3.0 | 2024-12-26 | 235.06 |
| 980.0 | 582.0 | 202.0 | 14.0 | 3.0 | 2022-11-29 | 235.06 |
| 981.0 | 521.0 | 112.0 | 8.0 | 9.0 | 2024-03-17 | 439.0 |
| 982.0 | 431.0 | 11.0 | 4.0 | 16.0 | 2025-02-08 | 88.64 |
| 983.0 | 95.0 | 51.0 | 6.0 | 17.0 | 2024-10-29 | 177.82 |
| 984.0 | 297.0 | 173.0 | 12.0 | 15.0 | 2023-03-02 | 94.07 |
| 985.0 | 319.0 | 184.0 | 11.0 | 6.0 | 2024-04-18 | 217.32 |
| 986.0 | 367.0 | 225.0 | 12.0 | 16.0 | 2024-09-10 | 88.64 |
| 987.0 | 105.0 | 83.0 | 1.0 | 18.0 | 2023-11-06 | 447.41 |
| 988.0 | 3.0 | 9.0 | 13.0 | 6.0 | 2024-01-31 | 217.32 |
| 989.0 | 507.0 | 30.0 | 10.0 | 13.0 | 2024-08-27 | 67.54 |
| 990.0 | 74.0 | 76.0 | 3.0 | 13.0 | 2023-06-19 | 67.54 |
| 991.0 | 149.0 | 167.0 | 14.0 | 18.0 | 2023-05-05 | 447.41 |
| 992.0 | 13.0 | 81.0 | 9.0 | 8.0 | 2023-11-25 | 28.39 |
| 993.0 | 147.0 | 103.0 | 2.0 | 7.0 | 2023-06-29 | 47.42 |
| 994.0 | 163.0 | 151.0 | 11.0 | 2.0 | 2025-03-15 | 64.91 |
| 995.0 | 560.0 | 179.0 | 3.0 | 17.0 | 2024-12-13 | 177.82 |
| 996.0 | 284.0 | 123.0 | 8.0 | 7.0 | 2023-12-04 | 47.42 |
| 997.0 | 124.0 | 18.0 | 15.0 | 3.0 | 2024-05-06 | 235.06 |
| 998.0 | 417.0 | 140.0 | 1.0 | 12.0 | 2024-04-10 | 131.08 |
| 999.0 | 547.0 | 160.0 | 7.0 | 18.0 | 2024-06-01 | 447.41 |
| 1000.0 | 167.0 | 182.0 | 8.0 | 10.0 | 2024-03-29 | 150.47 |
