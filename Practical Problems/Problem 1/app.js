const fs = require('fs');

const writeToFile = (filePath, content) => {
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error(`Error writing to file: ${err.code}: ${err.message}`);
        } else {
            console.log(`Data written to ${filePath}`);
        }
    });
};

// Test cases
writeToFile('test-files/log.txt', 'Today is MSWD Exam');
writeToFile('test-files/nonexistent-folder/output.txt', 'Content in a non-existent folder.');
