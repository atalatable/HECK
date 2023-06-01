import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { getTwoLastPosts } from '../helpers/md';

export default function Home({ posts }) {
  return (
    <>
    <section className="nobackground" id="menu-profile">
        <Image className="img" src="https://avatars.githubusercontent.com/u/82236839?v=4" alt="" width={288} height={288}/>
        <div className="socials">
            <i data-command-text="ping discord" className="fab fa-discord"></i>
            <i data-command-text="ping github" className="fab fa-github"></i>
        </div>
    </section>
    <section>
        <h2>Latest news</h2>
        <hr />

        {posts.map((post) => (
            <article key={post.slug}>
                <div className="content">
                    <h3><Link href={"write-ups/" + post.category + "/" + post.slug} >{post.category} - {post.frontmatter.title}</Link></h3>
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
    </section>
    <section className="nobackground wrapper">
        <h2>Les coupains</h2>
        <hr />
        <div className="content">
            <Image className="img" src="https://avatars.githubusercontent.com/u/90158435?v=4" alt="" width={128} height={128}/>
            <Image className="img" src="https://avatars.githubusercontent.com/u/82236839?v=4" alt="" width={128} height={128}/>
        </div>
    </section>

    <Script src="/script/main.js" />
    </>
  )
}

export const getStaticProps = async () => {
    const posts = getTwoLastPosts();

    return {
        props: { posts },
    };
}