import { Link } from "react-router-dom"

//css
import './Navbar.css'

const Navbar = () => {
  return <nav className="navbar">
    <h2>
        <Link to="/">Memories</Link>
    </h2>
    <ul>
        <li>
            <Link to="/">Home</Link>
        </li>
        <li>
            <Link to="/add_memory">Add Memory</Link>
        </li>
    </ul>
  </nav>
    
}

export default Navbar