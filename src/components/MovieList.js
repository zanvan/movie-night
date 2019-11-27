import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';

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
});

const MovieList = ({ 
    genre = genres.drama, 
    page = 1, 
    handleSelect, 
    selected 
}) => {
    const [movies, setMovies] = useState([]);
    // const [displayAsGrid, setDisplayAsGrid] = useState(selected);

    const classes = useStyles();

    useEffect(() => {
        console.log('aaa', genre);

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
            console.log('clear', genre);

            controller.abort();
        }
    }, [genre, page])

    const handleClick = () => {
        handleSelect(genre);
    }

    return (
        <div className={classes.listContainer}>
            <header>
                <Button color="primary" onClick={handleClick}>
                    <h3>{genre.name}</h3>
                </Button>
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
}

export default MovieList;

