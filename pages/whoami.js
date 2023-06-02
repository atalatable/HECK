import Script from "next/script";

export default function NotFound() {
    return (
        <>
        <div className="not_found_div">
            <h1>Coming soon...</h1>
        </div>
        <Script src="/script/typewrite.js" />
        </>
    );
}