import { mdLinks } from "./index.js";

mdLinks('rutanoexiste.md').then(() => {})
.catch((error) => {
    console.log(error)
});