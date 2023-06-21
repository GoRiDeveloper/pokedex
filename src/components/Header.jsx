import { useDispatch } from "react-redux";
import { resetUsername } from "../store/slices/user";

export const Header = () => {
    
    const dispatch = useDispatch();

    const handleExit = () => dispatch(resetUsername());

    return (

        <header className="header">
            <img className="header__bg" src="/assets/backgrounds/bg-header.png" alt="background pokemón" />
            <div className="header__logo">
                <img className="header__image" src="/assets/logo/logo.png" alt="logo pokédex" />
            </div>
            <button
                className="header__btn"
                onClick={handleExit}
            >
                Exit
            </button>
        </header>

    );

};