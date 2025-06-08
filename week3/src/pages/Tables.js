import { useState, useEffect, useRef } from "react";
import './Tables.css';

const COLUMN_TYPES = ["todo", "ongoing", "completed"];


export const Tables = () => {
    const [tasks, setTasks] = useState([]);
    const prevDataRef = useRef("");

    const loadTasks = () => {
        const stored = localStorage.getItem("kanban_data");
        if (stored !== prevDataRef.current) {
            const parsed = JSON.parse(stored || "[]");
            parsed.sort((a, b) => {
                const timeA = parseInt(a.id.split("-")[1], 10);
                const timeB = parseInt(b.id.split("-")[1], 10);
                return timeA - timeB;
            });
            setTasks(parsed);
            prevDataRef.current = stored;
        }
    };

    useEffect(() => {
        loadTasks(); 

        const interval = setInterval(() => {
            loadTasks();
        }, 1000); 

        return () => clearInterval(interval); 
    }, []);

    const tasksByStatus = COLUMN_TYPES.reduce((acc, status) => {
        acc[status] = tasks.filter((task) => task.status === status);
        return acc;
    }, {});

    return (
        <div className="tables-container">
            <h2>Tasks in Tables by Status</h2>
            <div className="tables-grid">
                {COLUMN_TYPES.map((status) => (
                    <div key={status} className="table-wrapper">
                        <h3>{status.toUpperCase()}</h3>
                        <table className="tasks-table">
                            <thead>
                                <tr>
                                    <th>Task Name</th>
                                    <th>Date of Completion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasksByStatus[status].length === 0 ? (
                                    <tr>
                                        <td colSpan="2" className="no-tasks">
                                            No tasks
                                        </td>
                                    </tr>
                                ) : (
                                    tasksByStatus[status].map((task) => (
                                        <tr key={task.id}>
                                            <td>{task.name}</td>
                                            <td>{task.date || "—"}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
};
