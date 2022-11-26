DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
    `id` INT AUTO_INCREMENT DEFAULT NULL,
    `name` VARCHAR(64),
    `password` VARCHAR(64)
);

-- INSERT INTO `user` VALUES(1, "admin", "password");