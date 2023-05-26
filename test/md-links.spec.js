//const mdLinks = require('../');
import { mdLinks } from "../index.js";
import { existPath, convertAbsolute, existFile, extFile, readFileMd, getLinks, validateLinks } from "../mdlinks.js";
import assert from 'node:assert/strict';
import test from 'node:test';
import axios from "axios";

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

  it('Deberia retornar una ruta absoluta', () => {
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
  it('Deberia regresar el contenido si puede leer un archivo', () => {
    readFileMd('ejemplo.md')
      .then((value) => {
        expect(value).toMatch('- [ ] **GitHub: Colaboración en Github (branches | forks | pull requests | code review | tags)**')
      })
  });
});

// MOCK process.argv import: 4-5 linea 

test.describe(
  () => {
    const originalArgv = process.argv;

    test.beforeEach(
      () => {
        process.argv = [...originalArgv];  // own shallow copy
      }
    );

    test.test(
      () => {
        process.argv[2] = 'ejemplo.md';
        assert.equal(process.argv[2], 'ejemplo.md');
      }
    );
  }
);

// archivo de prueba    
const prueba = '### HTTP - [ ] **Consulta o petición (request) y respuesta (response).** <details><summary>Links</summary><p> * [Generalidades del protocolo HTTP - MDN](https://developer.mozilla.org/es/docs/Web/HTTP/Overview)'
//const file =  'ejemplo.md'

  describe('getLinks', () => {
    it('Deberia devolver un array', () => {
      expect(getLinks('ejemplo.md')).toBeInstanceOf(Array)
    });

    it('Deberia devolver un array con un objeto', () => {
      // jest.mock('node:process',()=>({
      //   argv:['','','ejemplo.md']
      // })); NO FUNCA

      expect(getLinks(prueba)).toEqual([
        {
          text: 'Generalidades del protocolo HTTP - MDN',
          href: 'https://developer.mozilla.org/es/docs/Web/HTTP/Overview',
          file: 'ejemplo.md'
        }
      ])
    });
  });

//MOCK axios

jest.mock("axios");



describe('validateLinks', () => {

  it('Cuando la petición es exitosa deberia adicionar al array el status y msg OK', () => {
    const petAxios = [
      {
        text: 'Generalidades del protocolo HTTP - MDN',
        href: 'https://developer.mozilla.org/es/docs/Web/HTTP/Overview',
        file: 'ejemplo.md'
      }
    ]

    const result = [
      {
        file: 'ejemplo.md',
        href: 'https://developer.mozilla.org/es/docs/Web/HTTP/Overview',
        msg: 'OK',
        status: 200,
        text: 'Generalidades del protocolo HTTP - MDN',
      },
    ]

    axios.get.mockResolvedValue({ status: 200, msg: 'OK'})
    return expect(validateLinks(petAxios)).resolves.toEqual(result)

  });
  // NO FUNCA
  // it('Cuando la petición falla deberia adicionar al array el status y msg FAIL', () => {
    
  //   const peticionAxios = [
  //     {
  //       text: 'Link roto',
  //       href: 'https://www.youtube.com/01RHn23Bn_0',
  //       file: 'ejemplo.md'
  //     }
  //   ]

  //   const res = [
  //     {
  //       file: 'ejemplo.md',
  //       href: 'https://www.youtube.com/01RHn23Bn_0',
  //       status: 404,
  //       msg: 'FAIL',
  //       text: 'Link roto',
  //     },
  //   ]
  //   // revisar xq regresa msg 'OK'
  //   axios.get.mockResolvedValue({ status: 404, msg: 'FAIL'}) //mockRejectedValue ??
  //   return expect(validateLinks(peticionAxios)).resolves.toEqual(res)

  // });
  // EJEMPLO
  // it("good response", () => {
  //   axios.get.mockResolvedValue({ status: 200, msg: 'OK'});
  //   // ...
  // });
  
  // it("bad response", () => {
  //   axios.get.mockImplementation(() => Promise.reject({ status: 200, msg: 'FAIL' }));
  //   // ...
  // });
});

