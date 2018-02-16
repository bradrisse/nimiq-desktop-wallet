import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actions as nimiqActions} from "../ducks/nimiq";
import Modal from 'material-ui/Modal';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import Toolbar from 'material-ui/Toolbar';
import Centered from '../Centered';
import _ from 'lodash';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
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
    flex: {
        flex: 1
    }
});


class Settings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false
        }
        this.setWalletName = _.debounce(this.setWalletName,1000);
    }

    onNameChange = (name, address) => {
        this.props.nimiqActions.setWalletName({name: name, address: address})
        this.setWalletName(name, address)
    }

    setWalletName (name, address) {
        var wallets = JSON.parse(localStorage.getItem('wallets'));

        if (!wallets) {
            wallets = []
            wallets[0] = {
                address: address,
                name: name
            }
        } else {
            var existingWallet = _.find(wallets, (wallet) => {
                return wallet.address === address
            })

            if (existingWallet) {
                existingWallet.name = name
            } else {
                wallets.push({
                    address: address,
                    name: name
                })
            }
        }

        localStorage.setItem('wallets', JSON.stringify(wallets))
    }

    removeWallet = () => {
        const {nimiq} = this.props;
        this.setState({ open: false }, () => {
            window.$.walletStore.list().then(addresses => {
                _.each(addresses, (address) => {
                    if (address.toUserFriendlyAddress() === nimiq.selectedWallet.address) {
                        window.$.walletStore.remove(address);
                        this.props.nimiqActions.removeWallet(address.toUserFriendlyAddress())
                    }
                })
            });
        });
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, nimiq } = this.props;
        return (
            <div>
                <TextField
                    id="full-width"
                    label="Wallet Name"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    placeholder=""
                    value={nimiq.selectedWallet ? nimiq.selectedWallet.name : ''}
                    fullWidth
                    margin="normal"
                    onChange={(e) => {this.onNameChange(e.target.value, nimiq.selectedWallet.address)}}
                />

                <Button variant="raised" color="primary" className={classes.button} onClick={this.handleOpen}>
                    Delete Wallet
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
                                    <Typography variant="title" color="inherit" className={classes.flex}>
                                        Delete Wallet
                                    </Typography>
                                    <IconButton
                                        onClick={this.handleClose}
                                        color="inherit"
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Toolbar>
                            </AppBar>
                            <div className={classes.paper}>
                                Are you absolutely sure you want to delete this wallet?
                                <Button variant="raised" color="primary" className={classes.button} onClick={this.removeWallet}>
                                    Yes, I'm Sure.
                                </Button>
                            </div>
                        </div>
                    </Centered>
                </Modal>

            </div>
        );
    }
}

Settings.propTypes = {
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

export default connect(mapStateToProps, mapPropsToDispatch)(withStyles(styles)(Settings));