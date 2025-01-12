Here's an updated version of the `README.md` with the added functionality details for the Hospital Food Management System:

```md
# Hospital Food Management System

This is a Hospital Food Management System built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and styled with Tailwind CSS. The system allows the management of meal boxes for patients, along with functionalities such as patient management, food chart creation, pantry management, meal preparation tracking, and delivery personnel monitoring.

## Table of Contents
1. [Installation](#installation)
2. [Frontend Setup](#frontend-setup)
3. [Server Setup](#server-setup)
4. [Environment Variables](#environment-variables)
5. [Key Features](#key-features)
6. [Usage](#usage)
7. [License](#license)

## Installation

### Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Server Setup
1. Navigate to the `server` folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node index.js
   ```

## Environment Variables

### Frontend
- `VITE_SERVER_URL`: URL of the server.

### Server
- `MONGODB_URL`: MongoDB connection URL.
- `JWT_SECRET`: Secret key for JWT authentication.
- `NODE_ENV`: Environment mode (e.g., development or production).

## Key Features

### 1. Hospital Food Manager Functionality:
- **Role**: Hospital Food Management Admin.
- **Manage Patient Details**: 
   - Patient Name, Diseases, Allergies, Room Number, Bed Number, Floor Number, Age, Gender, Contact Information, Emergency Contact, and any additional details.
- **Create Food/Diet Charts for Patients**:
   - Meal plans for Morning, Evening, and Night meals.
   - Specify ingredients for each meal.
   - Include specific instructions (e.g., "no salt," "low sugar").
- **Manage Inner Pantry**:
   - Input pantry details (Staff Name, Contact Info, Location).
   - Assign food preparation and delivery tasks to specific pantry staff.
- **Track Meal Preparation and Delivery**:
   - Monitor the preparation status of each meal.
   - Track delivery statuses for Morning, Evening, and Night meals.

### 2. Inner Pantry Functionality:
- **Manage Food Preparation Tasks**:
   - View assigned meal preparation tasks from the hospital food manager.
   - Update the preparation status for individual meals.
- **Manage Delivery Personnel**:
   - Add delivery personnel details (Name, Contact Info, Other Details).
   - Assign specific meal boxes to delivery personnel.
- **Track Meal Deliveries**:
   - Include details of each meal box (Patient Information, Room Number, Diet Chart Details).
   - Allow delivery personnel to mark a meal box as "Delivered" via the pantry portal.
   - Ensure delivery status updates are visible to the Hospital Food Manager and Pantry Staff.

### 3. Delivery Personnel Functionality:
- **Mark Deliveries as Completed**:
   - Login to the pantry portal.
   - View assigned meal boxes with patient and delivery details.
   - Mark deliveries as "Done" upon successful delivery to patient rooms.
   - Include timestamps and optional delivery notes.

### 4. Dashboards:
- **Hospital Food Manager Dashboard**:
   - Track all food deliveries.
   - View patient details and diet charts.
   - Monitor pantry performance and meal delivery statuses.
   - Receive alerts for delayed deliveries or issues in preparation.
- **Inner Pantry Dashboard**:
   - Monitor all meal preparation and delivery tasks.
   - Manage delivery personnel and assigned meal boxes.
   - View delivery statuses and real-time updates.

## Usage

- **Frontend**: The frontend is built using React and styled with Tailwind CSS. It includes features for creating, managing and updating patients, staff, delivery personnel, meal orders and tracking delivery status for meal boxes .
- **Server**: The backend is built using Express.js and MongoDB. It handles API requests for CRUD operations for Patients, Pantry Staff, Delivery Personnels, Meal orders and Meal boxes. Authentication is handled via JWT.

## License
This project is open-source and available under the MIT License.