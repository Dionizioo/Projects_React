import { Link } from "react-router-dom"

//css
import './Navbar.css'

const Navbar = () => {
  return <nav className="navbar">
    <h2>
        <Link to="/">Memorias</Link>
    </h2>
    <ul>
        <li>
            <Link to="/">Pagina Principal</Link>
        </li>
        <li>
            <Link to="/add_memory">Crie sua Memoria</Link>
        </li>
    </ul>
  </nav>
    
}

export default Navbar