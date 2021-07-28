PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `name` VARCHAR(255) NOT NULL, `email` VARCHAR(255), `phone` VARCHAR(255), `username` VARCHAR(255) NOT NULL UNIQUE, `password` VARCHAR(255) NOT NULL, `isAdmin` TINYINT(1), `isEnabled` TINYINT(1), `changePassword` TINYINT(1), `profBoardName` VARCHAR(255), `licenceNumber` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);
INSERT INTO users VALUES(2,'user1','user1@email.address','1234','user1','$2a$10$MF28E0XjTZDQ8tYGHChhzOjJxTJkfHsu4BspSdDX3VQL4Lc8i5Yp6',0,1,0,'crm','1234','2021-07-24 18:27:12.418 +00:00','2021-07-24 18:27:12.418 +00:00');
INSERT INTO users VALUES(3,'user2','user2@email.address','2345','user2','$2a$10$uGxq3mj98ThS.TZhuFcn3O.x5Dunh5Zxtd3rocSg4O0wIY2QpJMaO',0,1,0,'crm','2345','2021-07-24 18:27:50.376 +00:00','2021-07-24 18:27:50.376 +00:00');
INSERT INTO users VALUES(4,'user3','user3@email.address','3456','user3','$2a$10$SHCjfSV1kFCWXk17JV/JfOiyCe.0DBb0TGyx17hPqzgeLDQdufZq.',0,1,0,'crm','3456','2021-07-24 18:28:13.662 +00:00','2021-07-24 18:28:13.662 +00:00');
COMMIT;
