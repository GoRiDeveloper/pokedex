import { Link } from "react-router-dom";

export const PageNotFound = () => {

    return (

        <section className="page404">

            <h1 className="page404__heading"> Page Not Found </h1>
            <Link className="page404__btn" to="/"> Return Home </Link>

        </section>

    );

};