# Iceberg Estates Platform

A comprehensive estate agency management platform built with Node.js and Vue.js 3, designed to streamline agent scheduling and appointment management.

## 📋 Project Overview

Iceberg Estates Platform solves the operational challenges faced by UK estate agencies by providing:
- Efficient agent schedule management
- Automated travel time calculations
- Conflict prevention for appointments
- Real-time availability tracking

## 🛠 Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** authentication
- **External APIs** for postcode and mapping services

### Frontend
- **Vue.js 3** (Composition API)
- **Vuex** for state management
- **Bootstrap 5** for responsive UI
- **Axios** for API communication

## 🏗 Project Structure

```
estate_platform/
├── api/                    # Backend API
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # MongoDB models
│   │   ├── middleware/     # Auth & validation
│   │   ├── routes/         # API routes
│   │   └── utils/          # Helper functions
│   └──  .env               # Environment variables
│   
├── client/                # Frontend Vue.js app
│   ├── src/
│   │   ├── components/    # Vue components
│   │   ├── views/         # Page components
│   │   ├── store/         # Vuex store
│   │   └── services/      # API services
│   └── public/
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Environment Variables

Create a `.env` file in the `api` directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/estate_platform
JWT_SECRET=your_jwt_secret_here
Office_Postcode=CM2 7PJ
POSTCODE_API_KEY=your_postcode_api_key
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### Backend Setup

1. Navigate to the API directory:
```bash
cd api
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run serve
```

The application will be available at `http://localhost:8080`

## 📡 API Endpoints

### Authentication
- `POST /auth/register` - Register new agent
- `POST /auth/login` - Agent login

### Appointments
- `GET /appointments/:agent` - Get agent's appointments
- `POST /appointments` - Create new appointment
- `PUT /appointments/:id` - Update appointment
- `DELETE /appointments/:id` - Delete appointment

## 🔧 Key Features

### Automated Calculations
- **Distance Calculation**: Measures distance from office to property
- **Travel Time**: Calculates journey duration
- **Departure Time**: When agent must leave office
- **Return Time**: When agent returns to office
- **Availability**: When agent is free again

### Conflict Prevention
- Prevents overlapping appointments
- Considers travel time in scheduling
- Real-time conflict detection

### User Management
- Secure JWT authentication
- Agent registration and login
- Protected routes

## 🎯 Core Business Logic

### Appointment Workflow
1. Agent creates appointment with customer details and property postcode
2. System calculates distance and travel time using external APIs
3. System determines departure time and return time
4. Conflict check ensures no scheduling overlaps
5. Appointment is saved with all calculated fields

