import axios from 'axios';
import { existsSync, statSync, readFile } from 'fs';
import { isAbsolute, resolve as resolvePath, extname } from 'node:path';

// import { util } from 'util';
/*export const mdLinks = (path, options) => {

};*/


//entrega un booleano que indica la presencia de un archivo. sincrona
export const existPath = (value) => {
    const valueT = existsSync(value)
    if (valueT) {
        console.log('La ruta existe: ', value);
    }
    return valueT;
};

// convierte path de relativa a absoluta. sincrona
export const convertAbsolute = (value) => {
    const isPathAbsolute = isAbsolute(value);
    if (isPathAbsolute) {
        console.log('La ruta es absoluta: ', value)
    } else {
        //si no es relativa convertir en absoluta
        value = resolvePath(value);
        console.log('La ruta ahora es absoluta: ', value)//path.resolve
    }
    return value;
};

//verificar que la ruta es de un archivo. sincrona
export const existFile = (value) => {
    let stats = statSync(value);

    // Use isFile() method to log the result to screen
    // console.log('Es un archivo? ', stats.isFile());

    if (stats.isFile()) {
        console.log('Es un archivo ☑');
    } else {
        console.log('---No es un archivo ❎---');
    }
    return stats.isFile();
};

//verificar si es un archivo ext .md sincrona
export const extFile = (value) => {
    if (extname(value) == '.md') {
        console.log('Archivo con extension', extname(value), '☑')
    } else {
        console.log('Archivo con extension', extname(value), '❎ Ingrese archivo con ext .md');
    }
    return extname(value);
};

// const regExp = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)[^\)]*\)/gm;
//leer archivo.promesa REVISAR COMO PASAR A INDEX.JS Y PARAMETROS, ES CB? ES PROMISE? IMPLEMENTAR LO DE ABAJO
//https://www.geeksforgeeks.org/how-to-operate-callback-based-fs-readfile-method-with-promises-in-node-js/
export const readFileMd = (value) => {
    return new Promise ((resolve, reject) => {
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
      data.push({text:match[1], href: match[2], file: process.argv[2]});// process.argv no funciona para dir solo archivos
    }
    return data;
}

//peticion http promesa
export const validateLinks = (array)=>{
    // dentro de la funcion recorrer el array
    // por cada href dentro del array hacer la peticion http axios, fetch, node:http
    // const requestAxios = array.map(element => axios.get(element.href))
    // Promise.all(requestAxios)
    // .then((res)=>{res.forEach((req) => {
    //    console.log(req)
    // })       
    // })
    // .catch((err)=>{
    //     console.log(err);
    // })
    array.forEach(element => {
        axios.get(element.href)
        .then((response)=>{
            const elements = {
                status: response.status,
                msj: response.statusText
            }
            console.log(elements);
        });
    });
    return array    
    
           
            // deacuerdo a la respuesta añadir 2 propiedades al objeto {href, file, text, status: 500, statusText: 'OK/Fail'}
            
}
//peticion http con axios (inst) o con fetch 