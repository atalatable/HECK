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

export const getAllPosts = (folder) => {

    const POSTS_PATH = getPath(folder)

    return fs
        .readdirSync(POSTS_PATH) // get files in directory
        .map((fileName) => { // map over each file
            const source = getFileContent(fileName, folder); // retrieve the file contents
            const slug = fileName.replace(/\\.md?$/, ""); // get the slug from the filename
            const { data } = matter(source); // extract frontmatter
            return {
                frontmatter: data,
                slug: slug,
            };
        });
};

export const getAllPublished = (folder) => {
    const posts = getAllPosts(folder)

    const published = posts.filter((post) => {
        return post.frontmatter.isPublished === true
    })

    return published;
}

export const getSinglePost = (slug, folder) => {
    const source = getFileContent(`${slug}.md`, folder);
    const { data: frontmatter, content } = matter(source);

    return {
        frontmatter,
        content,
    };
};