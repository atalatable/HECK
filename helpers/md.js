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

    fs.readdirSync(POST_PATH, { withFileTypes: true }, (error, files) => {
        const directories = files.filter((item) => item.isDirectory()).map((item) => item.name)

        console.log(directories)

        return directories
    })

}
