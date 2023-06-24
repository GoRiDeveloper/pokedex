import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Card } from "../components/Card";
import { paginationLogic } from "../utils/paginationLogic";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const URL_LIMIT = import.meta.env.VITE_URL_LIMIT;

export const Home = () => {

    const [pokemons, setPokemons] = useState([]);
    const [pokemonName, setPokemonName] = useState("");
    const [types, setTypes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentType, setCurrentType] = useState("");
    const { username } = useSelector(store => store.user);

    const pokemonsUrl = `${BASE_URL}/pokemon?limit=${URL_LIMIT}`;
    const typesPokemonsUrl = `${BASE_URL}/type`;

    useEffect(() => {

        if (currentType) {

            const currentTypePokemonUrl = `${typesPokemonsUrl}/${currentType}`;

            axios.get(currentTypePokemonUrl)
                .then((res) => {
                    const pokemonsByType = res.data.pokemon.map(({ pokemon }) => pokemon);
                    setPokemons(pokemonsByType);
                })
                .catch(err => console.log(err));

        };

    }, [currentType]);

    if (pokemons.length <= 0 && !currentType && window !== undefined) {

        axios.get(pokemonsUrl)
            .then((res) => setPokemons(res.data.results))
            .catch((err) => console.log(err));

    };
    if (types.length <= 0 && window !== undefined) {

        axios.get(typesPokemonsUrl)
            .then((res) => {
                const newTypes = res.data.results.map((type) => type);
                setTypes(newTypes);
            })
            .catch((err) => console.log(err));

    };
    if ((pokemonName || currentType) && currentPage !== 1) setCurrentPage(1);

    const pokemonsByName = pokemons.filter(pokemon => 
        pokemon.name.toLowerCase().includes(pokemonName.toLocaleLowerCase())
    );
    const { elementsInPage, lastPage, pagesInBlock } = paginationLogic({
        pagesPerBlock: 7,
        elementsPerPage: 24,
        elements: pokemonsByName,
        currentPage
    });
    const handlePreviusPage = () => {

        const newCurrentPage = currentPage - 1;
        if (newCurrentPage > 0)
            setCurrentPage(newCurrentPage);

    };
    const handleNextPage = () => {

        const newCurrentPage = currentPage + 1;
        if (newCurrentPage <= lastPage)
            setCurrentPage(newCurrentPage);

    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const value = e.target.search.value;
        setPokemonName(value);
    };
    const handleListOfTypes = ({ target }) =>
        setCurrentType(target.dataset.name);

    return (

        <section className="home">

            <h1 className="home__heading">
                <span className="home__heading--user"> Welcome { username }, </span>
                here you can find your favorite pokemon
            </h1>
            <div className="home__classification">
                <form className="home__form" onSubmit={handleSubmit}>
                    <input className="home__search" id="search" type="text" placeholder="Search Pokemon" />
                    <button className="home__searchBtn"> Search </button>
                </form>
                <div className="home__categories">
                    <svg className="home__chevronDown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                    </svg>
                    <div
                        className="home__select"
                        data-content={currentType ? currentType : "All Pokemons"}
                    >
                        <ul className="home__options">

                            <li
                                className="home__option"
                                data-name=""
                                onClick={handleListOfTypes}
                            >
                                All
                            </li>
                            {
                                types.map((type) => (
                                    <li
                                        className="home__option"
                                        key={type.url}
                                        data-name={type.name}
                                        onClick={handleListOfTypes}
                                    >
                                        {type.name}
                                    </li>
                                ))
                            }

                        </ul>
                    </div>
                </div>
            </div>
            <section className="home__cardsContainer">
                {
                    elementsInPage.map((item) => (<Card key={item.url} url={item.url} />))
                }
            </section>
            <ul className="home__pagination">
                <li
                    className="home__page home__page--btn"
                    onClick={() => setCurrentPage(1)}
                >
                    {"<<"}
                </li>
                <li
                    className="home__page home__page--btn"
                    onClick={handlePreviusPage}
                >
                    {"<"}
                </li>
                {
                    pagesInBlock.map(numberPage => (
                        <li
                            key={numberPage}
                            className={`home__page ${
                                numberPage === currentPage && "home__page--btn"
                            }`}
                            onClick={() => setCurrentPage(numberPage)}
                        >
                            { numberPage }
                        </li>
                    ))
                }
                <li
                    className="home__page home__page--btn"
                    onClick={handleNextPage}
                >
                    {">"}
                </li>
                <li
                    className="home__page home__page--btn"
                    onClick={() => setCurrentPage(lastPage)}
                >
                    {">>"}
                </li>
            </ul>

        </section>

    );

};