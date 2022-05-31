-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: foodbank
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.22.04.2

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
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (0,'Unknown',0,0),(1,'Algona',0,1),(2,'Ames Lake',0,1),(3,'Auburn',1,1),(4,'Baring',0,1),(5,'Beaux Arts Village',0,1),(6,'Bellevue',1,1),(7,'Berrydale',0,1),(8,'Black Diamond',0,1),(9,'Bonney Lake',0,0),(10,'Bothell',1,1),(11,'Boulevard Park',0,1),(12,'Bruster',0,0),(13,'Bryn Mawr',0,1),(14,'Burien',1,1),(15,'Carnation',0,1),(16,'Clyde Hill',0,1),(17,'Cottage Lake',0,1),(18,'Covington',1,1),(19,'Des Moines',1,1),(20,'Duvall',0,1),(21,'East Renton Highlands',0,1),(22,'Enumclaw',0,1),(23,'Everett',0,0),(24,'Fairwood',0,1),(25,'Fall City',0,1),(26,'Federal Way',1,1),(27,'Fife',0,0),(28,'Hobart',0,1),(29,'Hunts Point',0,1),(30,'Issaquah',1,1),(31,'Kenmore',1,1),(32,'Kent',1,1),(33,'Kirkland',1,1),(34,'Klahanie',0,1),(35,'Lake City',0,1),(36,'Lake Desire',0,1),(37,'Lake Forest Park',0,1),(38,'Lake Holm',0,1),(39,'Lake Marcel',0,1),(40,'Lake Morton',0,1),(41,'Lakeland North',0,1),(42,'Lakeland South',0,1),(43,'Lynnwood',0,0),(44,'Maple Falls',0,0),(45,'Maple Heights',0,1),(46,'Maple Valley',0,1),(47,'Medina',0,1),(48,'Mercer Island',1,1),(49,'Mill Creek',0,0),(50,'Milton',0,1),(51,'Mirrormont',0,1),(52,'Monroe',0,0),(53,'Mountlake Terrace',0,0),(54,'Newcastle',0,1),(55,'Normandy Park',0,1),(56,'North Bend',0,1),(57,'Novelty Hill',0,1),(58,'Olympia',0,0),(59,'Pacific',0,1),(60,'Puyallup',0,0),(61,'Pullman',0,0),(62,'Ravensdale',0,1),(63,'Redmond',1,1),(64,'Renton',1,1),(65,'Reverton',0,1),(66,'Riverband',0,1),(67,'Sammamish',1,1),(68,'SeaTac',1,1),(69,'Seattle',1,1),(70,'Shadow Lake',0,1),(71,'Shoreline',1,1),(72,'Skykomish',0,1),(73,'Skyway',0,1),(74,'Snohomish',0,0),(75,'Snoqualmie',0,1),(76,'Stillwater',0,1),(77,'Sultan',0,0),(78,'Tacoma',0,0),(79,'Tanner',0,1),(80,'Toppenish',0,0),(81,'Tukwila',1,1),(82,'Union Hill',0,1),(83,'Vashon',0,1),(84,'Vashon Island',0,1),(85,'Westwood',0,1),(86,'White Center',0,1),(87,'White Salmon',0,0),(88,'Wilderness Run',0,1),(89,'Woodinville',0,1),(90,'Yarrow Point',0,1);
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

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
  PRIMARY KEY (`id`,`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `ethnicity`
--

LOCK TABLES `ethnicity` WRITE;
/*!40000 ALTER TABLE `ethnicity` DISABLE KEYS */;
INSERT INTO `ethnicity` VALUES (1,'Hispanic, Latino'),(2,'Other'),(0,'Unknown');
/*!40000 ALTER TABLE `ethnicity` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `gender`
--

LOCK TABLES `gender` WRITE;
/*!40000 ALTER TABLE `gender` DISABLE KEYS */;
INSERT INTO `gender` VALUES (1,'Female'),(2,'Male'),(3,'Transgendered'),(0,'Unknown');
/*!40000 ALTER TABLE `gender` ENABLE KEYS */;
UNLOCK TABLES;

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
  PRIMARY KEY (`id`,`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `household`
--

LOCK TABLES `household` WRITE;
/*!40000 ALTER TABLE `household` DISABLE KEYS */;
/*!40000 ALTER TABLE `household` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `household_client_list`
--

LOCK TABLES `household_client_list` WRITE;
/*!40000 ALTER TABLE `household_client_list` DISABLE KEYS */;
/*!40000 ALTER TABLE `household_client_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `households_visited_last_year`
--

DROP TABLE IF EXISTS `households_visited_last_year`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `households_visited_last_year` (
  `id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `households_visited_last_year`
--

LOCK TABLES `households_visited_last_year` WRITE;
/*!40000 ALTER TABLE `households_visited_last_year` DISABLE KEYS */;
/*!40000 ALTER TABLE `households_visited_last_year` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `income_level`
--

LOCK TABLES `income_level` WRITE;
/*!40000 ALTER TABLE `income_level` DISABLE KEYS */;
INSERT INTO `income_level` VALUES (0,'Unknown'),(1,'<$24,000'),(2,'$24,000 - <$40,000'),(3,'$40,000 - <$64,000'),(4,'>$64,000');
/*!40000 ALTER TABLE `income_level` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `keys`
--

LOCK TABLES `keys` WRITE;
/*!40000 ALTER TABLE `keys` DISABLE KEYS */;
INSERT INTO `keys` VALUES ('client',8641),('household',3160),('visit',103605);
/*!40000 ALTER TABLE `keys` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `militaryStatus`
--

LOCK TABLES `militaryStatus` WRITE;
/*!40000 ALTER TABLE `militaryStatus` DISABLE KEYS */;
INSERT INTO `militaryStatus` VALUES (1,'None'),(3,'Partners of persons with active military service'),(0,'Unknown'),(2,'US Military Service (past or present)');
/*!40000 ALTER TABLE `militaryStatus` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `race`
--

LOCK TABLES `race` WRITE;
/*!40000 ALTER TABLE `race` DISABLE KEYS */;
INSERT INTO `race` VALUES (1,'Asian, Asian-American'),(2,'Black, African-American, Other African'),(4,'Hawaiian-Native or Pacific Islander'),(5,'Indian-American or Alaskan-Native'),(3,'Latino, Latino American, Hispanic'),(8,'Multi-Racial (2+ identified)'),(7,'Other Race'),(0,'Unknown'),(6,'White or Caucasian');
/*!40000 ALTER TABLE `race` ENABLE KEYS */;
UNLOCK TABLES;

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
  KEY `householdId` (`householdId`,`householdVersion`),
  KEY `visit_household_id` (`householdId`),
  CONSTRAINT `visit_ibfk_1` FOREIGN KEY (`householdId`, `householdVersion`) REFERENCES `household` (`id`, `version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visit`
--

LOCK TABLES `visit` WRITE;
/*!40000 ALTER TABLE `visit` DISABLE KEYS */;
/*!40000 ALTER TABLE `visit` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `yes_no`
--

LOCK TABLES `yes_no` WRITE;
/*!40000 ALTER TABLE `yes_no` DISABLE KEYS */;
INSERT INTO `yes_no` VALUES (0,'No'),(-1,'Unknown'),(1,'Yes');
/*!40000 ALTER TABLE `yes_no` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-30 23:08:34
