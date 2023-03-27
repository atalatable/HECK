import { getAllCategories, getAllPosts } from "../../helpers/md";

function WriteUpsHome({ out }) {
    return (
        <>
        <section>

            <h2>Write-ups</h2>
            <hr />
                {out.map(({ category, posts }) => (
                    <div className="accordion open">
                        <div className="item">
                            <button>
                                <span>{category}</span>
                                <i className="fa-solid fa-caret-right"></i>
                            </button>
                        </div>
                        <div className="content">
                            <div className="inner">
                                {posts.map((post) => (
                                        <article>
                                            <div className="content">
                                                <h3>
                                                    {post.frontmatter.title}
                                                </h3>
                                                <small>wu.data</small>
                                                <p>
                                                    Ipsum asperiores iste quo expedita est voluptatum. Qui saepe
                                                    tempore alias debitis quis Adipisicing eaque explicabo delectus
                                                    eum consectetur, tempore?
                                                </p>
                                            </div>
                                        <div className="tags">
                                            <ul>
                                                <li><a href="#">Tag #1</a></li>
                                                <li><a href="#">Tag #2</a></li>
                                            </ul>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
        </section>
        </>
    )
}

export const getStaticProps = async () => {
    const categories = getAllCategories("posts");

    const out = categories.map((category) => {
        const posts = getAllPosts(`posts/${category}`);
        console.log(posts.frontmatter)
        return { category, posts };
    });

    return {
        props: { out },
    };
};

export default WriteUpsHome;