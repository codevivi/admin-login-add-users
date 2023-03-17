import { writeFile, mkdir, readFile } from "node:fs/promises";
const fileName = "database.json";
const dirPath = new URL("./database/", import.meta.url).pathname;
export const save = async function save(data) {
  /// Read  and parse current file data
  let currentData = JSON.parse(await readFileData());

  /// Append new data to array
  currentData.push(data);

  /// Save new updated array to file as json

  /// Save new updated array to file as json
  await writeDataToFile(JSON.stringify(currentData));
};

async function writeDataToFile(data) {
  try {
    await mkdir(dirPath, { recursive: true });
    await writeFile(`${dirPath}/${fileName}`, data);
  } catch (err) {
    console.error(err.message);
  }
}

export const readFileData = async function readFileData() {
  try {
    return await readFile(`${dirPath}/${fileName}`);
  } catch (err) {
    return "[]"; //if file empty or not created
  }
};
