import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import {connect} from "react-redux";
import Transactions from '../Transactions';
import FullHeight from '../../common/FullHeight';

const styles = theme => ({
    card: {
        minWidth: 275,
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
        color: theme.palette.text.secondary,
    }
});

class Summary extends React.Component {

    render() {
        const { classes, nimiq } = this.props;

        return (
            <div>
                {nimiq.selectedWallet && <div>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title}>{nimiq.selectedWallet.name}</Typography>
                            <Typography variant="headline" component="h2">
                                {nimiq.selectedWallet.balance} NIM
                            </Typography>
                            <Typography component="p">
                                Number of transactions: {nimiq.selectedWallet.transactions.length}
                            </Typography>
                        </CardContent>
                    </Card>
                    <FullHeight scroll subtract={270}>
                    <Transactions />
                    </FullHeight>
                </div>}
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