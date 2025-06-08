import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { KanbanBoard } from "./pages/KanbanBoard";
import { Dashboard } from "./pages/Dashboard";
import { Charts } from "./pages/Charts";
import { Tables } from "./pages/Tables";
import { Calendar } from "./pages/Calendar";
import './App.css';

const getInitialTasks = () => {
  try {
    const stored = localStorage.getItem("kanban_data");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState('light'); 

  useEffect(() => {
    const loadedTasks = getInitialTasks();

    loadedTasks.sort((a, b) => {
      const timeA = parseInt(a.id.split("-")[1], 10);
      const timeB = parseInt(b.id.split("-")[1], 10);
      return timeA - timeB;
    });

    setTasks(loadedTasks);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`app ${theme}`}>
      <header>
        <h1>Admin Dashboard</h1>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'light' ? 'Dark Mode' : ' Light Mode'}
        </button>
      </header>
      <div className="main">
        <aside>
          <nav>
            <ul>
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/kanban">Kanban board</Link></li>
              <li><Link to="/tables">Tables</Link></li>
              <li><Link to="/charts">Charts</Link></li>
              <li><Link to="/calendar">Calendar</Link></li>
            </ul>
          </nav>
        </aside>
        <section className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/kanban" element={<KanbanBoard tasks={tasks} setTasks={setTasks} />} />
            <Route path="/tables" element={<Tables tasks={tasks} />} />
            <Route path="/charts" element={<Charts tasks={tasks} />} />
            <Route path="/calendar" element={<Calendar tasks={tasks} setTasks={setTasks} />} />
          </Routes>
        </section>
      </div>
    </div>
  );
}

export default App;
