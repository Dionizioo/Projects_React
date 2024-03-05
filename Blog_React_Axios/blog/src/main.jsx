import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {RouterProvider, Router, createBrowserRouter} from 'react-router-dom'

// import paginas
import Home from './routers/Home.jsx'
import NewPost from './routers/NewPost.jsx'
import Post from './routers/Post.jsx'
import Gerenciar from './routers/Gerenciar.jsx'
import EditPost from './routers/EditPost.jsx'
import Login from './routers/Login.jsx'



// Obejto de configuração de rotemento
const router = createBrowserRouter([
  {
    element: <App />,
    children:[
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/new",
        element: <NewPost />,
      },
      // aqui vamos criar uma rota para cada post unico
      {
        path: "/post/:id",
        element: <Post />
      },
      {
        path: "/admin",
        element: <Gerenciar />,
      },
      {
        path: "/posts/edit/:id",
        element: <EditPost />
      },
      {
        path:"/Login",
        element: <Login />
      }
    ],
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* precisamos chamar o objeto aqui */}
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
