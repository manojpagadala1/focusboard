import React from 'react';
import { LayoutDashboard, CheckSquare, CalendarDays, Settings, X } from 'lucide-react';

export default function Sidebar({ open, onClose }) {
  return <>
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
      <div className="brand"><span className="brand-mark">F</span><span>Focus<span className="brand-light">Board</span></span><button className="icon-button mobile-close" onClick={onClose} aria-label="Close navigation"><X size={19}/></button></div>
      <p className="nav-label">WORKSPACE</p>
      <nav className="side-nav" aria-label="Main navigation">
        <a className="nav-item active" href="#dashboard" onClick={onClose}><LayoutDashboard size={18}/>Dashboard</a>
        <a className="nav-item" href="#tasks" onClick={onClose}><CheckSquare size={18}/>My Tasks</a>
        <a className="nav-item" href="#tasks" onClick={onClose}><CalendarDays size={18}/>Calendar</a>
      </nav>
      <div className="sidebar-bottom"><a className="nav-item" href="#settings"><Settings size={18}/>Settings</a><div className="upgrade-card"><div className="upgrade-icon">✦</div><strong>Stay focused</strong><p>Small steps every day lead to big results.</p></div><div className="profile"><div className="avatar">M</div><div><strong>Manoj</strong><span>Personal workspace</span></div></div></div>
    </aside>
    {open && <button className="sidebar-backdrop" aria-label="Close navigation" onClick={onClose}/>}
  </>;
}
