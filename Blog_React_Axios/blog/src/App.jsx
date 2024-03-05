// aqui vamos importar as rotas
import { Outlet, useNavigate  } from 'react-router-dom'

// Importando os componentes
import NavBar from './components/NavBar'

import React, { useState } from 'react';


import './App.css'

function App() {

  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  const logout = ( ) =>{
    //limpa os dados de autenticação
    setAuthenticated(false);
    //redireciona para a pagina de login
    navigate('/login');
  }


  return (
    <div className='App'>
      <NavBar />
      <div className="container">
        <Outlet />
      </div>
    </div>
    
  )
}

export default App
