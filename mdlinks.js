import axios from 'axios'
import { existsSync, statSync, readFile } from 'fs'
import { isAbsolute, resolve, extname } from 'node:path'

// entrega un booleano que indica la presencia de un archivo. sincrona
export const existPath = (value) => {
  const valueT = existsSync(value)
  if (valueT) {
    // console.log('La ruta existe: ', value);
  }
  return valueT
}

// convierte path de relativa a absoluta. sincrona
export const convertAbsolute = (value) => {
  const isPathAbsolute = isAbsolute(value)
  // console.log('UNO',isPathAbsolute)
  if (isPathAbsolute) {
    // console.log('La ruta es absoluta: ', value)
  } else {
    // si es relativa convertir en absoluta
    value = resolve(value)
    // console.log('La ruta ahora es absoluta: ', value)//path.resolve
  }
  // console.log('DOS',value)
  return value
}

// verificar que la ruta es de un archivo. dos metodos sincrona
export const existFile = (value) => {
  const stats = statSync(value)

  if (stats.isFile()) {
    // console.log('Es un archivo ✅');
  }
  // else {
  //     console.error('---No es un archivo ❎---');
  // }
  return stats.isFile()
}

// verificar si es un archivo ext .md sincrona
export const extFile = (value) => {
  if (extname(value) === '.md') {
    // console.log('Archivo con extension', extname(value), '✅')
  }
  // else {
  //     console.error('❎ Archivo con extension', extname(value), 'Ingrese archivo con ext .md');
  // }
  return extname(value)
}

// const regExp = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)[^\)]*\)/gm;
// leer archivo

export const readFileMd = (value) => {
  return new Promise((resolve, reject) => {
    readFile(value, 'UTF-8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

// extraer links como array
export const getLinks = (value) => {
  const regex = /\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/gi
  const content = value.toString()
  const matches = content.matchAll(regex)
  const data = []

  for (const match of matches) {
    data.push({ text: match[1], href: match[2], file: convertAbsolute(process.argv[2]) })// file: process.argv[2] no funciona para dir solo archivos
  }
  return data
}

// peticion http promesa
export const validateLinks = (array) => {
  // dentro de la funcion recorrer el array
  // por cada href dentro del array hacer la peticion http axios, fetch, node:http
  // deacuerdo a la respuesta añadir 2 propiedades al objeto {href, file, text, status: 500, statusText: 'OK/Fail'}
  // console.log('array', array);
  const requestAxios = array.map(element => {
    // get
    return axios.get(element.href)
      .then(response => {
        element.status = response.status
        element.msg = 'OK'
        return element
      })
      .catch(error => {
        element.status = error.message
        element.msg = 'FAIL'
        return element
      })
  })
  return Promise.all(requestAxios)
    .then(result => {
      return result
    })
}

// funcion links totales y unicos
export const linkTotal = (value) => {
  // console.log({value});

  const countLinks = value.map(element => element.href).length
  const uniqueLinks = Array.from(new Set(value.map(e => e.href))).length

  value.total = countLinks
  value.unique = uniqueLinks
  // console.log('HOLA',value.total,value.unique)
  return value
}

// funcion links rotos
export const linkCombo = (value) => {
  // console.log({value});

  const brokenLinks = value.filter(e => e.msg === 'FAIL').length
  value.broken = brokenLinks
  return value
}
