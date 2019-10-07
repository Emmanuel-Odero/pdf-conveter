const readdirp = require('readdirp');
const fs = require('fs-extra');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const inputDir = '';
const inputExt = 'doc';
const outputDir = '';
const outputExt = 'pdf';
let failedList = [];

const read = async directory => {
  let files = await readdirp.promise(directory, {
    alwaysStat: false,
    fileFilter: `*.${inputExt}`
  });

  if (files && files.length == 0)
    throw new Error('Given input directory is empty');

  files = files.map(file => {
    return {
      fullPath: file.fullPath,
      path: file.path,
      filename: file.basename
    };
  });
  return files;
};

read(inputDir).then(async files => {
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    try {
      console.log(`${index} / ${files.length} process started`);
      var r = /[^\/]*$/;
      let outputPath = file.path.replace(r, '');
      outputPath = path.join(outputDir, outputPath);
      let filename = path.basename(file.filename, inputExt);
      let isFileExist = await fs.pathExists(
        path.join(outputPath, filename, outputExt)
      );
      if (!isFileExist) {
        await fs.ensureDir(outputPath);
        var command = `soffice --headless --convert-to ${outputExt} --outdir ${outputPath} ${file.fullPath}`;
        const { stdout, stderr } = await exec(command);
        if (stderr) {
          console.error(`ERROR: ${stderr}`);
          failedList.push(file.path);
        }
      } else {
        console.log(
          `${index} :: File already converted ${filename}${outputExt}`
        );
      }
      console.log(`${index} / ${files.length} process completed`);
    } catch (error) {
      failedList.push(file.path);
    }
  }
  fs.writeFileSync('failedList.txt', _.uniq(failedList).toString());
});
