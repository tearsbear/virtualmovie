# Virtual Movie Search

A modern React application that allows users to search for movies using the MovieDB API. Built with React, TypeScript, and Tailwind CSS.

## Features

- 🎬 Search for movies using The Movie DB API
- 🌟 View popular movies on the homepage
- 🎯 Debounced search for better performance
- 📱 Fully responsive design
- ⚡ Fast and efficient with React Query caching
- 🎨 Modern UI with Tailwind CSS

## Technologies Used

- React with TypeScript
- Tailwind CSS for styling
- React Query for data fetching
- Axios for API requests
- Hero Icons for beautiful icons
- Vite for fast development and building

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/tearsbear/virtualmovie.git
cd virtualmovie
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Testing

To run the tests:

```bash
npm test
```

## Project Structure

```
src/
  ├── components/     # React components
  ├── services/      # API services
  ├── App.tsx        # Main application component
  ├── main.tsx      # Application entry point
  └── index.css     # Global styles
```

## API Integration

The application uses The Movie DB API for fetching movie data. The API key is configured in the `movieApi.ts` service file.
