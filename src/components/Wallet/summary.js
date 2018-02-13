import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import {connect} from "react-redux";
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ReceivingIcon from 'material-ui-icons/FileDownload';
import SendingIcon from 'material-ui-icons/FileUpload';
import TransactionModal from '../Transactions/transactionModal';

const styles = theme => ({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
        color: theme.palette.text.secondary,
    },
    pos: {
        marginBottom: 12,
        color: theme.palette.text.secondary,
    },
});

class Summary extends React.Component {

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
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title}>{nimiq.selectedWallet.address}</Typography>
                        <Typography variant="headline" component="h2">
                            {nimiq.selectedWallet.balance} NIM
                        </Typography>
                        <Typography component="p">
                            Number of transactions: {nimiq.selectedWallet.transactions.length}
                        </Typography>
                    </CardContent>
                </Card>
                {nimiq.selectedWallet.transactions.length <= 0 && <Typography component="p">
                    No recent transactions
                </Typography>}

                {nimiq.selectedWallet.transactions.length > 0 && <List>
                    {nimiq.selectedWallet.transactions.map((transaction, index) => (
                        <ListItem key={index} onClick={() => {this.viewTransaction(transaction)}} button>
                            <Avatar>
                                {nimiq.selectedWallet.address === transaction.recipient && <ReceivingIcon />}
                                {nimiq.selectedWallet.address === transaction.sender && <SendingIcon />}
                            </Avatar>
                            <ListItemText primary={`NIM Received`} secondary={`${new Date(transaction.timestamp * 1000).toLocaleString()}`} />
                            <span style={{float: 'right'}}>{transaction.value} NIM</span>
                        </ListItem>
                    ))}
                </List>}

                    <TransactionModal open={this.state.showSelectedTransaction} transaction={this.state.selectedTransaction}/>

            </div>
        );
    }
}

Summary.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        nimiq: state.nimiq
    };
}

export default connect(mapStateToProps)(withStyles(styles)(Summary));