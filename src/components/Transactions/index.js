import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ReceivingIcon from 'material-ui-icons/FileDownload';
import SendingIcon from 'material-ui-icons/FileUpload';
import TransactionModal from '../Transactions/transactionModal';
import Empty from '../../common/Empty';
import Button from 'material-ui/Button';
import FullHeight from '../../common/FullHeight';
import _ from 'lodash';
import {bindActionCreators} from "redux";
import {actions as appuiActions} from "../../ducks/appui";

const styles = theme => ({
});

class Transactions extends React.Component {

    state = {
        selectedTransaction: null,
        showSelectedTransaction: false
    }

    viewTransaction = (transaction) => {
        this.setState({
            showSelectedTransaction: true,
            selectedTransaction: transaction
        })
    }

    viewAll = () => {
        this.props.appuiActions.setWalletTab(3)
    }

    render() {
        const { classes, nimiq, lt, limit, subtract } = this.props;

        return (
            <FullHeight scroll subtract={subtract}>
                {nimiq.selectedWallet && nimiq.selectedWallet.transactions.length <= 0 && <Empty message="transactions.emptyRecent" subtract={288}/>}

                {nimiq.selectedWallet && nimiq.selectedWallet.transactions.length > 0 && <List>
                    {_.sortBy(nimiq.selectedWallet.transactions, 'timestamp').slice(0, limit ? limit : nimiq.selectedWallet.transactions.length).map((transaction, index) => (
                        <ListItem key={index} onClick={() => {this.viewTransaction(transaction)}} button>
                            <Avatar>
                                {nimiq.selectedWallet.address === transaction.recipient && <ReceivingIcon />}
                                {nimiq.selectedWallet.address === transaction.sender && <SendingIcon />}
                            </Avatar>
                            <ListItemText primary={`NIM ${nimiq.selectedWallet.address === transaction.recipient ? 'Received' : 'Sent'}`} secondary={`${new Date(transaction.timestamp * 1000).toLocaleString()}`} />
                            <span style={{float: 'right'}}>{transaction.value} NIM</span>
                        </ListItem>
                    ))}
                </List>}


                {limit && nimiq.selectedWallet.transactions.length > 5 && <Button onClick={this.viewAll}>View All</Button>}

                <TransactionModal open={this.state.showSelectedTransaction} transaction={this.state.selectedTransaction}/>

            </FullHeight>
        );
    }
}

Transactions.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        nimiq: state.nimiq,
        appui: state.appui
    };
}

function mapPropsToDispatch(dispatch) {
    return {
        appuiActions: bindActionCreators(appuiActions, dispatch)
    };
}

export default connect(mapStateToProps, mapPropsToDispatch)(withStyles(styles)(Transactions));