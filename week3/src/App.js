// import { useState } from "react";
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { KanbanBoard } from "./pages/KanbanBoard";
import { Dashboard } from "./pages/Dashboard";
import { Charts } from "./pages/Charts";
import { Tables } from "./pages/Tables";
import { Calendar } from "./pages/Calendar";
import './App.css';

function App() {
  // const [theme,setTheme] = useState('light');
  // const changeTheme = () =>{
  //   setTheme(theme === 'light' ? 'dark' : 'light');
  // };

  return (
    // <div className={`app ${theme}`}></div>
    <div >
      <header>
        <h1>Admin Dadhboard</h1>
      </header>
      <div className="main">
        <aside>
          <nav>
            <ul>
              <li>theme</li>
              <hr />
              <li>dark</li>
              <li>light</li>
              <hr />
              <li><Link to="/">Dashboard</Link></li>
              <hr />
              <li><Link to="/kanban">Kanban board</Link></li>
              <hr />
              <li><Link to="/tables">Tables</Link></li>
              <hr />
              <li><Link to="/charts">Charts</Link></li>
              <hr />
              <li>bar</li>
              <li>pie</li>
              <li>other charts, 2 more just to fill the pace</li>
              <hr />
              <li><Link to="/calendar">Calendar</Link></li>
            </ul>
          </nav>
        </aside>
        <section className="content">
          {/* <Router> */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/kanban" element={<KanbanBoard />} />
              <Route path="/charts" element={<Charts />} />
              <Route path="/tables" element={<Tables />} />
              <Route path="/calendar" element={<Calendar />} />
            </Routes>
          {/* </Router> */}
        </section>
      </div>
    </div>
  );
}

export default App;