import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Player from './Player.jsx';
import players from './players';

// Componente PlayersList que muestra la lista de jugadores
const PlayersList = () => {
  return (
    <Container>
      <h1 className="text-center my-4">Football Players</h1>
      <Row className="justify-content-center">
        {players.map((player, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
            {/* Utilizando el operador de propagación para pasar las props */}
            <Player {...player} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PlayersList;
