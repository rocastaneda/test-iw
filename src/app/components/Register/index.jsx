// Dependencies
import React, { Fragment } from 'react'
import { Row, Col, Container, Card } from 'react-bootstrap'
import Footer from 'Components/Footer'

// Images
import logo from 'SharedImages/logo-IW.png'
// Components
import Step1 from 'Components/Register/Step1'
// Styles
import style from './Register.less'
// Flow Props and Stats
type Props = {
  form: Object,
  validate: string,
  validationObj: Object,
  handleChangeInput: void,
  handleValidateForm: void,
  disableStep1: boolean
}

function RegisterForm(props: Props) {
  return (
    <Fragment>
      <div className={`${style.gradiente} gradiente position-absolute`} />
      <Container className={`${style.registro} container-header`}>
        <Row className="main-header">
          <Col xs={6} className="text-left">
            <img src={logo} alt="" className="img-fluid ml-5" />
          </Col>
          <Col xs={6} className={`text-right align-middle ${style.textMain} `}>
            <p className={`${style.paddingTop10} ${style.verticalCenter}`}>
              ¿Necesitas ayuda?
              <br />
              <span className={style.colorPrimary}>
                01 INTERWARE (01 55 5536 8000)
              </span>
            </p>
          </Col>
        </Row>
      </Container>
      <Container className={style.registro}>
        <Row>
          <Col xs={6} className="text-left">
            <h2 className={`${style.h2} ml-4`}>Registro</h2>
          </Col>
        </Row>
        <Row>
          <Card className={style.card}>
            <Card.Body>
              <Row>
                <Col xs={12}>
                  <Step1 {...props} style={style} />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      </Container>
      <Footer />
    </Fragment>
  )
}

export default RegisterForm
