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

/*
*   Return all categories ordered by latest post date
*/
export function getAllCategories(folder) {
    const POST_PATH = getPath(folder);

    let timing = {}

    let cats = fs.readdirSync(POST_PATH, { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map((item) => item.name);

    cats.map(cat => {
        const posts = getAllPublished(`posts/${cat}`);

        posts.sort((a, b) => {
            const dateA = new Date(a.frontmatter.publishedDate.split('/').reverse().join('/'));
            const dateB = new Date(b.frontmatter.publishedDate.split('/').reverse().join('/'));
            return dateB - dateA;
        });

        timing[cat] = posts[0].frontmatter.publishedDate;
    });

    const ordered = Object.entries(timing).sort(([, dateA], [, dateB]) => {
        const [dayA, monthA, yearA] = dateA.split('/');
        const [dayB, monthB, yearB] = dateB.split('/');
        const dateObjA = new Date(`${monthA}/${dayA}/${yearA}`);
        const dateObjB = new Date(`${monthB}/${dayB}/${yearB}`);
        return dateObjB - dateObjA;
    }).reduce((acc, [key]) => {
        acc.push(key);
        return acc;
    }, []);

    return ordered
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
        })
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

// orders by last modified file date
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
