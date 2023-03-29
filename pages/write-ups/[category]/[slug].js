import { useRouter } from "next/router";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { getSinglePost, getAllCategories, getAllPublished } from "../../../helpers/md";

function RenderArticle({ post, category }) {
    return(
        <>
        <h1>{category} - {post.frontmatter.title}</h1>
        <p>{post.frontmatter.publishedDate}</p>
        <p>{post.frontmatter.description}</p>
        <ul>
            {post.frontmatter.tags.map((tag) => (
                <li key={tag}>
                    <a href="#">{tag}</a>
                </li>
            ))}
        </ul>
        <hr/>
        <div className="wu-content">
            <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
        </>
    )
}

export async function getStaticProps({ params }) {
    const post = getSinglePost(params.slug,`posts/${params.category}`);
    const category = params.category

    return {
        props: { post, category }
    }
}

export async function getStaticPaths() {

    const categoryNames = getAllCategories("posts");

    const paths = categoryNames.flatMap((categoryName) => {
        const slugs = getAllPublished(`posts/${categoryName}`)
        return slugs.map((slug) => ({
            params: { category: categoryName, slug: slug.slug },
        }))
    })

    return {
        paths: paths,
        fallback: false,
    }
}

export default RenderArticle;