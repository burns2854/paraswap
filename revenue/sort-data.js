const fs = require('fs');

// Read the data from the file
const data = fs.readFileSync('output.json', 'utf8');

// Parse the data into an array
const dataArray = JSON.parse(data);

// Creating the header row
const headerRow = ["Timestamp", ...Object.keys(dataArray[0].data), "Total Volume", "Partner Revenue", "Protocol Revenue"];

// Creating the data rows
const dataRows = dataArray.map(({ timestamp, data }) => {
  const chainIds = Object.keys(data);
  const totalVolume = chainIds.reduce((sum, chainId) => sum + data[chainId][0], 0);
  const partnerRevenue = chainIds.reduce((sum, chainId) => sum + data[chainId][1], 0);
  const protocolRevenue = chainIds.reduce((sum, chainId) => sum + data[chainId][2], 0);
  return [timestamp, ...chainIds.map(chainId => data[chainId][0]), totalVolume, partnerRevenue, protocolRevenue];
});

// Combining the header row and data rows
const allRows = [headerRow, ...dataRows];

// Converting the rows to a string
const csvData = allRows.map(row => row.join(",")).join("\n");

// Function to export the data as a CSV file
function exportToCSV(data, filename) {
  fs.writeFileSync(filename, data, 'utf8');
  console.log(`Data exported to ${filename}`);
}

// Exporting the data to a CSV file
exportToCSV(csvData, 'output2.csv');
