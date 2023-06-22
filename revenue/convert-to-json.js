const fs = require('fs');

// Read the data from the text file
const textData = fs.readFileSync('breakdown-by-chain.txt', 'utf8');

// Parse the text data into an array
const dataArray = JSON.parse(textData);

// Create an array to store the converted JSON objects
const jsonDataArray = [];

// Iterate over each inner array in the data array
for (const [timestamp, dataObject] of dataArray) {
  const jsonObject = {
    timestamp: timestamp,
    data: dataObject,
  };

  jsonDataArray.push(jsonObject);
}


// Convert the JSON data array to a string
const jsonString = JSON.stringify(jsonDataArray, null, 2);

// Write the JSON string to a file
fs.writeFileSync('output.json', jsonString);

console.log('Conversion complete!');