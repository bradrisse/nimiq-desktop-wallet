import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Modal from 'material-ui/Modal';
import Centered from '../../common/Centered';
import TitleBar from '../../common/TitleBar';

const styles = theme => ({
    modal: {
        zIndex: 3,
        position: 'relative',
        minWidth: 300,
        maxWidth: 450
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        position: 'relative',
        padding: 30
    },
});

class BasicModal extends React.Component {

    state = {
        open: false
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.isOpen !== this.state.open) {
            this.setState({ open: nextProps.isOpen });
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, title } = this.props;

        return (
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.open}
                onClose={this.handleClose}
            >
                <Centered>
                    <div className={classes.modal}>
                        {title && <div><TitleBar title={title} onClose={this.handleClose}/><div className={classes.paper}>{this.props.children}</div></div>}
                        {!title && this.props.children}
                    </div>
                </Centered>
            </Modal>
        );
    }
}

BasicModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BasicModal);