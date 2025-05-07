# CalCraftr 🍽️ - Personalized Meal Tracking and Nutrition Planner

**CalCraftr** is a single-page React application designed to help users track their meals, calculate nutritional intake, and receive tailored meal recommendations based on their goals. This application serves as a practical health management tool and is built using modern full-stack web development practices.

---

## 🧠 Project Overview

This application allows users to:

- Register and log in with a username (no passwords required for simplicity and security).
- Complete their user profile with height, weight, and fitness goal.
- Log meals and calculate caloric intake.
- Receive meal plan recommendations based on user health data.
- Contact a dietician filtered by dietary allergies.

All actions are securely tied to a server-side session (via cookie), and state is managed efficiently without any client-side storage mechanisms such as localStorage or IndexedDB.

---

## 💻 Technologies Used

### Frontend
- [React](https://reactjs.org/) via [Vite](https://vitejs.dev/)
- Vanilla CSS (no frameworks, no preprocessors)
- Semantic HTML5 with responsive design

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [cookie-parser](https://www.npmjs.com/package/cookie-parser) for session handling

> ❗Note: Only pre-approved libraries were used per course requirements. No axios, bootstrap, router, or storage libraries are used.

---

## 🔐 Security and Authentication

- **Registration required** before login; usernames are stored in server memory.
- The special username `"dog"` is always **denied access**, per course security expectations.
- A session ID is generated at login and stored in a cookie. This session is used for authorization in all API calls.
- User input is **sanitized and validated** both on the frontend and backend to prevent injection/XSS.

---

## 🌐 How to Use the App

### 🏁 Start Locally

1. Clone or unzip the project in your local directory.
2. Run the following commands:
3. 
```bash
npm install
npm run build
npm start