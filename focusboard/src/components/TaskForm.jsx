import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const emptyTask = { title: '', description: '', category: 'Development', status: 'To do', priority: 'Medium', dueDate: '' };
export default function TaskForm({ task, onSave, onClose }) {
  const [form, setForm] = useState(task ? { ...task } : emptyTask);
  const [error, setError] = useState('');
  useEffect(() => { setForm(task ? { ...task } : emptyTask); setError(''); }, [task]);
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const submit = (event) => {
    event.preventDefault();
    if (!form.title.trim()) { setError('Please enter a task title.'); return; }
    if (!form.dueDate) { setError('Please choose a due date.'); return; }
    onSave({ ...form, title: form.title.trim(), description: form.description.trim() });
  };
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="task-modal" role="dialog" aria-modal="true" aria-labelledby="form-title"><div className="modal-heading"><div><span className="eyebrow">TASK DETAILS</span><h2 id="form-title">{task ? 'Edit task' : 'Create a task'}</h2><p>Keep your next step clear and actionable.</p></div><button className="icon-button" onClick={onClose} aria-label="Close form"><X size={20}/></button></div>
      <form onSubmit={submit} noValidate><label>Task title <span>*</span><input autoFocus name="title" value={form.title} onChange={update} placeholder="e.g. Finish the dashboard design" maxLength={100}/></label>
        <label>Description <textarea name="description" value={form.description} onChange={update} placeholder="Add a few details about this task..." rows="3"/></label>
        <div className="form-grid"><label>Category<select name="category" value={form.category} onChange={update}>{['Development','Design','Learning','Testing','Documentation','Deployment','Research','Personal'].map((v)=><option key={v}>{v}</option>)}</select></label><label>Status<select name="status" value={form.status} onChange={update}>{['To do','In progress','Completed'].map((v)=><option key={v}>{v}</option>)}</select></label><label>Priority<select name="priority" value={form.priority} onChange={update}>{['Low','Medium','High'].map((v)=><option key={v}>{v}</option>)}</select></label><label>Due date <span>*</span><input type="date" name="dueDate" value={form.dueDate} onChange={update}/></label></div>
        {error && <p className="form-error" role="alert">{error}</p>}<div className="modal-actions"><button type="button" className="button button-quiet" onClick={onClose}>Cancel</button><button type="submit" className="button button-primary">{task ? 'Save changes' : 'Create task'}</button></div>
      </form>
    </section>
  </div>;
}
