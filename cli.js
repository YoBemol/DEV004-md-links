import { mdLinks } from "./index.js";

// const [, , argument] = process.argv;
// console.log(argument);
const ruta = process.argv[2];
const processArr = process.argv;
if(processArr[3] === '--v' || processArr[3] === '--validate' ){
    // console.log(true);
        mdLinks(ruta, {validate:true})
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log(error)
    });
}

if(processArr.length === 3){
    // console.log('no validate');
        mdLinks(ruta, {validate:false})
    .then((data) => {
        console.log(data);
        // data.forEach(element => {
        //     console.log(element.text);
        // });
    })
    .catch((error) => {
        console.log(error)
    });
}

// const prueba = process.argv
// console.log(prueba.includes('--v') === '--v', 'process');
// if(process.argv[3] === 'validate' || process.argv[3] === '-v' ){
//     mdLinks(ruta, {validate:false})
//     .then((data) => {
//         console.log('hola1',data);
//         // data.forEach(element => {
//         //     console.log(element.text);
//         // });
//     })
//     .catch((error) => {
//         console.log(error)
//     });
// }// else if(process.argv[3]idate') === true || process.argv[3] === true ){
//     mdLinks(ruta, {validate:true})
//     .then((data) => {
//         console.log('hola2',data);
//     })
//     .catch((error) => {
//         console.log(error)
//     });
// }
//if(pro)
