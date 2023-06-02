import Head from "next/head";
import Link from "next/link";
import Script from "next/script";

export default function Layout({ children }) {
    return (
        <>
        <Head>
            <title>Atalata</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"></link>
        </Head>
        
        <div id="theme-toggler">
            <i className="fa-solid fa-sun"></i>
        </div>

        <Script src="/script/main.js" />
        
        <header>
            <nav>
                <h1><Link href="/">@Username:/ $ </Link><span className="command"></span></h1>
                <ul>
                    <Link href="/"><li data-command-text="cd home">~/home</li></Link>
                    <Link href="/write-ups"><li data-command-text="cd write-ups">~/write-ups</li></Link>
                    <Link href="/whoami"><li data-command-text="cd whoami">~/whoami</li></Link>
                </ul>
                <i className="fa-solid fa-bars" id="burger-menu"></i>
            </nav>
            <nav id="mobile-nav">
                <i className="fa-solid fa-times" id="close-mobile-menu"></i>
                <ul>
                    <Link href="/"><li>~/home</li></Link>
                    <Link href="/write-ups"><li>~/write-ups</li></Link>
                    <Link href="/whoami"><li>~/whoami</li></Link>
                </ul>
            </nav>
        </header>

        <main>{children}</main>

        <footer>
            <div id="footer-container">
                <ul id="media">
                    <li><a href="#">Root-me</a></li>
                    <li><a href="#"></a></li>
                </ul>
                <p>Site made by Atalata and KrishenK</p>
                <ul id="sitemap">
                    <h3>Site map</h3>
                    <li><Link href="/">/home</Link></li>
                    <li><Link href="/write-ups">/write-ups</Link></li>
                    <li><Link href="/whoami">/whoami</Link></li>
                </ul>
            </div>
        </footer> 
        </>
    );
}