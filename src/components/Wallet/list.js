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

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    active: {
        background: '#d3d3d3'
    }
});

class WalletList extends React.Component {

    selectWallet = (wallet) => {
        this.props.nimiqActions.setSelectedWallet(wallet)
    }

    render() {
        const { classes, nimiq } = this.props;
        return (
            <div className={classes.root}>
                <FullHeight scroll>
                    <List>
                        {nimiq.wallets.map((wallet, index) => (
                            <ListItem button key={index} onClick={() => {this.selectWallet(wallet)}} className={wallet.address === nimiq.selectedWallet.address ? classes.active : ''}>
                                <Avatar style={{background: 'none'}}><Iqon address={wallet.address}/></Avatar>
                                <ListItemText primary={wallet.name ? wallet.name : `Wallet ${index + 1}`} secondary={`${wallet.balance} NIM`} />
                            </ListItem>
                        ))}
                        <ListItem button>
                            <ListItemText primary="Add Wallet" />
                        </ListItem>
                    </List>
                </FullHeight>
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

export default connect(mapStateToProps, mapPropsToDispatch)(withStyles(styles)(WalletList));