import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { getImageUrl } from '../utils';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';

const useStyles = makeStyles({
    card: {
        flex: 1,
        width: 300,
        height: 150,
        display: 'flex',
        margin: 4,
        padding: 4
    },
    content: {
        flex: '1 1 auto'
    },
    media: {
        flex: '1 0 100px',
        marginLeft: 2
    },
    popover: {
        width: 300
    }
});

const Movie = ({ movie }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const { id, title, overview, poster_path } = movie;

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const popId = open ? 'simple-popover' : undefined;

    return (
        <Card key={id} className={classes.card}>
            <CardMedia
                className={classes.media}
                image={getImageUrl(poster_path)}
                title={title}
            />

            <CardContent className={classes.content}>
                <Typography variant="subtitle2" component="h5">
                    {title}
                </Typography>
                <Typography
                        variant="caption"
                        color="textSecondary"
                        component="p"
                        onClick={handleClick}
                    >
                    {overview}
                </Typography>
                <Popover
                    id={popId}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'center'
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'center'
                    }}
                >
                    <Card>
                        <CardContent className={classes.popover}>
                            <Typography
                                variant="body1"
                                color="textSecondary"
                                component="p"
                            >
                                {overview}
                            </Typography>
                        </CardContent>
                    </Card>
                </Popover>
            </CardContent>
        </Card>
    );
};

Movie.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number, 
        title: PropTypes.string, 
        overview: PropTypes.string, 
        poster_path: PropTypes.string,
    }).isRequired
}

export default Movie;
