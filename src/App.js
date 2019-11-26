import React from 'react';
import './App.css';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import cyan from '@material-ui/core/colors/cyan';

import TopNav from './components/TopNav';
import MovieList from './components/MovieList';

const theme = createMuiTheme({
    palette: {
        primary: purple,
        secondary: cyan,
    }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <TopNav />

                <main>
                    <MovieList />
                </main>
            </div>
        </ThemeProvider>
    );
}

export default App;
