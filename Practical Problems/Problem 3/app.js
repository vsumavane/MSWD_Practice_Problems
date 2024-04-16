const path = require('path');

const resolvePath = (relativePath) => {
    const absolutePath = path.resolve(relativePath);
    console.log(`Resolved Path: ${absolutePath}`);
};

// Test cases
resolvePath('../project/folder/file.txt');
resolvePath('nonexistent-folder/file.txt');
