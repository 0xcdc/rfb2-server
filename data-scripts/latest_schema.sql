CREATE TABLE `city` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `break_out` int NOT NULL,
  `in_king_county` int NOT NULL,
  `latlng` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ethnicity` (
  `id` int NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `value` (`value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `ethnicity_translation` (
  `id` int NOT NULL,
  `languageId` int NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`,`languageId`),
  KEY `languageId` (`languageId`),
  CONSTRAINT `ethnicity_translation_ibfk_1` FOREIGN KEY (`id`) REFERENCES `ethnicity` (`id`),
  CONSTRAINT `ethnicity_translation_ibfk_2` FOREIGN KEY (`languageId`) REFERENCES `language` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


CREATE TABLE `gender` (
  `id` int NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `value` (`value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `gender_translation` (
  `id` int NOT NULL,
  `languageId` int NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`,`languageId`),
  KEY `languageId` (`languageId`),
  CONSTRAINT `gender_translation_ibfk_1` FOREIGN KEY (`id`) REFERENCES `gender` (`id`),
  CONSTRAINT `gender_translation_ibfk_2` FOREIGN KEY (`languageId`) REFERENCES `language` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `household` (
  `id` int NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `data` json NOT NULL,
  PRIMARY KEY (`id`,`start_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `income_level` (
  `id` int NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `income_level_translation` (
  `id` int NOT NULL,
  `languageId` int NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`,`languageId`),
  KEY `languageId` (`languageId`),
  CONSTRAINT `income_level_translation_ibfk_1` FOREIGN KEY (`id`) REFERENCES `income_level` (`id`),
  CONSTRAINT `income_level_translation_ibfk_2` FOREIGN KEY (`languageId`) REFERENCES `language` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `keys` (
  `tablename` varchar(255) NOT NULL,
  `next_key` int NOT NULL,
  PRIMARY KEY (`tablename`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `language` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` char(2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `militaryStatus` (
  `id` int NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `value` (`value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `militaryStatus_translation` (
  `id` int NOT NULL,
  `languageId` int NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`,`languageId`),
  KEY `languageId` (`languageId`),
  CONSTRAINT `militaryStatus_translation_ibfk_1` FOREIGN KEY (`id`) REFERENCES `militaryStatus` (`id`),
  CONSTRAINT `militaryStatus_translation_ibfk_2` FOREIGN KEY (`languageId`) REFERENCES `language` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `prompt` (
  `id` int NOT NULL,
  `tag` varchar(20) NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tag` (`tag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `prompt_translation` (
  `id` int NOT NULL,
  `languageId` int NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`,`languageId`),
  KEY `languageId` (`languageId`),
  CONSTRAINT `prompt_translation_ibfk_1` FOREIGN KEY (`id`) REFERENCES `prompt` (`id`),
  CONSTRAINT `prompt_translation_ibfk_2` FOREIGN KEY (`languageId`) REFERENCES `language` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `race` (
  `id` int NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `value` (`value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `race_translation` (
  `id` int NOT NULL,
  `languageId` int NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`,`languageId`),
  KEY `languageId` (`languageId`),
  CONSTRAINT `race_translation_ibfk_1` FOREIGN KEY (`id`) REFERENCES `race` (`id`),
  CONSTRAINT `race_translation_ibfk_2` FOREIGN KEY (`languageId`) REFERENCES `language` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `translation_table` (
  `tableName` varchar(255) NOT NULL,
  PRIMARY KEY (`tableName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `visit` (
  `id` int NOT NULL,
  `date` varchar(255) NOT NULL,
  `householdId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `date` (`date`,`householdId`),
  KEY `householdId` (`householdId`),
  FOREIGN KEY (`householdId`) REFERENCES `household` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `yes_no` (
  `id` int NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `value` (`value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `yes_no_translation` (
  `id` int NOT NULL,
  `languageId` int NOT NULL,
  `value` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`,`languageId`),
  KEY `languageId` (`languageId`),
  CONSTRAINT `yes_no_translation_ibfk_1` FOREIGN KEY (`id`) REFERENCES `yes_no` (`id`),
  CONSTRAINT `yes_no_translation_ibfk_2` FOREIGN KEY (`languageId`) REFERENCES `language` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

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
