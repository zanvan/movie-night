import React, { useState } from 'react';
import PropTypes from 'prop-types';

// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import { cyan } from '@material-ui/core/colors';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// const useStyles = makeStyles(theme => ({
//     cyan: {
//         color: '#fff',
//         backgroundColor: cyan[500]
//     }
// }));

const Signup = ({ handleSignup }) => {
    // const classes = useStyles();
    const [openDialog, setOpenDialog] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const showFormDialog = () => {
        setOpenDialog(true);
    };

    const checkFormData = () => {
        handleSignup({
            name,
            email,
            password,
        });
        handleCloseDialog();
    };

    const handleCloseDialog = () => setOpenDialog(false);

    return (
        <>
            <Button color="secondary" onClick={showFormDialog}>
                Sign Up
            </Button>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="form-dialog-signup"
            >
                <DialogTitle id="form-dialog-signup">Sign Up</DialogTitle>
                <DialogContent>
                    <form noValidate>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="name"
                            value={name}
                            fullWidth
                            onChange={ev => setName(ev.target.value)}
                        />
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
                            onChange={ev => setPassword(ev.target.value)}
                            fullWidth
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={checkFormData} color="primary">
                        Sign Up
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

Signup.propTypes = {
    handleSignup: PropTypes.func.isRequired,
};

export default Signup;
