import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { getTwoLastPosts } from '../helpers/md';

export default function Home({ posts }) {
  return (
    <>
    <section className="nobackground" id="menu-profile">
        <Image className="img" src="/images/logo-round.png" alt="" width={280} height={280}/>
        <div className="socials">
            <Link href="https://discord.com/users/400629408312066049" target='_blank'><i title="Atalata#2363" data-command-text="ping discord" className="fab fa-discord"></i></Link>
            <Link href="https://github.com/atalatable/" target='_blank'><i data-command-text="ping github" className="fab fa-github"></i></Link>
            <Link href="https://www.root-me.org/atalata" target='_blank'><img data-command-text="ping root-me" src="/images/rootme.svg" /></Link>
        </div>
    </section>
    <section>
        <h2>Latest posts</h2>
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
    {/* <section className="nobackground wrapper">
        <h2>Les coupains</h2>
        <hr />
        <div className="content">
            <Image className="img" src="https://avatars.githubusercontent.com/u/90158435?v=4" alt="" width={128} height={128}/>
            <Image className="img" src="https://avatars.githubusercontent.com/u/82236839?v=4" alt="" width={128} height={128}/>
        </div>
    </section> */}

    <Script src="/script/typewrite.js" />
    </>
  )
}

export const getStaticProps = async () => {
    const posts = getTwoLastPosts(3);

    return {
        props: { posts },
    };
}
