// Dependencies
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4}>
            <p className="red-normal">Horario de operación</p>
            <p className="small-grey">
              kajdkadjadjiakjdahdjahdslfjkhsdfjkhsjkfha
              alkdjasñlkdjaksdjalskdja
              akdjaklsdjalksjdaklsjdkasljd:
            </p>
            <p className="normal-gray">Lunes a viernes 5:00 a 20:00 hrs</p>
          </Col>
          <Col md={3}>
            <p className="red-normal">¿Necesitas ayuda?</p>
            <p className="telefono">01 INTERWARE (01 55 5536 8000)</p>
            <p className="small-grey">
              Lunes a viernes de 8:00 a 20:00 horas
              <br />
              Sábados de 8:00 a 16:00 horas
            </p>
            <p className="red-normal">rcastaneda@interware.com.mx</p>
          </Col>
          <Col md={3}>
            <p className="red-normal">Interware de Mexico S.A.</p>
            <p className="small-grey">
              Insurgentes Sur 1602, Crédito Constructor, 03940 Ciudad de México, CDMX
            </p>
            <p className="small-grey">Derechos reservados 2019</p>
          </Col>
          <Col md={2}>
            <a href="http://www.interware.com.mx/" className="red-normal">
              Home Interware
            </a>
            {/* <p className="red-normal">Términos y condiciones</p> */}
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
