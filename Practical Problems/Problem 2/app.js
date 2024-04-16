const { exec } = require('child_process');

const executeCommand = (command) => {
    console.log(`Command Output for: ${command}`);
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Command stderr: ${stderr}`);
            return;
        }
        console.log(`Command Output:\n${stdout}`);
    });
};

// Test cases
executeCommand('ls -la');
executeCommand('echo "Hello, Node.js!"');
