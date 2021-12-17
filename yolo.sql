-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 06, 2021 lúc 12:57 PM
-- Phiên bản máy phục vụ: 10.4.20-MariaDB
-- Phiên bản PHP: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `yolo`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `admin`
--

CREATE TABLE `admin` (
  `createDate` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updateDate` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleteDate` datetime(6) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `company`
--

CREATE TABLE `company` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `age` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `custom_migration_table`
--

CREATE TABLE `custom_migration_table` (
  `id` int(11) NOT NULL,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `option`
--

CREATE TABLE `option` (
  `createDate` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updateDate` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleteDate` datetime(6) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `meta` enum('text','color') NOT NULL DEFAULT 'text'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `option_value`
--

CREATE TABLE `option_value` (
  `createDate` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updateDate` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleteDate` datetime(6) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `optionId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
  `createDate` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updateDate` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleteDate` datetime(6) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `price` int(11) NOT NULL,
  `status` enum('pending','draft','published') NOT NULL DEFAULT 'draft',
  `label` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_img`
--

CREATE TABLE `product_img` (
  `createDate` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updateDate` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleteDate` datetime(6) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `imgPath` varchar(255) NOT NULL,
  `productId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_option`
--

CREATE TABLE `product_option` (
  `createDate` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updateDate` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleteDate` datetime(6) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `productId` int(11) DEFAULT NULL,
  `optionId` int(11) DEFAULT NULL,
  `optionValueId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `receipt`
--

CREATE TABLE `receipt` (
  `createDate` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updateDate` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleteDate` datetime(6) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `totalPrice` int(11) NOT NULL,
  `status` enum('success','processing','cancel') NOT NULL DEFAULT 'processing',
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `receipt_option_product`
--

CREATE TABLE `receipt_option_product` (
  `createDate` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updateDate` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleteDate` datetime(6) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `productName` varchar(255) NOT NULL,
  `productOptionName` varchar(255) NOT NULL,
  `productOptionValue` varchar(255) NOT NULL,
  `receiptProductId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `receipt_product`
--

CREATE TABLE `receipt_product` (
  `createDate` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updateDate` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleteDate` datetime(6) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `pruductName` varchar(255) NOT NULL,
  `quanlity` int(11) NOT NULL,
  `unitPrice` int(11) NOT NULL,
  `receiptId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `receipt_product_product_product`
--

CREATE TABLE `receipt_product_product_product` (
  `receiptProductId` int(11) NOT NULL,
  `productId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `createDate` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updateDate` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `deleteDate` datetime(6) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `custom_migration_table`
--
ALTER TABLE `custom_migration_table`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `option`
--
ALTER TABLE `option`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `option_value`
--
ALTER TABLE `option_value`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_2d7616b884ef55e6eb5af000f1d` (`optionId`);

--
-- Chỉ mục cho bảng `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `product_img`
--
ALTER TABLE `product_img`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_5b52f440918a9d1ca1f13bf3bf8` (`productId`);

--
-- Chỉ mục cho bảng `product_option`
--
ALTER TABLE `product_option`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_2ca1aab0a82e9c0058d8465ad02` (`productId`),
  ADD KEY `FK_23e7d0e6bd9f9268c6988e0bd88` (`optionId`),
  ADD KEY `FK_de2bca59588b130c7d7db8f68b1` (`optionValueId`);

--
-- Chỉ mục cho bảng `receipt`
--
ALTER TABLE `receipt`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_e011d4704c491f4d821d7ebb6ca` (`userId`);

--
-- Chỉ mục cho bảng `receipt_option_product`
--
ALTER TABLE `receipt_option_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_1db6c9613b2ca172fcedacc96e0` (`receiptProductId`);

--
-- Chỉ mục cho bảng `receipt_product`
--
ALTER TABLE `receipt_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_08bfe33d6de04ea7518c4968977` (`receiptId`);

--
-- Chỉ mục cho bảng `receipt_product_product_product`
--
ALTER TABLE `receipt_product_product_product`
  ADD PRIMARY KEY (`receiptProductId`,`productId`),
  ADD KEY `IDX_e5fe0a14debc3085e522d07037` (`receiptProductId`),
  ADD KEY `IDX_63d8c3393c489b56809561945a` (`productId`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `company`
--
ALTER TABLE `company`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `custom_migration_table`
--
ALTER TABLE `custom_migration_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `option`
--
ALTER TABLE `option`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `option_value`
--
ALTER TABLE `option_value`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `product_img`
--
ALTER TABLE `product_img`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `product_option`
--
ALTER TABLE `product_option`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `receipt`
--
ALTER TABLE `receipt`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `receipt_option_product`
--
ALTER TABLE `receipt_option_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `receipt_product`
--
ALTER TABLE `receipt_product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `option_value`
--
ALTER TABLE `option_value`
  ADD CONSTRAINT `FK_2d7616b884ef55e6eb5af000f1d` FOREIGN KEY (`optionId`) REFERENCES `option` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `product_img`
--
ALTER TABLE `product_img`
  ADD CONSTRAINT `FK_5b52f440918a9d1ca1f13bf3bf8` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `product_option`
--
ALTER TABLE `product_option`
  ADD CONSTRAINT `FK_23e7d0e6bd9f9268c6988e0bd88` FOREIGN KEY (`optionId`) REFERENCES `option` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_2ca1aab0a82e9c0058d8465ad02` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_de2bca59588b130c7d7db8f68b1` FOREIGN KEY (`optionValueId`) REFERENCES `option_value` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `receipt`
--
ALTER TABLE `receipt`
  ADD CONSTRAINT `FK_e011d4704c491f4d821d7ebb6ca` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `receipt_option_product`
--
ALTER TABLE `receipt_option_product`
  ADD CONSTRAINT `FK_1db6c9613b2ca172fcedacc96e0` FOREIGN KEY (`receiptProductId`) REFERENCES `receipt_product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `receipt_product`
--
ALTER TABLE `receipt_product`
  ADD CONSTRAINT `FK_08bfe33d6de04ea7518c4968977` FOREIGN KEY (`receiptId`) REFERENCES `receipt` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Các ràng buộc cho bảng `receipt_product_product_product`
--
ALTER TABLE `receipt_product_product_product`
  ADD CONSTRAINT `FK_63d8c3393c489b56809561945aa` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_e5fe0a14debc3085e522d070379` FOREIGN KEY (`receiptProductId`) REFERENCES `receipt_product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
