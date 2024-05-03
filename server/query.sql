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
