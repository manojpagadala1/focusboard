import React from 'react';

export default function StatCard({ label, value, note, icon: Icon, tone, progress }) {
  return <article className="stat-card"><div className={`stat-icon ${tone}`}><Icon size={19}/></div><div className="stat-copy"><span>{label}</span><strong>{value}</strong><small>{note}</small>{progress !== undefined && <div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }}/></div>}</div></article>;
}
