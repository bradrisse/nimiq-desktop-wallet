import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Toolbar from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
import Centered from '../Centered';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    paper: {
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        zIndex: 3,
        padding: 25
    },
    root: {
        padding: theme.spacing.unit * 4,
    },
    modal: {
        zIndex: 3,
        position: 'relative',
        minWidth: 300,
        maxWidth: 450
    },
});


class Send extends React.Component {

    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <TextField
                    id="full-width"
                    label="Receiver"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    placeholder="Wallet Address"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    id="full-width"
                    label="Amount"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    placeholder="0.00000"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    id="full-width"
                    label="Fee"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    placeholder="0.00000"
                    fullWidth
                    margin="normal"
                />
                <Button variant="raised" color="primary" className={classes.button} onClick={this.handleOpen}>
                    Next
                </Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <Centered>
                        <div className={classes.modal}>
                            <AppBar position="static" color="default">
                                <Toolbar>
                                    <Typography variant="title" color="inherit">
                                        Confirm Transaction
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                            <div className={classes.paper}>
                                <Typography variant="title" id="modal-title">
                                    To
                                </Typography>
                                <Typography variant="subheading" id="simple-modal-description">
                                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                </Typography>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography variant="title" id="modal-title">
                                            Amount
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="title" id="modal-title">
                                            Fees
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Button variant="raised" color="primary" className={classes.button} onClick={this.handleClose}>
                                    Send
                                </Button>
                            </div>
                        </div>
                    </Centered>
                </Modal>

            </div>
        );
    }
}

Send.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Send);