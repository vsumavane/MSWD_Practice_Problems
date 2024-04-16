const path = require('path');

const checkFileExtension = (filePath, expectedExtension) => {
    const actualExtension = path.extname(filePath);

    if (actualExtension === expectedExtension) {
        console.log(`File has the expected extension: ${expectedExtension}`);
    } else {
        console.log(`File does not have the expected extension. Expected: ${expectedExtension}, Actual: ${actualExtension}`);
    }
};

// Test cases
checkFileExtension('test-files/report.pdf', '.pdf');
checkFileExtension('test-files/profile_pic.png', '.jpg');
