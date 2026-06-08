import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Header from './Header.jsx'
import Home from './pages/Home.jsx'
import Product from './Product.jsx'
import Card from './Components/Card.jsx'
import Carddetail from './Carddetail.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Orders from './Order.jsx'
import Admin from './Admin.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

let allroutes = createBrowserRouter([
{
  path : '/',
  element: <Home/>
},



{
    path : '/carddetail/:id',
    element : <Carddetail/>
  },
  {
    path : '/Product',
    element : 
    (<ProtectedRoute><Product/></ProtectedRoute>)
  },
  {
    path: '/orders',
    element : (<ProtectedRoute><Orders /></ProtectedRoute>)
  }
  ,
  {
    path: '/admin',
    element : (<ProtectedRoute><Admin /></ProtectedRoute>)
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <RouterProvider router={allroutes} />

  </StrictMode>,
)
