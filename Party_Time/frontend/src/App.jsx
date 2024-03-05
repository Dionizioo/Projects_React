//Importar o Outlet do react-router-dom para poder renderizar as rotas filhas (5)
import { Outlet } from 'react-router-dom'

//Componentes (5)
import NavBar from './components/NavBar'

//Toast
import { ToastContainer } from 'react-toastify'
//css
import "./App.css";
import 'react-toastify/dist/ReactToastify.css'



function App() {

  return (
    <div className='App'>
      <ToastContainer />
      <NavBar />
      <Outlet />
    </div>
  )
}

export default App
