import { useMemo } from "react";
import { useParams, Redirect } from "react-router"
import { getHeroById } from "../../selectors/getHeroById";

// import batman from '../../assets/heroes/dc-batman.jpg'; // estático
import { heroImages } from "../../helpers/heroImages"

export const HeroScreen = ({ history }) => {

    const { heroId } = useParams();

    const hero = useMemo(() => getHeroById( heroId ), [ heroId ])

    if ( !hero ) {
        return <Redirect to="/" />
    }

    const handleReturn = () => {

        if (history.length <= 2) {
            history.push('/')
        }else{            
            history.goBack();
        }
    }
    
    
    const {
        superhero, 
        publisher, 
        alter_ego, 
        first_appearance, 
        characters
    } = hero;

    return (
        <div className="row mt-5">
            <div className="col-4">
                <img
                    // src={ `../assets/heroes/${ heroId }.jpg` } // desde public/assets
                    // src={ batman } // import
                    src={ heroImages(`./${ heroId }.jpg`).default }
                    alt={ superhero }
                    className="img-thumbnail animate__animated animate__fadeInLeft"
                />
            </div>
            <div className="col-8 animate__animated animate__fadeIn">
                <h3>{ superhero }</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>Alter ego:</b> { alter_ego }</li>
                    <li className="list-group-item"><b>Pubisher:</b> { publisher }</li>
                    <li className="list-group-item"><b>First appearance:</b> { first_appearance }</li>
                </ul>

                <h5>Characters</h5>
                <p>{ characters }</p>

                <button
                    className="btn btn-outline-info"
                    onClick={ handleReturn }
                >
                    Return
                </button>
            </div>
        </div>
    )
}
