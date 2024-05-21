CREATE TABLE permission (
    permission_id INT PRIMARY KEY AUTO_INCREMENT,
    permission_name VARCHAR(64) UNIQUE NOT NULL
);

CREATE TABLE `role` (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(64) UNIQUE NOT NULL
);

CREATE TABLE role_permission (
    role_id INT,
    permission_id INT,
    FOREIGN KEY (role_id) REFERENCES `role`(role_id),
    FOREIGN KEY (permission_id) REFERENCES permission(permission_id),
    PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE `user` (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(128) NOT NULL UNIQUE,
    first_name VARCHAR(64) NOT NULL,
    last_name VARCHAR(64) NOT NULL,
    password VARCHAR(128) NOT NULL,
    middle_name VARCHAR(64) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES `role`(role_id)
);

CREATE TABLE passage_time (
    passage_time_id INT PRIMARY KEY AUTO_INCREMENT,
    entry_time TIME NOT NULL
);

CREATE TABLE passage_status (
    passage_status_id INT PRIMARY KEY AUTO_INCREMENT,
    passage_status_name VARCHAR(128) NOT NULL
);

CREATE TABLE passage (
     passage_id INT PRIMARY KEY AUTO_INCREMENT,
     passage_time_id INT NOT NULL,
     passage_date DATE NOT NULL,
     user_id INT NOT NULL,
     passage_status_id INT NOT NULL DEFAULT 1,
     FOREIGN KEY (passage_time_id) REFERENCES passage_time(passage_time_id),
     FOREIGN KEY (user_id) REFERENCES `user`(user_id),
     FOREIGN KEY (passage_status_id) REFERENCES passage_status(passage_status_id)
);

DELIMITER //

CREATE FUNCTION GetTicketsCountByStatus(status_name VARCHAR(255)) RETURNS INT
BEGIN
    DECLARE ticket_count INT;
SELECT COUNT(*) INTO ticket_count
FROM passage
WHERE passage_status_id = (
    SELECT passage_status_id
    FROM passage_status
    WHERE passage_status_name = status_name
);

RETURN ticket_count;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE GetTotalTicketsCount()
BEGIN
SELECT COUNT(*) AS totalTickets FROM passage;
END //

DELIMITER ;

