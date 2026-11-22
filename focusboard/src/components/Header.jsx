import React from 'react';
import { Menu, Bell, Plus } from 'lucide-react';
export default function Header({ onAdd, onMenu }) {
  return <header className="topbar"><button className="icon-button menu-button" onClick={onMenu} aria-label="Open navigation"><Menu size={21}/></button><div className="breadcrumb">Workspace <span>/</span> <strong>My Tasks</strong></div><div className="top-actions"><button className="icon-button notification" aria-label="Notifications"><Bell size={19}/><i/></button><button className="button button-primary top-add" onClick={onAdd}><Plus size={17}/> Add task</button></div></header>;
}
