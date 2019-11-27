import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import cyan from '@material-ui/core/colors/cyan';
import Button from '@material-ui/core/Button';

import TopNav from './components/TopNav';
import MovieList from './components/MovieList';
import { genres } from './constants';

const theme = createMuiTheme({
    palette: {
        primary: purple,
        secondary: cyan,
    }
});

const useStyles = makeStyles({
    app: {
        textAlign: 'center',
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
});

function App() {
    const [selectedGenre, setSelectedGenre] = useState(null);
    const classes = useStyles();

    const handleSelect = (genre) => setSelectedGenre(genre);

    const renderGenreList = () => {
        return ['action', 'adventure', 'comedy', 'drama'].map(genre => (
            <MovieList 
                key={genre} 
                genre={genres[genre]} 
                handleSelect={handleSelect}
                selected={false} 
            />))
    }

    const renderSelectedGenre = () => {
        return (
            <>
                <MovieList key={selectedGenre} 
                    genre={selectedGenre} 
                    handleSelect={handleSelect} 
                    selected={true} 
                />
            </>
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.app}>
                <TopNav showAllGenres={Boolean(selectedGenre)} handleShowAllGenres={() => handleSelect(null)} />

                <main className={classes.main}>
                    {selectedGenre 
                        ? renderSelectedGenre()                            
                        : renderGenreList()}
                </main>
            </div>
        </ThemeProvider>
    );
}

export default App;
