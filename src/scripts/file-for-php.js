const path = require('path');
const fs = require('fs');

const shelljs = require('shelljs');


const cmdPath = shelljs.dirs()[0];
const forPhpDist = path.resolve(cmdPath, 'for-php-dist');
if (!fs.existsSync(forPhpDist)) {
    shelljs.mkdir(forPhpDist);
}

const distPath = path.resolve(cmdPath, 'dist');

shelljs.cd(distPath);

async function flatDir(dirpath) {
    const dir = await fs.promises.opendir(dirpath);
    for await (const dirent of dir) {
        if (dirent.isDirectory()) {
            let direntDirPath = path.resolve(forPhpDist, dirent.name);
            // 生成目录
            if (!fs.existsSync(direntDirPath)) shelljs.mkdir(direntDirPath);
            // 递归文件
            flatDir(`${dirpath}/${dirent.name}`);
        }

        let sourceFile = `${dirpath}/${dirent.name}`;
        let targetFile = dirpath.replace('dist', 'for-php-dist');
        if (fs.existsSync(`targetFile/${dirent.name}`)) return;
        await copyFile(sourceFile, targetFile);
    }
}

async function copyFile(sourceFile, targetFile) {
    shelljs.cp(sourceFile, targetFile);
}

flatDir(distPath).catch(console.error);

