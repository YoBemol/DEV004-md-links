import { mdLinks } from "./index.js";

// const [, , argument] = process.argv;
// console.log(argument);
const ruta = process.argv[2];
if(process.argv.includes('--validate') === false){
    mdLinks(ruta, {validate:false})
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log(error)
    });
}else if(process.argv.includes('--validate') === true || process.argv.includes('-v') ){
    mdLinks(ruta, {validate:true})
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log(error)
    });
}
//if(pro)
