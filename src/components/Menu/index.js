import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import SeetingsIcon from 'material-ui-icons/Settings';
import WalletIcon from 'material-ui-icons/AccountBalanceWallet';
import MiningIcon from 'material-ui-icons/Memory';
import { translate } from 'react-i18next';
import { Link } from "react-router-dom";
import { compose } from 'recompose';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: '#E7E5EF',
    },
    link: {
        textDecoration: 'none'
    }
});

function Menu(props) {
    const { classes, t } = props;
    return (
        <div className={classes.root}>
            <List component="nav">
                <Link to="/" className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                            <WalletIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('wallet.title')} />
                    </ListItem>
                </Link>
                <Link to="/mining" className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                            <MiningIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('mining.title')} />
                    </ListItem>
                </Link>
                <Link to="/settings" className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                            <SeetingsIcon />
                        </ListItemIcon>
                        <ListItemText primary={t('settings.title')} />
                    </ListItem>
                </Link>
            </List>
            <Divider />
        </div>
    );
}

Menu.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(styles),
    translate('translations')
)(Menu);