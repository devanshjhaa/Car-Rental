# Car Rental Platform

A full-stack web application for browsing, booking, and managing car rentals.  
Built with **Next.js, TypeScript, and TailwindCSS** on the frontend and **Express.js** with **PostgreSQL (Prisma ORM)** on the backend.  
Features include **JWT authentication**, basic **role-based access**, and car listings.  

🔗 Live Demo → [Car Rental Platform](https://car-rental-indol-sigma.vercel.app/)

---

## 🛠 Tech Stack
- **Frontend:** Next.js, TypeScript, TailwindCSS  
- **Backend:** Node.js, Express.js, REST APIs  
- **Authentication:** JWT  
- **Database:** PostgreSQL with Prisma ORM  
- **Deployment:** Vercel (frontend), Render (backend)  

---

## 📁 Project Structure
Car-Rental/
├─ client/ # Next.js app (frontend)
├─ server/ # Express API (backend)
├─ screenshots/ # README images
└─ README.md
Install
# frontend
cd client
npm install

# backend
cd ../server
npm install

Environment Variables

server/.env

DATABASE_URL=postgresql://user:pass@host:5432/dbname
JWT_SECRET=replace_me
PORT=8080

Run locally
# in /server
npm run dev

# in /client (new terminal)
npm run dev
# open http://localhost:3000

Features

User registration & login with JWT authentication

Role-based access (user / owner / admin)

Browse and search car listings

Owners can add and manage cars

Responsive UI with TailwindCSS


## 📸 Screenshots  

### Homepage  
![Homepage](./screenshots/dashboard.png)  

### User Sign-Up  
![Sign-Up](./screenshots/signup.png)  

### Car Listings  
![Car Listings](./screenshots/cars.png)  

### Admin Dashboard  
![Admin Dashboard](./screenshots/admin.png)  

