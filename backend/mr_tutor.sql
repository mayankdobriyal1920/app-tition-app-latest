-- MySQL dump 10.13  Distrib 8.0.28, for Linux (x86_64)
--
-- Host: localhost    Database: mr_tutor
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `app_user`
--

DROP TABLE IF EXISTS `app_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_user` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255)  NOT NULL,
  `email` varchar(255)  NOT NULL,
  `mobile` varchar(255)  NOT NULL,
  `address` varchar(255)  DEFAULT NULL,
  `role` tinyint NOT NULL DEFAULT '1' COMMENT '1 - STUDENT\r\n2 - TEACHER\r\n3 - ADMIN',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `has_profile` tinyint NOT NULL DEFAULT '0',
  `password` varchar(255) NOT NULL,
  `highest_qualification` varchar(225) DEFAULT NULL,
  `experience` varchar(225) DEFAULT NULL,
  `board` varchar(255)  DEFAULT NULL,
  PRIMARY KEY (`id`)
)  COMMENT='app all users';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_user`
--

LOCK TABLES `app_user` WRITE;
/*!40000 ALTER TABLE `app_user` DISABLE KEYS */;
INSERT INTO `app_user` VALUES ('23423-dfgfdg-456fgdf-dfg','Super Admin','admin@gmail.com','1234567890','Delhi',3,'2023-04-15 13:45:52',1,0,'test123',NULL,NULL,NULL),('Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW','Arindam Mondal','arindam@gmail.com','9756352016','Delhi',2,'2023-04-15 08:20:03',1,0,'test123','MSC',NULL,'sadsad9asdsa9d7sa6dsadsad'),('WVUfwxzuPsPT8SkrdEJi-2OzYOtOOQrTmZawAtxVO-lDW96OlY2VM6IH233VFi-Ze7D3X5ZDl6tEe0QGqaE','Mayank Dobriyal','mayankdobriyal1920@gmail.com','7017935899','Umraonagar kotdwara',1,'2022-11-28 09:56:29',1,1,'test123',NULL,NULL,NULL);
/*!40000 ALTER TABLE `app_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class_assigned_teacher_batch`
--

DROP TABLE IF EXISTS `class_assigned_teacher_batch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class_assigned_teacher_batch` (
  `id` varchar(255) NOT NULL,
  `teacher_id` varchar(255) NOT NULL,
  `starting_from_date` datetime DEFAULT NULL,
  `batch` tinyint NOT NULL DEFAULT '0',
  `is_demo_class` tinyint NOT NULL DEFAULT '0',
  `subject_id` varchar(255) NOT NULL,
  `school_board` varchar(50)  NOT NULL,
  `student_class` int NOT NULL,
  `class_end_time` datetime DEFAULT NULL,
  `class_batch_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_assigned_teacher_batch`
--

LOCK TABLES `class_assigned_teacher_batch` WRITE;
/*!40000 ALTER TABLE `class_assigned_teacher_batch` DISABLE KEYS */;
INSERT INTO `class_assigned_teacher_batch` VALUES ('1IdlJAXoKdZeJj1LucST-UjsuDZ0gsq0r2rvO6Eh7-gMeWB9yFS1oMSLMnJ4MZ-d99pjyOEfIQfQSIv2ETP','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',NULL,2,0,'asdsad9asdsad9asdsad','sadsad9asdsa9d7sa6dsadsad',10,NULL,'ARINDAM MATH BATCH 1'),('5OojCFwdpXwM5e4KCVi3-LB7OzxqMvYbS89BejPYr-SdSKoZOwsFdZVGOyKu97-i2q8eh23fVRtWHZEzDTX','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',NULL,2,0,'sad9rewer-sdff','sadsad9asdsa9d7sa6dsadsad',10,NULL,'ARINDAM SCIENCE BATCH'),('BETzLxnsGTzKDfJO7pYP-3kk83YBZpxd0UGbpaJG6-4WFC0O8cnYznKKAFu0mm-tWL1TMXcQwXUEJnQwQnZ','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',NULL,2,0,'asdsad9asdsad9asdsad','sadsad9asdsa9d7sa6dsadsad',10,NULL,'Arindam Math batch 122121'),('bkXgup8oIWSx1jwOD3z3-cDVoSua7WprxS1DefF9E-oxHpqlvUdtn7cl1ABZfi-faLw5IDO7nQOUGkIB20d','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW','2023-04-15 13:56:00',2,1,'453-45gd','sadsad9asdsa9d7sa6dsadsad',10,NULL,NULL),('CYv50q3Wjdrhb7c65TOh-qjRwibcpOPfyIKPzmsHm-STxIjkKKnqhEHMQC5aVq-EgLGkLqIHq8BLi8IrfSb','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',NULL,2,0,'adas34yru567rtyr','sadsad9asdsa9d7sa6dsadsad',10,NULL,'ARINDAM COMPUTER BATCH'),('dggwidLi37WKES9qgKbS-9wVZk4ZDAm2cBcOm86x3-nPmtM5239iVnX47lw0qR-WgXRpQQoRQCOCv5VwG6e','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW','2023-04-15 13:56:00',2,1,'sad2345terwfsdf','sadsad9asdsa9d7sa6dsadsad',10,NULL,NULL),('jWObklB253zLEBuhY9ei-gQDbyAQxKLPLXDpYF3It-2yb1tPnEIZ3zvUqAo9sX-XcBxg6XItQzSZ5TEATu8','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW','2023-04-15 13:56:00',2,1,'sad9rewer-sdff','sadsad9asdsa9d7sa6dsadsad',10,'2023-04-16 11:53:58',NULL),('lC1vrxmSggWglwkIIQP8-AcwpQRuEc1zrqGa5zLuh-fpQ3CWrb4pfO2wqLi2Io-OC5a7p13OHaKcFu8vtHz','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW','2023-04-15 13:56:00',2,1,'adas34yru567rtyr','sadsad9asdsa9d7sa6dsadsad',10,'2023-04-16 11:59:16',NULL),('mqtTbpUg0w43e6290p3z-czKbtVYkgJgjlGof4btO-qAHeAUk7kfQbmWoHjS8e-t4ESrZa6CPD9ux3MubE9','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',NULL,2,0,'34rwergdjghdjk','sadsad9asdsa9d7sa6dsadsad',10,NULL,'ARINDAM ENGLISH BATCH'),('oBDx1F6IqPSv1j4K1xA8-hyVjdjclSpkqAxBacqC7-cMGHXlUCs90hnAiOYoDI-l2v6ZpwB9U96FkGru2rA','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',NULL,2,0,'asdsad9asdsad9asdsad','sadsad9asdsa9d7sa6dsadsad',10,NULL,'Arindam math ne batch'),('ODO4stVRJCKXCp3rXHoC-pLTKB6W0Frd32WJoL9Bd-nrCnO8REM7Q8xCl33gso-OxEeGqolfRmSUw6Vi3rd','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',NULL,2,0,'asdsad9asdsad9asdsad','sadsad9asdsa9d7sa6dsadsad',10,NULL,'New teacher batch math'),('OKOf87kHIWYRkV1O5SnC-pqbfECIUsZSJcTMd3ebF-BH1eo8hDtCs6OVzOe2eL-JAtBCAsQhqK8k0uGJCfO','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW','2023-04-15 13:56:00',2,1,'dsad4364yryhdfg','sadsad9asdsa9d7sa6dsadsad',10,NULL,NULL),('Ud4OJxMOrgvqEZJfRFrF-GZV7WatOKHFOqanT6i7V-s7WGvmOvRkacmdv3lUbJ-969cjXO6npeOOFPMZ2Hz','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW','2023-04-15 13:56:00',2,1,'324gedfsdafsdf','sadsad9asdsa9d7sa6dsadsad',10,NULL,NULL),('VaviDQhottXl6BLBrBml-OmM1QdqeaVqJwKqlcXEv-JtRc61gxos4bsy0jKdV4-SQh5YzAUSaHgFr4o2RSx','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW','2023-04-15 13:56:00',2,1,'34-ad-sadsad-sadasd','sadsad9asdsa9d7sa6dsadsad',10,NULL,NULL),('Vw49IDLhCppLOIRzPdmj-i6TIC5vtOpmjLwDAAv3i-erQcEvsdZTOoiKBjwwKk-vdu3TRXSvbvATPLCn6ot','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW','2023-04-15 13:56:00',2,1,'asdsad9asdsad9asdsad','sadsad9asdsa9d7sa6dsadsad',10,NULL,NULL),('xGW1sZBmI56lWC8cUTnD-b4tUOQVkc90QBFiO9sBH-TRgTnWEVvyKThlGtsQyo-SYvWjrOrbTL9dZeTanwZ','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW','2023-04-15 13:56:00',2,1,'34rwergdjghdjk','sadsad9asdsa9d7sa6dsadsad',10,'2023-04-16 11:55:56',NULL),('xJWzMJiEVnzKDcTE1MAX-h64FTw0YhAp4aPdU345P-PlszHptD4ws0gl2GQ7lW-rq93OewUxGUW9Pnqd6vV','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW','2000-02-01 00:00:00',2,1,'sadsad342rsfsdf','sadsad9asdsa9d7sa6dsadsad',10,NULL,NULL),('yZ8BsORImY5ke7qQ8poz-L8p8J5qvpmYcvkkp4vRI-FyM1Y3Jb9SSZPU2STt0n-dGG41ndX7iU6X326WXyU','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW','2023-04-15 13:56:00',2,1,'sadsad-asdasd-adasd','sadsad9asdsa9d7sa6dsadsad',10,NULL,NULL);
/*!40000 ALTER TABLE `class_assigned_teacher_batch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class_call_recording`
--

DROP TABLE IF EXISTS `class_call_recording`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class_call_recording` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `classes_assigned_to_teacher_id` varchar(255)  NOT NULL,
  PRIMARY KEY (`id`)
) ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_call_recording`
--

LOCK TABLES `class_call_recording` WRITE;
/*!40000 ALTER TABLE `class_call_recording` DISABLE KEYS */;
INSERT INTO `class_call_recording` VALUES ('bBFRGCw8X6XiPfP2f23a-kLLiI4J5C5dlXWdSB5CB-zJ2JOeemLBkIThhWV8ra-IIbKFIjJ9z48abP57UkD','RecordingVideo_1681551645618.webm','2023-04-15 09:40:46','Vw49IDLhCppLOIRzPdmj-i6TIC5vtOpmjLwDAAv3i-erQcEvsdZTOoiKBjwwKk-vdu3TRXSvbvATPLCn6ot'),('T4xzn8OwsdXgHRJRIgcE-9wg8XRwOul4OPoGhgxYK-ODtGZXFbOBuchXDl4uSh-ol0QWpkKfMphbBZZ6O9n','RecordingVideo_1681547427902.webm','2023-04-15 08:30:28','bkXgup8oIWSx1jwOD3z3-cDVoSua7WprxS1DefF9E-oxHpqlvUdtn7cl1ABZfi-faLw5IDO7nQOUGkIB20d');
/*!40000 ALTER TABLE `class_call_recording` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class_timetable_with_class_batch_assigned`
--

DROP TABLE IF EXISTS `class_timetable_with_class_batch_assigned`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class_timetable_with_class_batch_assigned` (
  `id` varchar(255) NOT NULL,
  `start_from_date_time` datetime NOT NULL,
  `class_end_date_time` datetime DEFAULT NULL,
  `class_assigned_teacher_batch_id` varchar(255) NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
)  COMMENT='class timetable with batch';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_timetable_with_class_batch_assigned`
--

LOCK TABLES `class_timetable_with_class_batch_assigned` WRITE;
/*!40000 ALTER TABLE `class_timetable_with_class_batch_assigned` DISABLE KEYS */;
INSERT INTO `class_timetable_with_class_batch_assigned` VALUES ('2hYe6q9pw3lrmm4Au7WO-S3s2hmFF6jWtnAuMYKVb-CYgCc7REqgD4mPjqoyKd-Fk9XFr7OPFtX0ykp05cg','2023-04-21 11:11:00',NULL,'ODO4stVRJCKXCp3rXHoC-pLTKB6W0Frd32WJoL9Bd-nrCnO8REM7Q8xCl33gso-OxEeGqolfRmSUw6Vi3rd','2023-04-17 05:30:44'),('5UTBxmbCzxUzBBIalayA-KUI7bGoRD6gxUsk34hcb-CClxWhuI4zS2S3sdZF15-gKCJZOqQKGxEPlSeJJCw','2023-04-16 11:11:00','2023-04-16 13:26:19','BETzLxnsGTzKDfJO7pYP-3kk83YBZpxd0UGbpaJG6-4WFC0O8cnYznKKAFu0mm-tWL1TMXcQwXUEJnQwQnZ','2023-04-16 06:44:07'),('AfIB7mZoueYYXzwjEEcn-u7toPqnTtpmJZfHrtZJS-GsrOYM2c2JWuZA1R5IuB-Jl3w92O0mrJnf2w5y5bD','2023-04-16 11:11:00',NULL,'CYv50q3Wjdrhb7c65TOh-qjRwibcpOPfyIKPzmsHm-STxIjkKKnqhEHMQC5aVq-EgLGkLqIHq8BLi8IrfSb','2023-04-16 06:46:20'),('dQSVylnFQb1TbCfEIwRf-MGj5M5haAJWwA8rm6LoS-cpnVMOuj0GKDGKP5KMsv-ZVmTly9RIj5ssf4rfatZ','2023-04-20 11:11:00',NULL,'ODO4stVRJCKXCp3rXHoC-pLTKB6W0Frd32WJoL9Bd-nrCnO8REM7Q8xCl33gso-OxEeGqolfRmSUw6Vi3rd','2023-04-17 05:30:44'),('ecTw4yaGCBgLP6OS7bdD-keJUEcd1yAw6g7nM2DCQ-yium88pOOZyMseTMCuJi-hX90jnEFObagHp2Q4DOl','2023-04-18 11:11:00',NULL,'ODO4stVRJCKXCp3rXHoC-pLTKB6W0Frd32WJoL9Bd-nrCnO8REM7Q8xCl33gso-OxEeGqolfRmSUw6Vi3rd','2023-04-17 05:30:44'),('hVf9OVAdvbt0JVwq93ye-W18VbAryoEuQz4YJPz5t-LZzPC4kvqMwgAvQJl4hO-DTvqw9rYzS4Gvqwrwk1k','2023-04-17 11:11:00',NULL,'ODO4stVRJCKXCp3rXHoC-pLTKB6W0Frd32WJoL9Bd-nrCnO8REM7Q8xCl33gso-OxEeGqolfRmSUw6Vi3rd','2023-04-17 05:30:44'),('jEq9HXjRtaZGaAFr7FOG-7XajwleI8Gs9V0l2JeVx-HKeOHjZyJtcheuTdneV9-oPUOzuCz2pnVv5qO2yI9','2023-04-22 11:11:00',NULL,'ODO4stVRJCKXCp3rXHoC-pLTKB6W0Frd32WJoL9Bd-nrCnO8REM7Q8xCl33gso-OxEeGqolfRmSUw6Vi3rd','2023-04-17 05:30:44'),('rB1FqHqMeCa33yE3BjtP-aznKxXz4ey9r3LKzfEL5-MRHiWcqXFBWa1IeJ2mcs-jIH69ETvYcYp3HwSGjrW','2023-04-19 11:11:00',NULL,'ODO4stVRJCKXCp3rXHoC-pLTKB6W0Frd32WJoL9Bd-nrCnO8REM7Q8xCl33gso-OxEeGqolfRmSUw6Vi3rd','2023-04-17 05:30:44'),('TtoM4yfPJa7SrqcHVrJr-FXPiMAPwSK8KOxpIwACA-HmDOancIfo0aGHCqwkxj-fQatKHPruJsT9LHAWuhd','2023-04-16 11:11:00',NULL,'5OojCFwdpXwM5e4KCVi3-LB7OzxqMvYbS89BejPYr-SdSKoZOwsFdZVGOyKu97-i2q8eh23fVRtWHZEzDTX','2023-04-16 06:46:09'),('USAUZdvsTYTpyrbqIZt5-dtVZyHTHMzWqVXVJxroG-r8wHFCCrjaTOiWU3JPzP-UrGmtALGQOCHZArI3U7C','2023-04-16 11:11:00',NULL,'mqtTbpUg0w43e6290p3z-czKbtVYkgJgjlGof4btO-qAHeAUk7kfQbmWoHjS8e-t4ESrZa6CPD9ux3MubE9','2023-04-16 06:45:54'),('uyfWaO0bVcOnP0aOhzZm-Tmg6SVRUZfJ4Jwjk4gEj-hUlFIZjL1WMZLM5QvCV8-ED56p0xW3tnDlLT6xnwW','2023-04-16 11:11:00',NULL,'ODO4stVRJCKXCp3rXHoC-pLTKB6W0Frd32WJoL9Bd-nrCnO8REM7Q8xCl33gso-OxEeGqolfRmSUw6Vi3rd','2023-04-17 05:30:44');
/*!40000 ALTER TABLE `class_timetable_with_class_batch_assigned` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classes_rating`
--

DROP TABLE IF EXISTS `classes_rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classes_rating` (
  `id` varchar(255) NOT NULL,
  `rating` tinyint NOT NULL DEFAULT '0',
  `user_id` varchar(255) NOT NULL DEFAULT '0',
  `class_timetable_with_class_batch_assigned_id` varchar(255)  NOT NULL,
  PRIMARY KEY (`id`)
) ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes_rating`
--

LOCK TABLES `classes_rating` WRITE;
/*!40000 ALTER TABLE `classes_rating` DISABLE KEYS */;
INSERT INTO `classes_rating` VALUES ('2FVF1Jv1xqlM78DzAaX7-p8l8CjJdHZvfOiBU5bgv-3cSCxiK3l1MOtwozXEDc-5kvGtp111i2Z0W0QEAsH',3,'WVUfwxzuPsPT8SkrdEJi-2OzYOtOOQrTmZawAtxVO-lDW96OlY2VM6IH233VFi-Ze7D3X5ZDl6tEe0QGqaE','Vw49IDLhCppLOIRzPdmj-i6TIC5vtOpmjLwDAAv3i-erQcEvsdZTOoiKBjwwKk-vdu3TRXSvbvATPLCn6ot'),('4jzX5oTMmczOCY9fdD0O-vcrthAlMJEJKOPgbZ16x-tHndGvrP01ZyUGC0bdwQ-Qr5KGG7OsgvxzH7e6WJR',3,'WVUfwxzuPsPT8SkrdEJi-2OzYOtOOQrTmZawAtxVO-lDW96OlY2VM6IH233VFi-Ze7D3X5ZDl6tEe0QGqaE','bkXgup8oIWSx1jwOD3z3-cDVoSua7WprxS1DefF9E-oxHpqlvUdtn7cl1ABZfi-faLw5IDO7nQOUGkIB20d'),('A6J9U95fsOXSjMpKbsy1-Cjukf0ypnotHT5BiMEOd-Eiqxj6GHQlOf7SYXhdXC-FAGiRKhmxEcgKu41vpeV',2,'WVUfwxzuPsPT8SkrdEJi-2OzYOtOOQrTmZawAtxVO-lDW96OlY2VM6IH233VFi-Ze7D3X5ZDl6tEe0QGqaE','5UTBxmbCzxUzBBIalayA-KUI7bGoRD6gxUsk34hcb-CClxWhuI4zS2S3sdZF15-gKCJZOqQKGxEPlSeJJCw');
/*!40000 ALTER TABLE `classes_rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile_subject_with_batch`
--

DROP TABLE IF EXISTS `profile_subject_with_batch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile_subject_with_batch` (
  `id` varchar(255) NOT NULL,
  `profile_id` varchar(255) NOT NULL,
  `subject_id` varchar(255)  NOT NULL,
  `has_taken_demo` tinyint NOT NULL DEFAULT '0',
  `batch` tinyint NOT NULL COMMENT '1 - 1 - student\r\n2 - 3 - student\r\n3 - 5 - student',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `board` varchar(255) DEFAULT NULL,
  `class_assigned_teacher_batch_id` varchar(255)  DEFAULT NULL,
  PRIMARY KEY (`id`)
)  COMMENT='selected subjects by student with batch information';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile_subject_with_batch`
--

LOCK TABLES `profile_subject_with_batch` WRITE;
/*!40000 ALTER TABLE `profile_subject_with_batch` DISABLE KEYS */;
INSERT INTO `profile_subject_with_batch` VALUES ('0kXdaIxSphcPbRkCXww4-vf7ORPdubu4LGMhjaq5v-6FEwWEwjdZrhVuAhA227-9soTunF5eELLpzzYGUOi','Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3','453-45gd',1,2,'2023-04-15 08:22:27','sadsad9asdsa9d7sa6dsadsad','IwdJocWUrCvn3nIMOO3c-xDH4whoh4FSSO24fL2CZ-yZJZH1r7vrAyAtFyAfPY-uOd4u3qsnb4iU7OzslrX'),('8SDvKTs83iyOutcKT1ah-CnoId3vkeaT9XDzWyRcp-z93SUe3Ja5k9AJpYs3Jv-jeYPpBTit1Y2aBJnqI5y','Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3','asdsad9asdsad9asdsad',1,2,'2023-04-15 08:22:27','sadsad9asdsa9d7sa6dsadsad','ODO4stVRJCKXCp3rXHoC-pLTKB6W0Frd32WJoL9Bd-nrCnO8REM7Q8xCl33gso-OxEeGqolfRmSUw6Vi3rd'),('9XEMZyraAtVt8TS00ioA-bFJtQFUnTiCDTrkYD41I-jBOD9HGvpWejHMUPOc4H-RjUD4fvtaqz9A0OuXqZr','Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3','34rwergdjghdjk',1,2,'2023-04-15 08:22:27','sadsad9asdsa9d7sa6dsadsad','mqtTbpUg0w43e6290p3z-czKbtVYkgJgjlGof4btO-qAHeAUk7kfQbmWoHjS8e-t4ESrZa6CPD9ux3MubE9'),('BgwF7cuOHE1BFmXxyu60-C8eIg20msE4VWliytExI-I4bIawVwR79PZAFnErmP-tWwqOhJ1AmRsjJy6gFcO','Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3','34-ad-sadsad-sadasd',0,2,'2023-04-15 08:22:27','sadsad9asdsa9d7sa6dsadsad','VaviDQhottXl6BLBrBml-OmM1QdqeaVqJwKqlcXEv-JtRc61gxos4bsy0jKdV4-SQh5YzAUSaHgFr4o2RSx'),('C3MCXJwiTVKJ3BxGMglw-IzcVYhAnSsWA2eIszaUH-UHvOQH0dk7RQH3LL4wOC-W4Tn0bcwHAzYjBOVVOOk','Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3','dsad4364yryhdfg',0,2,'2023-04-15 08:22:27','sadsad9asdsa9d7sa6dsadsad','OKOf87kHIWYRkV1O5SnC-pqbfECIUsZSJcTMd3ebF-BH1eo8hDtCs6OVzOe2eL-JAtBCAsQhqK8k0uGJCfO'),('Dhts6Qx0lFaAxRKvEhqi-bxkhoF9hDWmb9JxAJME8-hppnJdVzLuAR5p7EkpXG-Mjt0OPl3AEmWgiW2arLn','Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3','sad9rewer-sdff',1,2,'2023-04-15 08:22:27','sadsad9asdsa9d7sa6dsadsad','5OojCFwdpXwM5e4KCVi3-LB7OzxqMvYbS89BejPYr-SdSKoZOwsFdZVGOyKu97-i2q8eh23fVRtWHZEzDTX'),('MAjbZS4sG8y9wUTY4OZ9-u5VX8nhrtfRkHJWPTqFh-f4etIyCFZhKgdUdB6oJ4-aDU1etXs0sjeh68YEhUc','Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3','324gedfsdafsdf',0,2,'2023-04-15 08:22:27','sadsad9asdsa9d7sa6dsadsad','Ud4OJxMOrgvqEZJfRFrF-GZV7WatOKHFOqanT6i7V-s7WGvmOvRkacmdv3lUbJ-969cjXO6npeOOFPMZ2Hz'),('pqQBcaDPK2YLTlgJhC0h-1PSg4oEvvdjHhET6aLh5-OzbYwApX9xhpy3TkQI9E-Ptz7jRIQ8QCaUa8OItPy','Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3','sad2345terwfsdf',0,2,'2023-04-15 08:22:27','sadsad9asdsa9d7sa6dsadsad','dggwidLi37WKES9qgKbS-9wVZk4ZDAm2cBcOm86x3-nPmtM5239iVnX47lw0qR-WgXRpQQoRQCOCv5VwG6e'),('UHd2HC1O5MIUafDR8uf7-HgRo4mLjjrETZY9wOT9I-GRhSLZYW2qOoIWpv12mv-3LtgTu9pqApoKOhHoCBA','Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3','adas34yru567rtyr',1,2,'2023-04-15 08:22:27','sadsad9asdsa9d7sa6dsadsad','CYv50q3Wjdrhb7c65TOh-qjRwibcpOPfyIKPzmsHm-STxIjkKKnqhEHMQC5aVq-EgLGkLqIHq8BLi8IrfSb'),('V4QUFOWghXW7h3wyBhGZ-PtppZGWc7OqqUiCgx8su-kTQubKjhbkyTDiMvQgrc-K7Jxv1OPwWASObSPaBdh','Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3','sadsad-asdasd-adasd',0,2,'2023-04-15 08:22:27','sadsad9asdsa9d7sa6dsadsad','yZ8BsORImY5ke7qQ8poz-L8p8J5qvpmYcvkkp4vRI-FyM1Y3Jb9SSZPU2STt0n-dGG41ndX7iU6X326WXyU'),('w2gsOOflHmoVxpsRhP4w-bdFT5rrSYQ5nR4AAIvY7-iy555Q6WUP2U9q7XJmga-7zhBeljOkjFeWzYXCYpR','Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3','sadsad342rsfsdf',0,2,'2023-04-15 08:22:27','sadsad9asdsa9d7sa6dsadsad','xJWzMJiEVnzKDcTE1MAX-h64FTw0YhAp4aPdU345P-PlszHptD4ws0gl2GQ7lW-rq93OewUxGUW9Pnqd6vV'),('xf2zEavqv6RpHlr0jSa0-XZLk53XPqot9AmnciEyi-AlnSSsVuu0SKDRykB7oO-MJOhHPrSDOK0VfRl1C5S','Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3','dfs3424sdfsfsdf',0,2,'2023-04-15 08:22:27','sadsad9asdsa9d7sa6dsadsad',NULL),('z06MZBQHax1tfZ0aMTHR-ThpzMPsJj9qqeYuO9uy2-b6AjCpsDnZoiZ7ZodmDk-MEDj9AsimDZYtmK03qZc','Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3','sadas545gdfgas',0,2,'2023-04-15 08:22:27','sadsad9asdsa9d7sa6dsadsad',NULL);
/*!40000 ALTER TABLE `profile_subject_with_batch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `school_board`
--

DROP TABLE IF EXISTS `school_board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `school_board` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `school_board`
--

LOCK TABLES `school_board` WRITE;
/*!40000 ALTER TABLE `school_board` DISABLE KEYS */;
INSERT INTO `school_board` VALUES ('34324werter9wet345rwer','Council for the Indian School Certificate Examination (CISCE)','2022-11-29 09:23:27'),('345rwerryertre','Cambridge International Examinations (CIE)','2022-11-29 09:24:00'),('34werw525wradsadasd','International Baccalaureate (IB)','2022-11-29 09:23:51'),('dsad8qweqwe4erwer2354ewre','National Institute of Open Schooling (NIOS)','2022-11-29 09:23:38'),('sadsad9asdsa9d7sa6dsadsad','Central Board of Secondary Education (CBSE)','2022-11-29 09:22:56'),('sadsad9sdsadsad9sad9sadasdas','State Boards (SB)','2022-11-29 09:22:43'),('werwer-r-t9etrtretret','Indian Certificate of Secondary Education (ICSE)','2022-11-29 09:23:10');
/*!40000 ALTER TABLE `school_board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_class_attend`
--

DROP TABLE IF EXISTS `student_class_attend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_class_attend` (
  `id` varchar(255) NOT NULL,
  `class_timetable_with_class_batch_assigned_id` varchar(255)  NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `student_profile_id` varchar(255) NOT NULL,
  `profile_subject_with_batch_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_class_attend`
--

LOCK TABLES `student_class_attend` WRITE;
/*!40000 ALTER TABLE `student_class_attend` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_class_attend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_class_attend_assignment`
--

DROP TABLE IF EXISTS `student_class_attend_assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_class_attend_assignment` (
  `id` varchar(255) NOT NULL,
  `student_class_attend_id` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `path` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_class_attend_assignment`
--

LOCK TABLES `student_class_attend_assignment` WRITE;
/*!40000 ALTER TABLE `student_class_attend_assignment` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_class_attend_assignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_profile`
--

DROP TABLE IF EXISTS `student_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_profile` (
  `id` varchar(255) NOT NULL,
  `father_name` varchar(255) NOT NULL,
  `mother_name` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `school_name` varchar(255) NOT NULL,
  `school_board` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `created_by` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `student_class` int NOT NULL,
  `batch` int NOT NULL,
  `subscription_end_date` datetime DEFAULT NULL,
  `taken_single_demo` tinyint NOT NULL DEFAULT '0',
  `subscription_amount_paid` int DEFAULT NULL,
  PRIMARY KEY (`id`)
)  COMMENT='student profile creation';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_profile`
--

LOCK TABLES `student_profile` WRITE;
/*!40000 ALTER TABLE `student_profile` DISABLE KEYS */;
INSERT INTO `student_profile` VALUES ('Ka8ft1WjOi579eZnI2Bu-bZKsFFk9F9cHoPkr28Eu-DGTz39UP7u8WnMGQ5hSh-D81Os3cFAVl6bSWModx3','Suresh chandra','Rupa devi','Mayank Dobriyal','DPS','sadsad9asdsa9d7sa6dsadsad','Delhi','Delhi',1,'WVUfwxzuPsPT8SkrdEJi-2OzYOtOOQrTmZawAtxVO-lDW96OlY2VM6IH233VFi-Ze7D3X5ZDl6tEe0QGqaE','mayank@gmail.com','2023-04-15 08:22:27',10,2,'2024-04-15 14:01:44',1,NULL);
/*!40000 ALTER TABLE `student_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject`
--

DROP TABLE IF EXISTS `subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
)  COMMENT='all classes suubjects';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
INSERT INTO `subject` VALUES ('324gedfsdafsdf','Social','2022-11-29 09:11:17'),('34-ad-sadsad-sadasd','Hindi','2022-11-29 09:08:05'),('34rwergdjghdjk','English','2022-11-29 09:10:01'),('453-45gd','Civics','2022-11-29 09:09:28'),('adas34yru567rtyr','Computer','2022-11-29 09:10:33'),('asdsad9asdsad9asdsad','Maths','2022-11-29 09:08:23'),('dfs3424sdfsfsdf','History','2022-11-29 09:09:11'),('dsad4364yryhdfg','Biology','2022-11-29 09:10:23'),('sad2345terwfsdf','Resoning','2022-11-29 09:10:49'),('sad9rewer-sdff','Science','2022-11-29 14:38:37'),('sadas545gdfgas','Geography','2022-11-29 09:09:40'),('sadsad-asdasd-adasd','Physics','2022-11-29 09:08:52'),('sadsad342rsfsdf','Chemistry','2022-11-29 09:10:12');
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_subject_and_class`
--

DROP TABLE IF EXISTS `teacher_subject_and_class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher_subject_and_class` (
  `id` varchar(255) NOT NULL,
  `teacher_id` varchar(255) NOT NULL,
  `teacher_class` int NOT NULL DEFAULT '0',
  `subject_id` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_subject_and_class`
--

LOCK TABLES `teacher_subject_and_class` WRITE;
/*!40000 ALTER TABLE `teacher_subject_and_class` DISABLE KEYS */;
INSERT INTO `teacher_subject_and_class` VALUES ('0wUL7YsfDsqowyc6uqh6-TyQtdJbODTyEZbHG2pXl-3pXORvaSETbr7tg2Icqy-FDEzkhs020Xpjch65guI','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',10,'sad9rewer-sdff','2023-04-15 08:20:05'),('22Eal3Q0ZkwnjucA8b1z-7atqnbLI7i8o9U5mPzGj-VZzXJ6PC2GO3Sl5Lilmz-Gs70x260srLEaUVcJjwi','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',9,'sadas545gdfgas','2023-04-15 08:20:05'),('23p5UuA44aMTKy7OK43K-gPJCWuuQEdSIOXX2WwrD-jsVLIWDDy1hV8yVCJBac-tBJphHtkAyjT4nBLf8g2','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',12,'asdsad9asdsad9asdsad','2023-04-15 08:20:04'),('4bKxvLWGmOGb2bfL83wr-gDrXyoTgUMOdYeXcy9Bv-xGkIkaESdBdLUuUnQ8Q0-2sivAdtO5eQocGxmKgLI','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',7,'34-ad-sadsad-sadasd','2023-04-15 08:20:04'),('4TjTTOFDMOupPuZyuFPk-9iu7mLoZze2vDdXv68iV-ru43ITp7lsUK2hGdG6j3-2TW2qjo94gnOiawgEydf','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',11,'sadsad-asdasd-adasd','2023-04-15 08:20:05'),('5otLyuFViktOKM4y6uYX-iiyUwrgpYwUCfHq0pPit-PeyMjHPmszH7JU42B7XI-WlIU1vH8sFSeBlV2JliR','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',10,'asdsad9asdsad9asdsad','2023-04-15 08:20:04'),('5U1TTUAMbVqVcjOd8cVu-6iPeOBdYFasgjGctontJ-Er9iLByroPwjlEqAkswO-G4ShxauCJRJHjpcIaAhy','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',11,'sadsad342rsfsdf','2023-04-15 08:20:05'),('7HUxnLOtFxlSuh8zyxhA-GwpAbm69hR9bxhEZkkYb-Bv2W4wngJirse5zIMHFU-FGpUAIsvdPhlLzOdXVZE','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',8,'sad9rewer-sdff','2023-04-15 08:20:05'),('7mabq1O7LerAAyjL5Sta-FO14bYmFZXQyncmc1CCt-eGZI05KhbFR9LGdiK5RE-4xR3G4WyyTLK2btBz7Fs','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',12,'34-ad-sadsad-sadasd','2023-04-15 08:20:04'),('7Oh7lWhIYG0Xc76YXcMW-aeW8wDiaFMBA0RRKyH1E-DJhsPoAa8uMWitpAYpB0-15R826rtbiDw9zUQ4jJd','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',6,'asdsad9asdsad9asdsad','2023-04-15 08:20:04'),('8g4A9wMj9WgZSnRFzfu1-giEasan87pwGZ506ZC42-J3px4EngQ6BAhoAftDSy-YAGsKjtyxK7dxp4kooj6','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',7,'324gedfsdafsdf','2023-04-15 08:20:03'),('9fUqUVRoZUWKJfY1sgs9-dVrOmx136pJBZ62c2Bg1-LkrQsrkzuTQFAetpL3Li-OGmymXPLllOHndvCqt93','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',9,'dsad4364yryhdfg','2023-04-15 08:20:04'),('B0jDJOzjwzJ1CJPlAzM7-hTRT8jfpV4aOl0UEXOVR-3UI1ulbwEpWDce1nwk0z-YeYWD4l7RIqwenCTjfW3','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',12,'453-45gd','2023-04-15 08:20:04'),('B4MrpySusTqEr6V3eykY-Y8tu6Ru6zCFnbUuIRJLL-6pdHnBbtIPR1t6hYnfrQ-tfkcScz0l1KfqBIBbJLH','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',7,'sadas545gdfgas','2023-04-15 08:20:05'),('B9jzORpaa3jQeUwOxAga-n6ogx6sluHMQLXyXRH1X-ODLWnhdLhO3Vui5BMI0Z-o6oJr6YOIqIYo5Ya1mvm','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',10,'453-45gd','2023-04-15 08:20:04'),('BnnzoIIjT3P1Tq9yb0hu-EsuQ3iiBrxv3X3L4re10-eK9YDznJqH6LgCORM9jM-0XOqwXSOOFT6A2hi3o7M','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',6,'sadsad342rsfsdf','2023-04-15 08:20:05'),('CfOSmvZ4BpXaVk9JALai-cF3Du9k3E1fABxtA0gQm-9IO1vFgmKtO8vDe2wdza-8jX7acFhOCju6DY4Of2D','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',8,'34-ad-sadsad-sadasd','2023-04-15 08:20:04'),('COILzoJu7DOUgzxYdpfp-V3EpVTgcCWxxkBkMyDU7-9fsgu9TGEm2oLsEKw4v1-uBfpBqPJoUzs3j3SIHA5','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',9,'adas34yru567rtyr','2023-04-15 08:20:04'),('cRPooh22oX00HFRFWI7e-g9Dx9CWcIi0z5qyrvdaZ-KbgHzjq5OwzOqsZM1d7P-4IVH4Qq0l2aaT53Wtbg4','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',7,'dfs3424sdfsfsdf','2023-04-15 08:20:04'),('D3BbPBSAwZjEDjxxwgXS-60AEK8M7XlpF6EDvo8cY-kc2qD5P7m4j7uxY6D1iP-2AQY94UjwWhxeOXjFyEG','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',8,'34rwergdjghdjk','2023-04-15 08:20:04'),('D3ju2slEwajtbo4Ziags-tpc0UzaEYS8Gm8U9o24S-PtrFOsfhaHY6lTyOpijD-EaAGL9lCPDSefLGX39yi','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',8,'sadsad342rsfsdf','2023-04-15 08:20:05'),('dlAnZOIiiEnO6irXgLqG-09jcqzSC595Yy33A20r9-CiCpiGJCQrVF5BdhFDhL-1Ajv478krmergwwer8eG','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',11,'sad9rewer-sdff','2023-04-15 08:20:05'),('DndEMJx8Vi7eLxxjyYM8-hl5ie1nV73xYfVAkTOnm-DM3Rm46kuqpahcL7Ei0Z-BQrZtQ4j5YAUCfmiK0pR','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',8,'dsad4364yryhdfg','2023-04-15 08:20:04'),('dsF3U5opJpWPK07rDnHw-ZezOejOhMsGUta5oaxXv-G3opmzl4oVuGOrctbWFO-HVUSXijZOXKa7yO2FohU','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',6,'453-45gd','2023-04-15 08:20:04'),('dvgunfOa0i9ZTbgj3O6T-CF2KCn5cKe2tz0hwSPwX-vvpEdoJl4r2DjDF3bRY0-yP5HAdxVIsqOtKSQWctU','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',12,'sadsad342rsfsdf','2023-04-15 08:20:05'),('e04n7VvSJ7bgfmt686Az-Hw6Fr4asW426al6JU4to-FgOZs9Pwt9Iw4ODXoAQv-BaFmDkPpZCySGDRtbGkv','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',10,'34rwergdjghdjk','2023-04-15 08:20:04'),('fC9pOYAI0jDuIofHpWMz-Fm9bdPm43PrxpsBswOOa-IQKG11BeJEnFcU44F4pO-52QqUq1ldp90QwOgxhVL','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',11,'dsad4364yryhdfg','2023-04-15 08:20:04'),('FE6vLPpMUaL11n9sE8cG-reni8LYwBaCflr8i8q8n-d0uFaIeElOeTJM954PJa-jBI2uQg5CRsQuO3OyuX9','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',7,'34rwergdjghdjk','2023-04-15 08:20:04'),('Fh5FAEx3ZnIyDYzwrim0-0jKhPjfRXthSuZHr3O9z-EJEZa2q0etoAbA4Q0l3o-GyOmBcqm254ytDgguOWH','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',7,'asdsad9asdsad9asdsad','2023-04-15 08:20:04'),('fq9YrdlBeV07pKKZW6Z2-JmAcJOKsqSUv2FAJWupn-lDf8CZw5Zht69aoOhn8s-P9oLOJOGMXt74nD9vl2V','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',11,'34-ad-sadsad-sadasd','2023-04-15 08:20:04'),('FsnvQZMC72UB2HIz527d-6HYbT7L9qRhcisjvwwra-DxW7VAQknJ7ynQzXOKlJ-zv4secTAvrdxJYEom2xg','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',9,'34rwergdjghdjk','2023-04-15 08:20:04'),('FUEd6JPfU05nEX8bSJmX-y31x3FCqR7Xdu3mliSnC-ijuTWzIF1mvHBAvY8wkO-ty90vByU3jTtFzMJvy0W','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',8,'dfs3424sdfsfsdf','2023-04-15 08:20:04'),('GeXXOxvXFRI2Inz9uWoF-lQ5Drt8gZIgFFaC2RcEl-iE8OxdsIgrHJ7Q42GtIH-ddYXHwgfTyL66UEfCOTA','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',7,'adas34yru567rtyr','2023-04-15 08:20:04'),('gfg4UC73kI2vppbPgRKS-vzLy7lTOlMBTJlrbWl3b-hV4x1XdGg5I5UL8Awkeq-DiHm9fQgvrfAopHyb3yO','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',8,'adas34yru567rtyr','2023-04-15 08:20:04'),('h4ilOifpCFWVljadrUoz-xYiSb5xUzSUFIX5HuWK8-XxLOR5dVXfC1PKTzjtjf-GKladSG7OywAnU63QOzS','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',8,'324gedfsdafsdf','2023-04-15 08:20:04'),('H5K3JDDEDd2qJjb2fPta-OYiXwSp6kPoGqPCMsF8G-Kr3GA5corHBZ4L1AkMJH-8kFi9muOODhD9IhDGQAF','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',10,'324gedfsdafsdf','2023-04-15 08:20:04'),('H9QkFhgWDymjPikFh1oh-1v5R4a1nIjfq1AtUSqcV-RqZFBxKs0P1zDsZOIAYO-Kvqn5GRvKprg0bGTJez6','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',6,'sadas545gdfgas','2023-04-15 08:20:05'),('k3TwECfJj8ehcYu3kB6l-fDH7jAjB6SC05vRqOTsU-t9pXu6XYtBS7uh1l3Jwj-bSWGQEmQ4ncgE2Q2KJrO','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',8,'sadas545gdfgas','2023-04-15 08:20:05'),('KX87gmkQ0qCxwWlEiFIa-H9mF6fjV7zqSufuAaeTp-kLQYZ724rWzasPLdXlxe-PxQRcOkQzSpHg5ORJKvk','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',10,'dsad4364yryhdfg','2023-04-15 08:20:04'),('LOrOfB12weq6DI7j2afS-3Kq1pOW6t5KKftwud6go-D6X017gJUmMYVyQ0Dl2K-L4vt7ne6Xc5OtG0V1JTr','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',7,'dsad4364yryhdfg','2023-04-15 08:20:04'),('lPPdbVqjLhJWcX3PwJRX-0rVQO6C9ZyzCHp3rz95l-D8osiOZLQbiouQBtgCwO-o0P2Z1aJzaDRdI3ASEr3','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',11,'dfs3424sdfsfsdf','2023-04-15 08:20:04'),('Lur5p8m4sO2yYbA4QVky-W14gQisXJm8rHgFgPiYE-Ohpp6HGmBonG1bQiqHk7-VVHFlSMtET2TIZ0ovUOu','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',8,'sad2345terwfsdf','2023-04-15 08:20:05'),('mIqvJKVlWxL0Awt601Cr-mpQTZCwI10WGTydnaQJs-rDorcQgmD07B6vOs4bPU-ZEywF0Ssc3y5IJruRooC','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',10,'sad2345terwfsdf','2023-04-15 08:20:05'),('nel5jE1XjlqckKYhJFwE-slQ25C8zaPWeSROrOnLL-C6KyGs6Kg73ZDaTX0BoF-BQx1CcE6f9QcRdTgeCoO','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',11,'453-45gd','2023-04-15 08:20:04'),('neSCPeI5fO43EonvT0xP-lJDtGDKk3qMf0EPQMO5D-aEUX1aIj0lFgqfgehCGA-TJ3UIkGFbpwKkr48QHxO','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',11,'34rwergdjghdjk','2023-04-15 08:20:04'),('ntruaYD3gLvBRjUGeOkm-RghSygogFpEtLbkIFjw7-YC2XFo846rEHXGB0qkdk-sUdWeh4zo0IL6Uxo8ZA6','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',10,'sadsad342rsfsdf','2023-04-15 08:20:05'),('nWTsxASlOsxHmqxuOvEa-Vl4LO6CoRsbxkmSiLQcI-2yrcyVPpvzxEYmAt5Y3b-VQJCM6ysy5g8v9jjOd94','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',9,'sad2345terwfsdf','2023-04-15 08:20:05'),('O2kgeMzAn5bIlykEljpw-FbZh8yEpfC3TKWZRblho-O46Xn78RiKt5KBuieveH-HuPwzM2rXh5FQOSWgbIH','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',6,'adas34yru567rtyr','2023-04-15 08:20:04'),('O3wkyEJBPjIcLcmHE5jK-HeMAGIMYStTwjdkoHVlc-2D2bBE1idyM3u4O0ZeFE-tRAceCpdhXOzjIi88Xgp','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',8,'453-45gd','2023-04-15 08:20:04'),('oIuy6BmbVhZ9dHWUEYM4-lnjAxohkBlnJSjTxZXoh-tzKvXqfdZWdlWfwLWw9K-UTQUQm5tR94uRC3SHeqC','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',7,'sadsad342rsfsdf','2023-04-15 08:20:05'),('OJd5nRyLgwJZnkrvPJZY-r05QZYws73yxStfvSsh8-Q011v8dBAq0xz1qJ0XHV-gWcIRYSqr7weJeJU7zcL','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',12,'34rwergdjghdjk','2023-04-15 08:20:04'),('OmiaCuAsZUQEiJ9LZqQ5-pEEnYkksBcpVMBjBtreA-8jCQTB7GZbv2pmCqGFKW-gVQabmktjwUvwhM7Rahx','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',11,'sadas545gdfgas','2023-04-15 08:20:05'),('OYV0WxInVDGrEgaCcr4L-nijoR6BwnXQ1BuuRin4v-47uTdahPWpZBztA39GLr-nIQfUJTjFYbvVO5Oyhg1','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',9,'453-45gd','2023-04-15 08:20:04'),('oZGD0e648HK0dyo4RTpW-uVovooaZ5eO8fxyX3pIq-w6M5vZtk3truYf4WLY1Q-BzWCcHfpDYRxJQkiheeE','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',9,'sadsad-asdasd-adasd','2023-04-15 08:20:05'),('p0RmVfBMUpbX1y4AUQta-Cxr8EMR3g4EEYj9okerq-QOiYhstEDp60uYD8anTG-8GDy3TODUWl05S4yAkeO','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',6,'34-ad-sadsad-sadasd','2023-04-15 08:20:04'),('p4Kuj8SfacIZQ2DmRHVV-bmkB2rGsnHLxIaixZ1Oz-cxJnvHMaIp8Riicnx7e0-9oEkUYS2g3orwrryhpnM','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',9,'dfs3424sdfsfsdf','2023-04-15 08:20:04'),('PowkFJlYOXTZhBX6JAnv-06jLaoexECRj3gOYlpTz-zfmXpyVO1QBBhzHQShu7-zRX3ZUioIxxSXMZb39ID','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',9,'324gedfsdafsdf','2023-04-15 08:20:04'),('PU3yaxrHk0PVIEusbWMq-tE9uzw8zSOJPOh3dplIA-9Kfpr4Ui49xyjJESrd6q-6ZBnIrP5zcY40GIRbbui','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',6,'dfs3424sdfsfsdf','2023-04-15 08:20:04'),('Q1YbiqEkIDmDQXTaj3Bp-g44Xe0rGA1Xt6PaCPQp9-VjbgObMT2jR5y4AFMcn1-6QC9EzdYzjLIGQuCAhDG','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',7,'sad2345terwfsdf','2023-04-15 08:20:05'),('QKxKjQLKbMH5rSD9UWb9-VpAZ8e39ZRJjKbOLGbeJ-sT3TB95vG8Qnwauh7wyV-pEW7eyGfPktvWROOwUZQ','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',6,'34rwergdjghdjk','2023-04-15 08:20:04'),('qp3fWKYzfB1glD2L4vCV-VI4OHXCGwHdJzhxyis4o-f4IZFRuZgmvShfsKpbVP-LlfbV6AVCudOPqn2AEbT','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',10,'adas34yru567rtyr','2023-04-15 08:20:04'),('quJnjPdj0Pv8X3eyiLyt-o4o8ZwQuM3FM1algOAJk-xalnPyizIGVX0SjkvXx5-DhOa6dciMkKzSqX0kjVf','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',6,'dsad4364yryhdfg','2023-04-15 08:20:04'),('QXddBvZUdhDDeWDWeBIh-ptZ6j31wn6cg6DUafk0l-e1lmvOOC2u2TMmiaCU75-qvyIZxKqKqXJerkOAw9o','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',12,'sad9rewer-sdff','2023-04-15 08:20:05'),('REDt3exh4OZqIgO4Df0A-44Lv52EmLCvOB4ZxW5qL-FuWzXfrnHXFgRD3t6tcS-5XY9sJX3X9cYCiFs3C2M','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',11,'sad2345terwfsdf','2023-04-15 08:20:05'),('S8BBJwqAuZzjWRGpBS1X-qGpuxaWc1L15dvTgDvp6-Ksq5bL1d2p747kOgWT2h-POT0bVgeLeOzWEJDQcRx','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',12,'sad2345terwfsdf','2023-04-15 08:20:05'),('sfsp7L7DGaMUUmel4vPK-L09FpZFE0CbAwjJZhnTZ-7UwY3w8ppLdYsutigQmx-e2Jx9AeOIsyWnt0xSz0J','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',12,'adas34yru567rtyr','2023-04-15 08:20:04'),('sqjSgeRwHHYjswM38a1g-ZCCblELHiyxxc15E1bFT-QkBQTBWCAdqtKeVjPpY7-v7i4FGZyn69sDVGiobT5','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',12,'sadas545gdfgas','2023-04-15 08:20:05'),('su4I49Mp5dexWqstIPbP-ezzC7weaQc52hSJVRTv0-yjeuQPA7tfd5QaiCBwKj-dxsHO8W42RRPxUOpW36E','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',10,'sadas545gdfgas','2023-04-15 08:20:05'),('TGq0A7DVYhlk3EJwlQOu-uiwh4bf2xwDDi5Om7xOI-vkRLAhzOdlk2AiEiSA5q-OJxa2EDGeBzSvfdnOa1V','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',12,'324gedfsdafsdf','2023-04-15 08:20:04'),('thX7eKGtPmQ3X89KGPOw-WdKsUHU83WzwXGKGTEdS-zy8qeD757lZH4mrI1bZr-4Sy67Pqbe4KDFHRGLSJB','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',9,'sadsad342rsfsdf','2023-04-15 08:20:05'),('TuhVI8Od5cEObC8og2yz-PueTvdH1208C7BWtbWZS-PkIaog4C2PAG3VegoYnu-qq2IpYaW0YS4PrzOmuEW','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',10,'34-ad-sadsad-sadasd','2023-04-15 08:20:04'),('ucyMiyG5bf6O0WzWO3ws-K0nIz5dhSi3qf8geCfYB-l1ORLtSp6kvL66cp70d2-Jj1iPS7BHPEGVz55TLjW','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',7,'sad9rewer-sdff','2023-04-15 08:20:05'),('uEpcaVBVwpp0vAqMhUe7-0OmmaAjRYuAjkUKBtr0z-1IgAT9kRXZUyZQ1EJ2IH-ouu8SRIChYFRJKUlvB0D','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',9,'asdsad9asdsad9asdsad','2023-04-15 08:20:04'),('uHOPfMUJ2uFowEiOFtoi-5v66MIn6S9M33oKo5TwR-kO7CACigOqt4LLbSltpL-tySCP0zPcbmbiYKlQl1C','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',9,'34-ad-sadsad-sadasd','2023-04-15 08:20:04'),('uRTMXhQD6SFbli8gfYiQ-s3Z6hA9myGe6rD4iR7GL-Gvm7qeACl0MXpkaDGRiT-0Fkg0O9JGShsBGpfYPQF','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',6,'sadsad-asdasd-adasd','2023-04-15 08:20:05'),('uuaCeg5EzEWHpyutbQKu-AzTo79OXiLAX99oRUwP6-JGqoBt8frO9QOV0VU6Ht-955OUglowOlTyAeKz2vv','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',12,'sadsad-asdasd-adasd','2023-04-15 08:20:05'),('VngvaOtapSBZ9OyuxoSu-8YwhYduq341EaxLQSZMY-hHj6Hv5SfMOSclOWtg8f-eu5PCv51LzHt4jltnTn3','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',6,'324gedfsdafsdf','2023-04-15 08:20:03'),('VtD9Czuj2wCXMA6u2sM3-giJnr7Ebg4F5X3jFm2SB-3FG7RtSsM2OQlektHkzc-T5UQy1UxrMzJl5q0SIDr','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',11,'324gedfsdafsdf','2023-04-15 08:20:04'),('wjhDkH40BR6y5vzcCOP3-PhhxOYpv9Y9UDYCOcSPM-zBM7qnRq8T8jlajVvp5o-As0RlEfcBe0hPEI1esrT','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',10,'dfs3424sdfsfsdf','2023-04-15 08:20:04'),('WxIs2QjVJVCPzCpt3V9k-TWc1SrxXGIS6GB0h9UQ3-YOpLLUr4EgwnDvHBYxpv-Dzd86rpk2KVIOe0j1zwn','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',10,'sadsad-asdasd-adasd','2023-04-15 08:20:05'),('wxOdz5XrqPYjxnCKxIWU-2nx2mxa1QkQk0U1HSHQ1-WYaJAhrzP2XuiwBtZKmj-JyLOltzQXIEVT0OASytV','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',9,'sad9rewer-sdff','2023-04-15 08:20:05'),('X9ELtCqgfWG3ESex4yTA-56vSCkHMRvjYRxvK2HcY-a6KKm8cGWdOmbRjE8GGT-RxamISpDqWEAGtyLQj4a','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',11,'adas34yru567rtyr','2023-04-15 08:20:04'),('xcP1K4SqsnknyumrGDhv-O9vTi431XSk6uTjgfoaP-BJLSbrE35u5mc8a9lJvv-1BA3T3ASBpjOKjQ1IV2V','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',12,'dfs3424sdfsfsdf','2023-04-15 08:20:04'),('XeskYOfX7iU359mFlB7i-eQPe2WOMxvfcS8c88ujY-Br2r5pzAlvoztYlyU0Ft-S9Qg6WcsSRsKBHJHLDot','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',8,'asdsad9asdsad9asdsad','2023-04-15 08:20:04'),('xQxkf1JBjYyoAoqDiyfs-cnUwRh4FZ3zQb4qE6aOG-xgK9VGS6iPiArG6Cf9na-eSOOumT9HMZWkHb0qSWr','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',8,'sadsad-asdasd-adasd','2023-04-15 08:20:05'),('YShoOGmOGLctuketr4CO-amePVWshJ9xxt2IHDRDv-hlXdO0aSEAhtAtDQfrLt-ThxuOP48HWbfubRKIQYs','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',11,'asdsad9asdsad9asdsad','2023-04-15 08:20:04'),('yXlsioJQfRvomgJ65VQp-VdqzfXDes4nbd7xbZXEO-SbpHwhajHesMChLf1pPh-G8YUrcwcb8BZ8wIdA0kA','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',6,'sad9rewer-sdff','2023-04-15 08:20:05'),('Z2bfy1z3BwdSsVRK7FCQ-KyOXH2azXJR0bMOrggsF-7uP4WMSGjKHOPnRHbv38-SqCZCIXmu7pFyae29YCn','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',7,'sadsad-asdasd-adasd','2023-04-15 08:20:05'),('zmlVJQ11wzHz3QCTGYtw-z8y3ygY7HF5kVqv0QiB0-CmO6dpY7IXsCAZsWuZZ7-kXgXLlGlsH1zSkinbV0M','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',6,'sad2345terwfsdf','2023-04-15 08:20:04'),('ZQ41EZRObiraQHDdSu4u-7xUpcwCTw7bFm8O6BT6d-ioCb41pkj64rWkfSumrg-DeMSSAWAWXERx9zosvfY','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',12,'dsad4364yryhdfg','2023-04-15 08:20:04'),('ZrRZmcpF4ZtOMXE5bA2w-R6RBeQy7OK0UTZn2Iu86-5mACgsLLbOmx8ZX3Gda7-kirwrEQg3x44Uie0mxMZ','Gk03XS97FCIh3T3Q68F3-pSBf4iEyiMAwOnpQ09ne-K1XVFZastOVYubRSX2vH-Hpz1hzDVz5SdyL07VLHW',7,'453-45gd','2023-04-15 08:20:04');
/*!40000 ALTER TABLE `teacher_subject_and_class` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-28 13:07:08
