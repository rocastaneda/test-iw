//! Reparar errores de eslint
/* eslint-disable */
import {
  each,
  filter,
  findWhere,
  indexOf,
  isArray,
  isEqual,
  map,
  omit,
  sortBy,
  groupBy,
  union,
  where,
  without,
  uniq,
  isMatch,
  clone
} from 'underscore'
import numeral from 'numeral'

import React from 'react'

import {
  Row,
  Col
} from 'react-bootstrap'

import succesImage from 'SharedImages/ico-exito.svg'
import errorImage from 'SharedImages/ico-error.svg'
import questionImage from 'SharedImages/ico-pregunta.svg'
import warningImage from 'SharedImages/ico-warning.svg'

import moment from 'moment'
import 'moment/locale/es'
moment.locale('es')

const styles = {
  msg: {
    icon: {
      margin: '0 0 4vh 0'
    }
  }
}

const uuidv4 = require('uuid/v4')

export const cloneObject = object => {
  return clone(object)
}

export const getCurrency = number => {
  if (isNaN(number)) {
    parseFloat(number)
  }
  return numeral(number).format('$ 0,0.00')
}

export const infoMessage = message => {
  const modalObj = {
    body: ( <
      div >
      <
      i style = {
        styles.msg.icon
      }
      className = "fa fa-envelope fa-3x" / >
      <
      p > {
        message
      } < /p> < /
      div >
    )
  }
  return modalObj
}

export const uniqArray = (list, item) => uniq(list, item)

export const groupedBy = (list, item) =>
  map(groupBy(list, item), clist => clist.map(i => omit(i, item)))

export const isValidEmail = mail =>
  /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(mail)

export const isValidRFC = rfc =>
  /^([A-ZÑ]{3}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])([A-Z\d][A-Z\d][A-Z\d]))$/.test(
    rfc
  )

export const getItems = (list, item) => where(list, item)

export const removeItem = (list, item) => {
  const elements = where(list, item)

  if (elements && elements.length > 0) {
    let listElements = list

    elements.map(item => {
      listElements = without(listElements, item)
    })

    return listElements
  }
  return list
}

export const removeItemByPositions = (list, ini, end) =>
  list.filter((item, index) => {
    if (index < ini || index > end) return item
  })

export const cleanPositionInArray = (list, ini, end, key, value) => {
  const newList = list.map(a => Object.assign({}, a))

  return newList.map((item, index) => {
    if (index >= ini && index <= end) {
      item[key] = value
      return item
    }
    return item
  })
}

export const filterItem = (list, item) =>
  filter(list, value => value.cp.includes(item.cp))

export const unionArray = (list1, list2) => union(list1, list2)

export const getUUID = () => uuidv4()

export const isChange = (object, other) => isEqual(object, other)

export const sortByAttr = (list, attr) => sortBy(list, attr)

export const containsItem = (list, item) => !!findWhere(list, item)

export const getItem = (list, item) => findWhere(list, item)

export const indexOfItem = (list, item) => indexOf(list, item)

export const getListPropsOmit = (list, props) =>
  map(list, o => {
    if (o.tmp || o.custom || o.id) {
      return omit(o, props)
    }
    return o
  })

export const getObjPropsRemove = (obj, props) => omit(obj, props)

export const replaceObject = (list, item, newItem) =>
  map(list, o => {
    if (isMatch(o, item)) {
      return newItem
    }
    return o
  })

export const getMessageResponse = response => {
  let message = 'Error'

  if (response.message) {
    message = response.message
  } else if (response.descripcionError) {
    message = response.descripcionError
  } else if (response.errorMessage) {
    message = response.errorMessage
  }

  return message
}

export const questionMessage = (message, okClick, cancelClick) => {
  const modalObj = {
    body: ( <
      Row >
      <
      Col xs = {
        4
      }
      className = "text-center" >
      <
      img src = {
        questionImage
      }
      alt = ""
      className = "img-fluid" / >
      <
      /Col> <
      Col xs = {
        8
      }
      className = "mediaBody text-left align-self-center" >
      <
      p > {
        message
      } < /p> < /
      Col > <
      /Row>
    ),
    footer: [{
        label: 'Aceptar',
        variant: 'info',
        onClick: okClick
      },
      {
        label: 'Cancelar',
        variant: 'primary',
        onClick: cancelClick
      }
    ]
  }

  return modalObj
}

export const warningMessage = message => {
  const modalObj = {
    title: 'Atención',
    body: ( <
      Row >
      <
      Col xs = {
        4
      }
      className = "text-center" >
      <
      img src = {
        warningImage
      }
      alt = ""
      className = "img-fluid" / >
      <
      /Col> <
      Col xs = {
        8
      }
      className = "mediaBody text-left align-self-center" >
      <
      p > {
        message
      } < /p> < /
      Col > <
      /Row>
    )
  }
  return modalObj
}

export const showMessage = message => {
  const modalObj = {
    closeButton: true,
    body: ( <
      Row >
      <
      Col xs = {
        4
      }
      className = "text-center" >
      <
      img src = {
        succesImage
      }
      alt = ""
      className = "img-fluid" / >
      <
      /Col> <
      Col xs = {
        8
      }
      className = "mediaBody text-left align-self-center" >
      <
      p > {
        message
      } < /p> < /
      Col > <
      /Row>
    )
  }

  return modalObj
}

export const customMessage = (title, body, message, closeButton, footer) => {
  const modalObj = {
    closeButton,
    title,
    body: body ? body : < p > {
      message
    } < /p>,
    footer
  }

  return modalObj
}

export const errorMessage = (title, message) => {
  const modalObj = {
    title: title !== '' || title == undefined ? title : 'Error en el Proceso',
    body: ( <
      Row >
      <
      Col xs = {
        4
      }
      className = "text-center align-content-end" >
      <
      img src = {
        errorImage
      }
      alt = ""
      className = "img-fluid" / >
      <
      /Col> <
      Col xs = {
        8
      }
      className = "mediaBody text-left align-self-center" >
      <
      p > {
        message
      } < /p> < /
      Col > <
      /Row>
    )
  }

  return modalObj
}

export const successMessage = () => {
  const modalObj = {
    title: 'Proceso Exitoso',
    body: ( <
      Row >
      <
      Col xs = {
        4
      }
      className = "text-center" >
      <
      img src = {
        succesImage
      }
      alt = ""
      className = "img-fluid" / >
      <
      /Col> <
      Col xs = {
        8
      }
      className = "mediaBody text-left align-self-center" >
      <
      p > Accion realizada con éxito < /p> < /
      Col > <
      /Row>
    )
  }

  return modalObj
}

export const clearNullAndEmpty = jsonObj => {
  each(jsonObj, (value, key) => {
    if (value === '' || value === null) {
      delete jsonObj[key]
    } else if (Object.prototype.toString.call(value) === '[object Object]') {
      clearNullAndEmpty(value)
    } else if (isArray(value)) {
      each(value, (k, v) => {
        clearNullAndEmpty(v)
      })
    }
  })
}

export const isNullOrEmpty = jsonObj => {
  let result = false

  each(jsonObj, value => {
    if (value === '' || value === null) {
      result = true
    } else if (Object.prototype.toString.call(value) === '[object Object]') {
      isNullOrEmpty(value)
    } else if (isArray(value)) {
      each(value, (k, v) => {
        isNullOrEmpty(v)
      })
    }
  })

  return result
}

export const setDefaultValues = object => {
  const jsonObj = Object.assign({}, object)
  each(jsonObj, (value, key) => {
    if (typeof value === 'string') {
      jsonObj[key] = ''
    } else if (typeof value === 'number') {
      jsonObj[key] = ''
    } else if (typeof value === 'boolean') {
      jsonObj[key] = false
    } else if (Object.prototype.toString.call(value) === '[object Object]') {
      clearNullAndEmpty(value)
    } else if (isArray(value)) {
      jsonObj[key] = []
    }
  })

  return jsonObj
}

export const capitalize = cadena => {
  return cadena.charAt(0).toUpperCase() + cadena.slice(1)
}

export const isBefore = (date1, date2) => moment(date1).isBefore(date2)

export const isAfter = (date1, date2) => moment(date1).isAfter(date2)

export const formatDate = (date, format = 'YYYY-MM-DD') =>
  moment(new Date(date).toISOString()).format(format)

export const isEmpty = prop =>
  prop === null ||
  prop === undefined ||
  (prop.hasOwnProperty('length') && prop.length === 0) ||
  (prop.constructor === Object && Object.keys(prop).length === 0)

export const getSum = (arr = [], attr) =>
  arr.reduce((a, b) => +a + +parseFloat(b[attr]), 0)

export const getToday = () => {
  let today = new Date()
  let dd = today.getDate()
  let mm = today.getMonth() + 1
  const yyyy = today.getFullYear()

  if (dd < 10) dd = `0${dd}`
  if (mm < 10) mm = `0${mm}`

  today = `${mm}/${dd}/${yyyy}`
  return today
}

/* eslint-enable */
