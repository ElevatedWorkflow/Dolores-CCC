const fs = require('fs');
const path = require('path');

function getDirectoryTree(dir, prefix = '') {
  let tree = '';
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const isDirectory = fs.statSync(filePath).isDirectory();

    tree += prefix + (isDirectory ? '[D] ' : '[F] ') + file + '\n';
    if (isDirectory) {
      tree += getDirectoryTree(filePath, prefix + '  ');
    }
  }

  return tree;
}

const rootDir = './src/'; // Replace with your folder path
const outputFile = './directory_tree.txt'; // Replace with your output file path

const tree = getDirectoryTree(rootDir);
fs.writeFileSync(outputFile, tree);

console.log('Directory tree has been saved to', outputFile);