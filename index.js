// import fs, { link } from 'node:fs';
// import { isAbsolute, resolve as resolvePath, } from 'node:path';
import { existPath, convertAbsolute, existFile, extFile, readFileMd, getLinks, validateLinks, linkTotal, linkCombo } from './mdlinks.js';
// isAbsolute(jhfdsakjfj)
// import path from 'node:path';
// path.isAbsolute(fdskjhfdkjh)

export const mdLinks = (ruta, options) => {
  return new Promise((resolve, reject) => {

    // si la ruta existe
    if (existPath(ruta)) {

      // convertir en absoluta
      convertAbsolute(ruta);

      // if(convertAbsolute(ruta)===false){
      //   toAbsolute(ruta);
      // }else{
      //   ruta
      // }

      // verificar si existe el archivo
      existFile(ruta);

      // si es archivo ext .md
      if (extFile(ruta) == '.md') {

        // leer el archivo
        readFileMd(ruta)

          // luego obtener los links
          .then(buff => {
            return getLinks(buff)
          })

          // luego si la opcion es --validate false resuelve con getLinks=arrayBasic
          .then((arrayBasic) => {
            if (options.validate === false) {
              resolve(arrayBasic)
            }
            return validateLinks(arrayBasic)
          })

          // luego si la opcion es --validate true resuelve con validateLinks=resultado
          .then((resultado) => {
            // console.log({resultado});
            if (options.validate === true) {
              resolve(resultado)
              return validateLinks(resultado)
            }
            if (options.stats === true) {
              resolve(resultado)
              //  return linkTotal(resultado)
              return linkTotal(resultado)
              //console.log(linkTotal(resultado)); 
            }
            if (options.combo === true) {
              resolve(resultado)
              //  return linkCombo(resultado)
              return linkCombo(resultado)
            }


          })

      }
    } else {
      // si no existe la ruta msj error
      reject('*-- <PATH> Invalid ❎--*')
    }
  });

};


/*import { mdLinks } from "./mdLinks.js";

mdLinks()
*/