import React from 'react';
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    title: {
        flex: 2,
        display: 'flex',
        justifyContent: 'center',
    },
    login: {
        flex: '1 0 auto',
    },
    signup: {
        flex: '1 0 auto',
    }
}));

TopNav.propTypes = {
    loggedInUser: PropTypes.object,
    showAllGenres: PropTypes.bool,
    signupButton: PropTypes.func,
    loginButton: PropTypes.func,
    handleShowAllGenres: PropTypes.func,
}

export default function TopNav({
    showAllGenres, 
    handleShowAllGenres,
    signupButton = () => {},
    loginButton = () => {},
}) {
    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <AppBar position="static" >
                <Toolbar>
                    {showAllGenres 
                        ? (<Button 
                                size="small" 
                                color="secondary"
                                onClick={handleShowAllGenres}>
                                    All Genres
                            </Button>) 
                        : ''}
                    <Typography className={classes.title} variant="h4">Movie Night</Typography>
                    <span className="signup">
                        {signupButton()}
                    </span>
                    <span className="login">
                        {loginButton()}
                    </span>
                </Toolbar>
            </AppBar>
        </div>
    );
}
