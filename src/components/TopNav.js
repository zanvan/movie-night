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
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
    }
}));

TopNav.propTypes = {
    showAllGenres: PropTypes.bool,
}

export default function TopNav({ 
    showAllGenres, 
    handleShowAllGenres,
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
                    {loginButton()}
                </Toolbar>
            </AppBar>
        </div>
    );
}
