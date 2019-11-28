import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import cyan from '@material-ui/core/colors/cyan';

import TopNav from './components/TopNav';
import Signup from './components/Signup';
import Login from './components/Login';
import MovieList from './components/MovieList';
import { genres } from './constants';
import UsersStore from './UsersStore';

const theme = createMuiTheme({
    palette: {
        primary: purple,
        secondary: cyan
    }
});

const useStyles = makeStyles({
    app: {
        height: '100vh'
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'auto',
    }
});

function App() {
    const usersStore = new UsersStore();
    const allGenres = ['action', 'adventure', 'comedy', 'drama'];
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const classes = useStyles();

    const handleSelect = genre => setSelectedGenre(genre);

    const handleLikeGenre = (genre, like) => {
        if (!user) return;

        const genreName = genre.toLowerCase();
        const isPrefered = isUserPreferedGenre(genreName);
        if (like && !isPrefered) {
            const userToUpdate = {...user, preferedGenres: [...user.preferedGenres, genreName]};
            usersStore.update(userToUpdate);
            setUser(usersStore.findUser(user.email));
        } else if (!like && isPrefered) {
            const userToUpdate = {...user, preferedGenres: [...user.preferedGenres.filter(g => g !== genreName)]};
            usersStore.update(userToUpdate);
            setUser(usersStore.findUser(user.email));
        }
    }

    const isUserPreferedGenre = (genre) => user && user.preferedGenres && user.preferedGenres.some(g => g === genre.toLowerCase());

    const renderGenreList = () => {
        return allGenres.map(genre => (
            <MovieList
                key={genre}
                genre={genres[genre]}
                handleSelect={handleSelect}
                selected={false}
                likeGenre={handleLikeGenre}
                isPreferedGenre={isUserPreferedGenre(genre)}
            />
        ));
    };

    const renderSelectedGenre = () => {
        return (
            <>
                <MovieList
                    key={selectedGenre}
                    genre={selectedGenre}
                    handleSelect={handleSelect}
                    selected={true}
                    likeGenre={handleLikeGenre}
                    isPreferedGenre={isUserPreferedGenre(selectedGenre.name)}
                />
            </>
        );
    };

    const renderLoginButton = () => {
        const handleLogin = ({ email, password }) => {
            const foundUser = usersStore.findUser(email);
            if (foundUser && foundUser.password === password) {
                setIsLoggedIn(true);
                setUser(foundUser);
            } else {
                setIsLoggedIn(false);
                setUser(null);
            }
        };

        return <Login isLoggedIn={isLoggedIn} handleLogin={handleLogin} loggedinUser={user} />;
    };

    const renderSignupButton = () => {
        const handleSignup = user => {
            if (user && user.email && user.password && user.name) {
                usersStore.add({ ...user, preferedGenres: [] });
                setIsLoggedIn(true);
                setUser(usersStore.findUser(user.email));
            } else {
                setIsLoggedIn(false);
                setUser(null);
            }
        };

        return isLoggedIn ? undefined : <Signup handleSignup={handleSignup} />;
    };

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.app}>
                <TopNav
                    signupButton={renderSignupButton}
                    loginButton={renderLoginButton}
                    showAllGenres={Boolean(selectedGenre)}
                    handleShowAllGenres={() => handleSelect(null)}
                />

                <main className={classes.main}>
                    {selectedGenre ? renderSelectedGenre() : renderGenreList()}
                </main>
            </div>
        </ThemeProvider>
    );
}

export default App;
