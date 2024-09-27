// src/componentes/MenuLateral.jsx
import React from 'react';
import { FaHome } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const MenuItem = ({ to, icon, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center py-2.5 px-4 rounded transition duration-200 ${isActive
          ? 'bg-primary-700 text-white'
          : 'text-primary-100 hover:bg-primary-600 hover:text-white'
        }`
      }
    >
      {icon}
      <span className="ml-2">{children}</span>
    </NavLink>
  );
};

export default function MenuLateral() {
  return (
    <aside className="bg-primary-800 text-white w-64 min-h-screen p-4">
      <nav className="mt-8 space-y-2">
        <MenuItem to="/" icon={<FaHome />}>Início</MenuItem>
      </nav>
    </aside>
  );
}