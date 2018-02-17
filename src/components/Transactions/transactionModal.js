import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Toolbar from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
import { translate } from 'react-i18next';
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


class TransactionModal extends React.Component {

    state = {
        open: false,
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.open) {
            this.handleOpen()
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, transaction } = this.props;
        return (
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                    onBackdropClick={this.handleClose}
                >
                    <Centered>
                        {transaction && <div className={classes.modal}>
                            <AppBar position="static" color="default">
                                <Toolbar>
                                    <Typography variant="title" color="inherit">
                                        Transaction Info
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                            <div className={classes.paper}>
                                <Typography variant="title">
                                    To
                                </Typography>
                                <Typography variant="subheading">
                                    {transaction.recipient}
                                </Typography>
                                <Typography variant="title">
                                    From
                                </Typography>
                                <Typography variant="subheading">
                                    {transaction.sender}
                                </Typography>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography variant="title">
                                            Amount
                                        </Typography>
                                        <Typography variant="subheading">
                                            {transaction.value}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="title">
                                            Fees
                                        </Typography>
                                        <Typography variant="subheading">
                                            {transaction.fee}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Typography variant="title">
                                    Note
                                </Typography>
                                <Typography variant="subheading">
                                    {transaction.data}
                                </Typography>
                                <Typography variant="title">
                                    Timestamp
                                </Typography>
                                <Typography variant="subheading">
                                    {transaction.timestamp}
                                </Typography>
                                <Button variant="raised" color="primary" className={classes.button} onClick={this.handleClose}>
                                    Close
                                </Button>
                            </div>
                        </div>}
                    </Centered>
                </Modal>
            </div>
        );
    }
}

TransactionModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TransactionModal);