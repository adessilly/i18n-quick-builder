const fs = require('fs');
const path = require('path');

function getAvailableLanguages() {
    const i18nDir = 'i18n';
    const fileExtension = '.json';

    try {
        const files = fs.readdirSync(i18nDir);
        const languages = files
            .filter(file => file.endsWith(fileExtension))
            .map(file => path.parse(file).name);

        return languages;
    } catch (err) {
        console.error(err);
        return [];
    }
}

function generate(templateFile, outputFileBaseName) {
    try {
        const langs = getAvailableLanguages();
        for(let lang of langs) {
            const jsonFile = `i18n/${lang}.json`;
            const outputFile = `${outputFileBaseName}-${lang}.html`;
            generateFile(templateFile, jsonFile, outputFile);
        }
    } catch(err) {
        console.error(err);
    }
}

function generateFile(templateFile, jsonFile, outputFile) {

    try {
        const jsonData = fs.readFileSync(jsonFile, 'utf8');
        const templateData = fs.readFileSync(templateFile, 'utf8');
        // Remplacer les clés dans le template HTML avec les valeurs du JSON
        const transformedHtml = templateData.replace(/{{'([^']+)'}}/g, (match, key) => {
            const value = JSON.parse(jsonData)[key];
            return value !== undefined ? value : match;
        });
        fs.writeFileSync(outputFile, transformedHtml, 'utf8');
        console.log(`Fichier généré avec succès ${outputFile}`);
    } catch(err) {
        console.error(err);
    }
}

generate('template.html', 'index');
