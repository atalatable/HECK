import Writeups from '../../../components/writeups';
import { getSinglePost, getAllCategories, getAllPublished } from "../../../helpers/md";

function RenderArticle({ post, category }) {
    return(
        <Writeups post={post} category={category} />
    );
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