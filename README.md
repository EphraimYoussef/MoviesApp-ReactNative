# Movies App (React Native + Expo)

>**A full-featured mobile application built with Expo, React Native, and TypeScript that allows users to discover, search, and save movies through a clean and responsive interface. The application integrates secure authentication via Clerk (Email, Google, and Apple), real-time movie data from TMDB, and backend functionality powered by Appwrite. A custom user‑engagement‑based trending algorithm updates dynamically based on search activity and movie interactions to deliver a personalized and scalable browsing experience.**

---

## Features

### Movie Features
- Browse popular, top-rated, and upcoming movies
- Search for movies with real-time results
- View detailed movie pages including overview, rating, release date, cast, and images

### Authentication (via Clerk)
- Sign up or log in using email and password
- One-tap authentication with Google
- One-tap authentication with Apple
- Secure session handling through Clerk’s Expo SDK

### Custom Trending Algorithm
- Metrics-based ranking system for trending movies
- The trending score updates dynamically based on user activity, including:
  - Searches performed by users
  - Movies clicked or opened in the details page
- Weighted scoring logic to highlight highly engaged content

### Saved Movies
- Logged-in users can save movies to their personal collection
- Users can unsave movies at any time
- Saved movies are persisted via Appwrite and accessible in the Saved Movies tab
- Allows quick access to favorite movies without searching again

### User Profile Management
- Users can edit their profile information (first name, last name, etc.)
- Users can change their profile picture, with options to:
  - Select an image from the gallery
  - Take a new photo using the camera
  - Remove the current profile picture
- Users can delete their account, removing all personal data

### Modern UI / UX
- Reusable component architecture
- Tailwind styling (via NativeWind)
- Smooth animations and organized layouts
- Strong type safety using TypeScript


---

## Tech Stack

-   Framework: React Native
-   Runtime: Expo (SDK)
-   Language: TypeScript
-   Authentication: Clerk (Email, Google, Apple)
-   Backend Services: Appwrite
-   Data Source: TMDB API
-   Styling: Tailwind (NativeWind)
-   Navigation: Expo Router
-   Tooling: ESLint, Metro, TypeScript


---

## Architecture & Project Structure

    ├── app/                   # Expo Router screens and routing
    ├── assets/                # Images, fonts, icons
    ├── atoms/                 # Small, reusable UI elements
    ├── components/            # UI components and sections
    ├── config/                # App configuration files
    ├── constants/             # Shared constants
    ├── hooks/                 # Custom React hooks
    ├── interfaces/            # TypeScript interfaces
    ├── services/              # API logic and backend services
    ├── types/                 # Shared TypeScript types
    ├── .env.example           # Environment variable template
    └── ...


---

## Setup & Installation

### Prerequisites
- Node.js (LTS version recommended)
- Yarn or npm
- Expo CLI
- TMDB API key
- Clerk project (publishable key)
- Appwrite project configuration (project ID, database ID, collection IDs, endpoint, platform)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/EphraimYoussef/MoviesApp-ReactNative
   cd MoviesApp-ReactNative
   ```

2. **Install dependencies**
   ```bash
   # Using Yarn
   yarn install

   # Or using npm
   npm install
   ```

3. **Environment Configuration**
    - Create a `.env` file in the project root directory
    - Copy the variables from `.env.example` and fill in your values:
      ```env
      # TMDB 
      EXPO_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
      EXPO_PUBLIC_TMDB_APY_BASE_URL=your_tmdb_base_url
      EXPO_PUBLIC_TMDB_IMAGE_BASE_URL=your_tmdb_image_base_url

      # APPWRITE 
      EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_appwrite_project_id
      EXPO_PUBLIC_APPWRITE_DATABASE_ID=your_appwrite_database_id
      EXPO_PUBLIC_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
      EXPO_PUBLIC_APPWRITE_SAVED_COLLECTION_ID=your_appwrite_saved_collection_id
      EXPO_PUBLIC_APPWRITE_API_ENDPOINT=your_appwrite_endpoint
      EXPO_PUBLIC_APPWRITE_PLATFORM=your_appwrite_platform

      # CLERK
      EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
      ```

4. **Start the development server**
   ```bash
    npx expo start
   ```

5. **Run the app**
    - Use the Expo Go app to run on a physical device
    - Or run on an iOS Simulator / Android Emulator

6. **Verify the installation**
    - The Expo Metro server will provide a QR code for device testing
    - Open the app on your device or simulator to ensure everything works
    - Check the terminal for any errors during startup

---

## Usage

- Create an account or log in using email, Google, or Apple
- Browse latest movies and trending movies in the Home tab
- Explore dynamically generated trending movies based on user engagement
- Search for movies with real-time results
- View detailed movie information including overview, ratings, release date, etc.
- Save and unsave movies to your personal collection, accessible in the Saved Movies tab
- Edit your profile information and update your profile picture (choose from gallery, take a new photo, or remove the current picture)
- Delete your account to remove all personal data

