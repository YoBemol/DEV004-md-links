//const mdLinks = require('../');
import { mdLinks } from "../index.js";
import { existPath, convertAbsolute, existFile, extFile, readFileMd } from "../mdlinks.js";

describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });
  it('Deberia devolver un msj de error si la ruta no existe', () => {
    return mdLinks('/rutanoexiste.md').catch((error) => {
      expect(error).toBe('--- La ruta no existe ❎---');
    });
  });
});

describe('existPath', () => {

  it('Deberia retornar true si la ruta existe', () => {
    expect(existPath('README.md')).toBe(true)
  });
  /*it('Deberia retornar false si la ruta NO existe', () => {
    expect(existPath('noexiste.md')).toBe(false)
  });*/
});

// test para windows
describe('convertAbsolute', () => {

  it('Deberia retornar una ruta absoluta',() => {
    expect(convertAbsolute('README.md')).toMatch('C:\\Users\\')
  });
});

describe('existFile', () => {
  it('Deberia devolver true si la ruta es de un archivo', () => {
    expect(existFile('README.md')).toBe(true)
  });
  it('Deberia devolver false si la ruta NO es un archivo', () => {
    expect(existFile('/Users/InforSys/Documents/Laboratoria/')).toBe(false)
  });
});

describe('extFile', () => {
  it('Deberia devolver la ext de un archivo', () => {
    expect(extFile('package.json')).toBe('.json')
  });
});

describe('readFileMd', () => {  
  it('deberia regresar el contenido si puede leer un archivo', () => {
    readFileMd('ejemplo.md')
    .then((value) => {
      expect(value).toMatch('- [ ] **GitHub: Colaboración en Github (branches | forks | pull requests | code review | tags)**')     
    })
  });
});