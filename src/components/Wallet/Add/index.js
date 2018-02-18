import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { translate } from 'react-i18next';
import { compose } from 'recompose';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import TitleBar from '../../../common/TitleBar';
import BasicModal from '../../../common/BasicModal';

import PersonalWallet from './personal';
import RestoreWallet from './restore';

const styles = theme => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        position: 'relative',
        padding: 30
    },
    addButton: {
        width: '100%',
        background: '#5648A0',
        color: 'white'
    },
    backdrop: {
        zIndex: 1
    },
    flex: {
        flex: 1
    },
    gridButton: {
        margin: '0 auto',
        display: 'block'
    }
});

class CreateWallet extends React.Component {
    state = {
        open: false,
        walletType: null
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false, walletType: null });
    };

    changeWalletType = (_walletType) => {
        this.setState({
            walletType: _walletType
        })
    }

    render() {
        const { classes, t } = this.props;
        const {open, walletType} = this.state;

        return (
            <div>
                <Button onClick={this.handleOpen} className={classes.addButton}>Add Wallet</Button>
                <BasicModal isOpen={open}>
                    {!walletType && <div>
                        <TitleBar title="Add Wallet" onClose={this.handleClose}/>
                        <div className={classes.paper}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Button className={classes.gridButton} variant="raised" color="primary" onClick={() => {this.changeWalletType('personal')}}>
                                        Create Personal Wallet
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button className={classes.gridButton} variant="raised" color="primary" onClick={() => {this.changeWalletType('multi')}}>
                                        Create Muli-Sig Wallet
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button className={classes.gridButton} variant="raised" color="primary" onClick={() => {this.changeWalletType('restore')}}>
                                        Restore Wallet
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </div>}

                    {walletType === 'personal' && <PersonalWallet onClose={this.handleClose}/>}
                    {walletType === 'restore' && <RestoreWallet onClose={this.handleClose}/>}
                </BasicModal>
            </div>
        );
    }
}

CreateWallet.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(styles, {withTheme: true}),
    translate('translations')
)(CreateWallet);