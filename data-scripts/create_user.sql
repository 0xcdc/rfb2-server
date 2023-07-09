DROP USER IF EXISTS '<dbusername from credentials>'@'localhost';
CREATE USER '<dbusername from credentials>'@'localhost' IDENTIFIED BY 'password from credentials';
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, RELOAD, REFERENCES, ALTER ON *.* TO `dbuser`@`localhost` WITH GRANT OPTION;
