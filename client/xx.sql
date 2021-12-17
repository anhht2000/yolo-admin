-- MySQL dump 10.13  Distrib 8.0.20, for macos10.15 (x86_64)
--
-- Host: localhost    Database: pre-eav
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `createDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleteDate` datetime(6) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `option`
--

DROP TABLE IF EXISTS `option`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `option` (
  `createDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleteDate` datetime(6) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `meta` enum('text','color') NOT NULL DEFAULT 'text',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `option`
--

LOCK TABLES `option` WRITE;
/*!40000 ALTER TABLE `option` DISABLE KEYS */;
INSERT INTO `option` VALUES ('2021-12-15 20:33:36.582756','2021-12-15 20:33:36.582756',NULL,1,'Size','text'),('2021-12-15 20:33:48.246378','2021-12-15 20:33:48.246378',NULL,2,'Color','color');
/*!40000 ALTER TABLE `option` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `option_value`
--

DROP TABLE IF EXISTS `option_value`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `option_value` (
  `createDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleteDate` datetime(6) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `optionId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_2d7616b884ef55e6eb5af000f1d` (`optionId`),
  CONSTRAINT `FK_2d7616b884ef55e6eb5af000f1d` FOREIGN KEY (`optionId`) REFERENCES `option` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `option_value`
--

LOCK TABLES `option_value` WRITE;
/*!40000 ALTER TABLE `option_value` DISABLE KEYS */;
INSERT INTO `option_value` VALUES ('2021-12-15 20:33:58.998790','2021-12-15 20:33:58.998790',NULL,1,'S',1),('2021-12-15 20:34:01.285919','2021-12-15 20:34:01.285919',NULL,2,'M',1),('2021-12-15 20:34:02.763817','2021-12-15 20:34:02.763817',NULL,3,'L',1),('2021-12-15 20:34:38.374015','2021-12-15 20:34:38.374015',NULL,4,'XL',1),('2021-12-15 20:34:46.548731','2021-12-15 20:34:46.548731',NULL,5,'#fff',2),('2021-12-15 20:34:49.093838','2021-12-15 20:34:49.093838',NULL,6,'#ccc',2),('2021-12-15 20:34:51.506145','2021-12-15 20:34:51.506145',NULL,7,'#000',2);
/*!40000 ALTER TABLE `option_value` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `createDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleteDate` datetime(6) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `price` int NOT NULL,
  `status` enum('pending','draft','published') NOT NULL DEFAULT 'draft',
  `label` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES ('2021-12-15 20:40:09.640738','2021-12-16 21:33:15.000000',NULL,1,'Áo thu đông','<p>Theo đó,<strong> Áo phao nữ YODY </strong>chinh phục khách hàng bởi những ưu điểm sau:</p><p><strong>SIÊU NHẸ: </strong>Áo chỉ nặng 315 gram/ áo, nhẹ hơn cả 1 quả cam. Sản phẩm có lớp bông tơi xốp nên vô cùng nhẹ nhàng, thoải mái.</p><p><strong>SIÊU ẤM: </strong>Với 3 lớp chắc chắn, PHN4000 giữ ấm cực tốt</p><p>Lớp ngoài và lớp lót được làm từ 100% Nylon với hiệu quả cản gió vượt trội</p><p>Lớp giữa bông nhẹ 100% Polyester</p><p><strong>SIÊU GỌN:</strong> Dễ dàng gấp gọn lại trong túi và di chuyển nhẹ nhàng.</p><h2>Thiết kế tiện lợi &amp; thời trang&nbsp;</h2><p>Đây là chiếc <strong>Áo phao nữ basic</strong>, siêu nhẹ, trẻ trung không thể thiếu trong tủ đồ mùa đông của bạn. Thiết kế tối giản, màu sắc đa dạng nên PHN4000 vô cùng dễ mặc cho các chị em trong mùa đông năm nay. Với thiết kế mũ áo siêu nhẹ có thể tháo rời, túi áo có khóa chắc chắn và hệ thống túi trong - túi ngoài vô cùng tiện dụng và đa năng.</p>',199000,'published','bestsell,new,popular'),('2021-12-15 20:44:39.632339','2021-12-15 20:44:39.632339',NULL,2,'Áo mùa hè','<p>Theo đó,<strong> Áo phao nữ YODY </strong>chinh phục khách hàng bởi những ưu điểm sau:</p><p><strong>SIÊU NHẸ: </strong>Áo chỉ nặng 315 gram/ áo, nhẹ hơn cả 1 quả cam. Sản phẩm có lớp bông tơi xốp nên vô cùng nhẹ nhàng, thoải mái.</p><p><strong>SIÊU ẤM: </strong>Với 3 lớp chắc chắn, PHN4000 giữ ấm cực tốt</p><p>Lớp ngoài và lớp lót được làm từ 100% Nylon với hiệu quả cản gió vượt trội</p><p>Lớp giữa bông nhẹ 100% Polyester</p><p><strong>SIÊU GỌN:</strong> Dễ dàng gấp gọn lại trong túi và di chuyển nhẹ nhàng.</p><h2>Thiết kế tiện lợi &amp; thời trang&nbsp;</h2><p>Đây là chiếc <strong>Áo phao nữ basic</strong>, siêu nhẹ, trẻ trung không thể thiếu trong tủ đồ mùa đông của bạn. Thiết kế tối giản, màu sắc đa dạng nên PHN4000 vô cùng dễ mặc cho các chị em trong mùa đông năm nay. Với thiết kế mũ áo siêu nhẹ có thể tháo rời, túi áo có khóa chắc chắn và hệ thống túi trong - túi ngoài vô cùng tiện dụng và đa năng.</p><p><br>&nbsp;</p>',199000,'published',''),('2021-12-15 20:47:12.186035','2021-12-15 20:47:12.186035',NULL,3,'Áo đông','<p>Theo đó,<strong> Áo phao nữ YODY </strong>chinh phục khách hàng bởi những ưu điểm sau:</p><p><strong>SIÊU NHẸ: </strong>Áo chỉ nặng 315 gram/ áo, nhẹ hơn cả 1 quả cam. Sản phẩm có lớp bông tơi xốp nên vô cùng nhẹ nhàng, thoải mái.</p><p><strong>SIÊU ẤM: </strong>Với 3 lớp chắc chắn, PHN4000 giữ ấm cực tốt</p><p>Lớp ngoài và lớp lót được làm từ 100% Nylon với hiệu quả cản gió vượt trội</p><p>Lớp giữa bông nhẹ 100% Polyester</p><p><strong>SIÊU GỌN:</strong> Dễ dàng gấp gọn lại trong túi và di chuyển nhẹ nhàng.</p><h2>Thiết kế tiện lợi &amp; thời trang&nbsp;</h2><p>Đây là chiếc <strong>Áo phao nữ basic</strong>, siêu nhẹ, trẻ trung không thể thiếu trong tủ đồ mùa đông của bạn. Thiết kế tối giản, màu sắc đa dạng nên PHN4000 vô cùng dễ mặc cho các chị em trong mùa đông năm nay. Với thiết kế mũ áo siêu nhẹ có thể tháo rời, túi áo có khóa chắc chắn và hệ thống túi trong - túi ngoài vô cùng tiện dụng và đa năng.</p><p><br>&nbsp;</p>',199000,'draft',''),('2021-12-16 21:37:29.062315','2021-12-16 21:37:29.062315',NULL,4,'Áo xuân','<p>- Một sản phẩm trong bộ sưu tập hợp tác cùng với Mame Kurogouchi, một thương hiệu thời trang Nhật Bản có thiết kế tôn lên vẻ đẹp cơ thể của mọi phụ nữ đang thu hút sự chú ý trên toàn thế giới.<br>- Được làm từ chất liệu cotton AIRism mịn.<br>- Vải có họa tiết.<br>- Có chức năng Cool Touch.<br>- Dáng rộng mang lại cảm giác thoải mái.<br>- Khoang tay rộng rãi, rất thích hợp để phối cùng đồ mặc trong.</p>',99000,'draft',''),('2021-12-16 21:38:12.949182','2021-12-16 21:38:12.949182',NULL,5,'Áo xuân hè','<p>- Một sản phẩm trong bộ sưu tập hợp tác cùng với Mame Kurogouchi, một thương hiệu thời trang Nhật Bản có thiết kế tôn lên vẻ đẹp cơ thể của mọi phụ nữ đang thu hút sự chú ý trên toàn thế giới.<br>- Được làm từ chất liệu cotton AIRism mịn.<br>- Vải có họa tiết.<br>- Có chức năng Cool Touch.<br>- Dáng rộng mang lại cảm giác thoải mái.<br>- Khoang tay rộng rãi, rất thích hợp để phối cùng đồ mặc trong.</p>',290000,'draft','popular'),('2021-12-16 21:39:13.003106','2021-12-16 21:39:13.003106',NULL,6,'Áo hè thu','<p>- Một sản phẩm trong bộ sưu tập hợp tác cùng với Mame Kurogouchi, một thương hiệu thời trang Nhật Bản có thiết kế tôn lên vẻ đẹp cơ thể của mọi phụ nữ đang thu hút sự chú ý trên toàn thế giới.<br>- Được làm từ chất liệu cotton AIRism mịn.<br>- Vải có họa tiết.<br>- Có chức năng Cool Touch.<br>- Dáng rộng mang lại cảm giác thoải mái.<br>- Khoang tay rộng rãi, rất thích hợp để phối cùng đồ mặc trong.</p>',99000,'draft',''),('2021-12-16 21:40:24.252060','2021-12-16 21:40:24.252060',NULL,7,'Áo đông xuân','<p>- Một sản phẩm trong bộ sưu tập hợp tác cùng với Mame Kurogouchi, một thương hiệu thời trang Nhật Bản có thiết kế tôn lên vẻ đẹp cơ thể của mọi phụ nữ đang thu hút sự chú ý trên toàn thế giới.<br>- Được làm từ chất liệu cotton AIRism mịn.<br>- Vải có họa tiết.<br>- Có chức năng Cool Touch.<br>- Dáng rộng mang lại cảm giác thoải mái.<br>- Khoang tay rộng rãi, rất thích hợp để phối cùng đồ mặc trong.</p>',500000000,'draft',''),('2021-12-16 21:41:13.768207','2021-12-16 21:41:13.768207',NULL,8,'Áo xuân hè thu','<p>- Một sản phẩm trong bộ sưu tập hợp tác cùng với Mame Kurogouchi, một thương hiệu thời trang Nhật Bản có thiết kế tôn lên vẻ đẹp cơ thể của mọi phụ nữ đang thu hút sự chú ý trên toàn thế giới.<br>- Được làm từ chất liệu cotton AIRism mịn.<br>- Vải có họa tiết.<br>- Có chức năng Cool Touch.<br>- Dáng rộng mang lại cảm giác thoải mái.<br>- Khoang tay rộng rãi, rất thích hợp để phối cùng đồ mặc trong.</p>',1000000,'draft',''),('2021-12-16 21:44:00.468059','2021-12-16 21:44:00.468059',NULL,9,'Áo hè thu đông','<p>- Một sản phẩm trong bộ sưu tập hợp tác cùng với Mame Kurogouchi, một thương hiệu thời trang Nhật Bản có thiết kế tôn lên vẻ đẹp cơ thể của mọi phụ nữ đang thu hút sự chú ý trên toàn thế giới.<br>- Được làm từ chất liệu cotton AIRism mịn.<br>- Vải có họa tiết.<br>- Có chức năng Cool Touch.<br>- Dáng rộng mang lại cảm giác thoải mái.<br>- Khoang tay rộng rãi, rất thích hợp để phối cùng đồ mặc trong.</p>',390000,'draft','');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_img`
--

DROP TABLE IF EXISTS `product_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_img` (
  `createDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleteDate` datetime(6) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `imgPath` varchar(255) NOT NULL,
  `productId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_5b52f440918a9d1ca1f13bf3bf8` (`productId`),
  CONSTRAINT `FK_5b52f440918a9d1ca1f13bf3bf8` FOREIGN KEY (`productId`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_img`
--

LOCK TABLES `product_img` WRITE;
/*!40000 ALTER TABLE `product_img` DISABLE KEYS */;
INSERT INTO `product_img` VALUES ('2021-12-15 20:40:09.685838','2021-12-15 20:40:09.685838',NULL,1,'product-01 (1).jpg','allImg1639575609592.jpg',1),('2021-12-15 20:40:09.688039','2021-12-15 20:40:09.688039',NULL,2,'product-01 (2).jpg','allImg1639575609596.jpg',1),('2021-12-15 20:40:09.689774','2021-12-15 20:40:09.689774',NULL,3,'product-01 (3).jpg','allImg1639575609597.jpg',1),('2021-12-15 20:44:39.652852','2021-12-15 20:44:39.652852',NULL,4,'product-02 (1).jpg','allImg1639575879619.jpg',2),('2021-12-15 20:44:39.659469','2021-12-15 20:44:39.659469',NULL,5,'product-02 (2).jpg','allImg1639575879621.jpg',2),('2021-12-15 20:47:12.210756','2021-12-15 20:47:12.210756',NULL,6,'product-03 (1).jpg','allImg1639576032176.jpg',3),('2021-12-15 20:47:12.213260','2021-12-15 20:47:12.213260',NULL,7,'product-03 (2).jpg','allImg1639576032178.jpg',3),('2021-12-16 21:37:29.088140','2021-12-16 21:37:29.088140',NULL,8,'product-04 (1).jpg','allImg1639665449039.jpg',4),('2021-12-16 21:37:29.090851','2021-12-16 21:37:29.090851',NULL,9,'product-04 (2).jpg','allImg1639665449046.jpg',4),('2021-12-16 21:38:12.964818','2021-12-16 21:38:12.964818',NULL,10,'product-05 (1).jpg','allImg1639665492935.jpg',5),('2021-12-16 21:38:12.966337','2021-12-16 21:38:12.966337',NULL,11,'product-05 (2).jpg','allImg1639665492940.jpg',5),('2021-12-16 21:39:13.020955','2021-12-16 21:39:13.020955',NULL,12,'product-06 (1).jpg','allImg1639665552991.jpg',6),('2021-12-16 21:39:13.022275','2021-12-16 21:39:13.022275',NULL,13,'product-06 (2).jpg','allImg1639665552993.jpg',6),('2021-12-16 21:40:24.260869','2021-12-16 21:40:24.260869',NULL,14,'product-07 (1).jpg','allImg1639665624243.jpg',7),('2021-12-16 21:40:24.262208','2021-12-16 21:40:24.262208',NULL,15,'product-07 (2).jpg','allImg1639665624244.jpg',7),('2021-12-16 21:41:13.789574','2021-12-16 21:41:13.789574',NULL,16,'product-08 (1).jpg','allImg1639665673760.jpg',8),('2021-12-16 21:41:13.792916','2021-12-16 21:41:13.792916',NULL,17,'product-08 (2).jpg','allImg1639665673760.jpg',8),('2021-12-16 21:44:00.483502','2021-12-16 21:44:00.483502',NULL,18,'product-09 (2).jpg','allImg1639665840457.jpg',9),('2021-12-16 21:44:00.485000','2021-12-16 21:44:00.485000',NULL,19,'product-09 (1).jpg','allImg1639665840459.jpg',9);
/*!40000 ALTER TABLE `product_img` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_option`
--

DROP TABLE IF EXISTS `product_option`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_option` (
  `createDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleteDate` datetime(6) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `productId` int DEFAULT NULL,
  `optionId` int DEFAULT NULL,
  `optionValueId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_2ca1aab0a82e9c0058d8465ad02` (`productId`),
  KEY `FK_23e7d0e6bd9f9268c6988e0bd88` (`optionId`),
  KEY `FK_de2bca59588b130c7d7db8f68b1` (`optionValueId`),
  CONSTRAINT `FK_23e7d0e6bd9f9268c6988e0bd88` FOREIGN KEY (`optionId`) REFERENCES `option` (`id`),
  CONSTRAINT `FK_2ca1aab0a82e9c0058d8465ad02` FOREIGN KEY (`productId`) REFERENCES `product` (`id`),
  CONSTRAINT `FK_de2bca59588b130c7d7db8f68b1` FOREIGN KEY (`optionValueId`) REFERENCES `option_value` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_option`
--

LOCK TABLES `product_option` WRITE;
/*!40000 ALTER TABLE `product_option` DISABLE KEYS */;
INSERT INTO `product_option` VALUES ('2021-12-15 20:44:39.640928','2021-12-15 20:44:39.640928',NULL,8,2,1,1),('2021-12-15 20:44:39.642994','2021-12-15 20:44:39.642994',NULL,9,2,1,2),('2021-12-15 20:44:39.648163','2021-12-15 20:44:39.648163',NULL,10,2,2,6),('2021-12-15 20:44:39.649980','2021-12-15 20:44:39.649980',NULL,11,2,2,7),('2021-12-15 20:47:12.194759','2021-12-15 20:47:12.194759',NULL,12,3,1,1),('2021-12-15 20:47:12.197940','2021-12-15 20:47:12.197940',NULL,13,3,1,4),('2021-12-15 20:47:12.201055','2021-12-15 20:47:12.201055',NULL,14,3,1,3),('2021-12-15 20:47:12.203245','2021-12-15 20:47:12.203245',NULL,15,3,2,5),('2021-12-15 20:47:12.205982','2021-12-15 20:47:12.205982',NULL,16,3,2,6),('2021-12-16 21:33:15.188110','2021-12-16 21:33:15.188110',NULL,17,1,1,1),('2021-12-16 21:33:15.192855','2021-12-16 21:33:15.192855',NULL,18,1,1,2),('2021-12-16 21:33:15.195132','2021-12-16 21:33:15.195132',NULL,19,1,1,3),('2021-12-16 21:33:15.196823','2021-12-16 21:33:15.196823',NULL,20,1,1,4),('2021-12-16 21:33:15.198214','2021-12-16 21:33:15.198214',NULL,21,1,2,5),('2021-12-16 21:33:15.199547','2021-12-16 21:33:15.199547',NULL,22,1,2,6),('2021-12-16 21:33:15.200858','2021-12-16 21:33:15.200858',NULL,23,1,2,7),('2021-12-16 21:37:29.075218','2021-12-16 21:37:29.075218',NULL,24,4,1,3),('2021-12-16 21:37:29.076908','2021-12-16 21:37:29.076908',NULL,25,4,1,4),('2021-12-16 21:37:29.079011','2021-12-16 21:37:29.079011',NULL,26,4,2,6),('2021-12-16 21:37:29.085042','2021-12-16 21:37:29.085042',NULL,27,4,2,5),('2021-12-16 21:38:12.959892','2021-12-16 21:38:12.959892',NULL,28,5,1,4),('2021-12-16 21:38:12.961927','2021-12-16 21:38:12.961927',NULL,29,5,2,5),('2021-12-16 21:38:12.963208','2021-12-16 21:38:12.963208',NULL,30,5,2,6),('2021-12-16 21:39:13.008460','2021-12-16 21:39:13.008460',NULL,31,6,1,1),('2021-12-16 21:39:13.009758','2021-12-16 21:39:13.009758',NULL,32,6,1,2),('2021-12-16 21:39:13.011091','2021-12-16 21:39:13.011091',NULL,33,6,1,3),('2021-12-16 21:39:13.014483','2021-12-16 21:39:13.014483',NULL,34,6,1,4),('2021-12-16 21:39:13.016687','2021-12-16 21:39:13.016687',NULL,35,6,2,5),('2021-12-16 21:39:13.018236','2021-12-16 21:39:13.018236',NULL,36,6,2,6),('2021-12-16 21:39:13.019446','2021-12-16 21:39:13.019446',NULL,37,6,2,7),('2021-12-16 21:40:24.255566','2021-12-16 21:40:24.255566',NULL,38,7,1,2),('2021-12-16 21:40:24.257053','2021-12-16 21:40:24.257053',NULL,39,7,2,6),('2021-12-16 21:40:24.258478','2021-12-16 21:40:24.258478',NULL,40,7,2,7),('2021-12-16 21:41:13.777622','2021-12-16 21:41:13.777622',NULL,41,8,1,1),('2021-12-16 21:41:13.780372','2021-12-16 21:41:13.780372',NULL,42,8,1,2),('2021-12-16 21:41:13.782686','2021-12-16 21:41:13.782686',NULL,43,8,2,6),('2021-12-16 21:41:13.784240','2021-12-16 21:41:13.784240',NULL,44,8,2,7),('2021-12-16 21:44:00.474479','2021-12-16 21:44:00.474479',NULL,45,9,1,2),('2021-12-16 21:44:00.475789','2021-12-16 21:44:00.475789',NULL,46,9,1,3),('2021-12-16 21:44:00.477008','2021-12-16 21:44:00.477008',NULL,47,9,2,5),('2021-12-16 21:44:00.478773','2021-12-16 21:44:00.478773',NULL,48,9,2,6);
/*!40000 ALTER TABLE `product_option` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receipt`
--

DROP TABLE IF EXISTS `receipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receipt` (
  `createDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleteDate` datetime(6) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `totalPrice` int NOT NULL,
  `status` enum('success','processing','cancel') NOT NULL DEFAULT 'processing',
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_e011d4704c491f4d821d7ebb6ca` (`userId`),
  CONSTRAINT `FK_e011d4704c491f4d821d7ebb6ca` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receipt`
--

LOCK TABLES `receipt` WRITE;
/*!40000 ALTER TABLE `receipt` DISABLE KEYS */;
INSERT INTO `receipt` VALUES ('2021-12-16 21:54:44.964440','2021-12-16 21:54:44.964440',NULL,1,'','232, An Binh City',990000,'processing',1),('2021-12-16 22:08:14.767323','2021-12-16 22:08:14.767323',NULL,2,'','232, An Binh City',870000,'processing',1);
/*!40000 ALTER TABLE `receipt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receipt_option_product`
--

DROP TABLE IF EXISTS `receipt_option_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receipt_option_product` (
  `createDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleteDate` datetime(6) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `productName` varchar(255) NOT NULL,
  `productOptionName` varchar(255) NOT NULL,
  `productOptionValue` varchar(255) NOT NULL,
  `receiptProductId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1db6c9613b2ca172fcedacc96e0` (`receiptProductId`),
  CONSTRAINT `FK_1db6c9613b2ca172fcedacc96e0` FOREIGN KEY (`receiptProductId`) REFERENCES `receipt_product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receipt_option_product`
--

LOCK TABLES `receipt_option_product` WRITE;
/*!40000 ALTER TABLE `receipt_option_product` DISABLE KEYS */;
INSERT INTO `receipt_option_product` VALUES ('2021-12-16 21:54:45.029451','2021-12-16 21:54:45.029451',NULL,1,'Áo xuân','Size','L',1),('2021-12-16 21:54:45.033081','2021-12-16 21:54:45.033081',NULL,2,'Áo xuân','Color','#ccc',1),('2021-12-16 21:54:45.034992','2021-12-16 21:54:45.034992',NULL,3,'Áo xuân','Size','L',2),('2021-12-16 21:54:45.036939','2021-12-16 21:54:45.036939',NULL,4,'Áo xuân','Color','#fff',2),('2021-12-16 21:54:45.039014','2021-12-16 21:54:45.039014',NULL,5,'Áo hè thu','Size','S',3),('2021-12-16 21:54:45.040930','2021-12-16 21:54:45.040930',NULL,6,'Áo hè thu','Color','#fff',3),('2021-12-16 21:54:45.042996','2021-12-16 21:54:45.042996',NULL,7,'Áo hè thu','Size','XL',4),('2021-12-16 21:54:45.046107','2021-12-16 21:54:45.046107',NULL,8,'Áo hè thu','Color','#ccc',4),('2021-12-16 22:08:14.805349','2021-12-16 22:08:14.805349',NULL,9,'Áo xuân hè','Size','XL',5),('2021-12-16 22:08:14.809111','2021-12-16 22:08:14.809111',NULL,10,'Áo xuân hè','Color','#ccc',5);
/*!40000 ALTER TABLE `receipt_option_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receipt_product`
--

DROP TABLE IF EXISTS `receipt_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receipt_product` (
  `createDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleteDate` datetime(6) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `pruductName` varchar(255) NOT NULL,
  `quanlity` int NOT NULL,
  `unitPrice` int NOT NULL,
  `receiptId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_08bfe33d6de04ea7518c4968977` (`receiptId`),
  CONSTRAINT `FK_08bfe33d6de04ea7518c4968977` FOREIGN KEY (`receiptId`) REFERENCES `receipt` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receipt_product`
--

LOCK TABLES `receipt_product` WRITE;
/*!40000 ALTER TABLE `receipt_product` DISABLE KEYS */;
INSERT INTO `receipt_product` VALUES ('2021-12-16 21:54:44.990209','2021-12-16 21:54:44.990209',NULL,1,'Áo xuân',3,99000,1),('2021-12-16 21:54:45.003383','2021-12-16 21:54:45.003383',NULL,2,'Áo xuân',1,99000,1),('2021-12-16 21:54:45.009714','2021-12-16 21:54:45.009714',NULL,3,'Áo hè thu',3,99000,1),('2021-12-16 21:54:45.019778','2021-12-16 21:54:45.019778',NULL,4,'Áo hè thu',3,99000,1),('2021-12-16 22:08:14.794567','2021-12-16 22:08:14.794567',NULL,5,'Áo xuân hè',3,290000,2);
/*!40000 ALTER TABLE `receipt_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receipt_product_product_product`
--

DROP TABLE IF EXISTS `receipt_product_product_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receipt_product_product_product` (
  `receiptProductId` int NOT NULL,
  `productId` int NOT NULL,
  PRIMARY KEY (`receiptProductId`,`productId`),
  KEY `IDX_e5fe0a14debc3085e522d07037` (`receiptProductId`),
  KEY `IDX_63d8c3393c489b56809561945a` (`productId`),
  CONSTRAINT `FK_63d8c3393c489b56809561945aa` FOREIGN KEY (`productId`) REFERENCES `product` (`id`),
  CONSTRAINT `FK_e5fe0a14debc3085e522d070379` FOREIGN KEY (`receiptProductId`) REFERENCES `receipt_product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receipt_product_product_product`
--

LOCK TABLES `receipt_product_product_product` WRITE;
/*!40000 ALTER TABLE `receipt_product_product_product` DISABLE KEYS */;
INSERT INTO `receipt_product_product_product` VALUES (1,4),(2,4),(3,6),(4,6),(5,5);
/*!40000 ALTER TABLE `receipt_product_product_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `createDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deleteDate` datetime(6) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `active` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('2021-12-16 21:54:31.700768','2021-12-16 21:54:31.700768',NULL,1,'admin@sims.com','$2b$10$iQiuocAo49pUmxj3DULMce7BpWFn7J7s1WvXCdjVZeW16TDLvnGqi','232, An Binh City','0989510994',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-17  9:46:55
