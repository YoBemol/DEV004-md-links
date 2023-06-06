import chalk from "chalk";
import { mdLinks } from "./index.js";

//const chalk = new chalk({level: 2});

const ruta = process.argv[2];
const processArr = process.argv;

if (!ruta) {
    console.log('Please enter', chalk.bgBlue('--help'), 'to see options');
}
if (process.argv.includes('--help')) {
    console.log(chalk.bgYellow('OPTIONS'));
    console.log(chalk.bgBlue('<path>                   '), 'All links .md');
    console.log(chalk.bgBlue('<path> --validate        '), 'Links with status and msg');
    console.log(chalk.bgBlue('<path> --stats           '), 'Stats: Total and Unique links');
    console.log(chalk.bgBlue('<path> --stats --validate'), 'Stats: Total, Unique and Broken links');
}
if (processArr[3] === '--v' || processArr[3] === '--validate') {
    // console.log(true);
    mdLinks(ruta, { validate: true })
        .then((data) => {
            // console.log(data);
            data.forEach(element => {
                console.log('');
                console.log(chalk.bgBlue('Text:  ', element.text));
                console.log(chalk.cyan('Href:  ', element.href));
                console.log('File:  ', element.file);
                console.log(chalk.cyan('Status:'), (element.status));
                console.log(chalk.cyanBright('Msg:   ', element.msg));
            });
        })
        .catch((error) => {
            console.log(error)
            // console.log(chalk.bgRed('TRY WITH:'));
            // console.log(chalk.bgBlue('<path>                   '), 'All links .md');
            // console.log(chalk.bgBlue('<path> --validate        '), 'Links with status and msg');
            // console.log(chalk.bgBlue('<path> --stats           '), 'Stats: Total and Unique links');
            // console.log(chalk.bgBlue('<path> --stats --validate'), 'Stats: Total, Unique and Broken links');
        });
}

if (processArr[3] === '--s' || processArr[3] === '--stats') {
    // console.log(true);
    mdLinks(ruta, { stats: true })
        .then((data) => {
            // console.log(data);
            console.log(chalk.inverse('Total : '), data.total);
            console.log(chalk.inverse('Unique: '), data.unique);
        })
        .catch((error) => {
            console.log(error)
            // console.log(error, chalk.bgRed('TRY WITH:2'));
            // console.log(chalk.bgBlue('<path>                   '), 'All links .md');
            // console.log(chalk.bgBlue('<path> --validate        '), 'Links with status and msg');
            // console.log(chalk.bgBlue('<path> --stats           '), 'Stats: Total and Unique links');
            // console.log(chalk.bgBlue('<path> --stats --validate'), 'Stats: Total, Unique and Broken links');
        });
}

if (processArr[3] === '--stats' && processArr[4] === '--validate') {
    // console.log(true);
    mdLinks(ruta, { combo: true })
        .then((data) => {
            // console.log(data);
            console.log(chalk.inverse('Broken: '), data.broken);
        })
        .catch((error) => {
            console.log(error)
            // console.log(chalk.bgRed('TRY WITH:'));
            // console.log(chalk.bgBlue('<path>                   '), 'All links .md');
            // console.log(chalk.bgBlue('<path> --validate        '), 'Links with status and msg');
            // console.log(chalk.bgBlue('<path> --stats           '), 'Stats: Total and Unique links');
            // console.log(chalk.bgBlue('<path> --stats --validate'), 'Stats: Total, Unique and Broken links');
        });
}

if (processArr.length === 3) {
    // console.log('no validate');
    mdLinks(ruta, { validate: false })
        .then((data) => {
            // console.log(data);
            data.forEach(element => {
                console.log('');
                console.log(chalk.bgGray('Text: ', element.text));
                console.log(chalk.cyan('Href: ', element.href));
                console.log('File: ', element.file);
            });
        })
        .catch((error) => {
            console.log(error)
            console.log(chalk.bgRed('TRY WITH:'));
            console.log(chalk.bgBlue('<path>.md <options>'));
            // console.log(chalk.bgBlue('<path>                   '), 'All links .md');
            // console.log(chalk.bgBlue('<path> --validate        '), 'Links with status and msg');
            // console.log(chalk.bgBlue('<path> --stats           '), 'Stats: Total and Unique links');
            // console.log(chalk.bgBlue('<path> --stats --validate'), 'Stats: Total, Unique and Broken links');
        });
}
