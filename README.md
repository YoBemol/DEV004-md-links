# Markdown Links

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Resumen del proyecto](#2-resumen-del-proyecto)
* [3. Justificación](#3-justificación)
* [4. Consideraciones generales](#4-consideraciones-generales)
* [5. Criterios de aceptación mínimos del proyecto](#5-criterios-de-aceptación-mínimos-del-proyecto)
* [6. Funcionamiento](#6-funcionamiento)

***

## 1. Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero usado en plataformas que
manejan texto plano (GitHub, foros, blogs, ...) .

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir. 

## 2. Resumen del proyecto

Se creo una herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar algunas estadísticas como total de links, links únicos y links rotos. Por ejemplo para detectar los links rotos en los readmes de los proyectos
o en un área de facturación verificar los links rotos de una factura digital.

## 3. Justificación

La implementación de este proyecto tiene varias partes: leer del sistema de
archivos, recibir argumentos a través de la línea de comando, analizar texto,
hacer consultas HTTP, ... y todas estas cosas pueden enfocarse de muchas formas,
tanto usando librerías como implementando en VanillaJS.

## 4. Consideraciones generales

* La **librería** y el **script ejecutable** (herramienta de línea de comando -
  CLI) está implementado en JavaScript para ser ejecutados con
  Node.js.

* El módulo **debe ser instalable** via `npm install <github-user>/md-links`. Este
  módulo debe incluir tanto un _ejecutable_ que podamos invocar en la línea de
  comando como una interfaz que podamos importar con `require` para usarlo
  programáticamente.
  
 * Para personalizar el estilo de la aplicación en la terminal se uso la libreria [chalk](https://www.npmjs.com/package/chalk).

* Se uso [Jest](https://jestjs.io/) y nodejs native [Test runner](https://nodejs.org/api/test.html) para los **tests unitarios** de _statements_,
  _functions_, _lines_ y _branches_.

* Para este proyecto no se utilizó `async/await`.

* Para este proyecto no se usó la versión síncrona
de la función para leer archivos, `readFileSync`.

* Uso de **ES Modules** `(import/export)`, en lugar de commonJS `(require/module.exports)`.

* Para el parseado (análisis) del markdown para extraer los links se utilizo  [expresiones regulares(`RegExp`)](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions).

* StandardJS para evitar que tu código JavaScript contenta errores con npm install standard -D adicional eslintConfig en package.json

## 5. Criterios de aceptación mínimos del proyecto

### Archivos del proyecto

* `README.md` con descripción del módulo, instrucciones de instalación/uso,
  documentación del API y ejemplos. 
* `mdlinks.js`: Desde este archivo se exportan funciones a index.js
* `index.js`: Desde este archivo se exporta **una** función (`mdLinks`).
* `package.json` con nombre, versión, descripción, autores, licencia,
  dependencias, scripts (pretest, test, ...), main, bin
* `.editorconfig` con configuración para editores de texto. Este archivo no se
  debe cambiar.
* `.gitignore` para ignorar `node_modules` u otras carpetas que no deban
  incluirse en control de versiones (`git`).
* `test/md-links.spec.js` y `test/index.spec.js que contienen los tests unitarios. 

## 6. Funcionamiento

### Diagrama de flujo

![diagrama](https://github.com/YoBemol/DEV004-md-links/blob/main/diagrama.png)

### CLI (Command Line Interface - Interfaz de Línea de Comando)

Se ejecuta de la siguiente
manera a través de la **terminal**:

`md-links <path-to-file> [options]`


##### `./some/example.md`

```sh
$ md-links ./some/example.md 
Href: URL encontrada.
Text: Texto que aparecía dentro del link (`<a>`).
File: Ruta del archivo donde se encontró el link.
```

##### `./some/example.md --validate`

```sh
$ md-links ./some/example.md --validate
Href: URL encontrada.
Text: Texto que aparecía dentro del link (`<a>`).
File: Ruta del archivo donde se encontró el link.
Status: Código de respuesta HTTP.
Msg: Mensaje `fail` en caso de fallo u `ok` en caso de éxito.
```

##### `./some/example.md --stats`

Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

##### `./some/example.md --stats --validate`

También podemos combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.

```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```

##### `--help`

Información de los comandos a utilizar.

```sh
$ md-links --help
<path>                    		All links .md
<path> --validate        		Links with status and msg
<path> --stats            		Stats: Total and Unique links
<path> --stats --validate 	Stats: Total, Unique and Broken links
```

***
