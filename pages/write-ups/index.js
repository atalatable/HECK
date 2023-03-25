import { getAllCategories } from "../../helpers/md";

function WriteUpsHome({ cats }) {
    return (
        <>
        <section>

            <h2>Write-ups</h2>
            <hr />
                {cats.map((cat) => 
                    <div className="accordion">
                        <div className="item">
                            <button>
                                <span>{cat}</span>
                                <i className="fa-solid fa-caret-right"></i>
                            </button>
                        </div>
                        <div className="content">
                            <div className="inner">
                            </div>
                        </div>
                    </div>
                )}
        </section>
        </>
    )
}

export const getStaticProps = async () => {
    const cats = getAllCategories("posts");

    return {
        props: { cats },
    };
};

export default WriteUpsHome;