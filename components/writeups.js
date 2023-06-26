import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useEffect, useState } from "react";
import styles from '../styles/writeups.module.css';

export default function Writeups({ post, category }) {

    const [theme, setTheme] = useState("")

    useEffect(() => {
        const item = localStorage.getItem('theme')
        setTheme(item);
    }, [])
    
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
            <div className={`${styles.prose} ${theme == "dark" ? styles["prose-invert"] : ""}`}>
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
        </div>
        </>
    )
}
