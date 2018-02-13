import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import Menu from '../Menu';
import Wallet from '../Wallet';
import { translate } from 'react-i18next';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
        marginTop: 0,
        zIndex: 1,
        overflow: 'hidden',
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        position: 'absolute',
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        height: '100%',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        width: 60,
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    drawerInner: {
        // Make the items inside not wrap when transitioning:
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '8px'
    },
    content: {
        width: '100%',
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
       // padding: 24,
        height: 'calc(100% - 56px)',
        //marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 64,
        },
    },
});

class MiniDrawer extends React.Component {
    state = {
        open: false,
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, theme, t } = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
                        <Toolbar disableGutters={!this.state.open}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classNames(classes.menuButton, this.state.open && classes.hide)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <svg fill='#F6AE2D' width="50px" height="42px" viewBox="0 0 50 42" xmlns='http://www.w3.org/2000/svg'>
                                <path d="M12.5513121,0.350929591 L0.405092593,21.2399659 L12.5513121,42.1290047 L37.4486894,42.1290047 L49.5949078,21.2399659 L37.4486894,0.350929591 L12.5513121,0.350929591 Z M17.0409038,9.26840335 L18.5206321,9.26840335 C19.0784958,9.26840335 19.5392415,9.33324372 19.9025013,9.46074149 C20.2657614,9.58823671 20.5615584,9.83412432 20.7950832,10.2038643 L28.9706513,22.577589 L29.9047478,23.9560085 L29.9047478,10.3758026 C29.9047478,10.0060624 30.071553,9.7324912 30.4088631,9.55399611 C30.7461758,9.362752 31.2729029,9.26840361 31.9864478,9.26840361 L32.9798517,9.26840361 C33.6933991,9.26840361 34.2123413,9.36274971 34.5366782,9.55399611 C34.8739909,9.73249095 35.0407936,10.0060624 35.0407936,10.3758026 L35.0407936,18.430672 L37.9676316,18.430672 C38.6941522,18.430672 39.0559252,19.1122334 39.0559252,20.476445 L39.0559252,21.4497909 C39.0559252,22.8012546 38.6941522,23.4780776 37.9676316,23.4780776 L35.0407936,23.4780776 L35.0407936,32.142018 C35.0407936,32.8559974 34.3550487,33.2115317 32.9798517,33.2115317 L31.6543233,33.2115317 C31.0834885,33.2115317 30.6227404,33.1543368 30.2724546,33.0395909 C29.9221687,32.9120982 29.6311903,32.6709434 29.3976655,32.3139512 L20.8365973,19.4419019 L20.0952514,18.3723866 L20.0952514,32.142018 C20.0952514,32.8559974 19.4095063,33.2115317 18.0343081,33.2115317 L17.0409038,33.2115317 C15.6527366,33.2115317 14.9592056,32.8559974 14.9592056,32.142018 L14.9592056,23.7316153 L12.0649889,23.7316153 C11.3384686,23.7316153 10.9766922,23.0547897 10.9766922,21.7033258 L10.9766922,20.7299799 C10.9766922,19.3657701 11.3384686,18.6842061 12.0649889,18.6842061 L14.9592056,18.6842061 L14.9592056,10.3758021 C14.9592056,10.0060618 15.1260082,9.73249069 15.4633206,9.5539956 C15.800632,9.36275073 16.327362,9.26840335 17.0409038,9.26840335 Z" id="path4"></path>
                            </svg>
                            <Typography variant="title" color="inherit" noWrap style={{marginLeft: 15}}>
                                {t('title')}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        classes={{
                            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                        }}
                        open={this.state.open}
                    >
                        <div className={classes.drawerInner}>
                            <div className={classes.drawerHeader}>
                                <IconButton onClick={this.handleDrawerClose}>
                                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                                </IconButton>
                            </div>
                            <Divider />
                            <Menu />
                        </div>
                    </Drawer>
                    <main className={classes.content}>
                        <Wallet/>
                    </main>
                </div>
            </div>
        );
    }
}

MiniDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(translate('translations')(MiniDrawer));