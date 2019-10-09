// Dependencies
import React from 'react'
import { Col } from 'react-bootstrap'
// Components
// Flow Props and Stats
type Props = {
  style: Object
}

function Step1(props: Props) {
  const {} = props
  return (
    <fieldset>
      <Col>
        <h3>Paso 1: Ingresa tus datos</h3>
      </Col>
    </fieldset>
  )
}

export default Step1
