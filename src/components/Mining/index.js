import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actions as nimiqActions} from "../ducks/nimiq";
import Card, { CardContent } from 'material-ui/Card';
import { FormControlLabel, FormGroup, FormControl } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Grid from 'material-ui/Grid';
import { translate } from 'react-i18next';
import Input, { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';
import { compose } from 'recompose';

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
    textField: {
        marginLeft: 15
    }
});

class Mining extends React.Component {

    state = {
        checkedA: true,
        miningWallet: null
    }

    componentWillMount() {
        const { nimiq } = this.props;
        const miningWallet = JSON.parse(localStorage.getItem('miningWallet'))
        if (miningWallet) {
            this.setState({
                miningWallet: miningWallet
            })
        } else {
            this.setState({
                miningWallet: nimiq.wallets[0].address
            }, () => {
                this.setMiningWallet(nimiq.wallets[0].address)
            })
        }
    }

    toggleMining = (checked) => {
        this.props.nimiqActions.toggleMining(checked);
    }

    handleMiningWalletChange = (e) => {
        this.setState({
            miningWallet: e.target.value
        }, () => {
            this.setMiningWallet(e.target.value)
        })
    }

    setMiningWallet (address) {
        localStorage.setItem('miningWallet', JSON.stringify(address))
    }

    handleThreadCount = (e) => {
        this.props.nimiqActions.updateThreadCount(e.target.value);
    }

    render() {
        const { nimiq, classes, t } = this.props;
        const {miningWallet} = this.state;
        return (
            <div style={{padding: 30}}>
                <Typography variant="headline" component="h2" style={{marginBottom: 15, float: 'left'}}>
                    {t('mining.title')}
                </Typography>
                <Grid container>
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="mining-wallet">{t('mining.miningWallet')}</InputLabel>
                            <Select
                                value={miningWallet}
                                onChange={this.handleMiningWalletChange}
                                input={<Input name="mining-wallet" id="mining-wallet" />}
                                style={{width: 300}}
                            >
                                {nimiq.wallets.map((wallet, index) => (
                                    <MenuItem value={wallet.address} key={index}>
                                        {wallet.name ? wallet.name : `Wallet ${index}`}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            id="number"
                            label="Threads"
                            value={nimiq.threadCount}
                            onChange={this.handleThreadCount}
                            type="number"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                        <FormGroup style={{float:'right', marginTop: 20}}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={nimiq.isMining}
                                        onChange={(event, checked) => this.toggleMining(checked)}
                                    />
                                }
                                label={t('mining.toggle')}
                            />
                        </FormGroup>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={4}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography className={classes.title}>{t('mining.hashRate')}</Typography>
                                <Typography variant="headline" component="h2">
                                    {nimiq.hashRate}
                                </Typography>
                                <Typography className={classes.pos}>{t('mining.global')}: {nimiq.globalHashRate}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography className={classes.title}>{t('mining.lastBlockTime')}</Typography>
                                <Typography variant="headline" component="h2">
                                    1min 30sec
                                </Typography>
                                <Typography className={classes.pos}>{t('mining.average')}: 23 seconds</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography className={classes.title}>Peers</Typography>
                                <Typography variant="headline" component="h2">
                                    {nimiq.peers}
                                </Typography>
                                <Typography className={classes.pos}>3 {t('mining.nodes')} / 2 {t('mining.clients')}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={4}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography className={classes.title}>{t('mining.totalBlocksMined')}</Typography>
                                <Typography variant="headline" component="h2">
                                    45
                                </Typography>
                                <Typography className={classes.pos}>{t('mining.last30')}: 17</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography className={classes.title}>{t('mining.estimatedBlocks')}</Typography>
                                <Typography variant="headline" component="h2">
                                    2 per day
                                </Typography>
                                <Typography className={classes.pos}>60 per month</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography className={classes.title}>{t('mining.upTime')}</Typography>
                                <Typography variant="headline" component="h2">
                                    5 hr 10 min 29 sec
                                </Typography>
                                <Typography className={classes.pos}>Since: 22 February 2018</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Mining.propTypes = {
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
    withStyles(styles),
    translate('translations')
)(Mining);