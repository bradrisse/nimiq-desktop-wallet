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
        showSelectedTransaction: false,
        transactions: [],
        loadingMore: false
    }

    componentWillMount() {
        this.setTransactions(this.props.nimiq.selectedWallet.transactions)
    }

    componentWillReceiveProps(nextProps) {
        this.setTransactions(nextProps.nimiq.selectedWallet.transactions)
    }

    setTransactions = (_transactions) => {
        if (_transactions) {
            this.setState({
                transactions: this.sortTransactions(_transactions)
            })
        }
    }

    sortTransactions = (_transactions) => {
        const {limit} = this.props;
        return _.sortBy(_transactions, 'timestamp').slice(0, limit ? limit : 10)
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

    loadMore = () => {
    
        if (!this.state.loadingMore) {
            this.setState({
                loadingMore: true
            }, () => {
    
                var _visibleTransactions = this.state.transactions;
                _.each(this.props.nimiq.selectedWallet.transactions.splice(_visibleTransactions.length, 10), (_transaction) => {
                    _visibleTransactions.push(_transaction)
                })

                this.setState({
                    loadingMore: false,
                    transactions: _visibleTransactions
                })
            })
        }
    }

    render() {
        const { classes, nimiq, lt, limit, subtract } = this.props;
        const {transactions, showSelectedTransaction, selectedTransaction} = this.state;

        return (
            <FullHeight scroll subtract={subtract} bottomReached={this.loadMore}>
                {nimiq.selectedWallet && transactions.length <= 0 && <Empty message="transactions.emptyRecent" subtract={288}/>}

                {nimiq.selectedWallet && transactions.length > 0 && <List>
                    {transactions.map((transaction, index) => (
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


                {limit && transactions.length > 5 && <Button onClick={this.viewAll} variant="raised">View All</Button>}

                <TransactionModal open={showSelectedTransaction} transaction={selectedTransaction}/>

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