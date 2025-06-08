import React, { useState, useEffect } from "react";
import {
    DndContext,
    useSensor,
    useSensors,
    PointerSensor,
    closestCenter,
    DragOverlay,
    useDroppable,
} from "@dnd-kit/core";
import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Load and save tasks to localStorage
const getInitialTasks = () => {
    try {
        const stored = localStorage.getItem("kanban_data");
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};
const saveTasks = (tasks) => {
    localStorage.setItem("kanban_data", JSON.stringify(tasks));
};

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfWeek(year, month) {
    return new Date(year, month, 1).getDay();
}
function formatDate(year, month, day) {
    const m = month + 1;
    return `${year}-${m < 10 ? "0" + m : m}-${day < 10 ? "0" + day : day}`;
}
const sortTasksById = (tasks) =>
    tasks.slice().sort((a, b) => {
        const timeA = parseInt(a.id.split("-")[1], 10);
        const timeB = parseInt(b.id.split("-")[1], 10);
        return timeA - timeB;
    });

function DraggableTask({ task }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        padding: "5px 10px",
        marginBottom: 5,
        backgroundColor: "white",
        borderRadius: 4,
        boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
        cursor: "grab",
        userSelect: "none",
        fontSize: "0.85rem",
        maxWidth: "100%",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} title={task.name}>
            {task.name} <small style={{ fontSize: "0.7rem", color: "#666" }}>{task.date ? `(${task.date})` : "(No date)"}</small>
        </div>
    );
}

function DroppableDay({ dateStr, day, children, isOver }) {
    const { setNodeRef } = useDroppable({ id: "date-" + dateStr });
    const style = {
        minHeight: 80,
        border: "1px solid #ddd",
        borderRadius: 6,
        padding: 5,
        backgroundColor: isOver ? "#d0f0c0" : "#fff",
        display: "flex",
        flexDirection: "column",
    };
    return (
        <div ref={setNodeRef} id={"date-" + dateStr} style={style}>
            <div style={{ fontWeight: "bold", marginBottom: 5, fontSize: 12, textAlign: "right" }}>{day}</div>
            {children}
        </div>
    );
}

export const Calendar = () => {
    const [tasks, setTasks] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth());
    const [activeTask, setActiveTask] = useState(null);
    const [newTaskName, setNewTaskName] = useState("");
    const [overId, setOverId] = useState(null);

    useEffect(() => {
        const loadedTasks = getInitialTasks();
        setTasks(sortTasksById(loadedTasks));
    }, []);

    const sensors = useSensors(useSensor(PointerSensor));

    const tasksThisMonth = tasks.filter((task) => {
        if (!task.date) return false;
        const [y, m] = task.date.split("-").map(Number);
        return y === year && m === month + 1;
    });

    const taskPool = tasks.filter((t) => !t.date);

    const firstDay = getFirstDayOfWeek(year, month);
    const daysInMonth = getDaysInMonth(year, month);

    const calendarCells = [];
    for (let i = 0; i < firstDay; i++) calendarCells.push(null);
    for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d);

    const handleDragStart = ({ active }) => {
        const task = tasks.find((t) => t.id === active.id);
        if (task) setActiveTask(task);
    };

    const handleDragEnd = ({ active, over }) => {
        setActiveTask(null);
        setOverId(null);
        if (!over) return;

        setTasks((prevTasks) => {
            const updated = prevTasks.map((t) => {
                if (t.id === active.id) {
                    // If dropped back in the task pool
                    if (!over.id.startsWith("date-")) {
                        return { ...t, date: null };
                    }

                    // Dropped on a calendar date
                    const dateStr = over.id.slice(5);
                    return { ...t, date: dateStr };
                }
                return t;
            });
            saveTasks(updated);
            return updated;
        });
    };
    

    const handleDragOver = ({ over }) => {
        if (over) setOverId(over.id);
        else setOverId(null);
    };

    const prevMonth = () => {
        if (month === 0) {
            setYear((y) => y - 1);
            setMonth(11);
        } else setMonth((m) => m - 1);
    };
    const nextMonth = () => {
        if (month === 11) {
            setYear((y) => y + 1);
            setMonth(0);
        } else setMonth((m) => m + 1);
    };

    const addNewTask = () => {
        if (!newTaskName.trim()) return;
        const newTask = {
            id: "task-" + Date.now(),
            name: newTaskName.trim(),
            date: null,
            status: "todo",
        };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
        setNewTaskName("");
    };

    return (
        <div style={{ padding: 20, fontFamily: "Arial, sans-serif", maxWidth: 900, margin: "auto" }}>
            <h2>Calendar: {year} - {month + 1}</h2>
            <div style={{ marginBottom: 10 }}>
                <button onClick={prevMonth} style={{ marginRight: 10 }}>Prev Month</button>
                <button onClick={nextMonth}>Next Month</button>
            </div>
            <div style={{ marginBottom: 20 }}>
                <input type="text" placeholder="Enter new task name" value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)} style={{ padding: 5, width: 250 }} />
                <button onClick={addNewTask} style={{ marginLeft: 10, padding: "5px 10px" }}>Add Task</button>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
            >
                <div style={{ border: "1px solid #ccc", padding: 10, marginBottom: 20, backgroundColor: "#fafafa", borderRadius: 5 }}>
                    <h3>Task Pool (Unscheduled Tasks)</h3>
                    <SortableContext items={taskPool.map((t) => t.id)} strategy={verticalListSortingStrategy}>
                        {taskPool.length === 0 && <p style={{ fontStyle: "italic" }}>No unscheduled tasks</p>}
                        {taskPool.map((task) => (
                            <DraggableTask key={task.id} task={task} />
                        ))}
                    </SortableContext>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 5 }}>
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                        <div key={day} style={{ fontWeight: "bold", textAlign: "center", backgroundColor: "#eee", padding: "5px 0", borderRadius: 4 }}>{day}</div>
                    ))}
                    {calendarCells.map((day, index) => {
                        if (!day) return <div key={"empty-" + index} />;
                        const dateStr = formatDate(year, month, day);
                        const tasksForDay = tasks.filter((t) => t.date === dateStr);
                        const isOver = overId === "date-" + dateStr;
                        return (
                            <DroppableDay key={dateStr} day={day} dateStr={dateStr} isOver={isOver}>
                                <SortableContext items={tasksForDay.map((t) => t.id)} strategy={verticalListSortingStrategy}>
                                    {tasksForDay.map((task) => (
                                        <DraggableTask key={task.id} task={task} />
                                    ))}
                                </SortableContext>
                            </DroppableDay>
                        );
                    })}
                </div>

                <DragOverlay>
                    {activeTask ? (
                        <div style={{ padding: 10, background: "white", border: "1px solid #ccc", borderRadius: 5, cursor: "grabbing", userSelect: "none", maxWidth: 200, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{activeTask.name}</div>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
};
