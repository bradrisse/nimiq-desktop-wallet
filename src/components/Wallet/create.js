import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import Centered from '../Centered';
import { translate } from 'react-i18next';
import { compose } from 'recompose';

const styles = theme => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        zIndex: 3,
        position: 'relative'
    },
    backdrop: {
        zIndex: 1
    }
});

class CreateWallet extends React.Component {
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
        const { classes, t } = this.props;

        return (
            <div>
                <Button onClick={this.handleOpen}>Create Wallet</Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <Centered>
                        <div className={classes.paper}>
                            <Typography variant="title" id="modal-title">
                                Text in a modal
                            </Typography>
                            <Typography variant="subheading" id="simple-modal-description">
                                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                            </Typography>
                        </div>
                    </Centered>
                </Modal>
            </div>
        );
    }
}

CreateWallet.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(styles),
    translate('translations')
)(CreateWallet);