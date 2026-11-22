import React from 'react';
import { CalendarDays, Pencil, Trash2, Check } from 'lucide-react';
function formatDate(date) { if (!date) return 'No due date'; return new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }); }
export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  return <article className={`task-row ${task.status === 'Completed' ? 'task-complete' : ''}`}>
    <button className={`task-check ${task.status === 'Completed' ? 'checked' : ''}`} onClick={() => onStatusChange(task.id, task.status === 'Completed' ? 'To do' : 'Completed')} aria-label={task.status === 'Completed' ? `Mark ${task.title} as to do` : `Mark ${task.title} completed`}>{task.status === 'Completed' && <Check size={13}/>}</button>
    <div className="task-main"><strong>{task.title}</strong><p>{task.description || 'No description added.'}</p><div className="task-meta"><span className="category-tag">{task.category}</span><span><CalendarDays size={13}/>{formatDate(task.dueDate)}</span></div></div>
    <div className="task-badges"><span className={`priority-badge priority-${task.priority.toLowerCase()}`}>{task.priority}</span><select className={`status-select status-${task.status.toLowerCase().replace(' ', '-')}`} aria-label={`Status for ${task.title}`} value={task.status} onChange={(e)=>onStatusChange(task.id,e.target.value)}>{['To do','In progress','Completed'].map(s=><option key={s}>{s}</option>)}</select></div>
    <div className="task-actions"><button className="icon-button" onClick={()=>onEdit(task)} aria-label={`Edit ${task.title}`}><Pencil size={16}/></button><button className="icon-button delete-button" onClick={()=>onDelete(task)} aria-label={`Delete ${task.title}`}><Trash2 size={16}/></button></div>
  </article>;
}
