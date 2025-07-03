import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// index.tsx or main.tsx

// Immediately set the class BEFORE anything renders
const storedTheme = localStorage.getItem('theme');
if (storedTheme === 'dark' || storedTheme === 'light') {
  document.documentElement.classList.add(storedTheme);
} else {
  // Optional: detect system theme
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.classList.add(prefersDark ? 'dark' : 'light');
}

createRoot(document.getElementById("root")!).render(<App />);
