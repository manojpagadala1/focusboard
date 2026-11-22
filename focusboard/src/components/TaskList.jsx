import React from 'react';
import { ClipboardList } from 'lucide-react';
import TaskCard from './TaskCard';
export default function TaskList({ tasks, onEdit, onDelete, onStatusChange }) {
  if (!tasks.length) return <div className="empty-state"><div><ClipboardList size={25}/></div><strong>No tasks found</strong><p>Try changing your search or filters, or create a new task.</p></div>;
  return <div className="task-list">{tasks.map(task=><TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onStatusChange={onStatusChange}/>)}</div>;
}
