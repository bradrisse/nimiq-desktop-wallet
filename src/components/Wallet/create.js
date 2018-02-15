import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Modal from 'material-ui/Modal';
import Centered from '../Centered';
import { translate } from 'react-i18next';
import { compose } from 'recompose';
import TextField from 'material-ui/TextField';
import { FormControlLabel, FormControl, FormLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import ReactCodeInput from 'react-code-input';
import Button from 'material-ui/Button';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import Checkbox from 'material-ui/Checkbox';

var key = 'a18532abfb31ba4e26d64a3ac3430969639aeb5f84b1c4124da0f3e323cdaced';

const styles = theme => ({
    modal: {
        zIndex: 3,
        position: 'relative',
        minWidth: 300,
        maxWidth: 450
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        position: 'relative',
        padding: 30
    },
    backdrop: {
        zIndex: 1
    },
    button: {
        margin: '15px auto 0',
        display: 'block'
    },
    flex: {
        flex: 1
    }
});

class CreateWallet extends React.Component {
    state = {
        open: false,
        newWallet: {
            name: '',
            password: '',
            repeatPassword: ''
        },
        showPassword: false,
        step: 0,
        confirmedSafe: false
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    onNameChange = (e) => {
        this.setState({
            newWallet: {...this.state.newWallet, name: e.target.value}
        })
    }

    handlePassword = (type, value) => {
        var _newWallet = this.state.newWallet;
        _newWallet[type] = value;
        this.setState({
            newWallet: _newWallet
        })
    }

    nextStep = () => {
        this.setState({
            step: this.state.step += 1
        })
    }

    render() {
        const { classes, t } = this.props;
        const {showPassword, newWallet, open, step} = this.state;

        return (
            <div>
                <Button onClick={this.handleOpen} style={{width: '100%', background: '#042146', color: 'white'}}>Create Wallet</Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={open}
                    onClose={this.handleClose}
                >
                    <Centered>
                        <div className={classes.modal}>
                            <AppBar position="static" color="default">
                                <Toolbar>
                                    <Typography variant="title" color="inherit" className={classes.flex}>
                                        {step === 0 && 'Create Wallet'}
                                        {(step === 1 || step === 2 || step === 3) && 'Recovery Phrase'}
                                    </Typography>
                                    <IconButton
                                        onClick={this.handleClose}
                                        color="inherit"
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Toolbar>
                            </AppBar>
                            <div className={classes.paper}>
                                {step === 0 && <div>
                                    <TextField
                                        id="full-width"
                                        label="Wallet Name"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        placeholder=""
                                        value={newWallet.name}
                                        fullWidth
                                        margin="normal"
                                        style={{marginTop: 0}}
                                        onChange={this.onNameChange}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={showPassword}
                                                onChange={(event, checked) => this.setState({ showPassword: checked })}
                                            />
                                        }
                                        label="Encrypt with password"
                                    />
                                    {showPassword && <div>
                                        <FormControl>
                                            <FormLabel component="legend">Password</FormLabel>
                                            <ReactCodeInput type='password' fields={4} onChange={(value) => {this.handlePassword('password', value)}}/>
                                        </FormControl>
                                        <FormControl style={{marginLeft: 15}}>
                                            <FormLabel component="legend">Repeat Password</FormLabel>
                                            <ReactCodeInput type='password' fields={4} onChange={(value) => {this.handlePassword('repeatPassword', value)}}/>
                                        </FormControl>
                                    </div>}

                                    <div className="clearfix"></div>

                                    <Button variant="raised" color="primary" className={classes.button} onClick={this.nextStep}>
                                        Create Wallet
                                    </Button>
                                </div>}
                                {step === 1 && <div>
                                    <Typography>On the following screen, you will see a 24-word phrase. This is your wallet backup phrase. It can be entered in any version of the Nimiq wallet in order to restore your wallet.</Typography>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.confirmedSafe}
                                                onChange={(event, checked) => this.setState({ confirmedSafe: checked })}
                                                value="checkedA"
                                            />
                                        }
                                        label="Please make sure nobody looks into your screen unless you want them to have access to your funds"
                                    />
                                    <Button variant="raised" color="primary" className={classes.button} onClick={this.nextStep}>
                                        Continue
                                    </Button>
                                </div>}
                                {step === 2 && <div>
                                    <Typography>The phrase is case sensitive. Please make sure you write down and save your recovery phrase. You will need this phrase to use and restore your wallet.</Typography>
                                    <Typography>{MnemonicPhrase.keyToMnemonic(key)}</Typography>
                                    <Button variant="raised" color="primary" className={classes.button} onClick={this.nextStep}>
                                        Yes, I have written it down
                                    </Button>
                                </div>}
                                {step === 3 && <div>
                                    <Typography>Confirm Recovery Password</Typography>
                                    <Button variant="raised" color="primary" className={classes.button} onClick={this.handleClose}>
                                        Confirm
                                    </Button>
                                </div>}
                            </div>
                        </div>
                    </Centered>
                </Modal>
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