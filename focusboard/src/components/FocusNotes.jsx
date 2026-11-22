import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Lightbulb } from 'lucide-react';

const notes = [
  { eyebrow: 'A LITTLE REMINDER', title: 'Make space for deep work.', body: 'Choose one meaningful task, silence distractions and give it your full attention.', tip: 'One thing at a time is still progress.' },
  { eyebrow: 'YOUR DAILY INTENTION', title: 'Progress over perfection.', body: 'You do not need to finish everything today. Start with the next small, useful step.', tip: 'A small win builds momentum.' },
  { eyebrow: 'FOCUS TIP', title: 'Plan it. Then do it.', body: 'Turn a big goal into a short list of clear actions. Your future self will thank you.', tip: 'Keep your priorities visible.' }
];

export default function FocusNotes() {
  const [active, setActive] = useState(0);
  const move = (direction) => setActive((current) => (current + direction + notes.length) % notes.length);
  const note = notes[active];
  return <section className="focus-card" aria-label="Focus notes carousel">
    <div className="focus-top"><div className="focus-label"><span className="focus-bulb"><Lightbulb size={17}/></span> FOCUS NOTES <span className="focus-count">{active + 1} OF 3</span></div><div className="carousel-arrows"><button onClick={() => move(-1)} aria-label="Previous note"><ArrowLeft size={17}/></button><button onClick={() => move(1)} aria-label="Next note"><ArrowRight size={17}/></button></div></div>
    <div className="focus-content" key={active}><span className="focus-eyebrow">{note.eyebrow}</span><h3>{note.title}</h3><p>{note.body}</p><strong>{note.tip}</strong></div>
    <div className="carousel-dots">{notes.map((item, index) => <button key={item.title} className={index === active ? 'dot active' : 'dot'} onClick={() => setActive(index)} aria-label={`Show focus note ${index + 1}`} aria-pressed={index === active}/>)}</div>
  </section>;
}
