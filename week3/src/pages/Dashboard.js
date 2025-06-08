import React from 'react';

export const Dashboard = () => {
    const styles = {
        container: {
            minHeight: '100vh',
            padding: '2rem',
            background: 'linear-gradient(-45deg, #f3f4f6, #cbd5e1, #f8fafc, #e0f2fe)',
            backgroundSize: '400% 400%',
            animation: 'gradientBG 10s ease infinite',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        content: {
            background: '#ffffff',
            borderRadius: '12px',
            padding: '2rem 3rem',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            maxWidth: '800px',
            width: '100%',
            fontFamily: 'sans-serif',
        },
        heading: {
            textAlign: 'center',
            color: '#1e3a8a',
            marginBottom: '1rem',
        },
        note: {
            textAlign: 'center',
            marginBottom: '1.5rem',
            fontStyle: 'italic',
            color: '#555',
        },
        section: {
            marginTop: '2rem',
        },
        ul: {
            listStyle: 'none',
            paddingLeft: 0,
        },
        li: {
            marginBottom: '0.6rem',
            lineHeight: 1.6,
            background: '#f1f5f9',
            padding: '0.7rem 1rem',
            borderRadius: '8px',
            borderLeft: '4px solid #2563eb',
        },
        keyframes: `
            @keyframes gradientBG {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `
    };

    return (
        <>
            <style>{styles.keyframes}</style>
            <div style={styles.container}>
                <div style={styles.content}>
                    <h2 style={styles.heading}>Welcome to Admin Dashboard 🚀</h2>
                    <p style={styles.note}>
                        Use the sidebar to navigate through charts, tables, calendar.
                    </p>
                    <p style={{ textAlign: 'center', fontWeight: 'bold', color: '#2563eb' }}>
                        This dashboard helps to manage tasks, track data, and visualize progress.
                    </p>

                    <div style={styles.section}>
                        <h3>📌 How to Use:</h3>
                        <ul style={styles.ul}>
                            <li style={styles.li}><strong>📋 Kanban Board:</strong> Drag & drop tasks, assign status like todo / ongoing / completed.</li>
                            <li style={styles.li}><strong>📅 Calendar:</strong> Assign or change task due dates by dragging tasks onto specific days.</li>
                            <li style={styles.li}><strong>📊 Charts:</strong> View task distribution using bar/pie charts. Updates automatically!</li>
                            <li style={styles.li}><strong>📑 Tables:</strong> View all tasks grouped by their current status. Instant overview.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};
