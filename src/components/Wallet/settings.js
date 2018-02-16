import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actions as nimiqActions} from "../ducks/nimiq";
import _ from 'lodash';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    }
});


class Settings extends Component {

    constructor(props) {
        super(props);
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
        window.$.walletStore.list().then(addresses => {
            _.each(addresses, (address) => {
                if (address.toUserFriendlyAddress() === nimiq.selectedWallet.address) {
                    window.$.walletStore.remove(address);
                }
            })
        });
    }

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
                    value={nimiq.selectedWallet.name}
                    fullWidth
                    margin="normal"
                    onChange={(e) => {this.onNameChange(e.target.value, nimiq.selectedWallet.address)}}
                />

                <Button variant="raised" color="primary" className={classes.button} onClick={this.removeWallet}>
                    Delete Wallet
                </Button>

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