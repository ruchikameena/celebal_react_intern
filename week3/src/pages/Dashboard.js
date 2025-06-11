import './Dashboard.css';

export const Dashboard = () => {
    return (
        <div className="dashboard_container">
            <div className="dashboard_content">
                <h1 className="dashboard_heading">Welcome to Admin Dashboard </h1>
                <p className="dashboard_subtext">
                    This dashboard helps to manage tasks, track data, and visualize progress.
                </p>
                <h3>How to Use:-</h3>
                <div className="dashboard_section">
                    <div className="dashboard_sub_section_left">
                        <ul className="list">
                            <li>
                                <h3>Kanban Board:</h3>
                                <ol>
                                    <li>Admin can create new task with due date as date of creation of task</li>
                                    <li>Using the drag and drop feature to move tasks as per the current stage of the task</li>
                                    <li>Admin can delete the tasks if required</li>
                                    <li>Using reset button Admin can reset the entire portal</li>
                                </ol>
                            </li>
                            <li>
                                <h3>Charts:</h3>
                                <ol>
                                    <li>Here we can see the visual representation of the workflow</li>
                                    <li>Admin have option of various charts</li>
                                    <li>These charts represents number of task at different stage</li>
                                    <li>Help admin to visualize and manage the tasks as per the current work-load</li>
                                </ol>
                            </li>
                        </ul>
                    </div>
                    <div className="dashboard_sub_section_right">
                        <ul className="list">
                            <li>
                                <h3>Calendar:</h3>
                                <ol>
                                    <li>Admin can create new task whose due date is set null and can only change from here by drag and drop to the required date</li>
                                    <li>New task are added in the task pool</li>
                                    <li>Admin can use drag and drop feature change the due date of the selected tasks</li>
                                    <li>If want to move the task to next month, just click on that task it will move to task pool then choose the respective month and simply drag and drop as per your choice</li>
                                </ol>
                            </li>
                            <li>
                                <h3>Tables:</h3>
                                <ol>
                                    <li>Tasks are divided into tables as per the current stage of task</li>
                                    <li>These tables shows the task and its due date</li>
                                    <li>If the task in task pool its due date is null until we assign date using calendar</li>
                                </ol>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
