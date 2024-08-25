
# TapMe Game

TapMe is a fun and interactive web-based game where users can tap on an image to earn coins. Users can also upgrade their tapping power and energy limits using the coins they've earned. The game uses Supabase as its backend to manage user data and game progress.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)

## Demo

A live demo of the application can be found [here](https://t.me/TapMe_test_bot/TapMe_new).

## Features

- **Tap to Earn Coins:** Click on the image to earn coins.
- **Upgrade System:** Users can upgrade their clicking power (Multitap) and energy limits using the coins they've earned.
- **User Authentication:** Secure login and sign-up functionality.
- **Supabase Integration:** User data, including progress and upgrades, is stored and managed in Supabase.
- **Real-time Updates:** Coins, clicks, and upgrades update in real time.

## Technologies Used

- **Frontend:**
  - React
  - React Router DOM
  - React Spinners (for loading indicators)
  - CountUp.js (for animated counting of coins)
  - Bootstrap (for styling)

- **Backend:**
  - Supabase (for authentication, database, and backend functions)
  - GraphQL (for querying and mutating data)

## Installation

### Prerequisites

- Node.js and npm installed on your machine.
- PostgreSQL database (via Supabase) for storing user data.

### Clone the Repository

```bash
git clone https://github.com/Prince0000/Telegram_Tap_Me_MERN.git
cd tapme-game
```

### Install Frontend Dependencies

```bash
cd frontend
npm install
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Configure Environment Variables

Create a `.env` file in the `backend` directory with the following content:

```
SUPABASE_URL=https://your-supabase-url.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
```

Replace `your-supabase-url` and `your-supabase-anon-key` with your actual Supabase credentials.

### Running the Backend

Navigate to the `backend` directory and start the backend server:

```bash
npm start
```

The backend server will be available at `http://localhost:4000`.

### Running the Frontend

Navigate to the `frontend` directory and start the frontend server:

```bash
npm start
```

The frontend app will be available at `http://localhost:3000`.

## Usage

- **Home Page:** Displays the current coins and clicks. Click on the image to earn coins.
- **Boost Page:** Allows users to upgrade their clicking power (Multitap) and energy limits.
- **Status Page:** Shows the user's current level and statistics.

## File Structure

```plaintext
├── backend
│   ├── src
│   │   ├── resolvers.ts      # GraphQL resolvers
│   │   ├── schema.ts         # GraphQL schema
│   │   ├── supabaseClient.ts # Supabase client setup
│   │   └── index.ts          # Entry point of the GraphQL server
│   ├── .env                  # Environment variables for backend
│   ├── tsconfig.json         # TypeScript configuration
│   ├── package.json          # Backend dependencies and scripts
│   └── ...
├── frontend
│   ├── public
│   │   └── assets
│   │       └── coin.png         # Image used in the game
│   ├── src
│   │   ├── components
│   │   │   └── HomePage.js      # Main home page component
│   │   │   └── ClickPage.js     # Page for clicking to earn coins
│   │   │   └── Boost.js         # Page for upgrades
│   │   │   └── supabaseClient.js    # Supabase client setup 
│   │   └── index.js             # Entry point of the React app
│   ├── README.md                # This readme file
│   ├── package.json             # Frontend dependencies and scripts
│   └── ...
├── README.md                    # This readme file
└── ...
