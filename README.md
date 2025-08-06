# 📖 DiaDiary – Your Digital Diabetes Diary

**DiaDiary** is a modern and intuitive web application designed for people living with **Type 1 Diabetes**. It helps you easily track, analyze, and manage your health data such as blood sugar levels, insulin doses, carbohydrate intake, and overall well-being – all in one place.

---

## 🌐 Live Demo

👉 [**Open DiaDiary Live**](https://diadiary.onrender.com/)

⚠ **Note:** The backend is hosted on [Render](https://render.com/) with a free plan.  
This means the server may enter **sleep mode** after a period of inactivity, leading to a **cold start**.  
As a result, the **first request can take up to 30–60 seconds** to respond.  
Please wait patiently, the app will work normally after the initial load.

---

## ✅ Features

✔ **Blood Sugar Logging** – Record your glucose levels anytime.  
✔ **Insulin Tracking** – Keep track of both basal and bolus insulin doses.  
✔ **Carbohydrate Calculation** – Log bread units and meals for accurate control.  
✔ **Activity & Notes** – Add physical activity, symptoms, and additional comments.  
✔ **Visual Analytics** – Get detailed charts and insights to monitor trends.  
✔ **Secure Cloud Storage** – Access your data from any device with strong security.  
✔ **PDF Export** – Generate and download reports in one click.  
✔ **Authentication** – Sign in with **Email & Password** or **Google Account**.  
✔ **Responsive Design** – Optimized for all screen sizes (desktop, tablet, mobile).

---

## 🛠 Tech Stack

- **Frontend**: [React](https://reactjs.org/), [MUI](https://mui.com/), [Redux Toolkit](https://redux-toolkit.js.org/)
- **Backend**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas)
- **Authentication**: [Firebase Authentication](https://firebase.google.com/products/auth)
- **Bundler**: `Vite`
- **Charts**: `@mui/x-charts`
- **Deployment**: [Render](https://render.com/)

---

## 📸 Screenshots

#### Home Page

![Home Screenshot](public/screenshots/home.png)

#### Dashboard

![Dashboard Screenshot](public/screenshots/dashboard.png)

#### Entries Page

![Entries Screenshot](public/screenshots/entries.png)

---

## 🚀 Getting Started

### 1. Clone the Repository:

```bash
git clone https://github.com/Bankai-NWC/Diadiary.git
cd Diadiary
```

### 2. Install Dependencies:

**Frontend:**

```bash
npm install
```

**Backend:**

```bash
cd server
npm install
```


### 3. Set Up Environment Variables:

Create **.env** files for **client** and **server**.

**For server:**

```bash
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
SERVICE_ACCOUNT_KEY=your_service_account_key
```

⚠ **Note:** ``your_service_account_key`` must be specified **on one line** in JSON format.  
**Example:** ``SERVICE_ACCOUNT_KEY``={"type":"service_account","project_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\nMIIEv...IDAQAB\n-----END PRIVATE KEY-----\n", ... }

**For client:**

```bash
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase__storage_bucket
VITE_FIREBASE_MEESAGING_SENDER_ID=your_firebase_meesaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_API_URL=your_api_key
```

### 4. Start Development Servers:

**Frontend:**

```bash
npm run dev
```

**Backend:**

```bash
cd server
node server.js
```
