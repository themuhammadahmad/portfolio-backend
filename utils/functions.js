// utils/fileHelpers.js
const fs = require("fs");

function getPrevData(dataFilePath) {
  try {
    const raw = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to read data file:", err);
    return [];
  }
}

function addContactData(dataFilePath, entry) {
  const data = getPrevData(dataFilePath);
  data.push(entry);
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

module.exports = { getPrevData, addContactData };
