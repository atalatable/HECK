import { getAllCategories } from "../../helpers/md";

export default function WriteUpsHome() {
    return (
        <>
        <div>
            {/* {cat} */}
        </div>
        </>
    )
}

const getStaticProps = async () => {
    const test = await getAllCategories("posts");

    console.log(test)
};

getStaticProps()