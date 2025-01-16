import React from 'react';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <img
        src="https://cdn.dribbble.com/users/722246/screenshots/3490541/media/5e8f290d0c9b3f0a2f7f57de6dbd078b.png"
        alt="404 Illustration"
        style={styles.image}
      />
      <h1 style={styles.heading}>404</h1>
      <p style={styles.description}>
        Oops! We can't find this page. It may have been moved.
      </p>
      <a href="/" style={styles.link}>
        Back to previous
      </a>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: "'Arial', sans-serif",
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: '250px',
    marginBottom: '20px',
  },
  heading: {
    fontSize: '4rem',
    color: '#333',
  },
  description: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '20px',
  },
  link: {
    color: '#ff5722',
    textDecoration: 'none',
    fontSize: '1rem',
  },
};

export default NotFound;
