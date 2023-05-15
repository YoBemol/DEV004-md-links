import fs from 'node:fs';
import { isAbsolute, resolve as resolvePath, } from 'node:path';
import { convertAbsolute, existPath, existFile, extFile, readFileMd } from './mdlinks.js';
// isAbsolute(jhfdsakjfj)
// import path from 'node:path';
// path.isAbsolute(fdskjhfdkjh)

export const mdLinks = (path = 'ejemplo.md', options) => { // noexiste.md || README.md || /Users/InforSys/Documents/Laboratoria/ || package.json
  return new Promise((resolve, reject) => {
    // si la ruta existe
    //if (fs.existsSync(path)) {
    if(existPath(path)){  
      
      convertAbsolute(path);
      
      existFile(path);

      // extFile(path);

      if(extFile(path) == '.md'){
        const content = readFileMd(path)
        .then(buff => {
          const contents = buff.toString()
          console.log(`\nContenido del archivo :\n${contents}`)  
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