import fs from 'node:fs';
import { isAbsolute } from 'node:path';

export const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    // si la ruta existe
  if (fs.existsSync(path)) {
    // pasar a ruta absoluta

    const isPathAbsolute = isAbsolute('README.md');
    if(isPathAbsolute === true){
      console.log('Ruta absoluta');
    }else{
      //convertir en absoluta
        console.log(resolve('README.md'), 'README.md')
      }
    
  }  else{
    //si no existe la ruta msj error
    reject('la ruta no existe')
  }
  });
};
/*module.exports = () => {
  // ...
};*/

/*import { mdLinks } from "./mdLinks.js";

mdLinks()
*/