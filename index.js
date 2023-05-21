import fs from 'node:fs';
import { isAbsolute, resolve as resolvePath, } from 'node:path';
import { convertAbsolute, existPath, existFile, extFile, readFileMd, getLinks, validateLinks } from './mdlinks.js';
// isAbsolute(jhfdsakjfj)
// import path from 'node:path';
// path.isAbsolute(fdskjhfdkjh)

export const mdLinks = (ruta , options= {validate: false}) => { 
  return new Promise((resolve, reject) => {
    // si la ruta existe
    //if (fs.existsSync(ruta)) {
    if(existPath(ruta)){  
      
      convertAbsolute(ruta);
      
      existFile(ruta);

      // extFile(ruta);

      if(extFile(ruta) == '.md'){
        const content = readFileMd(ruta)
        .then(buff => {
          //const contents = buff.toString()
          //console.log(`\nContenido del archivo :\n${contents}`) 
          const arrayBasic = getLinks(buff)
          // console.log(getLinks(buff)) // array de objeto tres propiedades
          if(options.validate === false){
            resolve(arrayBasic)
          }
          if(options.validate === true){
            // crear una funcion que reciba el arrayBasic
            // dentro de la funcion recorrer el arrayBasic
            // por cada href dentro del arrayBasic hacer la peticion http axios, fetch, node:http
            // deacuerdo a la respuesta añadir 2 propiedades al objeto {href, file, text, status: 500, statusText: 'OK/Fail'}
            const prueba = validateLinks(arrayBasic)
            resolve (prueba) // array de obj 5 props
          }
          
        })
      }
    } else {
      // si no existe la ruta msj error
      reject('--- La ruta no existe ❎---')
    }
  });
};


/*import { mdLinks } from "./mdLinks.js";

mdLinks()
*/