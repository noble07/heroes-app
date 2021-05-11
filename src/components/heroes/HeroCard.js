import { Link } from "react-router-dom"
import { heroImages } from "../../helpers/heroImages"

export const HeroCard = ({ 
    id,
    superhero,
    alter_ego,
    first_appearance,
    characters
}) => {

    return (
        <div className="col">
            <div className="card h-100">
                <img src={ heroImages(`./${id}.jpg`).default } className="card-img-top" alt={ superhero } />
                <div className="card-body">
                    <h5 className="card-title">{ superhero }</h5>
                    <p className="card-text">{ alter_ego }</p>

                    {
                        (alter_ego !== characters)
                            && <p className="card-text">{ characters }</p>
                    }

                    <p className="card-text">
                        <small className="text-muted">{ first_appearance }</small>
                    </p>

                    <Link to={ `/hero/${ id }` } >
                        Más...
                    </Link>

                </div>
            </div>
        </div>
    )

}
