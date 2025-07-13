import React from 'react';
import { Container, Navbar, Nav, Form, Button, Card, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Sample card data
const cardsData = [
  {
    title: "Card 1",
    description: "This is the first card description",
    imageUrl: "https://via.placeholder.com/150"
  },
  {
    title: "Card 2",
    description: "This is the second card description",
    imageUrl: "https://via.placeholder.com/150"
  },
  {
    title: "Card 3",
    description: "This is the third card description",
    imageUrl: "https://via.placeholder.com/150"
  }
];

// Home Page Component
const HomePage = () => (
  <>
    <h1 className="text-center mb-4">Welcome to Our React App</h1>
    <Row xs={1} md={3} className="g-4">
      {cardsData.map((card, idx) => (
        <Col key={idx}>
          <Card>
            <Card.Img variant="top" src={card.imageUrl} />
            <Card.Body>
              <Card.Title>{card.title}</Card.Title>
              <Card.Text>{card.description}</Card.Text>
              <Button variant="primary">Learn More</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </>
);

// About Page Component
const AboutPage = () => (
  <>
    <h1 className="text-center mb-4">About Us</h1>
    <Row className="justify-content-center">
      <Col md={8}>
        <p className="lead text-center">
          We are a passionate team dedicated to creating amazing web experiences.
          Our mission is to deliver high-quality solutions using modern technologies.
        </p>
      </Col>
    </Row>
  </>
);

// Contact Page Component
const ContactPage = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form submitted');
  };

  return (
    <div className="contact-page w-100">
      <h1 className="text-center mb-4">Contact Me</h1>
      
      {/* Social Links */}
      <Row>
        <Col xs={12}>
          <div className="social-links">
            <Card>
              <Card.Body>
                <h5 className="text-center mb-4">Connect With Me</h5>
                <Row>
                  <Col xs={12} md={4} className="text-center mb-3 mb-md-0">
                    <a href="https://github.com/clint911" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="social-link">
                      <i className="bi bi-github"></i> GitHub
                    </a>
                  </Col>
                  <Col xs={12} md={4} className="text-center mb-3 mb-md-0">
                    <a href="https://linkedin.com/in/clinton_eth" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="social-link">
                      <i className="bi bi-linkedin"></i> LinkedIn
                    </a>
                  </Col>
                  <Col xs={12} md={4} className="text-center">
                    <a href="mailto:clingyking007@gmail.com" 
                       className="social-link">
                      <i className="bi bi-envelope"></i> Email
                    </a>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>

      {/* Contact Form */}
      <Row className="mt-5">
        <Col xs={12}>
          <Form onSubmit={handleSubmit}>
            <Card>
              <Card.Body>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter your name" />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter your email" />
                      <Form.Text className="text-muted">
                        Your email will be kept private.
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <Form.Group className="mb-3" controlId="formBasicMessage">
                      <Form.Label>Message</Form.Label>
                      <Form.Control as="textarea" rows={5} placeholder="Enter your message" />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <Button variant="primary" type="submit" className="w-100">
                      Send Message
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

// Navigation component with active link handling
const Navigation = () => {
  const location = useLocation();
  
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">React App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" active={location.pathname === "/"}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" active={location.pathname === "/about"}>
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" active={location.pathname === "/contact"}>
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

function App() {
  return (
    <Router>
      <Navigation />
      <div className="App">
        <Container className="py-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
