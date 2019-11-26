import React, { Component } from 'react';

const apikey = '76010da8e8a9e6573070070354f07251';

async function getMovies() {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?&with_genres=28|12|35|18&page=1&sort_by=popularity.desc&language=en-US&api_key=${apikey}`)
    const { results } = await response.json();
    console.log(results);
    
    return results;
}

class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
        }
    }

    componentDidMount() {
        getMovies()
            .then(movies => {
                this.setState((state) => ({movies}));
            })
    }

    render() {
        const { movies = [] } = this.state;
        return (
            <div className="list">
                {movies.map(({id, title, poster_path}) => (
                    <div key={id}>
                        <div>{title}</div>
                        <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${poster_path}`} alt="" />
                    </div>
                ))}
            </div>
        );
    }
}

export default MovieList;