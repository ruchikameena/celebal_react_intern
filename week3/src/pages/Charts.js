import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const COLUMN_TYPES = ["todo", "ongoing", "completed"];
const COLORS = {
    todo: '#f87171',
    ongoing: '#facc15',
    completed: '#4ade80',
};

const getInitialTasks = () => {
    try {
        const stored = localStorage.getItem("kanban_data");
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        return [];
    }
};

export const Charts = () => {
    const [chartType, setChartType] = useState('bar');
    const [tasks, setTasks] = useState([]);
    const prevDataRef = useRef("");

    const loadTasks = () => {
        const stored = localStorage.getItem("kanban_data");
        if (stored !== prevDataRef.current) {
            const parsed = JSON.parse(stored || "[]");
            setTasks(parsed);
            prevDataRef.current = stored;
        }
    };

    useEffect(() => {
        loadTasks(); // initial load

        const interval = setInterval(() => {
            loadTasks();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const statusCounts = useMemo(() => {
        const counts = { todo: 0, ongoing: 0, completed: 0 };
        tasks.forEach(task => {
            const status = task.status || 'todo';
            counts[status] = (counts[status] || 0) + 1;
        });
        return counts;
    }, [tasks]);

    const statusData = {
        labels: COLUMN_TYPES,
        datasets: [
            {
                label: 'Tasks by Status',
                data: COLUMN_TYPES.map(type => statusCounts[type]),
                backgroundColor: COLUMN_TYPES.map(type => COLORS[type]),
                borderRadius: 6
            },
        ],
    };

    const renderChart = () => {
        switch (chartType) {
            case 'bar':
                return <Bar data={statusData} />;
            case 'pie':
                return <Pie data={statusData} />;
            default:
                return null;
        }
    };

    return (
        <div style={{
            maxWidth: '700px',
            margin: '2rem auto',
            padding: '1rem',
            background: '#fff',
            borderRadius: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
            <h3 style={{ textAlign: 'center' }}>📊 Task Statistics</h3>

            <div onChange={(e) => setChartType(e.target.value)} style={{ marginBottom: '1rem', textAlign: 'center' }}>
                <label><input type="radio" name="chart" value="bar" defaultChecked /> Bar</label>{" "}
                <label><input type="radio" name="chart" value="pie" /> Pie</label>
            </div>

            {renderChart()}
        </div>
    );
};
