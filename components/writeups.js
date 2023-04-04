import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import styles from '../styles/writeups.module.css'

export default function writeups({ post, category }) {
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
            <div className={`${styles.prose} ${styles["prose-invert"]}`}>
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
        </div>
        </>
    )
}
  