import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


import {createBrowserRouter,RouterProvider} from 'react-router-dom';

//pages
import Home from '../routes/Home.jsx'
import Countdown from '../routes/Countdown.jsx'
import EventList from '../components/EventList.jsx'

//Context
import {CountdownProvider} from './context/CountdownContext'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/countdown/",
        element: <Countdown />
      },
      {
        path:"/event-list",
        element: <EventList />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CountdownProvider>
    <RouterProvider router = {router} />
    </CountdownProvider>
  </React.StrictMode>,
)
