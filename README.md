# Seasonal Produce

A seasonal produce guide website built with React, featuring a smooth, seamless user experience with no page refreshes.

## Features

- **No Page Refreshes**: All navigation is handled client-side using React Router
- **Smooth Transitions**: No white flash when navigating between pages
- **Seasonal Themes**: Dynamic color themes based on the selected time period
- **Filtering**: Filter produce by type (fruits, vegetables, nuts, year-round)
- **Mobile Responsive**: Fully responsive design with mobile navigation
- **Modern React**: Built with React 18, React Router 6, and Vite

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:3000`

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
produce/
├── src/
│   ├── components/       # Reusable React components
│   │   ├── Navigation.jsx
│   │   ├── Footer.jsx
│   │   ├── PeriodDropdown.jsx
│   │   ├── FilterButtons.jsx
│   │   ├── ProduceCard.jsx
│   │   └── EmptyState.jsx
│   ├── pages/            # Page components
│   │   ├── Home.jsx
│   │   ├── AllItems.jsx
│   │   ├── ProduceDetails.jsx
│   │   ├── About.jsx
│   │   └── Mission.jsx
│   ├── hooks/            # Custom React hooks
│   │   └── useSeasonTheme.js
│   ├── produce-data.js   # Produce data
│   ├── App.jsx           # Main app component with routing
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── images/               # Image assets
├── styles.css            # Main stylesheet
├── index-react.html      # HTML entry point for React app
├── package.json          # Dependencies and scripts
└── vite.config.js        # Vite configuration
```

## Key Features

1. **Single Page Application**: All pages are React components rendered client-side
2. **React Router**: Navigation uses `<Link>` and `<Route>` components instead of HTML links
3. **State Management**: Uses React hooks (`useState`, `useEffect`) instead of direct DOM manipulation
4. **Component-Based**: Code is organized into reusable components
5. **No Page Reloads**: Navigation happens instantly without full page refreshes
6. **Session Storage**: Filter and period selections persist across navigation

## Development

The development server supports hot module replacement (HMR), so changes to React components will update instantly in the browser without a full page reload.

## Browser Support

Works in all modern browsers that support ES6+ and React 18.
