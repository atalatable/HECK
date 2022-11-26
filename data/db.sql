-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'tags'
-- 
-- ---

DROP TABLE IF EXISTS `tags`;
		
CREATE TABLE `tags` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'write-ups'
-- 
-- ---

DROP TABLE IF EXISTS `write-ups`;
		
CREATE TABLE `write-ups` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR NULL DEFAULT NULL,
  `date` DATE NULL DEFAULT NULL,
  `catid` INTEGER NULL DEFAULT NULL,
  `description` MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'categories'
-- 
-- ---

DROP TABLE IF EXISTS `categories`;
		
CREATE TABLE `categories` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'tags-wu'
-- 
-- ---

DROP TABLE IF EXISTS `tags-wu`;
		
CREATE TABLE `tags-wu` (
  `tagid` INTEGER NULL DEFAULT NULL,
  `wuid` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY ()
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `write-ups` ADD FOREIGN KEY (catid) REFERENCES `categories` (`id`);
ALTER TABLE `tags-wu` ADD FOREIGN KEY (tagid) REFERENCES `tags` (`id`);
ALTER TABLE `tags-wu` ADD FOREIGN KEY (wuid) REFERENCES `write-ups` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `tags` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `write-ups` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `categories` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `tags-wu` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `tags` (`id`,`name`) VALUES
-- ('','');
-- INSERT INTO `write-ups` (`id`,`name`,`date`,`catid`,`description`) VALUES
-- ('','','','','');
-- INSERT INTO `categories` (`id`,`name`) VALUES
-- ('','');
-- INSERT INTO `tags-wu` (`tagid`,`wuid`) VALUES
-- ('','');