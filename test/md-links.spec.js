import { mdLinks } from "../index.js";
import assert from 'node:assert/strict';
import test from 'node:test';

// jest.useRealTimers();
test.describe(
    () => {
      const argv = process.argv;
  
      test.beforeEach(
        () => {
          process.argv = [...argv];  // own shallow copy
        }
      );
  
      test.test(
        () => {
          process.argv[2] = 'ejemplo2.md';
          assert.equal(process.argv[2], 'ejemplo2.md');
        }
      );
    }
  );

describe('mdLinks', () => {
    
    it('Deberia devolver un array de objetos (text,href,file)', () => {
        const ruta = 'ejemplo2.md';
        return mdLinks(ruta, { validate: false }).then((arr) => {
            expect(arr).toEqual([
                {
                    text: 'Generalidades del protocolo HTTP - MDN',
                    href: 'https://developer.mozilla.org/es/docs/Web/HTTP/Overview',
                    file: 'C:\\Users\\InforSys\\Documents\\Laboratoria\\DEV004-md-links\\ejemplo2.md'
                    
                }
            ]);
        });        
    });
    it('Deberia devolver un array de objetos --validate: true (text,href,file,status,msg)', () => {
        const ruta = 'ejemplo2.md';
        return mdLinks(ruta, { validate: true }).then((array) => {
            expect(array).toEqual([
                {
                    text: 'Generalidades del protocolo HTTP - MDN',
                    href: 'https://developer.mozilla.org/es/docs/Web/HTTP/Overview',
                    file: 'C:\\Users\\InforSys\\Documents\\Laboratoria\\DEV004-md-links\\ejemplo2.md',
                    status: 200,
                    msg: 'OK'                    
                }
            ]);
        });        
    });
    it('Deberia devolver un msj de error si la ruta no existe', () => {
        return mdLinks('/rutanoexiste.md').catch((error) => {
            expect(error).toBe('*-- <PATH> Invalid ❎--*');
        });
    });
});