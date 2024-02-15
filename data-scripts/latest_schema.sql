-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: foodbank
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1


--
-- Table structure for table `language`
--

CREATE TABLE `language` (
  id int NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` char(2) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Table structure for table `city`
--

CREATE TABLE city (
  id int NOT NULL,
  `name` varchar(255) NOT NULL,
  break_out tinyint NOT NULL,
  in_king_county tinyint NOT NULL,
  location json DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `ethnicity`
--

CREATE TABLE ethnicity (
  id int NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY `value` (`value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `ethnicity_translation`
--

CREATE TABLE ethnicity_translation (
  id int NOT NULL,
  languageId int NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (id,languageId),
  KEY languageId (languageId),
  CONSTRAINT ethnicity_translation_ibfk_1 FOREIGN KEY (id) REFERENCES ethnicity (id),
  CONSTRAINT ethnicity_translation_ibfk_2 FOREIGN KEY (languageId) REFERENCES `language` (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Table structure for table `gender`
--

CREATE TABLE gender (
  id int NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY `value` (`value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `gender_translation`
--

CREATE TABLE gender_translation (
  id int NOT NULL,
  languageId int NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (id,languageId),
  KEY languageId (languageId),
  CONSTRAINT gender_translation_ibfk_1 FOREIGN KEY (id) REFERENCES gender (id),
  CONSTRAINT gender_translation_ibfk_2 FOREIGN KEY (languageId) REFERENCES `language` (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Table structure for table `household`
--

CREATE TABLE household (
  id int NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  `data` json NOT NULL,
  PRIMARY KEY (id,start_date),
  UNIQUE KEY id (id,end_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `income_level`
--

CREATE TABLE income_level (
  id int NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `income_level_translation`
--

CREATE TABLE income_level_translation (
  id int NOT NULL,
  languageId int NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (id,languageId),
  KEY languageId (languageId),
  CONSTRAINT income_level_translation_ibfk_1 FOREIGN KEY (id) REFERENCES income_level (id),
  CONSTRAINT income_level_translation_ibfk_2 FOREIGN KEY (languageId) REFERENCES `language` (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Table structure for table `keys`
--

CREATE TABLE `keys` (
  tablename varchar(255) NOT NULL,
  next_key int NOT NULL,
  PRIMARY KEY (tablename)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `militaryStatus`
--

CREATE TABLE militaryStatus (
  id int NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY `value` (`value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `militaryStatus_translation`
--

CREATE TABLE militaryStatus_translation (
  id int NOT NULL,
  languageId int NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (id,languageId),
  KEY languageId (languageId),
  CONSTRAINT militaryStatus_translation_ibfk_1 FOREIGN KEY (id) REFERENCES militaryStatus (id),
  CONSTRAINT militaryStatus_translation_ibfk_2 FOREIGN KEY (languageId) REFERENCES `language` (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Table structure for table `prompt`
--

CREATE TABLE prompt (
  id int NOT NULL,
  tag varchar(20) NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY tag (tag)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Table structure for table `prompt_translation`
--

CREATE TABLE prompt_translation (
  id int NOT NULL,
  languageId int NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (id,languageId),
  KEY languageId (languageId),
  CONSTRAINT prompt_translation_ibfk_1 FOREIGN KEY (id) REFERENCES prompt (id),
  CONSTRAINT prompt_translation_ibfk_2 FOREIGN KEY (languageId) REFERENCES `language` (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Table structure for table `race`
--

CREATE TABLE race (
  id int NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY `value` (`value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `race_translation`
--

CREATE TABLE race_translation (
  id int NOT NULL,
  languageId int NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (id,languageId),
  KEY languageId (languageId),
  CONSTRAINT race_translation_ibfk_1 FOREIGN KEY (id) REFERENCES race (id),
  CONSTRAINT race_translation_ibfk_2 FOREIGN KEY (languageId) REFERENCES `language` (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Table structure for table `translation_table`
--

CREATE TABLE translation_table (
  tableName varchar(255) NOT NULL,
  PRIMARY KEY (tableName)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Table structure for table `visit`
--

CREATE TABLE visit (
  id int NOT NULL,
  `date` date NOT NULL,
  householdId int NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY `date` (`date`,householdId),
  KEY householdId (householdId),
  KEY visit_household_id (householdId),
  CONSTRAINT visit_ibfk_1 FOREIGN KEY (householdId) REFERENCES household (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `yes_no`
--

CREATE TABLE yes_no (
  id int NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY `value` (`value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Table structure for table `yes_no_translation`
--

CREATE TABLE yes_no_translation (
  id int NOT NULL,
  languageId int NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (id,languageId),
  KEY languageId (languageId),
  CONSTRAINT yes_no_translation_ibfk_1 FOREIGN KEY (id) REFERENCES yes_no (id),
  CONSTRAINT yes_no_translation_ibfk_2 FOREIGN KEY (languageId) REFERENCES `language` (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


-- Dump completed on 2024-02-14 22:28:23
