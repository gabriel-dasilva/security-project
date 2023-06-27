USE master

IF EXISTS(select * from sys.databases where name='blackjack')
DROP DATABASE blackjack;

CREATE DATABASE blackjack;
GO

USE blackjack;

CREATE TABLE [User] (
  userId INT IDENTITY(1,1) PRIMARY KEY,
  username VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(300),
  refreshToken VARCHAR(400) NULL
)
GO

CREATE TABLE [UserWinnings] (
  username VARCHAR(100),
  bankroll MONEY
)
GO

CREATE PROCEDURE spUser_GetBankroll
	@username varchar(100),
	@bankroll money output
AS
BEGIN
	SET NOCOUNT ON;

  select @bankroll=bankroll
	from UserWinnings
	where username = @username;
END
GO


-- need to run this command below for connection to work (replace username with your own)
--ALTER USER 'your_username'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
