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

    let cat = fs.readdirSync(POST_PATH, { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map((item) => item.name);

    if( cat.length > 1 ) {
        return cat.sort((a, b) => {
            let s1 = fs.statSync(path.join(POST_PATH, a));
            let s2 = fs.statSync(path.join(POST_PATH, b));
            return s2.mtimeMs - s1.mtimeMs;
        })
    } else {
        return cat;
    }
}

export const getAllPosts = (folder) => {

    const POSTS_PATH = getPath(folder)

    return fs
        .readdirSync(POSTS_PATH) // get files in directory
        .map((fileName) => { // map over each file
            const source = getFileContent(fileName, folder); // retrieve the file contents
            const slug = fileName.replace(/.md$/, ""); // get the slug from the filename
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

export const getTwoLastPosts = (amount) => {
    const categories = getAllCategories("posts");

    const out = [];

    categories.forEach((cat) => {
        const props = getAllPublished(`posts/${cat}`);
        props.forEach(prop => {
            prop.category = cat;
            out.push(prop);
        });
    });

    out.sort((a, b) => {
        const dateA = new Date(a.frontmatter.publishedDate.split('/').reverse().join('/'));
        const dateB = new Date(b.frontmatter.publishedDate.split('/').reverse().join('/'));
        return dateA - dateB;
    });

    return out.slice(-amount).reverse();
}
