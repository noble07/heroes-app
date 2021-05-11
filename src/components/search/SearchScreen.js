import queryString from 'query-string';
import { useMemo } from 'react';
import { useLocation } from 'react-router';
import { useForm } from '../../hooks/useForm';
import { getHeroesByName } from '../../selectors/getHeroesByName';
import { HeroCard } from '../heroes/HeroCard';


export const SearchScreen = ({ history }) => {

    const { search } = useLocation();

    const { q = '' } = queryString.parse(search);

    const [{ searchText }, handleInputChange] = useForm({
        searchText: q
    });

    const heroesFiltered = useMemo(() => getHeroesByName(q), [ q ]);

    const handleSearch = ( e ) => {
        e.preventDefault();
        history.push(`?q=${ searchText }`)
    }

    return (
        <div>
            <h1>SearchScreen</h1>
            <hr />

            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr />

                    <form onSubmit={ handleSearch }>
                        <input
                            type="text"
                            name="searchText"
                            placeholder="Find your hero"
                            className="form-control"
                            autoComplete="off"
                            onChange={ handleInputChange }
                            value={ searchText }
                        />

                        <div className="d-grid gap-2">
                            <button
                                type="submit"
                                className="btn mt-2 btn-block btn-outline-primary"
                            >
                                Search
                            </button>
                        </div>
                    </form>

                </div>
                <div className="col-7">
                    <h4>Results</h4>
                    <hr />

                    {
                        (q === '') 
                            &&
                            <div className="alert alert-info">
                                Search a hero
                            </div>
                    }

                    {
                        (q !== '' && heroesFiltered.length === 0) 
                            &&
                            <div className="alert alert-danger">
                                There is no a hero with { q }
                            </div>
                    }

                    {
                        heroesFiltered.map(hero => (
                            <HeroCard
                                key={hero.id}
                                {...hero}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
