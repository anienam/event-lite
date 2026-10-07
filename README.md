# EventFlow Lite

A React event discovery app that integrates the Ticketmaster Discovery API and displays live event data in the existing interface.

## Features

- Fetches live events from the Ticketmaster Discovery API
- Displays event images, dates, locations, descriptions, and event links
- Search by event name or location
- Loading state while data is being fetched
- API error state with retry action
- Empty state when no events match the search
- Responsive event grid for desktop and mobile

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create your environment file

Copy `.env.example` to `.env.local` and add your Ticketmaster API key:

```env
REACT_APP_TICKETMASTER_API_KEY=your_ticketmaster_api_key_here
```

Create a developer account and API key through the official Ticketmaster Developer Portal:
https://developer.ticketmaster.com/

### 3. Start the app

```bash
npm start
```

The application will run locally at `http://localhost:3000`.

## API Integration

The application uses the Ticketmaster Discovery API event search endpoint:

`https://app.ticketmaster.com/discovery/v2/events.json`

The API key is read from `REACT_APP_TICKETMASTER_API_KEY` and is never committed to the repository.

## Notes

Create React App exposes `REACT_APP_*` variables to browser code. For production applications where the provider's credentials must remain private, the API request should be moved behind a server-side proxy or backend endpoint.
