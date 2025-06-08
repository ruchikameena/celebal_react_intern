import React, { useState, useEffect } from "react";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    useDroppable,
} from "@dnd-kit/core";
import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const COLUMN_TYPES = ["todo", "ongoing", "completed"];

function DroppableColumn({ id, children }) {
    const { isOver, setNodeRef } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            id={id}
            style={{
                flex: 1,
                background: isOver ? "#d0e6ff" : "#f4f4f4",
                padding: 10,
                borderRadius: 10,
                minHeight: 300,
                display: "flex",
                flexDirection: "column",
                transition: "background-color 0.2s ease",
            }}
        >
            <h3 style={{ textAlign: "center", textTransform: "capitalize" }}>{id}</h3>
            {children}
        </div>
    );
}

function KanbanTask({ task }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        padding: "10px",
        background: "white",
        borderRadius: "5px",
        marginBottom: "8px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        cursor: "grab",
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <div>{task.name}</div>
            <small style={{ color: "#666" }}>Due: {task.date}</small>
        </div>
    );
}

export const KanbanBoard = () => {
    const [taskName, setTaskName] = useState("");
    const [tasks, setTasks] = useState([]);
    const [activeTask, setActiveTask] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem("kanban_data");
        setTasks(stored ? JSON.parse(stored) : []);
    }, []);

    const sensors = useSensors(useSensor(PointerSensor));

    const tasksByStatus = {
        todo: [],
        ongoing: [],
        completed: [],
    };

    tasks.forEach((task) => {
        if (COLUMN_TYPES.includes(task.status)) {
            tasksByStatus[task.status].push(task);
        }
    });

    const addTask = () => {
        if (!taskName.trim()) return;

        const today = new Date().toISOString().split("T")[0];
        const newTask = {
            id: `task-${Date.now()}`,
            name: taskName.trim(),
            status: "todo",
            date: today,
        };

        const updated = [...tasks, newTask];
        setTasks(updated);
        localStorage.setItem("kanban_data", JSON.stringify(updated));
        setTaskName("");
    };

    const handleDragStart = ({ active }) => {
        const task = tasks.find((t) => t.id === active.id);
        if (task) setActiveTask(task);
    };

    const handleDragEnd = ({ active, over }) => {
        if (!over) {
            setActiveTask(null);
            return;
        }

        if (!COLUMN_TYPES.includes(over.id)) {
            setActiveTask(null);
            return;
        }

        if (active.id !== over.id) {
            const updated = tasks.map((t) =>
                t.id === active.id ? { ...t, status: over.id } : t
            );
            setTasks(updated);
            localStorage.setItem("kanban_data", JSON.stringify(updated));
        }
        setActiveTask(null);
    };

    const resetBoard = () => {
        localStorage.removeItem("kanban_data");
        setTasks([]);
    };

    return (
        <div style={{ padding: 20, maxWidth: 1000, margin: "auto" }}>
            <h2>Kanban Board</h2>
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                <input
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder="Enter task"
                    style={{ flex: 1, padding: 10 }}
                />
                <button onClick={addTask} style={{ padding: 10 }}>
                    Add Task
                </button>
                <button
                    onClick={resetBoard}
                    style={{ padding: 10, backgroundColor: "#f44336", color: "white" }}
                >
                    Reset Board
                </button>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div style={{ display: "flex", gap: 20 }}>
                    {COLUMN_TYPES.map((column) => (
                        <DroppableColumn key={column} id={column}>
                            <SortableContext
                                items={tasksByStatus[column].map((t) => t.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                {tasksByStatus[column].map((task) => (
                                    <KanbanTask key={task.id} task={task} />
                                ))}
                            </SortableContext>
                        </DroppableColumn>
                    ))}
                </div>

                <DragOverlay>
                    {activeTask ? (
                        <div
                            style={{
                                padding: 10,
                                background: "white",
                                border: "1px solid #ccc",
                                borderRadius: 5,
                                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                            }}
                        >
                            {activeTask.name}
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
};
