# Full Stack Developer Assignment (React + Express)

## About Project

This project is a simple full stack application where I created a **dynamic form builder** and an **analytics dashboard**.

Admin can create forms, users can fill them, and based on responses we can see analytics like total responses, most selected options, and averages.

---

## Tech Used

* Frontend: React (TypeScript), Tailwind CSS
* Backend: Express.js (Node.js)
* Database: MongoDB
* Charts: Chart.js

---

## Features

### 1. Form Builder (Admin Side)

* Create forms with different fields:

  * text
  * number
  * select
* Add or remove fields
* Save form
* Each form has a unique link

---

### 2. Public Form

* User can open form using link
* Form fields are generated dynamically
* Basic validation added
* Submit data to backend

---

### 3. Responses

* Stored in MongoDB
* Stored as key-value pairs
* Each response has timestamp

---

### 4. Response Viewer

* Show responses in table
* Columns are dynamic based on form
* Handles empty data also

---

### 5. Analytics (Important Part)

Backend calculates:

* Total submissions
* Most selected option (for select fields)
* Average values (for number fields)

---

### 6. Dashboard (Frontend)

* Shows:

  * Total Forms
  * Total Responses
  * Most Popular Form
  * Average Responses
* Charts:

  * Pie chart
  * Bar chart
* Responsive UI

---

## Project Structure

### Backend

* routes → API routes
* controllers → logic
* models → MongoDB schema
* utils → helper functions

### Frontend

* components → reusable UI
* pages → main screens
* services → API calls

---

## How it Works (Flow)

1. Admin creates form
2. Form saved in database
3. User fills form
4. Response stored
5. Dashboard shows analytics

---

## Setup

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## API Example

* GET /api/forms
* POST /api/forms
* POST /api/responses
* GET /api/dashboard

---

## 🧠 What I Learned

* How to handle dynamic forms
* How to store flexible data in MongoDB
* Basic analytics calculation
* React charts integration
* Better UI using Tailwind

---

## Author

Siddharth Maurya

## Thank You So much
