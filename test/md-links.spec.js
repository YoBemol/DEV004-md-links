//const mdLinks = require('../');
//problemas con jest SyntaxError: Cannot use import statement outside a module

import { mdLinks } from "../index.js";

describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });
  it('Deberia devolver un msj de error si la ruta no existe', () => {
    return mdLinks('/rutanoexiste.md').catch((error) => {
      expect(error).toBe('la ruta no existe');
    })
  });
});
