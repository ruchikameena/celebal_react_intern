
// export const KanbanBoard = () => {
//     return (
//         <div>
//             <h1>this is kanban board</h1>
//             <ul>
//                 <li>yaha we make 3 div to-do;on-going;completed, to do list contain all task, even the new task are also added in this</li>
//                 <li>then giving option to drag and drop the task between different stages</li>
//                 <li>ekh bottom me section bana dege ki add task karke, with task name ka input and button to add the task, beside task in todo we give option to delete the task, baki stages me we wont provide delete task function, just drag drop okay...!</li>
//                 <li>also we need a data strucutre to save the updated data in the localstorage as when ever we load the data is fetched from data strucutre and then as per the status and the order of creation they get align to the proper column beautiful representation of how the data flows between the columns and how beautiful the data get fetch,updated,saved in localStorage </li>
//             </ul>
//         </div>
//     );
// };


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

const getInitialTasks = () => {
    try {
        const stored = localStorage.getItem("kanban_data");
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        return [];
    }
};

const saveTasks = (tasks) => {
    localStorage.setItem("kanban_data", JSON.stringify(tasks));
};

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
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {task.name}
        </div>
    );
}

function DroppableColumn({ id, children }) {
    const { setNodeRef } = useDroppable({ id });
    return (
        <div
            ref={setNodeRef}
            id={id}
            style={{
                flex: 1,
                background: "#f4f4f4",
                padding: 10,
                borderRadius: 10,
                minHeight: 300,
            }}
        >
            <h3 style={{ textAlign: "center" }}>{id.toUpperCase()}</h3>
            {children}
        </div>
    );
}

export const KanbanBoard = () => {
    const [taskName, setTaskName] = useState("");
    const [tasks, setTasks] = useState([]);
    const [activeTask, setActiveTask] = useState(null);

    useEffect(() => {
        setTasks(getInitialTasks());
    }, []);

    const sensors = useSensors(useSensor(PointerSensor));

    const tasksByStatus = COLUMN_TYPES.reduce((acc, type) => {
        acc[type] = tasks.filter((t) => t.status === type);
        return acc;
    }, {});

    const addTask = () => {
        if (!taskName.trim()) return;
        const newTask = {
            id: `task-${Date.now()}`,
            name: taskName.trim(),
            status: "todo",
        };
        const updated = [...tasks, newTask];
        setTasks(updated);
        saveTasks(updated);
        setTaskName("");
    };

    const handleDragStart = ({ active }) => {
        const task = tasks.find((t) => t.id === active.id);
        if (task) {
            setActiveTask(task);
        }
    };

    const handleDragEnd = ({ over }) => {
        if (!over || !activeTask) {
            setActiveTask(null);
            return;
        }

        const destinationId = over.id;

        if (!COLUMN_TYPES.includes(destinationId)) {
            setActiveTask(null);
            return;
        }

        const updated = tasks.map((t) =>
            t.id === activeTask.id ? { ...t, status: destinationId } : t
        );
        setTasks(updated);
        saveTasks(updated);
        setActiveTask(null);
    };

    const resetBoard = () => {
        localStorage.removeItem("kanban_data");
        setTasks([]);
    };

    return (
        <div style={{ padding: 20 }}>
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
