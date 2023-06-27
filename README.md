# BlackJack

## Blackjack Database
The database used to create the Blackjack game is **Microsoft SQL Server**.
### Creating the database locally
1. Open your local SQL Server Management Studio and connect to a server user of your choice
2. Run script `dbscripts.sql` to create database and tables

## Do before startup...
1. Create a `.env` file under the `identityServer` and `resourceServer` directory
2. This `.env` file must contain:
```
SENDGRID_API_KEY = # 
TOKEN_SECRET= # a string containing a variable length of alphanumeric characters as well as symbols
SESSION_SECRET = #
SENDGRID_EMAIL_ADDRESS = 'cooldude2233456@gmail.com'

# SQL Server connection
SQL_USER= # SQL Server login username
SQL_PASSWORD= # SQL Server login password
SQL_DATABASE=blackjack
SQL_SERVER=localhost
SQL_TRUST_SERVER=true
```

## Running the Identity Server
The code for the identity server is located under the folder `identityServer`
1. Run `npm install` to install all the necessary dependencies
2. To start up the identity server, run `npm start`
3. The server will be running on port 3000

## Running the Resource Server
The code for the identity server is located under the folder `resourceServer`
1. Run `npm install` to install all the necessary dependencies
2. To start up the resource server, run `npm start`
3. The server will be running on port 4000
4. To access the client, you can browse to url `localhost:4000`


## project-directory structure
```bash
🌳 security-project-main
├── 📂 identityServer
│   ├── 📂 controllers
│   │   ├── 📄 loginController.js
│   │   └── 📄 registerController.js
│   ├── 📂 dbconnection
│   │   ├── 📄 loginController.js
│   │   └── 📄 registerController.js
│   ├── 📂 middleware
│   │   └── 📄 auth.js
│   └── 📂 public
│       ├── 📂 javascript
│       │   ├── 📄 confirmOTP.js
│       │   └── 📄 login.js
│       ├── 📂 styles
│       │   ├── 📄 auth.css
│       │   └── 📄 otp.css
│       └── 📂 views
│           ├── 📄 confirmOTP.html
│           ├── 📄 login.html
│           └── 📄 register.html
│   └── 📂 routes
│       ├── 📄 login.html
│       └── 📄 register.html
├── 📂 resourceServer
│   ├── 📂 controllers
│   │   ├── 📄 loginController.js
│   │   └── 📄 registerController.js
│   ├── 📂 dbconnection
│   │   ├── 📄 loginController.js
│   │   └── 📄 registerController.js
│   ├── 📂 middleware
│   │   └── 📄 auth.js
│   └── 📂 public
│       ├── 📂 image
│       │   └── ...
│       ├── 📂 sound
│       │   └── sound.ogg
│       ├── 📂 javascript
│       │   ├── 📄 blackjack.js
│       │   └── 📄 gameLogic.js
│       ├── 📂 styles
│       │   ├── 📄 game.css
│       │   └── 📄 homepage.css
│       └── 📂 views
│           ├── 📄 blackjack.html
│           ├── 📄 homepage.html
│           └── 📄 test.html
│   └── 📂 routes
│       ├── 📄 homepage.js
│       └── 📄 test.js
├── 📄 package.json
├── 📄 package-lock.json
├── 📄 app.js
├── 📄 .gitignore
├── 📄 dbscripts.sql
└── 📄 README.md

