import Image from 'next/image';
import Script from 'next/script';

export default function Home() {
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
        <article>
            <div className="content">
                <h3>Post title</h3>
                <small>26/10/2022</small>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing
                    elit. Minus iste, quos nisi cumque iusto perferendis
                    id qui dolore hic doloremque numquam!
                </p>
            </div>
            <div className="tags">
                <ul>
                    <li><a href="#">Tag #1</a></li>
                    <li><a href="#">Tag #2</a></li>
                </ul>
            </div>
        </article>
        <article>
            <div className="content">
                <h3>Post title</h3>
                <small>26/10/2022</small>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing
                    elit. Minus iste, quos nisi cumque iusto perferendis
                    id qui dolore hic doloremque numquam!
                </p>
            </div>
            <div className="tags">
                <ul>
                    <li><a href="#">Tag #1</a></li>
                    <li><a href="#">Tag #2</a></li>
                </ul>
            </div>
        </article>
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
