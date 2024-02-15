-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: foodbank
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1


--
-- Dumping data for table `language`
--

INSERT INTO `language` VALUES (0,'English','en'),(1,'Chinese','zh'),(2,'Korean','ko'),(3,'Russian','ru'),(4,'Somali','so'),(5,'Spanish','es'),(6,'Ukrainian','uk'),(7,'Vietnamese','vi');

--
-- Dumping data for table `city`
--

INSERT INTO `city` VALUES (0,'Unknown',0,0,'{\"lat\": 47.7510741, \"lng\": -120.7401386}'),(1,'Algona',0,1,'{\"lat\": 47.27906189999999, \"lng\": -122.249923}'),(2,'Ames Lake',0,1,'{\"lat\": 47.6328784, \"lng\": -121.9662307}'),(3,'Auburn',1,1,'{\"lat\": 47.30732279999999, \"lng\": -122.2284532}'),(4,'Baring',0,1,'{\"lat\": 47.7731614, \"lng\": -121.485382}'),(5,'Beaux Arts Village',0,1,'{\"lat\": 47.5853221, \"lng\": -122.2012725}'),(6,'Bellevue',1,1,'{\"lat\": 47.6101497, \"lng\": -122.2015159}'),(7,'Berrydale',0,1,'{\"lat\": 47.33982289999999, \"lng\": -122.1278954}'),(8,'Black Diamond',0,1,'{\"lat\": 47.3087121, \"lng\": -122.0031691}'),(9,'Bonney Lake',0,0,'{\"lat\": 47.1770777, \"lng\": -122.1868601}'),(10,'Bothell',1,1,'{\"lat\": 47.76011099999999, \"lng\": -122.2054452}'),(11,'Boulevard Park',0,1,'{\"lat\": 47.495848, \"lng\": -122.3104564}'),(12,'Bruster',0,0,'{\"lat\": 48.0959784, \"lng\": -119.7806166}'),(13,'Bryn Mawr',0,1,'{\"lat\": 47.4938036, \"lng\": -122.2382307}'),(14,'Burien',1,1,'{\"lat\": 47.4668384, \"lng\": -122.3405305}'),(15,'Carnation',0,1,'{\"lat\": 47.6478787, \"lng\": -121.9140073}'),(16,'Clyde Hill',0,1,'{\"lat\": 47.6317656, \"lng\": -122.2179015}'),(17,'Cottage Lake',0,1,'{\"lat\": 47.7442656, \"lng\": -122.077346}'),(18,'Covington',1,1,'{\"lat\": 47.3595592, \"lng\": -122.118012}'),(19,'Des Moines',1,1,'{\"lat\": 47.4017661, \"lng\": -122.3242902}'),(20,'Duvall',0,1,'{\"lat\": 47.7423218, \"lng\": -121.9856781}'),(21,'East Renton Highlands',0,1,'{\"lat\": 47.4848229, \"lng\": -122.1123419}'),(22,'Enumclaw',0,1,'{\"lat\": 47.2042681, \"lng\": -121.9915003}'),(23,'Everett',0,0,'{\"lat\": 47.9789848, \"lng\": -122.2020794}'),(24,'Fairwood',0,1,'{\"lat\": 47.4431185, \"lng\": -122.1623725}'),(25,'Fall City',0,1,'{\"lat\": 47.5673237, \"lng\": -121.8887269}'),(26,'Federal Way',1,1,'{\"lat\": 47.3223221, \"lng\": -122.3126222}'),(27,'Fife',0,0,'{\"lat\": 47.2392665, \"lng\": -122.3570664}'),(28,'Hobart',0,1,'{\"lat\": 47.4081216, \"lng\": -121.9948685}'),(29,'Hunts Point',0,1,'{\"lat\": 47.6434321, \"lng\": -122.230124}'),(30,'Issaquah',1,1,'{\"lat\": 47.5301011, \"lng\": -122.0326191}'),(31,'Kenmore',1,1,'{\"lat\": 47.7583576, \"lng\": -122.2496863}'),(32,'Kent',1,1,'{\"lat\": 47.3830671, \"lng\": -122.234771}'),(33,'Kirkland',1,1,'{\"lat\": 47.6768927, \"lng\": -122.2059833}'),(34,'Klahanie',0,1,'{\"lat\": 47.5706914, \"lng\": -122.0073183}'),(35,'Lake City',0,1,'{\"lat\": 47.7192912, \"lng\": -122.2953165}'),(36,'Lake Desire',0,1,'{\"lat\": 47.4418043, \"lng\": -122.1077513}'),(37,'Lake Forest Park',0,1,'{\"lat\": 47.7601288, \"lng\": -122.283982}'),(38,'Lake Holm',0,1,'{\"lat\": 47.30958680000001, \"lng\": -122.1274635}'),(39,'Lake Marcel',0,1,'{\"lat\": 47.69377189999999, \"lng\": -121.9158263}'),(40,'Lake Morton',0,1,'{\"lat\": 47.32398939999999, \"lng\": -122.0839352}'),(41,'Lakeland North',0,1,'{\"lat\": 47.3292248, \"lng\": -122.2820245}'),(42,'Lakeland South',0,1,'{\"lat\": 47.2716338, \"lng\": -122.2819353}'),(43,'Lynnwood',0,0,'{\"lat\": 47.8209301, \"lng\": -122.3151313}'),(44,'Maple Falls',0,0,'{\"lat\": 48.9242888, \"lng\": -122.077093}'),(45,'Maple Heights',0,1,'{\"lat\": 47.4521975, \"lng\": -122.0984885}'),(46,'Maple Valley',0,1,'{\"lat\": 47.3903403, \"lng\": -122.0453589}'),(47,'Medina',0,1,'{\"lat\": 47.6248333, \"lng\": -122.2360597}'),(48,'Mercer Island',1,1,'{\"lat\": 47.5706548, \"lng\": -122.2220673}'),(49,'Mill Creek',0,0,'{\"lat\": 47.8600971, \"lng\": -122.2042966}'),(50,'Milton',0,1,'{\"lat\": 47.2481558, \"lng\": -122.312899}'),(51,'Mirrormont',0,1,'{\"lat\": 47.4623237, \"lng\": -121.9956724}'),(52,'Monroe',0,0,'{\"lat\": 47.8553772, \"lng\": -121.9709579}'),(53,'Mountlake Terrace',0,0,'{\"lat\": 47.7881528, \"lng\": -122.3087405}'),(54,'Newcastle',0,1,'{\"lat\": 47.5376072, \"lng\": -122.1619948}'),(55,'Normandy Park',0,1,'{\"lat\": 47.4362103, \"lng\": -122.3406799}'),(56,'North Bend',0,1,'{\"lat\": 47.4956579, \"lng\": -121.7867775}'),(57,'Novelty Hill',0,1,'{\"lat\": 47.6798082, \"lng\": -122.016938}'),(58,'Olympia',0,0,'{\"lat\": 47.0378741, \"lng\": -122.9006951}'),(59,'Pacific',0,1,'{\"lat\": 47.2645452, \"lng\": -122.2501201}'),(60,'Puyallup',0,0,'{\"lat\": 47.1853785, \"lng\": -122.2928974}'),(61,'Pullman',0,0,'{\"lat\": 46.7297771, \"lng\": -117.1817377}'),(62,'Ravensdale',0,1,'{\"lat\": 47.3523235, \"lng\": -121.9837251}'),(63,'Redmond',1,1,'{\"lat\": 47.6739881, \"lng\": -122.121512}'),(64,'Renton',1,1,'{\"lat\": 47.4796927, \"lng\": -122.2079218}'),(65,'Reverton',0,1,'{\"lat\": -32.0337878, \"lng\": 115.8931707}'),(66,'Riverband',0,1,'{\"lat\": 47.4664916, \"lng\": -121.7503869}'),(67,'Sammamish',1,1,'{\"lat\": 47.61626829999999, \"lng\": -122.0355736}'),(68,'SeaTac',1,1,'{\"lat\": 47.4435903, \"lng\": -122.2960726}'),(69,'Seattle',1,1,'{\"lat\": 47.6061389, \"lng\": -122.3328481}'),(70,'Shadow Lake',0,1,'{\"lat\": 47.411387, \"lng\": -122.0847069}'),(71,'Shoreline',1,1,'{\"lat\": 47.7559659, \"lng\": -122.3456972}'),(72,'Skykomish',0,1,'{\"lat\": 47.7092746, \"lng\": -121.3601014}'),(73,'Skyway',0,1,'{\"lat\": 47.4938036, \"lng\": -122.2382307}'),(74,'Snohomish',0,0,'{\"lat\": 47.91287560000001, \"lng\": -122.0981848}'),(75,'Snoqualmie',0,1,'{\"lat\": 47.5287132, \"lng\": -121.8253906}'),(76,'Stillwater',0,1,'{\"lat\": 47.6824376, \"lng\": -121.918727}'),(77,'Sultan',0,0,'{\"lat\": 47.8626013, \"lng\": -121.8165095}'),(78,'Tacoma',0,0,'{\"lat\": 47.2528768, \"lng\": -122.4442906}'),(79,'Tanner',0,1,'{\"lat\": 47.4753806, \"lng\": -121.7462201}'),(80,'Toppenish',0,0,'{\"lat\": 46.3773509, \"lng\": -120.3086667}'),(81,'Tukwila',1,1,'{\"lat\": 47.4748399, \"lng\": -122.2726248}'),(82,'Union Hill',0,1,'{\"lat\": 47.6798082, \"lng\": -122.016938}'),(83,'Vashon',0,1,'{\"lat\": 47.4473204, \"lng\": -122.4598502}'),(84,'Vashon Island',0,1,'{\"lat\": 47.4473204, \"lng\": -122.4598502}'),(85,'Westwood',0,1,'{\"lat\": 47.6189208, \"lng\": -122.5740541}'),(86,'White Center',0,1,'{\"lat\": 47.5085671, \"lng\": -122.3551164}'),(87,'White Salmon',0,0,'{\"lat\": 45.7277747, \"lng\": -121.4866994}'),(88,'Wilderness Run',0,1,'{\"lat\": -27.6728168, \"lng\": 121.6283098}'),(89,'Woodinville',0,1,'{\"lat\": 47.7542651, \"lng\": -122.1634582}'),(90,'Yarrow Point',0,1,'{\"lat\": 47.64621, \"lng\": -122.2173461}');

--
-- Dumping data for table `ethnicity`
--

INSERT INTO `ethnicity` VALUES (1,'Hispanic or LatinX'),(2,'Non-Hispanic or LatinX'),(0,'Unknown');

--
-- Dumping data for table `ethnicity_translation`
--

INSERT INTO `ethnicity_translation` VALUES (0,1,'未知'),(0,2,'알려지지 않은'),(0,3,'Неизвестный'),(0,4,'Lama garanayo'),(0,5,'Desconocido'),(0,6,'Невідомий'),(0,7,'không xác định'),(1,1,'西班牙裔或拉丁裔'),(1,2,'히스패닉 또는 라틴X'),(1,3,'Латиноамериканец или LatinX'),(1,4,'Hisbaanik ama LatinX'),(1,5,'Hispano o latinoX'),(1,6,'Латиноамериканський або LatinX'),(1,7,'Tây Ban Nha hoặc LatinX'),(2,1,'非西班牙裔或拉丁裔'),(2,2,'비히스패닉 또는 라틴계'),(2,3,'Неиспаноязычный или LatinX'),(2,4,'Non Hispanic ama LatinX'),(2,5,'No hispanos o latinos'),(2,6,'Неіспаномовні або LatinX'),(2,7,'Không phải gốc Tây Ban Nha hoặc LatinX');

--
-- Dumping data for table `gender`
--

INSERT INTO `gender` VALUES (1,'Female'),(2,'Male'),(3,'Non-Binary'),(0,'Unknown');

--
-- Dumping data for table `gender_translation`
--

INSERT INTO `gender_translation` VALUES (0,1,'未知'),(0,2,'알려지지 않은'),(0,3,'Неизвестный'),(0,4,'Lama garanayo'),(0,5,'Desconocido'),(0,6,'Невідомий'),(0,7,'không xác định'),(1,1,'女性'),(1,2,'여성'),(1,3,'Женский'),(1,4,'Dheddig'),(1,5,'Femenino'),(1,6,'Жінка'),(1,7,'Nữ giới'),(2,1,'男性'),(2,2,'남성'),(2,3,'Мужской'),(2,4,'Lab'),(2,5,'Masculino'),(2,6,'Чоловік'),(2,7,'Nam giới'),(3,1,'非二元'),(3,2,'넌바이너리'),(3,3,'Недвоичный'),(3,4,'Aan binary ahayn'),(3,5,'No binario'),(3,6,'Небінарний'),(3,7,'Phi nhị phân');

--
-- Dumping data for table `income_level`
--

INSERT INTO `income_level` VALUES (0,'Unknown'),(1,'<$24,000'),(2,'$24,000 - <$40,000'),(3,'$40,000 - <$64,000'),(4,'>$64,000');

--
-- Dumping data for table `income_level_translation`
--

INSERT INTO `income_level_translation` VALUES (0,1,'未知'),(0,2,'알려지지 않은'),(0,3,'Неизвестный'),(0,4,'Lama garanayo'),(0,5,'Desconocido'),(0,6,'Невідомий'),(0,7,'không xác định'),(1,1,'<$24,000'),(1,2,'<$24,000'),(1,3,'<$24 000'),(1,4,'<$24,000'),(1,5,'<$24,000'),(1,6,'<$24 000'),(1,7,'<$24,000'),(2,1,'$24,000 - <$40,000'),(2,2,'$24,000 - <$40,000'),(2,3,'24 000–<40 000 долларов США'),(2,4,'$24,000 - <$40,000'),(2,5,'$24,000 - <$40,000'),(2,6,'$24 000 - <$40 000'),(2,7,'24.000 USD - <40.000 USD'),(3,1,'$40,000 - <$64,000'),(3,2,'$40,000 - <$64,000'),(3,3,'40 000–<64 000 долларов США'),(3,4,'$40,000 - <$64,000'),(3,5,'$40,000 - <$64,000'),(3,6,'$40 000 - <$64 000'),(3,7,'40.000 USD - <64.000 USD'),(4,1,'>$64,000'),(4,2,'>$64,000'),(4,3,'>$64 000'),(4,4,'>$64,000'),(4,5,'>$64,000'),(4,6,'>64 000 доларів США'),(4,7,'>64.000 USD');

--
-- Dumping data for table `militaryStatus`
--

INSERT INTO `militaryStatus` VALUES (1,'None'),(3,'Partners of persons with active military service'),(0,'Unknown'),(2,'US Military Service (past or present)');

--
-- Dumping data for table `militaryStatus_translation`
--

INSERT INTO `militaryStatus_translation` VALUES (0,1,'未知'),(0,2,'알려지지 않은'),(0,3,'Неизвестный'),(0,4,'Lama garanayo'),(0,5,'Desconocido'),(0,6,'Невідомий'),(0,7,'không xác định'),(1,1,'没有任何'),(1,2,'없음'),(1,3,'Никто'),(1,4,'Midna'),(1,5,'Ninguno'),(1,6,'Жодного'),(1,7,'Không có'),(2,1,'美国兵役（过去或现在）'),(2,2,'미군 복무(과거 또는 현재)'),(2,3,'Военная служба США (в прошлом или настоящем)'),(2,4,'Adeegga Militariga Mareykanka ( hore ama hadda)'),(2,5,'Servicio militar de EE. UU. (pasado o presente)'),(2,6,'Військова служба США (минула чи нинішня)'),(2,7,'Nghĩa vụ quân sự Hoa Kỳ (quá khứ hoặc hiện tại)'),(3,1,'现役军人的伴侣'),(3,2,'현역 복무자의 파트너'),(3,3,'Партнеры лиц, проходящих действительную военную службу'),(3,4,'Wada-hawlgalayaasha dadka leh adeegga milatari ee firfircoon'),(3,5,'Parejas de personas con servicio militar activo'),(3,6,'Партнери осіб дійсної військової служби'),(3,7,'Bạn đời của những người đang tại ngũ');

--
-- Dumping data for table `prompt`
--

INSERT INTO `prompt` VALUES (1,'address1','Address 1'),(2,'address2','Address 2'),(3,'city','City'),(4,'zip','Zip'),(5,'income','Income'),(6,'note','Note'),(7,'name','Name'),(8,'gender','Gender'),(9,'birthYear','Birth Year'),(10,'disabled','Disabled'),(11,'refugee','Refugee or Immigrant'),(12,'ethnicity','Ethnicity'),(13,'race','Race'),(14,'speaksEnglish','Speaks English'),(15,'militaryStatus','Military Status'),(16,'phoneNumber','Phone Number');

--
-- Dumping data for table `prompt_translation`
--

INSERT INTO `prompt_translation` VALUES (1,1,'地址1'),(1,2,'주소 1'),(1,3,'адрес 1'),(1,4,'Cinwaanka 1'),(1,5,'Dirección 1'),(1,6,'адреса 1'),(1,7,'địa chỉ 1'),(2,1,'地址2'),(2,2,'주소 2'),(2,3,'Адрес 2'),(2,4,'Cinwaanka 2'),(2,5,'Dirección 2'),(2,6,'Адреса 2'),(2,7,'Địa chỉ 2'),(3,1,'城市'),(3,2,'도시'),(3,3,'Город'),(3,4,'Magaalada'),(3,5,'Ciudad'),(3,6,'місто'),(3,7,'Thành phố'),(4,1,'压缩'),(4,2,'지퍼'),(4,3,'Почтовый индекс'),(4,4,'Zip'),(4,5,'Cremallera'),(4,6,'Zip'),(4,7,'Mã zip'),(5,1,'收入'),(5,2,'소득'),(5,3,'Доход'),(5,4,'Dakhliga'),(5,5,'Ingreso'),(5,6,'Дохід'),(5,7,'Thu nhập'),(6,1,'笔记'),(6,2,'메모'),(6,3,'Примечание'),(6,4,'Ogow'),(6,5,'Nota'),(6,6,'Примітка'),(6,7,'Ghi chú'),(7,1,'姓名'),(7,2,'이름'),(7,3,'Имя'),(7,4,'Magaca'),(7,5,'Nombre'),(7,6,'Ім’я'),(7,7,'Tên'),(8,1,'性别'),(8,2,'성별'),(8,3,'Пол'),(8,4,'Jinsiga'),(8,5,'Género'),(8,6,'Стать'),(8,7,'Giới tính'),(9,1,'出生年'),(9,2,'생년'),(9,3,'год рождения'),(9,4,'sanadka dhalashada'),(9,5,'Año de nacimiento'),(9,6,'рік народження'),(9,7,'năm sinh'),(10,1,'残疾人'),(10,2,'장애가 있는'),(10,3,'Неполноценный'),(10,4,'Naafada'),(10,5,'Desactivado'),(10,6,'Вимкнено'),(10,7,'Tàn tật'),(11,1,'难民或移民'),(11,2,'난민 또는 이민자'),(11,3,'Беженец или иммигрант'),(11,4,'Qaxooti ama soo galooti'),(11,5,'Refugiado o Inmigrante'),(11,6,'Біженець або іммігрант'),(11,7,'Người tị nạn hoặc người nhập cư'),(12,1,'种族'),(12,2,'민족성'),(12,3,'Этническая принадлежность'),(12,4,'Qowmiyad'),(12,5,'Etnicidad'),(12,6,'Етнічна приналежність'),(12,7,'Dân tộc'),(13,1,'种族'),(13,2,'경주'),(13,3,'Раса'),(13,4,'Jinsiyada'),(13,5,'Carrera'),(13,6,'Гонка'),(13,7,'Loài'),(14,1,'说英语'),(14,2,'영어를 구사합니다'),(14,3,'Говорить по английски'),(14,4,'Wuxuu ku hadlaa Ingiriis'),(14,5,'Habla inglés'),(14,6,'Володіє англійською'),(14,7,'Nói tiếng Anh'),(15,1,'军事地位'),(15,2,'군사 상태'),(15,3,'Военный Статус'),(15,4,'Xaalada Ciidan'),(15,5,'Situación Militar'),(15,6,'Військовий статус'),(15,7,'Tình trạng quân sự'),(16,1,'电话号码'),(16,2,'전화 번호'),(16,3,'Номер телефона'),(16,4,'Lambarka taleefanka'),(16,5,'Número de teléfono'),(16,6,'Номер телефону'),(16,7,'Số điện thoại');

--
-- Dumping data for table `race`
--

INSERT INTO `race` VALUES (5,'American Indian or Alaska Native'),(1,'Asian or Asian-American'),(2,'Black or African-American'),(3,'Hispanic or LatinX '),(8,'Multi-Racial (2+ identified)'),(4,'Native Hawaiian or Pacific Islander'),(7,'Other Race'),(0,'Unknown'),(6,'White / Caucasian');

--
-- Dumping data for table `race_translation`
--

INSERT INTO `race_translation` VALUES (0,1,'未知'),(0,2,'알려지지 않은'),(0,3,'Неизвестный'),(0,4,'Lama garanayo'),(0,5,'Desconocido'),(0,6,'Невідомий'),(0,7,'không xác định'),(1,1,'亚洲人或亚裔美国人'),(1,2,'아시아인 또는 아시아계 미국인'),(1,3,'Азиатский или азиатско-американский'),(1,4,'Aasiyaan ama Aasiyaan-Maraykan'),(1,5,'Asiático o asiático-americano'),(1,6,'Азіат або азіатсько-американець'),(1,7,'Người châu Á hoặc người Mỹ gốc Á'),(2,1,'黑人或非裔美国人'),(2,2,'흑인 또는 아프리카계 미국인'),(2,3,'Черный или афроамериканец'),(2,4,'Madow ama African-American'),(2,5,'Negro o afroamericano'),(2,6,'Чорний або афроамериканець'),(2,7,'Người da đen hoặc người Mỹ gốc Phi'),(3,1,'西班牙裔或拉丁裔'),(3,2,'히스패닉 또는 라틴X'),(3,3,'Латиноамериканец или LatinX'),(3,4,'Hisbaanik ama LatinX'),(3,5,'Hispano o latinoX'),(3,6,'Латиноамериканський або LatinX'),(3,7,'Tây Ban Nha hoặc LatinX'),(4,1,'夏威夷原住民或太平洋岛民'),(4,2,'하와이 원주민 또는 태평양 섬 주민'),(4,3,'Коренной житель Гавайских островов или островов Тихого океана'),(4,4,'Dhaladka Hawaii ama Jasiiradaha Baasifigga'),(4,5,'Nativo de Hawái o de las islas del Pacífico'),(4,6,'Корінний гавайець або житель тихоокеанських островів'),(4,7,'Người Hawaii bản xứ hoặc người đảo Thái Bình Dương'),(5,1,'美洲印第安人或阿拉斯加原住民'),(5,2,'아메리칸 인디언 또는 알래스카 원주민'),(5,3,'Американский индеец или коренной житель Аляски'),(5,4,'Hindi Mareykan ama Dhalad Alaska'),(5,5,'Indio americano o nativo de Alaska'),(5,6,'Американський індіанець або абориген Аляски'),(5,7,'Người Mỹ da đỏ hoặc thổ dân Alaska'),(6,1,'白人/白种人'),(6,2,'백인 / 백인'),(6,3,'Белый / Кавказец'),(6,4,'Cadaan / Kawcasiyaan'),(6,5,'Blanco / Caucásico'),(6,6,'Білий / кавказький'),(6,7,'Da trắng / da trắng'),(7,1,'其他种族'),(7,2,'기타 인종'),(7,3,'Другая раса'),(7,4,'Jinsiyada kale'),(7,5,'Otra raza'),(7,6,'Інша раса'),(7,7,'Chủng tộc khác'),(8,1,'多种族（已识别 2 个以上）'),(8,2,'다인종(2명 이상 확인됨)'),(8,3,'Многорасовый (выявлено 2+)'),(8,4,'Isir-kala-duwan (2+ la aqoonsaday)'),(8,5,'Multirracial (2+ identificados)'),(8,6,'Багаторасовий (ідентифіковано 2+)'),(8,7,'Đa chủng tộc (2+ được xác định)');

--
-- Dumping data for table `translation_table`
--

INSERT INTO `translation_table` VALUES ('ethnicity'),('gender'),('income_level'),('militaryStatus'),('prompt'),('race'),('yes_no');

--
-- Dumping data for table `yes_no`
--

INSERT INTO `yes_no` VALUES (0,'No'),(-1,'Unknown'),(1,'Yes');

--
-- Dumping data for table `yes_no_translation`
--

INSERT INTO `yes_no_translation` VALUES (-1,1,'未知'),(-1,2,'알려지지 않은'),(-1,3,'Неизвестный'),(-1,4,'Lama garanayo'),(-1,5,'Desconocido'),(-1,6,'Невідомий'),(-1,7,'không xác định'),(0,1,'不'),(0,2,'아니요'),(0,3,'Нет'),(0,4,'Maya'),(0,5,'No'),(0,6,'Немає'),(0,7,'KHÔNG'),(1,1,'是的'),(1,2,'예'),(1,3,'Да'),(1,4,'Haa'),(1,5,'Sí'),(1,6,'Так'),(1,7,'Đúng');


-- Dump completed on 2024-02-14 23:17:56
insert into `keys` values ('household', 1), ('visit', 1), ('client', 1);
