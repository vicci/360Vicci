-- phpMyAdmin SQL Dump
-- version 3.4.3.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 29, 2013 at 02:54 PM
-- Server version: 5.1.63
-- PHP Version: 5.3.3-1ubuntu3~eugenesan~lucid1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `vicci`
--

-- --------------------------------------------------------

--
-- Table structure for table `booth`
--

CREATE TABLE IF NOT EXISTS `booth` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `event_id` int(10) NOT NULL,
  `name` varchar(150) NOT NULL,
  `image` varchar(300) DEFAULT NULL,
  `updated_datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE IF NOT EXISTS `cart` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL,
  `event_id` int(10) NOT NULL,
  `cart_details` text COMMENT 'json data',
  `updated_datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`,`event_id`),
  KEY `event_id` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE IF NOT EXISTS `country` (
  `id` int(3) NOT NULL,
  `iso2` varchar(2) NOT NULL,
  `short_name` varchar(150) NOT NULL,
  `long_name` varchar(300) NOT NULL,
  `calling_code` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE IF NOT EXISTS `event` (
  `id` int(10) NOT NULL,
  `title` varchar(300) NOT NULL,
  `description` text NOT NULL,
  `address` varchar(300) DEFAULT NULL,
  `image` varchar(300) DEFAULT NULL,
  `latitude` varchar(15) NOT NULL,
  `longitude` varchar(15) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `updated_datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE IF NOT EXISTS `order` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL,
  `event_id` int(10) NOT NULL,
  `shipping_address` text NOT NULL,
  `cart_details` text COMMENT 'json data',
  `amount` float NOT NULL,
  `payment_information` text COMMENT 'Transaction id from braintree payment- json format',
  `order_created_datetime` datetime NOT NULL,
  `status` tinyint(1) NOT NULL COMMENT '1 - Success, 0 - Failed',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`event_id`),
  KEY `event_id` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE IF NOT EXISTS `product` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(150) NOT NULL,
  `description` text,
  `image` varchar(300) DEFAULT NULL,
  `booth_id` int(10) NOT NULL,
  `size` varchar(150) DEFAULT NULL COMMENT 'comma separated',
  `price` float NOT NULL,
  `updated_datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `booth_id` (`booth_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE IF NOT EXISTS `session` (
  `session_id` varchar(40) NOT NULL DEFAULT '0',
  `ip_address` varchar(16) NOT NULL DEFAULT '0',
  `user_agent` varchar(120) NOT NULL,
  `last_activity` int(10) unsigned NOT NULL DEFAULT '0',
  `user_data` text NOT NULL,
  PRIMARY KEY (`session_id`),
  KEY `last_activity_idx` (`last_activity`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `shipping_address`
--

CREATE TABLE IF NOT EXISTS `shipping_address` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL,
  `nick_name` varchar(100) NOT NULL,
  `address_line_1` varchar(300) NOT NULL,
  `address_line_2` varchar(300) DEFAULT NULL,
  `city` varchar(150) NOT NULL,
  `state` varchar(150) NOT NULL,
  `country` varchar(150) NOT NULL,
  `zip` varchar(15) NOT NULL,
  `updated_datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(300) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL COMMENT 'mdf5 encrypted',
  `fb_user_id` varchar(50) DEFAULT NULL,
  `google_user_id` varchar(50) DEFAULT NULL,
  `twitter_user_id` varchar(50) DEFAULT NULL,
  `join_datetime` datetime NOT NULL,
  `token` varchar(100) DEFAULT NULL COMMENT 'Email verification token for vicci user',
  `forgotten_pwd_code` varchar(100) DEFAULT NULL,
  `recovery_link_expire` varchar(20) DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `status` tinyint(1) NOT NULL COMMENT '1 - Active, 0 - Not Active',
  `twitter_linking_status` tinyint(1) DEFAULT NULL,
  `twitter_token` varchar(100) DEFAULT NULL COMMENT 'twitter email verification token',
  PRIMARY KEY (`id`),
  KEY `email` (`email`),
  KEY `fb_user_id` (`fb_user_id`),
  KEY `google_user_id` (`google_user_id`),
  KEY `twitter_user_id` (`twitter_user_id`),
  KEY `status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booth`
--
ALTER TABLE `booth`
  ADD CONSTRAINT `booth_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`booth_id`) REFERENCES `booth` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `shipping_address`
--
ALTER TABLE `shipping_address`
  ADD CONSTRAINT `shipping_address_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

----------------------------------
--Alter - adding new fields for fb linking status and fb token
--02/09/2013
----------------------------------
ALTER TABLE  `user` ADD  `fb_linking_status` INT( 1 ) NULL AFTER  `fb_user_id` ,
ADD  `fb_token` INT NULL COMMENT  'fb email verification token' AFTER  `fb_linking_status`;

-----------------------------------
--Auto increment in event table
--04/09/2013
-------------------------------------
ALTER TABLE  `event` CHANGE  `id`  `id` INT( 10 ) NOT NULL AUTO_INCREMENT;

-----------------------------------------------------------------
--Status field in event table
--04/09/2013
-----------------------------------------------------------------
ALTER TABLE  `event` ADD  `status` INT( 1 ) NOT NULL DEFAULT  '1' COMMENT  '1-active,2- not active, 3- deleted' AFTER  `end_date`;

-----------------------------------------------------------------
--Adding new filed -Access code in event table
--04/09/2013
-----------------------------------------------------------------
ALTER TABLE  `event` ADD  `access_code` VARCHAR( 10 ) NULL COMMENT  'event access code to select event in app' AFTER  `status`;

------------------------------------------------------------------
--Changing field - Country can be null
--12/09/2013
------------------------------------------------------------------
ALTER TABLE  `shipping_address` CHANGE  `country`  `country` VARCHAR( 150 ) CHARACTER SET utf8 COLLATE utf8_general_ci NULL;

------------------------------------------------------------------
--New field 'type' in shipping address table - Country can be null
--12/09/2013
------------------------------------------------------------------
ALTER TABLE  `shipping_address` ADD  `type` INT( 1 ) NULL COMMENT  '1 - Billing Address, 2 - Shipping Address' AFTER  `updated_datetime`;

------------------------------------------------------------------
--order number can be start from 100000
--19/09/2013
------------------------------------------------------------------
ALTER TABLE  `order` AUTO_INCREMENT=100000;

------------------------------------------------------------------
--create customer field
--10/10/2013
------------------------------------------------------------------
ALTER TABLE  `user` ADD  `customer_id` VARCHAR( 50 ) NOT NULL COMMENT  'unique id used to save credit card info in braintree vault' AFTER  `email`;

------------------------------------------------------------------
--create customer ids for old users
--10/10/2013
------------------------------------------------------------------
update user set `customer_id`=CONCAT(DATE_FORMAT(`join_datetime`,'%Y%m%d-%H%i%s'), '-', `id`);

------------------------------------------------------------------
--Create mail_queue table
--11/10/2013
------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `mail_queue` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `subject` varchar(256) NOT NULL,
  `name` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `from_email` varchar(100) DEFAULT NULL,
  `from_name` varchar(100) DEFAULT NULL,
  `content` mediumtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_date` datetime NOT NULL,
  `sent_date` datetime DEFAULT NULL,
  `status` int(10) DEFAULT NULL COMMENT '0=added, 1=selected for sending, 2=sent',
  `module_info` varchar(200) DEFAULT NULL,
  `priority` int(10) NOT NULL DEFAULT '0',
  `attachment` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `status` (`status`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;

------------------------------------------------------------------
--Create mail_queue_hystory table
--11/10/2013
------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `mail_queue_history` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `subject` varchar(256) NOT NULL,
  `name` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `from_email` varchar(100) DEFAULT NULL,
  `from_name` varchar(100) DEFAULT NULL,
  `content` mediumtext NOT NULL,
  `created_date` datetime NOT NULL,
  `sent_date` datetime NOT NULL,
  `status` int(10) NOT NULL,
  `module_info` varchar(200) DEFAULT NULL,
  `priority` int(10) NOT NULL DEFAULT '0',
  `attachment` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=0;

------------------------------------------------------------------
--Create billing address field
--16/10/2013
------------------------------------------------------------------
ALTER TABLE  `order` ADD  `billing_address` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NULL after `shipping_address`;

------------------------------------------------------------------
--Create product_sku field
--16/10/2013
------------------------------------------------------------------
ALTER TABLE  `product` ADD  `product_sku` VARCHAR( 50 ) NOT NULL COLLATE utf8_general_ci after `id`;

------------------------------------------------------------------
--Dropping index
--16/10/2013
------------------------------------------------------------------
ALTER TABLE  `vicci`.`order` DROP INDEX  `user_id` ,
ADD INDEX  `user_id` (  `user_id` ,  `event_id` )
------------------------------------------------------------------
--removes foriegn key
--16/10/2013
------------------------------------------------------------------
ALTER TABLE  `order` DROP FOREIGN KEY  `order_ibfk_1` ,
ADD FOREIGN KEY (  `user_id` ) REFERENCES  `vicci`.`user` (
`id`
) ON DELETE NO ACTION ON UPDATE NO ACTION ;

ALTER TABLE  `order` DROP FOREIGN KEY  `order_ibfk_2` ,
ADD FOREIGN KEY (  `event_id` ) REFERENCES  `vicci`.`event` (

------------------------------------------------------------------
--Adding new field event radius
--28/10/2013
------------------------------------------------------------------
ALTER TABLE  `event` ADD  `radius` DECIMAL( 10 ) NULL DEFAULT  '200' COMMENT  'event radius in meters' AFTER  `access_code`;

------------------------------------------------------------------
--Adding new field event verification
--04/11/2013
------------------------------------------------------------------
ALTER TABLE  `event` ADD  `enable_verification` INT( 1 ) NOT NULL DEFAULT  '1' COMMENT  'enable or disable verification; 1- Enabled,0-Disabled' AFTER  `access_code`;