import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import {connect} from "react-redux";
import Card, { CardActions, CardContent } from 'material-ui/Card';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import Switch from 'material-ui/Switch';
import Grid from 'material-ui/Grid';
import {bindActionCreators} from "redux";
import {actions as nimiqActions} from "../ducks/nimiq";
import { translate } from 'react-i18next';

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

class Mining extends React.Component {

    state = {
        checkedA: true
    }

    toggleMining = (checked) => {
        this.props.nimiqActions.toggleMining(checked);
    }


    render() {
        const { nimiq, classes, t } = this.props;
        return (
            <div style={{padding: 30}}>
                <Typography variant="headline" component="h2" style={{marginBottom: 30, float: 'left'}}>
                    {t('mining.title')}
                </Typography>
                <FormGroup style={{float:'right'}}>
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

export default connect(mapStateToProps, mapPropsToDispatch)(withStyles(styles)(translate('translations')(Mining)));