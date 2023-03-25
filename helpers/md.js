import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getPath(folder) {
    return path.join(process.cwd(), `/${folder}`)
}

export function getFileContent(filename, folder) {
    const _PATH = getPath(folder)
    return fs.readFileSync(path.join(_PATH, filename), 'utf-8')
}

export function getAllCategories(folder) {
    const POST_PATH = getPath(folder);

    return fs.readdirSync(POST_PATH, { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map((item) => item.name);

}