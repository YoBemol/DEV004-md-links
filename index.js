import fs from 'node:fs';
import { isAbsolute, resolve as resolvePath, } from 'node:path';
import { convertAbsolute, existPath, existFile, extFile, readFileMd, getLinks, validateLinks } from './mdlinks.js';
// isAbsolute(jhfdsakjfj)
// import path from 'node:path';
// path.isAbsolute(fdskjhfdkjh)

export const mdLinks = (ruta , options) => { 
  return new Promise((resolve, reject) => {
    // si la ruta existe
    //if (fs.existsSync(ruta)) {
    if(existPath(ruta)){  
      
      convertAbsolute(ruta);
      
      existFile(ruta);

      // extFile(ruta);

      if(extFile(ruta) == '.md'){
        readFileMd(ruta)
        .then(buff => {
          //const contents = buff.toString()
          //console.log(`\nContenido del archivo :\n${contents}`) 
          return getLinks(buff)
        })
        .then((arrayBasic) => {
          // console.log({arrayBasic});
          if(options.validate === false){
            resolve(arrayBasic)
          }
          return validateLinks(arrayBasic)
        })
        .then((resultado) => {
         // console.log({resultado});
          if(options.validate === true){
            resolve(resultado)
          }
          // resolve(arrayBasic)

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