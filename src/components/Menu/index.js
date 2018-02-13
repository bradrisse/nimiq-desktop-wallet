import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import SeetingsIcon from 'material-ui-icons/Settings';
import WalletIcon from 'material-ui-icons/AccountBalanceWallet';
import { translate } from 'react-i18next';


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

function SimpleList(props) {
    const { classes, t } = props;
    return (
        <div className={classes.root}>
            <List component="nav">
                <ListItem button>
                    <ListItemIcon>
                        <WalletIcon />
                    </ListItemIcon>
                    <ListItemText primary={t('wallet.title')} />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <SeetingsIcon />
                    </ListItemIcon>
                    <ListItemText primary={t('settings.title')} />
                </ListItem>
            </List>
            <Divider />
        </div>
    );
}

SimpleList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(translate('translations')(SimpleList));