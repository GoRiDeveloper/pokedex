import { useNavigate } from "react-router-dom";

export const ModalError = ({ error }) => {

    const navigate = useNavigate();
    const handleExit = () => navigate("/");

    return (

        <dialog className="modalError">
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="modalError__exit" 
                onClick={handleExit}
                viewBox="0 0 24 24"
            >
                <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
            </svg>
            <h3 className="modalError__text"> {error.errMessage} </h3>
        </dialog>

    );

};