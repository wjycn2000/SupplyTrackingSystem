import { Routes, Route, NavLink } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Items from './pages/Items'
import Suppliers from './pages/Suppliers'

export default function App() {
  return (
    <>
      <nav>
        <NavLink to="/" className="brand">Supply Tracker</NavLink>
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink>
        <NavLink to="/items" className={({ isActive }) => isActive ? 'active' : ''}>Items</NavLink>
        <NavLink to="/suppliers" className={({ isActive }) => isActive ? 'active' : ''}>Suppliers</NavLink>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/items" element={<Items />} />
          <Route path="/suppliers" element={<Suppliers />} />
        </Routes>
      </main>
    </>
  )
}
