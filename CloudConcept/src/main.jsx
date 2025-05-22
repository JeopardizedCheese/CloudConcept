import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TestDebateUI from './pages/TestDebateUI'


const router = createBrowserRouter([
  { path: '/', element: <App/>},
  { path: '/test', element: <TestDebateUI/>}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
