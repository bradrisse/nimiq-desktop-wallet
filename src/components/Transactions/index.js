import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {connect} from "react-redux";
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ReceivingIcon from 'material-ui-icons/FileDownload';
import SendingIcon from 'material-ui-icons/FileUpload';
import TransactionModal from '../Transactions/transactionModal';
import Empty from '../Empty';
import _ from 'lodash';

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

    render() {
        const { classes, nimiq } = this.props;

        return (
            <div>
                {nimiq.selectedWallet && nimiq.selectedWallet.transactions.length <= 0 && <Empty message="transactions.emptyRecent" subtract={288}/>}

                {nimiq.selectedWallet && nimiq.selectedWallet.transactions.length > 0 && <List>
                    {_.sortBy(nimiq.selectedWallet.transactions, 'timestamp').reverse().map((transaction, index) => (
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

                <TransactionModal open={this.state.showSelectedTransaction} transaction={this.state.selectedTransaction}/>

            </div>
        );
    }
}

Transactions.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        nimiq: state.nimiq
    };
}

export default connect(mapStateToProps)(withStyles(styles)(Transactions));