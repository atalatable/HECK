import { useRouter } from "next/router";

function RenderArticle() {
    return(
        <>
        <p>Test</p>
        </>
    )
}

export async function getStaticProps({ params }) {
    console.log(params)
}

export default RenderArticle;