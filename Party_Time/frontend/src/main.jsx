import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

//consifuração dos routers (1)
import {createBrowserRouter,RouterProvider} from 'react-router-dom'

//importamos as pages (2.1)
import Home from './routers/Home'

import CreateParty from './routers/CreateParty'

import Party from './routers/Party'

import EditParty from './routers/EditParty'

//criamos os objeto depois de importar (2)
const router = createBrowserRouter([
  {
    path: '/',
    element: <App	/>,
    children:[
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/party/new",
        element: <CreateParty />
      },
      {
        path: "/party/:id",
        element: <Party />
      },
      {
        path: "/party/edit/:id",
        element: <EditParty />
      }
    ]
  }

])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* passamos o router para o RouterProvider (3) */}
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>,
)
