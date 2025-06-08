import './Dashboard.css';

export const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <div className="dashboard-content">
                <h2 className="dashboard-heading">Welcome to Admin Dashboard </h2>
                <p className="dashboard-note">
                    Use the sidebar to navigate through charts, tables, calendar.
                </p>
                <p className="dashboard-subtext">
                    This dashboard helps to manage tasks, track data, and visualize progress.
                </p>

                <div className="dashboard-section">
                    <h3>How to Use:</h3>
                    <ul className="list">
                        <li className="dashboard-list-items">
                            <strong>Kanban Board:</strong> Drag & drop tasks, assign status like todo / ongoing / completed.
                        </li>
                        <li className="dashboard-list-items">
                            <strong>Calendar:</strong> Assign or change task due dates by dragging tasks onto specific days.
                        </li>
                        <li className="dashboard-list-items">
                            <strong>Charts:</strong> View task distribution using bar/pie charts.
                        </li>
                        <li className="dashboard-list-items">
                            <strong>Tables:</strong> View all tasks grouped by their current status. Instant overview.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
