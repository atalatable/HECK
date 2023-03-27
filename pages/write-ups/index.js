import { getAllCategories, getAllPublished } from "../../helpers/md";

function WriteUpsHome({ out }) {
  return (
    <>
      <section>
        <h2>Write-ups</h2>
        <hr />
        {out.map(({ category, posts }) => (
          <div key={category} className="accordion open">
            <div className="item">
              <button>
                <span>{category}</span>
                <i className="fa-solid fa-caret-right"></i>
              </button>
            </div>
            <div className="content">
              <div className="inner">
                {posts.map((post) => (
                  <article key={post.slug}>
                    <div className="content">
                      <h3>{post.frontmatter.title}</h3>
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
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export const getStaticProps = async () => {
    const categories = getAllCategories("posts");

    const out = categories.map((category) => {
        const posts = getAllPublished(`posts/${category}`);
        return { category, posts };
    });

    return {
        props: { out },
    };
};

export default WriteUpsHome;