import axios from 'axios';
import { createDiffieHellmanGroup } from 'crypto';
import { existsSync, statSync, readFile, link } from 'fs';
import { isAbsolute, resolve as resolvePath, extname } from 'node:path';

//entrega un booleano que indica la presencia de un archivo. sincrona
export const existPath = (value) => {
    const valueT = existsSync(value)
    if (valueT) {
        // console.log('La ruta existe: ', value);
    }
    return valueT;
};

// convierte path de relativa a absoluta. sincrona
export const convertAbsolute = (value) => {
    const isPathAbsolute = isAbsolute(value);
    if (isPathAbsolute) {
        // console.log('La ruta es absoluta: ', value)
    } else {
        //si no es relativa convertir en absoluta
        value = resolvePath(value);
        // console.log('La ruta ahora es absoluta: ', value)//path.resolve
    }
    return value;
};

//verificar que la ruta es de un archivo. sincrona
export const existFile = (value) => {
    let stats = statSync(value);

    // Use isFile() method to log the result to screen
    // console.log('Es un archivo? ', stats.isFile());

    if (stats.isFile()) {
        // console.log('Es un archivo ✅');
    } else {
        console.error('---No es un archivo ❎---');
    }
    return stats.isFile();
};

//verificar si es un archivo ext .md sincrona
export const extFile = (value) => {
    if (extname(value) == '.md') {
        // console.log('Archivo con extension', extname(value), '✅')
    } else {
        console.error('❎ Archivo con extension', extname(value), 'Ingrese archivo con ext .md');
    }
    return extname(value);
};

// const regExp = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)[^\)]*\)/gm;
//leer archivo.promesa REVISAR COMO PASAR A INDEX.JS Y PARAMETROS, ES CB? ES PROMISE? IMPLEMENTAR LO DE ABAJO
//https://www.geeksforgeeks.org/how-to-operate-callback-based-fs-readfile-method-with-promises-in-node-js/
export const readFileMd = (value) => {
    return new Promise((resolve, reject) => {
        readFile(value, 'utf-8', (err, data) => {
            if (err) {
                reject('error: ', err);
            } else {
                resolve(data);
            }
        });
    })

};
// console.log(process.argv);
// const [, , argument] = process.argv;
// console.log(argument);

// extraer links como array
export const getLinks = (value) => {
    const regex = /\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/gi;
    const content = value.toString();
    const matches = content.matchAll(regex);
    const data = [];

    for (const match of matches) {
        // const route = argument;// argv[2]
        data.push({ text: match[1], href: match[2], file: convertAbsolute(process.argv[2]) });// file: process.argv[2] no funciona para dir solo archivos
    }
    return data;
}

//peticion http promesa
export const validateLinks = (array) => {
    // dentro de la funcion recorrer el array
    // por cada href dentro del array hacer la peticion http axios, fetch, node:http
    // deacuerdo a la respuesta añadir 2 propiedades al objeto {href, file, text, status: 500, statusText: 'OK/Fail'}
    //console.log('array', array);
    const requestAxios = array.map(element => {
        //get
        return axios.get(element.href)
            .then(response => {
                element.status = response.status;
                element.msg = 'OK';
                return element
            })
            .catch(error => {
                element.status = error.response.status;// solucionar undefined para urls con proxyes
                element.msg = 'FAIL';
                return element
            })

    });
    return Promise.all(requestAxios)
        .then(result => {
            return result;
        });
}

export const linkTotal = (value) => {
    const count = [];
    //console.log(count);
    const countLinks = value.map(element => count.push(element.href))
    //count.push(countLinks);
    const uniqueLinks = Array.from(new Set(value.map(e => e.href)))
    // console.log(count);
    console.log('Total: ', countLinks.length)
    console.log('Unique: ', uniqueLinks.length)
}

//replantear no encuentra las pet axios 
export const linkCombo = (value) => {
    // console.log({value});

    // const brokenLinks = value.filter(e => e.status >= 400)//.map(e => e.status);    
    // console.log(brokenLinks.length);
    // return brokenLinks.length
    const brokenLinks = value.filter(e => e.status >= 400).length
    console.log('Broken: ', brokenLinks)
}