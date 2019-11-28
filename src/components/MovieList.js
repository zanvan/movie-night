import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import { getDiscoverUrl } from '../utils';
import { genres } from '../constants';
import Movie from './Movie';

const useStyles = makeStyles({
    listContainer: {
        flex: 1,
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: '95vw',
        overflow: 'hidden',
    },
    gridRow: {
        flexWrap: 'nowrap',
    },
    grid: {
        flexWrap: 'wrap'
    },
    list: {
        flex: 1,
        display: 'flex',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
    },
    spacer: {
        flex: 2
    }
});

const MovieList = ({ 
    genre = genres.drama, 
    page = 1, 
    handleSelect, 
    selected,
    likeGenre,
    isPreferedGenre = false,
}) => {
    const [movies, setMovies] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        async function getMovies() {
            try {
                const response = await fetch(getDiscoverUrl({ genre: genre.id, page }, { signal }))
                const { results } = await response.json();
                setMovies(results);
            } catch (error) {
                console.error(error);
            }
        }
        getMovies();

        return () => {
            controller.abort();
        }
    }, [genre, page])

    const handleClick = () => {
        handleSelect(genre);
    }

    return (
        <div className={classes.listContainer}>
            <header className={classes.header}>
                <Button color="primary" onClick={handleClick}>
                    <h3>{genre.name}</h3>
                </Button>

                <span className={classes.spacer}></span>

                {isPreferedGenre 
                ? (
                    <Fab className={classes.prefered} color="primary" size="small" onClick={() => likeGenre(genre.name, false)} >
                        <FavoriteIcon  />
                    </Fab>
                )
                : (
                    <Fab className={classes.prefered} color="primary" size="small" onClick={() => likeGenre(genre.name, true)} >
                        <FavoriteBorderIcon  />
                    </Fab>
                )}
                
            </header>
            <GridList 
                className={selected ? classes.grid: classes.gridRow} 
                cols={4}>

                {movies.map((movie) => (
                    <GridListTile key={movie.id}>
                        <Movie movie={movie} />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

MovieList.propTypes = {
    genre: PropTypes.object,
    page: PropTypes.number,
    handleSelect: PropTypes.func,
    selected: PropTypes.bool,
    likeGenre: PropTypes.func,
    isPreferedGenre: PropTypes.bool,
}

export default MovieList;

