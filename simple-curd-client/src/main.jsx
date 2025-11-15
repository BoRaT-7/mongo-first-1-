import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// ✅ Browser Router সেটআপ
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,   // এখানে App component যুক্ত করো
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
