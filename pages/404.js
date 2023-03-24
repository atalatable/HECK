import Script from "next/script";

export default function NotFound() {
    return (
        <>
        <div className="not_found_div">
            <h1>404</h1>
            <h1>Page not found</h1>
        </div>

        <Script src="/script/main.js" />
        </>
    );
}