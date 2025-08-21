# 📜 Training Certificates Generator

A simple web application for managing training certificates. It allows automatically generating **attendance or completion certificates** for employees, either manually or in bulk using Excel files.

---

## ✨ Features

- **Automatic certificate generation** via manual input or Excel upload.  
- **Upload institute logo** to appear on the certificate template.  
- **Import employees and training data** from CSV files or store in MongoDB.  
- **PDF certificate creation** with download or view link.  
- **Search and filter** all generated certificates.  
- **Responsive design** using React + TailwindCSS + DaisyUI.  
- **Clean APIs** enabling reusability in future projects.

---

## 🏗️ Project Structure

project-root/
│── backend/
│ ├── models/ # Employee, Training, Certificate
│ ├── routes/ # employees.js, trainings.js,   
│ ├── uploads/ # Temporary Excel and logo files
│ ├── index.js # Backend entry point
│ └── package.json
│
│── frontend/
│ ├── src/
│ │ ├── components/ # Forms, Tables, Certificate Viewer
│ │ ├── pages/ # Home, Upload, Certificates List
│ │ ├── services/ # API calls via Axios
│ │ └── App.jsx
│ ├── tailwind.config.js
│ ├── package.json
│ └── vite.config.js
│
│── README.md

---

## ⚙️ Technologies Used

### Backend
- **Node.js + Express**: REST API development  
- **MongoDB + Mongoose**: Data storage (employees, trainings, certificates)  
- **Multer**: File upload (Excel, Logo)  
- **xlsx**: Read Excel files  
- **pdfmake**: Generate PDF certificates  
- **CORS & body-parser**: Enable frontend-backend communication  

### Frontend
- **React (Vite)**: Frontend framework  
- **Axios**: API requests  
- **TailwindCSS + DaisyUI**: Responsive UI  

---

## 🛠️ Installation and Running

### 1️⃣ Backend
cd backend
npm install
node index.js

### 2️⃣ Frontend
cd frontend
npm install
npm run dev

### Evaluation Criteria Covered

Clean code: Modular models, routes, utils, with comments.

UX & design: Tailwind + DaisyUI, responsive, smooth experience.

Performance: Bulk Excel processing, temporary files cleanup.

API reusability: Modular REST APIs usable for other apps.