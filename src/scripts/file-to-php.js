const path = require('path');
const fs = require('fs');

const shelljs = require('shelljs');
const Rootfile = shelljs.dirs()[0];
const htmlfile = path.resolve(Rootfile, 'for-php-dist/index.html');
fs.readFile(htmlfile, (err, data) => {
    if (err) throw err;
    let content = data.toString();
    let scriptsStart = content.search('<script src="');
    let scriptsEnd = content.search('></script>');
    let scripts = [];
    scripts.push(content.slice(scriptsStart, scriptsEnd+1));
    console.log(scripts);
})
