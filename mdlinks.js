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

const regExp = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)[^\)]*\)/gm;
//leer archivo.asincrona REVISAR COMO PASAR A INDEX.JS Y PARAMETROS, ES CB? ES PROMISE? IMPLEMENTAR LO DE ABAJO
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
   // const readFile = util.promisify(readFile());
};