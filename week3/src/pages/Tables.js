import { useState, useEffect, useRef } from "react";

const COLUMN_TYPES = ["todo", "ongoing", "completed"];

const getInitialTasks = () => {
    try {
        const stored = localStorage.getItem("kanban_data");
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        return [];
    }
};

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
        loadTasks(); // initial load

        const interval = setInterval(() => {
            loadTasks();
        }, 1000); // check every 1 second

        return () => clearInterval(interval); // cleanup
    }, []);

    const tasksByStatus = COLUMN_TYPES.reduce((acc, status) => {
        acc[status] = tasks.filter((task) => task.status === status);
        return acc;
    }, {});

    return (
        <div style={{ padding: 20 }}>
            <h2>Tasks in Tables by Status</h2>

            <div style={{ display: "flex", gap: 30 }}>
                {COLUMN_TYPES.map((status) => (
                    <div key={status} style={{ flex: 1 }}>
                        <h3>{status.toUpperCase()}</h3>
                        <table
                            border="1"
                            cellPadding="8"
                            cellSpacing="0"
                            style={{ width: "100%", borderCollapse: "collapse" }}
                        >
                            <thead>
                                <tr>
                                    <th>Task Name</th>
                                    <th>Date of Completion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasksByStatus[status].length === 0 ? (
                                    <tr>
                                        <td colSpan="2" style={{ textAlign: "center" }}>
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
