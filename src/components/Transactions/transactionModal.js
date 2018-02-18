import React from 'react';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import BasicModal from '../../common/BasicModal';


class TransactionModal extends React.Component {

    render() {
        const { transaction, open } = this.props;
        return (
            <BasicModal isOpen={open} title="Transaction Info">
                {transaction && <div>
                    <Typography variant="title">
                        To
                    </Typography>
                    <Typography variant="subheading">
                        {transaction.recipient}
                    </Typography>
                    <Typography variant="title">
                        From
                    </Typography>
                    <Typography variant="subheading">
                        {transaction.sender}
                    </Typography>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography variant="title">
                                Amount
                            </Typography>
                            <Typography variant="subheading">
                                {transaction.value}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="title">
                                Fees
                            </Typography>
                            <Typography variant="subheading">
                                {transaction.fee}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Typography variant="title">
                        Note
                    </Typography>
                    <Typography variant="subheading">
                        {transaction.data}
                    </Typography>
                    <Typography variant="title">
                        Timestamp
                    </Typography>
                    <Typography variant="subheading">
                        {transaction.timestamp}
                    </Typography>
                </div>}
            </BasicModal>
        );
    }
}

export default TransactionModal;