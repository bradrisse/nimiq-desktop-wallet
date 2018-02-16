import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actions as nimiqActions} from "../ducks/nimiq";
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
import Chip from 'material-ui/Chip';
import Grid from 'material-ui/Grid';
import _ from 'lodash';


var key = 'a18532abfb31ba4e26d64a3ac3430969639aeb5f84b1c4124da0f3e323cdaced';

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

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
    },
    chip: {
        margin: theme.spacing.unit,
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
        confirmedSafe: false,
        walletSeed: null,
        mnemonicPhrase: null,
        mnemonicPhraseArray: [],
        shuffledMnemonic: [],
        confirmedPhrase: false
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
        }, () => {
            if (this.state.step === 1) {
                this.createWallet()
            }
        })

    }

    createWallet = () => {
        window.Nimiq.Wallet.generate().then(wlt => {
            window.$.walletStore.put(wlt);
            var _mnemonicPhrase = MnemonicPhrase.keyToMnemonic(wlt.keyPair.publicKey.toHex());
            var splitPhrase = _mnemonicPhrase.split(' ');
            var _mnemonicArr = []
            _.each(splitPhrase, (word, index) => {
                _mnemonicArr.push({
                  word: word,
                  confirmed: false,
                  num: index
                })
            })
            this.setState({
                walletSeed: wlt.keyPair.publicKey.toHex(),
                mnemonicPhrase: _mnemonicPhrase,
                mnemonicPhraseArray: shuffle(_mnemonicArr)
            })
            var _newWallet = {
                name: this.state.newWallet.name,
                address: wlt.address.toUserFriendlyAddress(),
                balance: 0,
                transactions: []
            }
            this.props.nimiqActions.addWallet(_newWallet)
        })
    }

    checkOrder = (word) => {
        var _mnemonicPhraseArray = _.sortBy(this.state.mnemonicPhraseArray, 'num');
        var lastConfirmed = _.find(_mnemonicPhraseArray, function (x) { return !x.confirmed });

        if (word === lastConfirmed.word) {
            var _mnemonicPhraseUnshuffled = this.state.mnemonicPhraseArray
            var existingWordIndex = _.findIndex(_mnemonicPhraseUnshuffled, (obj) => {
                return word === obj.word
            })
            _mnemonicPhraseUnshuffled[existingWordIndex].confirmed = true;
            this.setState({
                mnemonicPhraseArray: _mnemonicPhraseUnshuffled
            })
        }

        if (lastConfirmed.num === 23) {
            this.setState({
                confirmedPhrase: true
            })
        }
    }

    resetForm = () => {
        this.setState({
            newWallet: {
                name: '',
                password: '',
                repeatPassword: ''
            },
            showPassword: false,
            step: 0,
            confirmedSafe: false,
            walletSeed: null,
            mnemonicPhrase: null,
            mnemonicPhraseArray: [],
            shuffledMnemonic: [],
            confirmedPhrase: false
        }, () => {
            this.handleClose()
        })
    }

    render() {
        const { classes, t } = this.props;
        const {showPassword, newWallet, open, step, mnemonicPhrase, confirmedPhrase} = this.state;

        return (
            <div>
                <Button onClick={this.handleOpen} style={{width: '100%', background: '#5648A0', color: 'white'}}>Create Wallet</Button>
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
                                    <Grid container style={{textAlign: 'center'}} spacing={0}>
                                        {mnemonicPhrase && mnemonicPhrase.split(' ').map((word, index) => (
                                            <Grid item key={index} xs={3}><Chip label={`${index + 1}. ${word}`} className={classes.chip} /></Grid>
                                        ))}
                                    </Grid>
                                    <Button variant="raised" color="primary" className={classes.button} onClick={this.nextStep}>
                                        Yes, I have written it down
                                    </Button>
                                </div>}
                                {step === 3 && <div>
                                    <Typography>Confirm Recovery Password</Typography>
                                    <Grid container style={{textAlign: 'center'}} spacing={0}>
                                        {this.state.mnemonicPhraseArray.map((wordObj, index) => (
                                            <Grid item key={index} xs={3}><Chip style={{background: wordObj.confirmed ? '#2df69f' : '', color: wordObj.confirmed ? 'white' : 'black'}} label={`${wordObj.word}`} className={classes.chip} onClick={() => {this.checkOrder(wordObj.word)}}/></Grid>
                                        ))}
                                    </Grid>
                                    <Button variant="raised" color="primary" className={classes.button} onClick={this.resetForm} disabled={!confirmedPhrase}>
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

export default compose(
    connect(mapStateToProps, mapPropsToDispatch),
    withStyles(styles, {withTheme: true}),
    translate('translations')
)(CreateWallet);