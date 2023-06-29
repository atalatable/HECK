import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighliter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import styles from '../styles/writeups.module.css';

export default function Writeups({ post, category }) {

    const [theme, setTheme] = useState("")

    useEffect(() => {
        const item = localStorage.getItem('theme')
        setTheme(item);
    }, [])

    return(
        <>
        <article style={{margin: 0}}>
            <div className="content">
                <h1>{category} - {post.frontmatter.title}</h1>
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

        <hr/>
        <div className="wu-content">
            <div className={`${styles.prose} ${theme == "dark" ? styles["prose-invert"] : ""}`}>
                <ReactMarkdown
                    components={{
                        code({node, inline, className, children, ...props}) {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                                <SyntaxHighliter
                                    {...props}
                                    style={vscDarkPlus}
                                    language={match[1]}
                                    PreTag="div"
                                >
                                {String(children).replace(/\n$/, '')}
                                </SyntaxHighliter>
                            ) : (<code {...props} className={className}>{children}</code>)
                        }
                    }}
                >
                {post.content}
                </ReactMarkdown>
            </div>
        </div>
        </>
    )
}
