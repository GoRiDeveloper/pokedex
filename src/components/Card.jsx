import { Link } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import { ModalError } from "./ModalError";

export const Card = ({ url }) => {

    const { data, loading, error } = useAxios({ url });

    const formatTypesPokemon = (types) => {

        const nameTypes = types.map(({ type }) => type.name);
        const titleTypes = nameTypes.join(" / ");
        return titleTypes;

    };

    return (
        
        <>
            {
                (error && !loading) && <ModalError error={error} />
            }
            {
                (loading && !error) && (<h6> Loading... </h6>)
            }
            {
                data && (
                    <Link
                        to={`/${data.name}`}
                        className={`card card--${data.types[0].type.name}`}
                    >

                        <div className={`card__topBox card__topBox--${data.types[0].type.name}`}>
                            <img className="card__image" src={ data.sprites.other["official-artwork"].front_default || "/assets/default-pokemon.jpg" } alt="pokemón" />
                        </div>
                        <div className="card__bottomBox">

                            <div className="card__headerInfo">

                                <h2 className={`card__heading card__heading--${data.types[0].type.name}`}> { data.name } </h2>
                                <h3 className="card__type"> { formatTypesPokemon(data.types) } </h3>
                                <p className="card__typeText"> Tipo </p>

                            </div>
                            <hr className="card__line" />
                            <div className="card__footerInfo">

                                {
                                    data.stats.slice(0, 4).map(
                                        ({ stat, base_stat }) => 
                                            (
                                                <div key={stat.url} className="card__info">
                                                    <p className="card__text"> {stat.name} </p>
                                                    <h4 className="card__number"> {base_stat} </h4>
                                                </div>
                                            )
                                    )
                                }

                            </div>

                        </div>

                    </Link>
                )
            }
        </>

    );

};