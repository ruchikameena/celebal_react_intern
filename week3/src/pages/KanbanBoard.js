import { useState, useEffect } from "react";
import './KanbanBoard.css';
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
            className={`kanban-column ${isOver ? 'kanban-column-over' : ''}`}
        >
            <h3 className="kanban-column-title">{id}</h3>
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
    };

    return (
        <div
            ref={setNodeRef}
            className="kanban-task"
            style={style}
            {...attributes}
            {...listeners}
        >
            <div>{task.name}</div>
            <small className="kanban-task-date">Due: {task.date}</small>
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
        <div className="kanban-container">
            <h2>Kanban Board</h2>
            <div className="kanban-controls">
                <input
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder="Enter task"
                    className="kanban-input"
                />
                <button onClick={addTask} className="kanban-add-button">
                    Add Task
                </button>
                <button
                    onClick={resetBoard}
                    className="kanban-reset-button"
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
                <div className="kanban-columns">
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
                        <div className="kanban-drag-overlay">
                            {activeTask.name}
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
};
