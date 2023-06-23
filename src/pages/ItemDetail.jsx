import { useParams } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import { ModalError } from "../components/ModalError";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const ItemDetail = () => {

    const { name } = useParams();

    const url = `${BASE_URL}/pokemon/${name}`;

    const { data, loading, error } = useAxios({ url });

    const percentProgressStat = (baseStat) => {

        const STAT_MAX = 255;
        const STAT_VALUE = (baseStat * 100) / STAT_MAX;

        return `${STAT_VALUE}%`;

    };

    return (

        <>
            { (loading && !error) && <h6 className="loader"> Loading... </h6> }
            { (error && !loading) && <ModalError error={error} /> }
            { 
                data && (

                    <section className="itemDetail">

                        <div className="itemDetail__firstInfoBox">

                            <div className={`itemDetail__firstInfoImage itemDetail__firstInfoImage--${ data.types[0].type.name}`}>
                                <img className="itemDetail__image" src={ data.sprites.other["official-artwork"].front_default || "/assets/default-pokemon.jpg" } alt={data.name} />
                            </div>
                            <section className="itemDetail__firstInfo">

                                <h2 className="itemDetail__number"> #{ data.order } </h2>
                                <hr className="itemDetail__line" />
                                <h1 className={`itemDetail__heading itemDetail__heading--${data.types[0].type.name}`}> { data.name } </h1>
                                <div className="itemDetail__details">
                                    <article className="itemDetail__detail itemDetail__detail--weight">
                                        <h3 className="itemDetail__detailTitle"> Weight </h3>
                                        <p className="itemDetail__detailText">{ data.weight }</p>
                                    </article>
                                    <article className="itemDetail__detail itemDetail__detail--height">
                                        <h3 className="itemDetail__detailTitle"> Height </h3>
                                        <p className="itemDetail__detailText">{ data.height }</p>
                                    </article>
                                </div>
                                <div className="itemDetail__characteristics">
                                    <article className="itemDetail__characteristic">
                                        <h3 className="itemDetail__characteristicTitle"> Type </h3>
                                        <div className="itemDetail__characteristicNameBox">
                                            {
                                                data.types.map(({ type }, i) => (
                                                    <h4
                                                        className={`itemDetail__characteristicName ${
                                                            i === 1 && "itemDetail__characteristicName--purple" || ""
                                                        }`}
                                                        key={type.url}
                                                    >
                                                        {type.name}
                                                    </h4>
                                                ))
                                            }
                                        </div>
                                    </article>
                                    <article className="itemDetail__characteristic itemDetail__characteristic--abilities">
                                        <h3 className="itemDetail__characteristicTitle"> Abilities </h3>
                                        <div className="itemDetail__characteristicNameBox">
                                            {
                                                data.abilities.map(({ability}) => (
                                                    <h4
                                                        className="itemDetail__characteristicName itemDetail__characteristicName--abilities"
                                                        key={ability.url}
                                                    >
                                                        {ability.name}
                                                    </h4>
                                                ))
                                            }
                                        </div>
                                    </article>
                                </div>
                                <section className="itemDetail__statsContainer">
                                    <h3 className="itemDetail__statHeading"> Stat </h3>
                                    <hr className="itemDetail__statLine" />
                                    <img className="itemDetail__statImg" src="/assets/pokeball.png" alt="pokeball" />
                                </section>
                                <div className="itemDetail__stats">
                                {
                                    data.stats.map(({ base_stat, stat }) => (
                                        <div className="itemDetail__statContainer" key={stat.url}>
                                            <section className="itemDetail__statInfo">
                                                <h4 className="itemDetail__statInfoHeading"> {stat.name.toUpperCase()} : </h4>
                                                <span className="itemDetail__statBase"> {base_stat} / 255 </span>
                                            </section>
                                            <div className="itemDetail__statBox">
                                                <div className="itemDetail__stat" style={{ "--width": percentProgressStat(base_stat) }} ></div>
                                            </div>
                                        </div>
                                    ))
                                }                                            
                                </div>

                            </section>

                        </div>
                        <div className="itemDetail__secondInfoBox">
                            <div className="itemDetail__secondInfo">
                                <article className="itemDetail__movementsInfoBox">
                                    <h2 className="itemDetail__movementsHeading"> Movements </h2>
                                    <hr className="itemDetail__movementsLine" />
                                    <img className="itemDetail__movementsPokeball" src="/assets/pokeball.png" alt="pokeball" />
                                </article>
                                <div className="itemDetail__movementsBox">
                                    {
                                        data.moves.map(({ move }) => (
                                            <h3 key={move.url} className="itemDetail__movement"> {move.name} </h3>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                    </section>

                )
            }

        </>

    );

};