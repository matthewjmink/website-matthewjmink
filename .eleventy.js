const autoprefixer = require('autoprefixer');
const postcss = require('postcss');
const postcssImport = require("postcss-import")
const fs = require('fs');
const path = require('path');

const input = 'src';
const output = 'dist';
const cssDir = 'css';

function buildCSS() {
    const mainCss = `${cssDir}/style.css`;
    const cssInput = path.join('.', input, mainCss);
    const cssOutput = path.join('.', output, mainCss);
    const css = fs.readFileSync(cssInput);

    postcss([postcssImport, autoprefixer])
        .process(css, { from: cssInput, to: cssOutput })
        .then((result) => {
            const cssOutputDir = path.dirname(cssOutput);

            if (!fs.existsSync(cssOutputDir)) fs.mkdirSync(path.dirname(cssOutput));

            fs.writeFileSync(cssOutput, result.css);
            if (result.map) fs.writeFileSync(`${cssOutput}.map`, result.map.toString());
        });
}

module.exports = function (eleventyConfig) {
    eleventyConfig.addWatchTarget(path.join('.', input, cssDir));

    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("src/index.js");


    eleventyConfig.on('afterBuild', buildCSS);
    eleventyConfig.on('beforeWatch', (changedFiles) => {
        if (changedFiles.some(file => path.extname(file) === '.css')) {
            buildCSS();
        }
    });

    eleventyConfig.setBrowserSyncConfig({
        middleware: [
            {
                route: '/',
                handle: function (req, res, next) {
                    if (req.method === 'GET') return next();
                    res.writeHead(200).end();
                }
            }
        ]
    });

    return {
        dir: {
            input: 'src',
            output: 'dist',
        },
        htmlTemplateEngine: 'njk',
    }
};
