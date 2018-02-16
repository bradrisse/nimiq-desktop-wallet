import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actions as nimiqActions} from "../ducks/nimiq";
import Iqon from '../iqon';
import FullHeight from '../FullHeight';
import { translate } from 'react-i18next';
import CreateWallet from './create';
import { compose } from 'recompose';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: '#E7E5EF',
    },
    active: {
        background: '#d3d3d3'
    }
});

class WalletList extends React.Component {

    selectWallet = (wallet) => {
        this.props.nimiqActions.setSelectedWallet(wallet)
    }

    addWallet = () => {
        window.Nimiq.Wallet.generate().then(wlt => {
            window.$.walletStore.put(wlt);
            console.log('wlt ', wlt)
            var _newWallet = {
                name: '',
                address: wlt.address.toUserFriendlyAddress(),
                balance: 0,
                transactions: []
            }
            this.props.nimiqActions.addWallet(_newWallet)
        })
    }

    render() {
        const { classes, nimiq, t } = this.props;
        return (
            <div className={classes.root}>
                <FullHeight scroll subtract={100}>
                    <List style={{paddingTop: 0}}>
                        {nimiq.wallets.map((wallet, index) => (
                            <ListItem button key={index} onClick={() => {this.selectWallet(wallet)}} className={wallet.address === nimiq.selectedWallet.address ? classes.active : ''}>
                                <Avatar style={{background: 'none'}}><Iqon address={wallet.address}/></Avatar>
                                <ListItemText primary={wallet.name ? wallet.name : `Wallet ${index + 1}`} secondary={`${wallet.balance} NIM`} />
                            </ListItem>
                        ))}
                    </List>
                </FullHeight>
                <CreateWallet/>
            </div>
        );
    }
}

WalletList.propTypes = {
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
    withStyles(styles),
    translate('translations')
)(WalletList);