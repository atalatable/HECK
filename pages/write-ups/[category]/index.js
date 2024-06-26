import Link from "next/link";
import Script from "next/script";
import { getAllCategories, getAllPublished } from "../../../helpers/md";

function Page({ category, posts }) {

    return (
        <>
        <h1>{category}</h1>
        {posts.map((post) => (
            <article key={post.slug}>
                <div className="content">
                    <h3><Link href={category + "/" + post.slug} >{post.frontmatter.title}</Link></h3>
                    <small>{post.frontmatter.publishedDate}</small>
                    <p>{post.frontmatter.description}</p>
                </div>
                <div className="tags">
                    <ul>
                    {post.frontmatter.tags.map((tag) => (
                        <li key={tag}>
                            <a href="#">{tag}</a>
                        </li>
                    ))}
                    </ul>
                </div>
            </article>
        ))}
        <Script src="/script/typewrite.js" />
        </>
    )
}

export async function getStaticProps({ params }) {
    const posts = getAllPublished(`posts/${params.category}`)
    const category = params.category
    return {
        props: { category, posts }
    }
}

export async function getStaticPaths() {
const categoryNames = getAllCategories("posts");

    const paths = categoryNames.map((categoryName) => ({
        params: { category: categoryName },
    }));

    return { paths, fallback: false };
}

export default Page;