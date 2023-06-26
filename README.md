# security-project
basic website making use of sessions and secure login
## project directory structure
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

