import { useState } from 'react'
import { Card, Container, Form, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

// Import components
import Name from './components/Name'
import Price from './components/Price'
import Description from './components/Description'
import Image from './components/Image'

// Import products data
import { products } from './product'

function App() {
  const [userName, setUserName] = useState('')

  return (
    <Container className="py-5">
      {/* User name input */}
      <Form.Group className="mb-4">
        <Form.Label>Enter your name:</Form.Label>
        <Form.Control
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Your name"
        />
      </Form.Group>

      {/* Conditional welcome message */}
      {userName && (
        <div className="welcome-message mb-4">
          <h2>Welcome, {userName}! 👋</h2>
          <p>Check out our amazing products below:</p>
        </div>
      )}

      {/* Products Grid */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <Card className="product-card h-100">
              <Image src={product.image} alt={product.name} />
              <Card.Body>
                <Name name={product.name} />
                <Price price={product.price} />
                <Description description={product.description} />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default App
