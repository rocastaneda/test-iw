// @flow
import React, {
  Component,
  Fragment,
  SyntheticInputEvent,
  SyntheticEvent
} from 'react'
import createUser from 'Api/Register'
import RegisterForm from 'Components/Register'
import ModalBodyVerifyData from 'Components/Register/ModalBodyVerifyData'
import ModalProvider from 'Components/commons/ModalMessage/ModalProvider'
import Spinner from 'Components/commons/Spinner'
import {
  isValidEmail,
  isEmpty,
  customMessage,
  successMessage,
  errorMessage
} from 'SharedUtils/Utils'

// Flow Props and State
type Props = {
  /** */
}
type State = {
  content: Array<mixed>,
  showModal: boolean,
  sizeModal: String,
  form: Object,
  validationObj: Object,
  validate: boolean,
  isLoading: boolean,
  disableStep1: boolean,
  inputRef: any
}

class Register extends Component<Props, State> {
  state = {
    content: [],
    form: {},
    validationObj: {
      validateVerifyData: true
    },
    validate: false,
    showModal: false,
    isLoading: false,
    sizeModal: '',
    disableStep1: false
  }

  onChangeInput = ({ target }: SyntheticInputEvent) => {
    const { form, validationObj } = this.state
    const { name } = target
    let { value } = target

    // eslint-disable-next-line default-case
    switch (name) {
      case 'email':
        if (!isValidEmail(value)) {
          validationObj.validateEmail = true
          validationObj.textInvalidEmail = 'El email no tiene un formato válido'
        } else {
          validationObj.validateEmail = false
          validationObj.textInvalidEmail = ''
        }
        break
      case 'confEmail':
        if (!isValidEmail(value)) {
          validationObj.validateConfEmail = true
          validationObj.textInvalidEmailConf =
            'El email de confirmación no tiene un formato válido'
        } else if (value !== form.email) {
          validationObj.validateConfEmail = true
          validationObj.textInvalidEmailConf =
            'El email de confirmación no es igual a el campo Correo Electronico'
        } else {
          validationObj.validateConfEmail = false
          validationObj.textInvalidEmailConf = ''
        }
        break
      case 'celular':
        if (value.length !== 10) {
          validationObj.validateCelular = true
          validationObj.textInvalidCelular = 'Celular debe ser a 10 dígitos'
        } else {
          validationObj.validateCelular = false
          validationObj.textInvalidCelular = ''
        }
        break
      case 'confCel':
        if (value.length !== 10) {
          validationObj.validateConfCel = true
          validationObj.textInvalidConfCel = 'Celular debe ser a 10 dígitos'
        } else if (value.toString() !== form.celular.toString()) {
          validationObj.validateConfCel = true
          validationObj.textInvalidConfCel =
            'Celular no coincide con el campo Número Celular'
        } else {
          validationObj.validateConfCel = false
          validationObj.textInvalidConfCel = ''
        }
        break
      case 'pwd':
        if (value.length <= 7) {
          validationObj.validatePwd = true
          validationObj.textInvalidPwd =
            'La contraseña debe ser mayor o igual a 8 caracteres'
        } else {
          validationObj.validatePwd = false
          validationObj.textInvalidPwd = ''
        }
        break
      case 'confPwd':
        if (value !== form.pwd) {
          validationObj.validateConfPwd = true
          validationObj.textInvalidConfPwd = 'Las contraseñas no coinciden'
        } else {
          validationObj.validateConfPwd = false
          validationObj.textInvalidConfPwd = ''
        }
        break
      case 'aviso':
        value = target.checked
        break
      case 'verifyData':
        value = target.checked
        break
    }

    this.setState({
      form: {
        ...form,
        [name]: value
      },
      validationObj
    })
  }

  onValidateForm = () => {
    let { validate } = this.state
    const { form, validationObj } = this.state

    const Modalbody = (
      <ModalBodyVerifyData form={form} handleChangeInput={this.onChangeInput} />
    )

    const Modalfooter = [
      {
        label: 'Modificar',
        variant: 'info',
        onClick: this.handleHide
      },
      {
        label: 'Aceptar',
        variant: 'primary',
        onClick: this.goToStep2
      }
    ]

    validate = false
    const validateForm =
      isEmpty(form) ||
      (form.nombre === '' || !form.nombre) ||
      (form.apPat === '' || !form.apPat) ||
      (form.apPat === '' || !form.apPat) ||
      (form.fecNac === '' || !form.fecNac) ||
      (form.tarjeta === '' || !form.tarjeta) ||
      (form.email === '' || !form.email) ||
      (form.confEmail === '' || !form.confEmail) ||
      (form.celular === '' || !form.celular) ||
      (form.confCel === '' || !form.confCel) ||
      (form.aviso === 'false' || !form.aviso)

    if (validateForm) {
      validate = true

      if (form.confEmail !== form.Email) {
        validate = true
        validationObj.validateConfEmail = true
        validationObj.textInvalidEmailConf =
          'El email de confirmación no es igual a el campo Correo Electronico'
      }
      if (form.confCel !== form.celular) {
        validate = true
        validationObj.validateConfCel = true
        validationObj.textInvalidConfCel =
          'Celular no coincide con el campo Número Celular'
      }
      if (!form.email) {
        validationObj.validateEmail = true
        validationObj.textInvalidEmail = ''
      }
      if (!form.confEmail) {
        validationObj.validateConfEmail = true
        validationObj.textInvalidEmailConf = ''
      }
      if (!form.celular) {
        validationObj.validateCelular = true
        validationObj.textInvalidCelular = ''
      }
      if (!form.confCel) {
        validationObj.validateConfCel = true
        validationObj.textInvalidConfCel = ''
      }

      this.setState({ validate, validationObj })
    } else {
      this.setState({
        validationObj,
        showModal: true,
        sizeModal: 'lg',
        /* isLoading: false, */
        content: customMessage('', Modalbody, '', false, Modalfooter)
      })
    }
  }

  handleHide = (event: SyntheticEvent<HTMLButtonElement>) => {
    if ((event.currentTarget: HTMLButtonElement)) {
      this.setState({ showModal: false })
    }
  }

  goToStep2 = (event: SyntheticEvent<HTMLButtonElement>) => {
    const { form } = this.state
    this.setState({
      showModal: false
    })

    if ((event.currentTarget: HTMLButtonElement)) {
      if (form.verifyData) {
        this.setState({ isLoading: true })

        createUser(form)
          .then(response => {
            this.setState({
              showModal: true,
              sizeModal: '',
              isLoading: false,
              content: successMessage(),
              form: {
                ...form
              },
              disableStep1: true
            })
          })
          .catch(response => {

            const { descripcionError } = response.response.data

            this.setState({
              showModal: true,
              sizeModal: '',
              isLoading: false,
              content: errorMessage('', descripcionError)
            })
          })
      } else {
        this.setState({
          showModal: true,
          sizeModal: '',
          isLoading: false,
          content: errorMessage('', 'Favor de validar los datos')
        })
      }
    }
  }

  handleBlur = ({ target }: SyntheticInputEvent) => {
    const { form } = this.state
    const { name, value } = target
    const fillTarjeta = '0'.repeat(16 - value.length) + value
    this.setState({
      form: {
        ...form,
        [name]: fillTarjeta
      }
    })
  }

  render() {
    const {
      form,
      validate,
      validationObj,
      showModal,
      content,
      isLoading,
      sizeModal,
      disableStep1
    } = this.state
    return (
      <Fragment>
        <Spinner loading={isLoading} />
        <ModalProvider
          content={content}
          showModal={showModal}
          onClose={this.handleHide}
          size={sizeModal}
        />
        <RegisterForm
          form={form}
          validate={validate}
          validationObj={validationObj}
          handleChangeInput={this.onChangeInput}
          handleValidateForm={this.onValidateForm}
          handleBlur={this.handleBlur}
          disableStep1={disableStep1}
        />
      </Fragment>
    )
  }
}

export default Register
