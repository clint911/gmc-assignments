import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Person object with sample data
      person: {
        fullName: "Alex Morgan",
        bio: "Frontend developer with a passion for creating intuitive user experiences. Currently specializing in React and modern CSS.",
        imgSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80",
        profession: "Senior UI Developer"
      },
      shows: false, // Controls profile visibility
      timeSinceMount: 0 // Tracks time since component mounted
    };
  }

  // Toggle visibility of the profile
  toggleProfile = () => {
    this.setState(prevState => ({
      shows: !prevState.shows
    }));
  };

  // Set up interval when component mounts
  componentDidMount() {
    this.mountTime = new Date(); // Record mount time
    
    // Update time every second
    this.intervalId = setInterval(() => {
      const now = new Date();
      const seconds = Math.floor((now - this.mountTime) / 1000);
      this.setState({ timeSinceMount: seconds });
    }, 1000);
  }

  // Clear interval when component unmounts
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const { person, shows, timeSinceMount } = this.state;
    
    return (
      <div style={styles.container}>
        <h1 style={styles.header}>Developer Profile</h1>
        
        <button 
          onClick={this.toggleProfile} 
          style={styles.toggleButton}
        >
          {shows ? "Hide Profile" : "Show Profile"}
        </button>
        
        {/* Timer display */}
        <div style={styles.timer}>
          Component mounted <span style={styles.timeValue}>{timeSinceMount}</span> seconds ago
        </div>
        
        {/* Profile card - conditionally rendered */}
        {shows && (
          <div style={styles.profileCard}>
            <div style={styles.imageContainer}>
              <img 
                src={person.imgSrc} 
                alt={person.fullName} 
                style={styles.profileImage}
              />
            </div>
            <div style={styles.profileContent}>
              <h2 style={styles.name}>{person.fullName}</h2>
              <p style={styles.profession}>{person.profession}</p>
              <p style={styles.bio}>{person.bio}</p>
              <div style={styles.skillTags}>
                <span style={styles.tag}>React</span>
                <span style={styles.tag}>JavaScript</span>
                <span style={styles.tag}>CSS</span>
                <span style={styles.tag}>UI/UX</span>
              </div>
            </div>
          </div>
        )}
        
        <div style={styles.footer}>
          <p>Class Component with Lifecycle Methods</p>
        </div>
      </div>
    );
  }
}

// Neobrutalist styling - bold outlines, solid colors, shadow effects
const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: '800px',
    margin: '40px auto',
    padding: '30px',
    backgroundColor: '#f0f0f0',
    border: '4px solid #000',
    borderRadius: '0',
    boxShadow: '8px 8px 0px #000',
    position: 'relative'
  },
  header: {
    fontSize: '2.5rem',
    marginBottom: '30px',
    color: '#ff6b6b',
    textAlign: 'center',
    textShadow: '2px 2px 0 #000'
  },
  toggleButton: {
    backgroundColor: '#4ecdc4',
    color: '#000',
    border: '3px solid #000',
    padding: '12px 24px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '4px 4px 0px #000',
    marginBottom: '30px',
    transition: 'all 0.2s',
    width: '100%',
    ':hover': {
      backgroundColor: '#ff6b6b',
      transform: 'translate(2px, 2px)',
      boxShadow: '2px 2px 0px #000'
    }
  },
  timer: {
    backgroundColor: '#ffe66d',
    border: '3px solid #000',
    padding: '15px',
    marginBottom: '30px',
    textAlign: 'center',
    fontSize: '1.2rem',
    fontWeight: '500'
  },
  timeValue: {
    fontWeight: 'bold',
    color: '#ff6b6b',
    fontSize: '1.4rem'
  },
  profileCard: {
    display: 'flex',
    flexDirection: 'column',
    border: '4px solid #000',
    backgroundColor: '#fff',
    marginBottom: '30px',
    boxShadow: '6px 6px 0px #000'
  },
  imageContainer: {
    backgroundColor: '#1a535c',
    padding: '20px',
    borderBottom: '4px solid #000'
  },
  profileImage: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    border: '4px solid #000',
    display: 'block',
    margin: '0 auto'
  },
  profileContent: {
    padding: '30px'
  },
  name: {
    fontSize: '2rem',
    marginBottom: '10px',
    color: '#ff6b6b'
  },
  profession: {
    fontSize: '1.3rem',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#1a535c'
  },
  bio: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    marginBottom: '25px'
  },
  skillTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px'
  },
  tag: {
    backgroundColor: '#4ecdc4',
    color: '#000',
    padding: '8px 15px',
    borderRadius: '20px',
    border: '2px solid #000',
    fontWeight: '600'
  },
  footer: {
    textAlign: 'center',
    padding: '15px',
    backgroundColor: '#1a535c',
    color: '#fff',
    border: '3px solid #000',
    fontWeight: '500'
  }
};

export default App;