-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: 34.82.78.176    Database: foodbank
-- ------------------------------------------------------
-- Server version	8.0.31-google

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
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `break_out` int NOT NULL,
  `in_king_county` int NOT NULL,
  `latlng` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `id` int NOT NULL,
  `version` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `disabled` int NOT NULL,
  `raceId` int NOT NULL,
  `birthYear` varchar(255) NOT NULL,
  `genderId` int NOT NULL,
  `refugeeImmigrantStatus` int NOT NULL,
  `speaksEnglish` int NOT NULL,
  `militaryStatusId` int NOT NULL,
  `ethnicityId` int NOT NULL,
  `householdId` int NOT NULL,
  `phoneNumber` varchar(255) NOT NULL DEFAULT (_utf8mb4''),
  PRIMARY KEY (`id`,`version`),
  KEY `client_household_id` (`householdId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Temporary view structure for view `client_visit`
--

DROP TABLE IF EXISTS `client_visit`;
/*!50001 DROP VIEW IF EXISTS `client_visit`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `client_visit` AS SELECT 
 1 AS `clientId`,
 1 AS `disabled`,
 1 AS `raceId`,
 1 AS `birthYear`,
 1 AS `genderId`,
 1 AS `refugeeImmigrantStatus`,
 1 AS `speaksEnglish`,
 1 AS `militaryStatusId`,
 1 AS `ethnicityId`,
 1 AS `visitId`,
 1 AS `date`,
 1 AS `householdId`,
 1 AS `cityId`,
 1 AS `zip`,
 1 AS `age`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `ethnicity`
--

DROP TABLE IF EXISTS `ethnicity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ethnicity` (
  `id` int NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `value` (`value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `ethnicity_translation`
--

DROP TABLE IF EXISTS `ethnicity_translation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ethnicity_translation` (
  `id` int NOT NULL,
  `languageId` int NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`,`languageId`),
  KEY `languageId` (`languageId`),
  CONSTRAINT `ethnicity_translation_ibfk_1` FOREIGN KEY (`id`) REFERENCES `ethnicity` (`id`),
  CONSTRAINT `ethnicity_translation_ibfk_2` FOREIGN KEY (`languageId`) REFERENCES `language` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `gender`
--

DROP TABLE IF EXISTS `gender`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gender` (
  `id` int NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `value` (`value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `gender_translation`
--

DROP TABLE IF EXISTS `gender_translation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gender_translation` (
  `id` int NOT NULL,
  `languageId` int NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`,`languageId`),
  KEY `languageId` (`languageId`),
  CONSTRAINT `gender_translation_ibfk_1` FOREIGN KEY (`id`) REFERENCES `gender` (`id`),
  CONSTRAINT `gender_translation_ibfk_2` FOREIGN KEY (`languageId`) REFERENCES `language` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `household`
--

DROP TABLE IF EXISTS `household`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `household` (
  `id` int NOT NULL,
  `version` int NOT NULL,
  `address1` varchar(255) DEFAULT NULL,
  `address2` varchar(255) DEFAULT NULL,
  `cityId` int NOT NULL,
  `zip` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `incomeLevelId` int NOT NULL,
  `latlng` varchar(255) NOT NULL,
  PRIMARY KEY (`id`,`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `household_client_list`
--

DROP TABLE IF EXISTS `household_client_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `household_client_list` (
  `householdId` int NOT NULL,
  `householdVersion` int NOT NULL,
  `clientId` int NOT NULL,
  `clientVersion` int NOT NULL,
  PRIMARY KEY (`householdId`,`householdVersion`,`clientId`,`clientVersion`),
  KEY `clientId` (`clientId`,`clientVersion`),
  CONSTRAINT `household_client_list_ibfk_1` FOREIGN KEY (`householdId`, `householdVersion`) REFERENCES `household` (`id`, `version`),
  CONSTRAINT `household_client_list_ibfk_2` FOREIGN KEY (`clientId`, `clientVersion`) REFERENCES `client` (`id`, `version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Temporary view structure for view `household_visit`
--

DROP TABLE IF EXISTS `household_visit`;
/*!50001 DROP VIEW IF EXISTS `household_visit`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `household_visit` AS SELECT 
 1 AS `householdId`,
 1 AS `incomeLevelId`,
 1 AS `visitId`,
 1 AS `date`,
 1 AS `cityId`,
 1 AS `zip`,
 1 AS `homeless`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `income_level`
--

DROP TABLE IF EXISTS `income_level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `income_level` (
  `id` int NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `income_level_translation`
--

DROP TABLE IF EXISTS `income_level_translation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `income_level_translation` (
  `id` int NOT NULL,
  `languageId` int NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`,`languageId`),
  KEY `languageId` (`languageId`),
  CONSTRAINT `income_level_translation_ibfk_1` FOREIGN KEY (`id`) REFERENCES `income_level` (`id`),
  CONSTRAINT `income_level_translation_ibfk_2` FOREIGN KEY (`languageId`) REFERENCES `language` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `keys`
--

DROP TABLE IF EXISTS `keys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `keys` (
  `tablename` varchar(255) NOT NULL,
  `next_key` int NOT NULL,
  PRIMARY KEY (`tablename`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `language`
--

DROP TABLE IF EXISTS `language`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `language` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` char(2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `militaryStatus`
--

DROP TABLE IF EXISTS `militaryStatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `militaryStatus` (
  `id` int NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `value` (`value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `militaryStatus_translation`
--

DROP TABLE IF EXISTS `militaryStatus_translation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `militaryStatus_translation` (
  `id` int NOT NULL,
  `languageId` int NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`,`languageId`),
  KEY `languageId` (`languageId`),
  CONSTRAINT `militaryStatus_translation_ibfk_1` FOREIGN KEY (`id`) REFERENCES `militaryStatus` (`id`),
  CONSTRAINT `militaryStatus_translation_ibfk_2` FOREIGN KEY (`languageId`) REFERENCES `language` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `prompt`
--

DROP TABLE IF EXISTS `prompt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prompt` (
  `id` int NOT NULL,
  `tag` varchar(20) NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tag` (`tag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `prompt_translation`
--

DROP TABLE IF EXISTS `prompt_translation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prompt_translation` (
  `id` int NOT NULL,
  `languageId` int NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`,`languageId`),
  KEY `languageId` (`languageId`),
  CONSTRAINT `prompt_translation_ibfk_1` FOREIGN KEY (`id`) REFERENCES `prompt` (`id`),
  CONSTRAINT `prompt_translation_ibfk_2` FOREIGN KEY (`languageId`) REFERENCES `language` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `race`
--

DROP TABLE IF EXISTS `race`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `race` (
  `id` int NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `value` (`value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `race_translation`
--

DROP TABLE IF EXISTS `race_translation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `race_translation` (
  `id` int NOT NULL,
  `languageId` int NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`,`languageId`),
  KEY `languageId` (`languageId`),
  CONSTRAINT `race_translation_ibfk_1` FOREIGN KEY (`id`) REFERENCES `race` (`id`),
  CONSTRAINT `race_translation_ibfk_2` FOREIGN KEY (`languageId`) REFERENCES `language` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `translation_table`
--

DROP TABLE IF EXISTS `translation_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `translation_table` (
  `tableName` varchar(255) NOT NULL,
  PRIMARY KEY (`tableName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `upgrades`
--

DROP TABLE IF EXISTS `upgrades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `upgrades` (
  `id` int NOT NULL,
  `migration` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `upgrades`
--

LOCK TABLES `upgrades` WRITE;
/*!40000 ALTER TABLE `upgrades` DISABLE KEYS */;
/*!40000 ALTER TABLE `upgrades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visit`
--

DROP TABLE IF EXISTS `visit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visit` (
  `id` int NOT NULL,
  `date` varchar(255) NOT NULL,
  `householdId` int NOT NULL,
  `householdVersion` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `date` (`date`,`householdId`),
  KEY `householdId` (`householdId`,`householdVersion`),
  KEY `visit_household_id` (`householdId`),
  CONSTRAINT `visit_ibfk_1` FOREIGN KEY (`householdId`, `householdVersion`) REFERENCES `household` (`id`, `version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `yes_no`
--

DROP TABLE IF EXISTS `yes_no`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `yes_no` (
  `id` int NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `value` (`value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `yes_no_translation`
--

DROP TABLE IF EXISTS `yes_no_translation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `yes_no_translation` (
  `id` int NOT NULL,
  `languageId` int NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`,`languageId`),
  KEY `languageId` (`languageId`),
  CONSTRAINT `yes_no_translation_ibfk_1` FOREIGN KEY (`id`) REFERENCES `yes_no` (`id`),
  CONSTRAINT `yes_no_translation_ibfk_2` FOREIGN KEY (`languageId`) REFERENCES `language` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Final view structure for view `client_visit`
--

/*!50001 DROP VIEW IF EXISTS `client_visit`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`dbuser`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `client_visit` AS select `cl`.`id` AS `clientId`,`cl`.`disabled` AS `disabled`,`cl`.`raceId` AS `raceId`,`cl`.`birthYear` AS `birthYear`,`cl`.`genderId` AS `genderId`,`cl`.`refugeeImmigrantStatus` AS `refugeeImmigrantStatus`,`cl`.`speaksEnglish` AS `speaksEnglish`,`cl`.`militaryStatusId` AS `militaryStatusId`,`cl`.`ethnicityId` AS `ethnicityId`,`v`.`id` AS `visitId`,`v`.`date` AS `date`,`v`.`householdId` AS `householdId`,`h`.`cityId` AS `cityId`,`h`.`zip` AS `zip`,cast((case when (`cl`.`birthYear` = '') then NULL when (`cl`.`birthYear` < 1900) then NULL when (`cl`.`birthYear` > year(`v`.`date`)) then NULL else (year(`v`.`date`) - `cl`.`birthYear`) end) as decimal(3,0)) AS `age` from (((`visit` `v` join `household` `h` on(((`h`.`id` = `v`.`householdId`) and (`h`.`version` = `v`.`householdVersion`)))) join `household_client_list` `hcl` on(((`h`.`id` = `hcl`.`householdId`) and (`h`.`version` = `hcl`.`householdVersion`)))) join `client` `cl` on(((`cl`.`id` = `hcl`.`clientId`) and (`cl`.`version` = `hcl`.`clientVersion`)))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `household_visit`
--

/*!50001 DROP VIEW IF EXISTS `household_visit`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`dbuser`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `household_visit` AS select `h`.`id` AS `householdId`,`h`.`incomeLevelId` AS `incomeLevelId`,`v`.`id` AS `visitId`,`v`.`date` AS `date`,`h`.`cityId` AS `cityId`,`h`.`zip` AS `zip`,(case when (`h`.`address1` = '') then 1 else 0 end) AS `homeless` from (`visit` `v` join `household` `h` on(((`h`.`id` = `v`.`householdId`) and (`h`.`version` = `v`.`householdVersion`)))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-19 22:27:56
