import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import WalletList from './list';
import Grid from 'material-ui/Grid';
import { translate } from 'react-i18next';
import Summary from './summary';
import Send from './Send';
import Settings from './settings';
import Receive from './receive';
import Transactions from '../Transactions';
import Paper from 'material-ui/Paper';
import FullHeight from '../../common/FullHeight';
import { compose } from 'recompose';

import SummaryIcon from 'material-ui-icons/Assessment';
import SendIcon from 'material-ui-icons/FileUpload';
import ReceiveIcon from 'material-ui-icons/FileDownload';
import TransactionsIcon from 'material-ui-icons/Receipt';
import SettingsIcon from 'material-ui-icons/Settings';


function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        height: '100%',
        background: theme.palette.bgColor
    }
});

class Wallet extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes, t } = this.props;
        const { value } = this.state;

        return (
            <div className={classes.root}>
                <Grid container spacing={0}>
                    <Grid item xs={3}>
                        <WalletList />
                    </Grid>
                    <Grid item xs={9}>
                        <FullHeight>
                            <Paper className={classes.paper}>
                                <AppBar position="static">
                                    <Tabs value={value} onChange={this.handleChange} fullWidth>
                                        <Tab icon={<SummaryIcon />} label={t('wallet.summary.title')} />
                                        <Tab icon={<SendIcon />} label={t('wallet.send.title')} />
                                        <Tab icon={<ReceiveIcon />} label={t('wallet.receive.title')} />
                                        <Tab icon={<TransactionsIcon />} label={t('wallet.transactions.title')} />
                                        <Tab icon={<SettingsIcon />} label={t('wallet.settings.title')} />
                                    </Tabs>
                                </AppBar>
                                {value === 0 && <TabContainer><Summary/></TabContainer>}
                                {value === 1 && <TabContainer><Send /></TabContainer>}
                                {value === 2 && <TabContainer><Receive /></TabContainer>}
                                {value === 3 && <TabContainer><Transactions subtract={120}/></TabContainer>}
                                {value === 4 && <TabContainer><Settings /></TabContainer>}
                            </Paper>
                        </FullHeight>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Wallet.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(styles),
    translate('translations')
)(Wallet);