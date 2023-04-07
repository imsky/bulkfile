const path = require('path');
const fs = require('fs');

const shell = require('shelljs');
const id3 = require('node-id3');

const dir = process.argv[2];

const reports = {
  missingYear: [],
  extraSuffixes: []
};

(async function () {
  shell.cd(dir);

  const musicFiles = shell.ls('*.mp3');

  for (const f of musicFiles) {
    if (f.startsWith('.')) {
      continue;
    }
    const file = fs.readFileSync(path.join(dir, f));
    const tags = id3.read(file);
    if (!tags.year) {
      reports.missingYear.push(f);
    }
    if (file.includes('Original Mix') || (tags.title && tags.title.includes('Original Mix'))) {
      reports.extraSuffixes.push(f);
    }
  }

  console.log(reports);
})();
