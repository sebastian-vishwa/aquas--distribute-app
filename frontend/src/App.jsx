import React from 'react';

function App() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Welcome Guys! 👋</h1>
        <p style={styles.subtext}>
          Our MERN Stack Project is up and running successfully.
        </p>
        <button 
          style={styles.button} 
          onClick={() => alert('Welcome to our Project!')}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

// Inline Styles (CSS වෙනම ලියන්නේ නැතුව ලේසියෙන්ම Style කරගන්න)
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '400px',
  },
  heading: {
    color: '#1a73e8',
    marginBottom: '10px',
    fontSize: '28px',
  },
  subtext: {
    color: '#5f6368',
    fontSize: '16px',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#1a73e8',
    color: '#ffffff',
    border: 'none',
    padding: '10px 20px',
    fontSize: '15px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};

export default App;