import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {actions as nimiqActions} from "../../ducks/nimiq";
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import {connect} from "react-redux";
import { compose } from 'recompose';
import {bindActionCreators} from "redux";

const styles = theme => ({
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
});

class Messages extends React.Component {
    state = {
        open: false,
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.nimiq.messages.length > 0) {
            this.handleOpen()
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = (event, reason) => {
        let self = this;
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false }, () => {
            self.props.nimiqActions.removeMessage()
        });
    };

    render() {
        const { classes, nimiq } = this.props;
        return (
            <div>
                {nimiq.messages.length > 0 && <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{nimiq.messages[0].text}</span>}
                    action={[
                        <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
                            UNDO
                        </Button>,
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />}
            </div>
        );
    }
}

Messages.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        nimiq: state.nimiq
    };
}

function mapPropsToDispatch(dispatch) {
    return {
        nimiqActions: bindActionCreators(nimiqActions, dispatch)
    };
}

export default compose(
    connect(mapStateToProps, mapPropsToDispatch),
    withStyles(styles, {withTheme: true}),
)(Messages);