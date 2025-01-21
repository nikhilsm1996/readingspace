import { Link } from 'react-router-dom'; // Import Link component

const NotFound = () => {
  return (
    <div style={styles.container}>
      <img
        src="https://s.tmimgcdn.com/scr/800x500/122600/error-page-not-found-illustration_122693-original.jpg"
        alt="404 Illustration"
        style={styles.image}
      />
      <h1 style={styles.heading}>   Oops! We can't find this page. It may have been moved.      </h1>
      <p style={styles.description}>Don't worry! You can explore our homepage to find what you're looking for.
      .</p>
      <Link to="/" style={styles.link}>Go back to Homepage</Link> {/* Link to Homepage */}
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
    margin: 0,
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
  },
  image: {
    width: '60%',
    maxWidth: '600px',
    objectFit: 'cover',
    marginBottom: '20px',
  },
  heading: {
    fontSize: '2rem',
    color: '#333',
    margin: '10px 0',
  },
  description: {
    fontSize: '1.2rem',
    color: '#666',
  },
  link: {
    fontSize: '1.2rem',
    color: '#ff5722',
    textDecoration: 'none',
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#fff',
    borderRadius: '5px',
    border: '1px solid #ff5722',
    cursor: 'pointer',
  },
};

export default NotFound;
