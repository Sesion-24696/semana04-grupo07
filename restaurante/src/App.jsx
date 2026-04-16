import React, { useState } from 'react';
import { 
  Container, Navbar, Nav, Card, Row, Col, 
  Button, Badge, Modal, Form 
} from 'react-bootstrap';
import './App.css'; // Para estilos personalizados como sombras y efectos

const MENU_DATA = [
  {
    id: 1,
    nombre: "Cebiche de Pescado",
    categoria: "Entradas",
    precio: 38.00,
    imagen: "https://peru.info/archivos/publicacion/24-imagen-1316321112018.jpg",
    descripcion: "Pescado fresco del día marinado en limón de Chulucanas, acompañado de camote y choclo."
  },
  {
    id: 2,
    nombre: "Lomo Saltado",
    categoria: "Platos de Fondo",
    precio: 45.00,
    imagen: "https://i.ytimg.com/vi/ErRIA_Owc58/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCZHq6bDGR9KRIWFxTMjA5QU2p9Jw",
    descripcion: "Finas tiras de lomo fino salteadas al wok con cebolla, tomate y un toque de pisco."
  },
  {
    id: 3,
    nombre: "Ají de Gallina",
    categoria: "Platos de Fondo",
    precio: 35.00,
    imagen: "https://img-global.cpcdn.com/recipes/d2a30b55a2ee44d6/1200x630cq80/photo.jpg",
    descripcion: "Clásica crema de ají amarillo con pechuga deshilachada, nueces y aceituna."
  },
  {
    id: 4,
    nombre: "Suspiro a la Limeña",
    categoria: "Postres",
    precio: 18.00,
    imagen: "https://www.paulinacocina.net/wp-content/uploads/2024/05/postre-suspiro-limeno-Paulina-Cocina-Recetas-Cocina-1722430354.jpg",
    descripcion: "Dulce de leche tradicional coronado con merengue al oporto."
  }
];

function App() {
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');
  const [platoSeleccionado, setPlatoSeleccionado] = useState(null);

  const categorias = ['Todos', ...new Set(MENU_DATA.map(p => p.categoria))];

  const platosFiltrados = categoriaActiva === 'Todos' 
    ? MENU_DATA 
    : MENU_DATA.filter(p => p.categoria === categoriaActiva);

  return (
    <div className="bg-light min-vh-100">
      {/* Navbar Superior */}
      <Navbar bg="white" expand="lg" className="shadow-sm sticky-top">
        <Container>
          <Navbar.Brand href="#home" className="fw-bold text-danger fs-3">
            La Sazón de Nicolasa
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto fw-semibold">
              <Nav.Link href="#menu">Menú</Nav.Link>
              <Nav.Link href="#reservas">Reservas</Nav.Link>
              <Nav.Link href="#nosotros">Nosotros</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <header className="py-5 bg-dark text-white text-center mb-5" style={{ backgroundImage: 'linear-gradient(rgba(255, 0, 0, 0.6), rgb(255, 255, 255)), url(https://via.placeholder.com/1200x400)', backgroundSize: 'cover' }}>
        <Container className="py-5">
          <h1 className="display-4 fw-bold">Tradición en cada bocado</h1>
          <p className="lead">Descubre el sabor auténtico de la cocina peruana.</p>
        </Container>
      </header>

      {/* Sección de Menú */}
      <Container id="menu" className="pb-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Nuestra Carta</h2>
          <hr className="mx-auto bg-danger border-danger border-3 opacity-100" style={{ width: '60px' }} />
        </div>

        {/* Filtros de Categoría */}
        <div className="d-flex justify-content-center gap-2 mb-5 flex-wrap">
          {categorias.map(cat => (
            <Button 
              key={cat}
              variant={categoriaActiva === cat ? "danger" : "outline-danger"}
              onClick={() => setCategoriaActiva(cat)}
              className="rounded-pill px-4"
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Grid de Platos */}
        <Row>
          {platosFiltrados.map(plato => (
            <Col key={plato.id} md={6} lg={4} className="mb-4">
              <Card className="h-100 border-0 shadow-sm card-hover" onClick={() => setPlatoSeleccionado(plato)}>
                <div className="overflow-hidden">
                  <Card.Img variant="top" src={plato.imagen} className="transition-transform" />
                </div>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title className="h5 fw-bold mb-0">{plato.nombre}</Card.Title>
                    <Badge bg="success" className="p-2">S/ {plato.precio.toFixed(2)}</Badge>
                  </div>
                  <Card.Text className="text-muted small">
                    {plato.descripcion.substring(0, 80)}...
                  </Card.Text>
                  <Button variant="link" className="text-danger p-0 fw-bold text-decoration-none">Ver detalle</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Modal de Detalle */}
      <Modal show={!!platoSeleccionado} onHide={() => setPlatoSeleccionado(null)} centered>
        {platoSeleccionado && (
          <>
            <Modal.Header closeButton>
              <Modal.Title className="fw-bold">{platoSeleccionado.nombre}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img src={platoSeleccionado.imagen} alt={platoSeleccionado.nombre} className="img-fluid rounded mb-3" />
              <p className="lead">{platoSeleccionado.descripcion}</p>
              <h4 className="text-danger fw-bold">Precio: S/ {platoSeleccionado.precio.toFixed(2)}</h4>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setPlatoSeleccionado(null)}>Cerrar</Button>
              <Button variant="danger">Añadir al pedido</Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

      {/* Footer simple */}
      <footer className="bg-white border-top py-4 text-center mt-5">
        <p className="text-muted mb-0">© 2026 La Sazón de Nicolasa - Lima, Perú</p>
      </footer>
    </div>
  );
}

export default App;