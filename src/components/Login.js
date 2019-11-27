import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { cyan } from '@material-ui/core/colors';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(theme => ({
    cyan: {
        color: '#fff',
        backgroundColor: cyan[500]
    }
}));

const Login = ({ isLoggedIn = false, handleLogin, loggedinUser = {} }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleOpenMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
        handleLogin(false);
        setAnchorEl(null);
    };

    const showLoginDialog = () => {
        console.log(openDialog);
        
        setOpenDialog(true);
    };

    const checkLoginData = () => {
        handleLogin(Boolean(email && password));
        handleCloseDialog();
    };

    const handleCloseDialog = () => setOpenDialog(false);

    return (
        <>
            {isLoggedIn ? (
                <>
                    <Avatar className={classes.cyan} onClick={handleOpenMenu}>
                        <AccountCircleIcon />
                    </Avatar>
                    <Menu
                        id="user-menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                    >
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                </>
            ) : (
                <>
                    <Button color="secondary" onClick={showLoginDialog}>
                        Login
                    </Button>
                    <Dialog
                        open={openDialog}
                        onClose={handleCloseDialog}
                        aria-labelledby="form-dialog-login"
                    >
                        <DialogTitle id="form-dialog-login">Login</DialogTitle>
                        <DialogContent>
                            <form noValidate>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="email"
                                    label="Email Address"
                                    type="email"
                                    value={email}
                                    fullWidth
                                    onChange={ev => setEmail(ev.target.value)}
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="password"
                                    label="Password"
                                    type="password"
                                    value={password}
                                    onChange={ev =>
                                        setPassword(ev.target.value)
                                    }
                                    fullWidth
                                />
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={checkLoginData} color="primary">
                                Login
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
            )}
        </>
    );
};

Login.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    handleLogin: PropTypes.func.isRequired,
    loggedinUser: PropTypes.object
};

export default Login;
