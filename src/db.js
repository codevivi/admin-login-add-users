import { writeFile, mkdir, readFile } from "node:fs/promises";
const DB_PATH = new URL("./database/", import.meta.url).pathname;
const DB_NAME = "admin-users.json";
const DB = DB_PATH + "/" + DB_NAME;
const DEFAULT_DATA = `[{"name":"admin", "email": "admin@bit.lt", "password":"1234"}]`;

export const saveData = async function save(data) {
  let currentData = JSON.parse(await getData());
  currentData.push(data);
  return await writeData(JSON.stringify(currentData));
};

export const getData = async function () {
  try {
    return await readFile(DB, "utf-8");
  } catch (err) {
    return DEFAULT_DATA; //if file empty or not created
  }
};

async function writeData(data) {
  await mkdir(DB_PATH, { recursive: true });
  await writeFile(DB, data);
}
