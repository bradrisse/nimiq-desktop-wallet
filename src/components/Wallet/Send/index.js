import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Toolbar from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
import Centered from '../../../common/Centered';
import Input, { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import {connect} from "react-redux";
import { translate } from 'react-i18next';
import { compose } from 'recompose';
import FullHeight from '../../../common/FullHeight';

import Basic from './basic';
import General from './general';
import Vesting from './vesting';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    paper: {
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        zIndex: 3,
        padding: 25
    },
    root: {
        padding: theme.spacing.unit * 4,
    },
    modal: {
        zIndex: 3,
        position: 'relative',
        minWidth: 300,
        maxWidth: 450
    },
    formControl: {
        marginBottom: 10
    }
});


class Send extends React.Component {

    state = {
        open: false,
        transactionType: 'basic'
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = (e) => {
        this.setState({ transactionType: e.target.value });
    };

    sendBasicTransaction = (values) => {
        console.log('wlt ', this.props.nimiq.selectedWallet._wlt)
        return new Nimiq.BasicTransaction(this.props.nimiq.selectedWallet._wlt.publicKey, Nimiq.Address.fromUserFriendlyAddress(values.receiver), Nimiq.Policy.coinsToSatoshis(values.amount), Nimiq.Policy.coinsToSatoshis(values.fee), window.$.blockchain.height)
    }

    sendGeneralTransaction(values) {
        console.log('values ', values);
        console.log('this.props.nimiq.selectedWallet._wlt ', this.props.nimiq.selectedWallet._wlt)
        // TODO: Get Account Types Dynamically
        const freeformData = Nimiq.BufferUtils.fromAscii(values.note);
        return new Nimiq.ExtendedTransaction(this.props.nimiq.selectedWallet._wlt.publicKey, Nimiq.Account.Type.BASIC, Nimiq.Address.fromUserFriendlyAddress(values.receiver), Nimiq.Account.Type.BASIC, Nimiq.Policy.coinsToSatoshis(values.amount), Nimiq.Policy.coinsToSatoshis(values.fee), window.$.blockchain.height, Nimiq.Transaction.Flag.NONE, freeformData);
    }

    handleBasicTransaction = (values) => {
        console.log('handleBasicTransaction ', values)
        let tx;
        switch (this.state.transactionType) {
            case 'basic':
                tx = this.sendBasicTransaction(values)
                break;
            case 'general':
                tx = this.sendGeneralTransaction(values)
                break;
        }
        if (!tx) throw Error('Failed to generate transaction.');
        const signResult = this.sign(tx);
        tx.signature = signResult.signature;
        tx.proof = signResult.proof;
        console.log('pushing transaction ', tx)
        window.$.mempool.pushTransaction(tx)
    }

    handleVestingTransaction = (values) => {
        console.log('handleVestingTransaction ', values)
        const vestingOwner = values.owner;
        const vestingStepBlocks = parseFloat(values['step-blocks']);
        if ( vestingOwner === null || vestingStepBlocks === null) return null;

        const requiresVestingTotalAmount = values.total !== '';
        const requiresVestingStartAndStepAmount = values.start !== ''
            || values['step-amount'] !== '' || requiresVestingTotalAmount;

        const bufferSize = vestingOwner.serializedSize + /* vestingStepBlocks*/ 4
            + (requiresVestingStartAndStepAmount? /* vestingStart */ 4 + /* vestingStepAmount */ 8 : 0)
            + (requiresVestingTotalAmount? /* vestingTotalAmount */ 8 : 0);

        let vestingStart, vestingStepAmount, vestingTotalAmount;

        if (requiresVestingStartAndStepAmount) {
            vestingStart = parseFloat(values.start);
            vestingStepAmount = parseFloat(values['step-amount']);
            if (vestingStart === null || vestingStepAmount === null) return null;
            vestingStepAmount = Nimiq.Policy.coinsToSatoshis(vestingStepAmount);
        }
        if (requiresVestingTotalAmount) {
            vestingTotalAmount = parseFloat(values.total);
            if (vestingTotalAmount === null) return null;
            vestingTotalAmount = Nimiq.Policy.coinsToSatoshis(vestingTotalAmount);
        }

        const buffer = new Nimiq.SerialBuffer(bufferSize);
        vestingOwner.serialize(buffer);

        if (requiresVestingStartAndStepAmount) {
            buffer.writeUint32(vestingStart);
            buffer.writeUint32(vestingStepBlocks);
            buffer.writeUint64(vestingStepAmount);
            if (requiresVestingTotalAmount) {
                buffer.writeUint64(vestingTotalAmount);
            }
        } else {
            buffer.writeUint32(vestingStepBlocks);
        }

        const recipient = Nimiq.Address.CONTRACT_CREATION;
        const recipientType = Nimiq.Account.Type.VESTING;
        const flags = Nimiq.Transaction.Flag.CONTRACT_CREATION;
        return new Nimiq.ExtendedTransaction(values.owner, Nimiq.Account.Type.BASIC, recipient, recipientType, Nimiq.Policy.coinsToSatoshis(values.amount), Nimiq.Policy.coinsToSatoshis(values.fee), values.start, flags, buffer);
    }

    sign(tx) {
        const keyPair = this.props.nimiq.selectedWallet._wlt.keyPair;
        const signature = Nimiq.Signature.create(keyPair.privateKey, keyPair.publicKey, tx.serializeContent());
        const proof = Nimiq.SignatureProof.singleSig(keyPair.publicKey, signature).serialize();
        return {
            signature: signature,
            proof: proof
        };
    }

    render() {
        const { classes } = this.props;
        const {transactionType} = this.state;
        return (
            <div>
                <FullHeight scroll subtract={160}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-simple">Transaction Type</InputLabel>
                        <Select
                            value={this.state.transactionType}
                            onChange={this.handleChange}
                            input={<Input name="transaction-type" id="transaction-type" />}
                            style={{width: 300}}
                        >
                            <MenuItem value={'basic'}>Basic</MenuItem>
                            <MenuItem value={'general'}>General</MenuItem>
                            <MenuItem value={'vesting'}>Vesting Contract Creation</MenuItem>
                            <MenuItem value={'htlc'}>HTLC Contract Creation</MenuItem>
                            <MenuItem value={'plain'}>Plain Extended</MenuItem>
                        </Select>
                    </FormControl>
                    {transactionType === 'basic' && <Basic onSubmit={this.handleBasicTransaction}/>}
                    {transactionType === 'general' && <General onSubmit={this.handleBasicTransaction}/>}
                    {transactionType === 'vesting' && <Vesting onSubmit={this.handleVestingTransaction}/>}
                </FullHeight>
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
                                    <Typography variant="title" color="inherit">
                                        Confirm Transaction
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                            <div className={classes.paper}>
                                <Typography variant="title" id="modal-title">
                                    To
                                </Typography>
                                <Typography variant="subheading" id="simple-modal-description">
                                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                </Typography>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography variant="title" id="modal-title">
                                            Amount
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="title" id="modal-title">
                                            Fees
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Button variant="raised" color="primary" className={classes.button} onClick={this.handleBasicTransaction}>
                                    Send
                                </Button>
                            </div>
                        </div>
                    </Centered>
                </Modal>

            </div>
        );
    }
}

Send.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        nimiq: state.nimiq
    };
}

export default compose(
    connect(mapStateToProps),
    withStyles(styles),
    translate('translations')
)(Send);