const fs = require('fs');
const path = require('path');

// Utility function to create a slug from a filename
const createSlug = (filename) => {
    return filename
        .toLowerCase()
        .replace(/[^a-z0-9.]/g, '-') // Replace non-alphanumeric (except dots) with hyphens
        .replace(/-+/g, '-')         // Replace multiple hyphens with a single hyphen
        .replace(/(^-|-$)/g, '');    // Trim leading or trailing hyphens
};

// Define the root directory
const rootDirectory = './Books PDF'; // Change this to your folder path

// Function to read folders, rename files, and generate JSON
const processFolders = (dir) => {
    const result = {};

    // Read all items in the directory
    const items = fs.readdirSync(dir);

    items.forEach(item => {
        const itemPath = path.join(dir, item);

        // Check if the item is a folder
        if (fs.statSync(itemPath).isDirectory()) {
            const books = fs.readdirSync(itemPath); // Read files inside the folder
            const renamedBooks = books.map(book => {
                const oldPath = path.join(itemPath, book);
                const newSlug = createSlug(book);
                const newPath = path.join(itemPath, newSlug);

                // Rename the file
                fs.renameSync(oldPath, newPath);

                return newSlug; // Return the renamed slug
            });

            result[item] = renamedBooks; // Use folder name as key, and slugs as values
        }
    });

    return result;
};

// Generate JSON data
const jsonData = processFolders(rootDirectory);

// File name for the JSON file
const fileName = 'output.json';

// Write JSON data to a file
fs.writeFile(fileName, JSON.stringify(jsonData, null, 4), (err) => {
    if (err) {
        console.error("Error writing file:", err);
    } else {
        console.log(`JSON file has been created: ${fileName}`);
    }
});
