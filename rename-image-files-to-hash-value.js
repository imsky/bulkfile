const path = require('path');

const shell = require('shelljs');
const imghash = require('imghash');

const dir = process.argv[2];

(async function () {
  shell.cd(dir);

  const imageFiles = shell.ls('*.{jpg,jpeg,png}');

  for (const f of imageFiles) {
    if (f.startsWith('.')) {
      continue;
    }
    const hash = await imghash.hash(path.join(dir, f));
    console.log(f, hash);
  }
})();
