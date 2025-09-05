import { Routes, Route, Link } from 'react-router-dom';
import AddAc from './AddAc';
import ViewAllAcs from './ViewAllAcs';
import './style.css';

export default function NavBar() {
  return (
    <div>
      <nav className="navbar">
        <ul className="nav-links">
          <li><Link to="/addac">Add</Link></li>
          <li><Link to="/viewallacs">View All</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/addac" element={<AddAc />} />
        <Route path="/viewallacs" element={<ViewAllAcs />} />
      </Routes>
    </div>
  );
}
