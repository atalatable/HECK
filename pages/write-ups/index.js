import Link from "next/link";
import { getAllCategories, getAllPublished } from "../../helpers/md";
import { useState } from 'react';
import Script from "next/script";

function WriteUpsHome({ out }) {

  const [isOpen, setIsOpen] = useState({});

  function handleAccordion(category) {
    setIsOpen((prevState) => ({
      ...prevState,
      [category]: !prevState[category]
    }));
  }

  return (
    <>
      <section>
        <h2>Write-ups</h2>
        <hr />
        {out.map(({ category, posts }) => (
          <div key={"k1" + category} className={`accordion ${isOpen[category] ? 'open' : ''}`}>
            <div onClick={() => handleAccordion(category)} key={category} className="item">
              <button>
                <span><Link href={`write-ups/${category}`}>{category}</Link></span>
                <i className="fa-solid fa-caret-right"></i>
              </button>
            </div>
            <div className="content" key={"k" + category}>
              <div className="inner">
                {posts.map((post) => (
                  <article key={post.slug}>
                    <div className="content">
                    <h3><Link href={`write-ups/${category}/${post.slug}`}>{post.frontmatter.title}</Link></h3>
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
      <Script src="/script/typewrite.js" />
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