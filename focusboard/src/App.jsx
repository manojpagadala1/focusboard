import React, { useMemo, useState } from 'react';
import { ListTodo, Clock3, CircleCheck, Search, SlidersHorizontal, Plus, X } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import FocusNotes from './components/FocusNotes';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { sampleTasks } from './data/sampleTasks';
import { useLocalStorage } from './hooks/useLocalStorage';

export default function App() {
  const [tasks, setTasks] = useLocalStorage('focusboard_tasks', sampleTasks);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All priorities');
  const [editingTask, setEditingTask] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const total = tasks.length;
  const inProgress = tasks.filter(t => t.status === 'In progress').length;
  const completed = tasks.filter(t => t.status === 'Completed').length;
  const completion = total ? Math.round(completed / total * 100) : 0;

  const visibleTasks = useMemo(() => tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(search.trim().toLowerCase());
    const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'All priorities' || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  }), [tasks, search, statusFilter, priorityFilter]);

  const openCreate = () => { setEditingTask(null); setFormOpen(true); };
  const openEdit = (task) => { setEditingTask(task); setFormOpen(true); };
  const saveTask = (values) => {
    if (editingTask) setTasks(current => current.map(task => task.id === editingTask.id ? { ...values, id: editingTask.id } : task));
    else setTasks(current => [{ ...values, id: Date.now() }, ...current]);
    setFormOpen(false); setEditingTask(null);
  };
  const deleteTask = (task) => {
    if (window.confirm(`Delete “${task.title}”? This action cannot be undone.`)) setTasks(current => current.filter(item => item.id !== task.id));
  };
  const updateStatus = (id, status) => setTasks(current => current.map(task => task.id === id ? { ...task, status } : task));
  const clearFilters = () => { setSearch(''); setStatusFilter('All'); setPriorityFilter('All priorities'); };

  return (
    <div className="app-shell">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="main-panel">
        <Header onAdd={openCreate} onMenu={() => setMenuOpen(true)} />
        <main className="dashboard" id="dashboard">
    <section className="welcome-row"><div><span className="eyebrow">SATURDAY, NOVEMBER 21, 2026</span><h1>My tasks <span className="wave">✦</span></h1><p>Stay organised, stay focused. You're doing great.</p></div><button className="button button-primary welcome-add" onClick={openCreate}><Plus size={17}/> Create new task</button></section>
    <section className="stats-grid" aria-label="Task overview"><StatCard label="Total tasks" value={total} note="Across your workspace" icon={ListTodo} tone="purple"/><StatCard label="In progress" value={inProgress} note="Keep the momentum" icon={Clock3} tone="orange"/><StatCard label="Completed" value={completed} note="Nicely done!" icon={CircleCheck} tone="green"/><StatCard label="Completion rate" value={`${completion}%`} note={`${completed} of ${total} tasks completed`} icon={CircleCheck} tone="blue" progress={completion}/></section>
    <section className="middle-grid"><FocusNotes/><aside className="tip-card"><div className="tip-art"><span>✳</span><span>✦</span><span>✧</span></div><span className="eyebrow">YOUR WORKSPACE</span><h3>One task at a time.</h3><p>Keep your priorities simple and make today count.</p><div className="tip-footer"><span className="tip-dot"/> Your focus space is ready</div></aside></section>
    <section className="tasks-section" id="tasks"><div className="tasks-heading"><div><span className="eyebrow">YOUR WORKSPACE</span><h2>All tasks <span className="task-count">{total}</span></h2></div><button className="button button-outline compact-add" onClick={openCreate}><Plus size={16}/> Add task</button></div>
      <div className="toolbar"><div className="search-box"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search tasks by title..." aria-label="Search tasks by title"/>{search && <button onClick={()=>setSearch('')} aria-label="Clear search"><X size={15}/></button>}</div><div className="filter-select"><SlidersHorizontal size={16}/><select value={priorityFilter} onChange={e=>setPriorityFilter(e.target.value)} aria-label="Filter by priority"><option>All priorities</option><option>High</option><option>Medium</option><option>Low</option></select></div></div>
      <div className="task-tabs" role="tablist" aria-label="Filter tasks by status">{['All','To do','In progress','Completed'].map(tab=><button key={tab} role="tab" aria-selected={statusFilter===tab} className={statusFilter===tab?'selected':''} onClick={()=>setStatusFilter(tab)}>{tab}<span>{tab==='All'?total:tasks.filter(t=>t.status===tab).length}</span></button>)}</div>
      <div className="list-header"><span>TASK</span><span>PRIORITY & STATUS</span><span>ACTIONS</span></div><TaskList tasks={visibleTasks} onEdit={openEdit} onDelete={deleteTask} onStatusChange={updateStatus}/>
      <div className="list-footer"><span>Showing <strong>{visibleTasks.length}</strong> of <strong>{total}</strong> tasks</span><button onClick={clearFilters} className="clear-filters">Clear search & filters</button></div>
    </section>
    <footer className="footer">Made for meaningful progress <span>✦</span></footer>
        </main>
      </div>
      {formOpen && (
        <TaskForm
          task={editingTask}
          onSave={saveTask}
          onClose={() => {
            setFormOpen(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}
