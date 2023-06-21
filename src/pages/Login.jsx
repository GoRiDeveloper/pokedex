import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeUsername } from "../store/slices/user";

export const Login = () => {

    const { username } = useSelector(store => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    if (username) {
        return <Navigate to="/" />
    };

    const handleSubmit = (e) => {

        e.preventDefault();
        const name = e.target.coachName.value;
        dispatch(changeUsername(name));
        navigate("/");

    };
    
    return (

        <section className="login">

            <div className="login__logo">
                <img className="login__image" src="/assets/logo/logo.png" alt="logo pokédex" />
            </div>
            <div className="login__info">
                <h1 className="login__heading"> ¡Hello Coach! </h1>
                <p className="login__text"> So we can start, give me your name </p>
            </div>
            <form
                className="login__form"
                onSubmit={handleSubmit}
            >
                <input
                    className="login__input"
                    id="coachName"
                    type="text"
                    placeholder="Your Name..."
                    required
                />
                <button className="login__btn" > Start </button>
            </form>

        </section>

    );

};