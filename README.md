Livello - User Management Application
A full-stack MERN application that allows:

- User Registration and Login
- Image Upload (Profile Picture)
- Role-Based Access (Admin/User)
- Admin can View, Edit, Delete Users with Pagination
- Users can Edit their Own Profile
--------------------------------------------------------------------------------------------------

- Frontend: React + Redux + Material-UI
- Backend: Node.js + Express + MongoDB
- Image Uploads with Multer
- Authentication with JWT,Bcrypt
- Deployed on:
  - Frontend: https://livello.vercel.app
  - Backend: https://livello.onrender.com
--------------------------------------------------------------------------------------------------

-->Local Setup Instructions

-->Prerequisites:
- VS code
- Node.js & npm installed
- MongoDB connection string (Atlas or local)


-->Running the Application Locall

- Backend (Express + MongoDB)
  1. Clone the repository:
  2. install dependencies : npm install
  3. .env file included in mail
  4. start backend server : npm start

- Frontend (Next js+ react js)
  1.Clone the repository:
  2.install dependencies : npm install
  3.Start the development server: npm run dev
  4.open in browser : http://localhost:3000

 Postman API Testing
  Auth Routes:  
  • POST /api/auth/register → Register new user 
  • POST /api/auth/login → Login
  
  User Routes (Protected):
  •	GET /api/users — Get a list of users (paginated).
  •	GET /api/users/:id — Get a single user profile.
  •	 POST /api/users — Create a new user profile (only admin).
  •	PUT /api/users/:id — Update user profile (admin can update any profile, users can only
  update their own).
  •	DELETE /api/users/:id — Delete a user profile (admin only).  
  Cookies will store the auth token after login.

Login credentials:
admin : email : chandu@gmail.com 
        password : chandu123
user : email : jane@gmail.com 
        password : jane123

--API testing with postman images attached within the mail---

