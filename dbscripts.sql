
CREATE database blackjack;

CREATE TABLE User (
  userId INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100),
  password VARCHAR(300)
);


-- need to run this command below for connection to work (replace username with your own)
--ALTER USER 'your_username'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
