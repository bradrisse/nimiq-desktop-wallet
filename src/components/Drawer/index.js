import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import Menu from '../Menu';
import Wallet from '../Wallet';
import Mining from '../Mining';
import Settings from '../Settings';
import { translate } from 'react-i18next';
import {connect} from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { compose } from 'recompose';

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
    flex: {
        flex: 1,
    }
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
        const { nimiq, classes, theme, t } = this.props;

        return (
            <div className={classes.root}>
                <Router>
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
                                <div className={classes.flex}>
                                    <div style={{float: 'left'}}>
                                        <svg fill='#F6AE2D' width="50px" height="31px" viewBox="0 0 50 31" xmlns='http://www.w3.org/2000/svg'>
                                            <path d="M40.5421252,15.3376001 L34.9062243,27.4238285 C34.5088902,28.2759142 33.687156,28.8512987 32.7505611,28.9332402 L19.1113194,30.1265192 C18.1747245,30.2084606 17.2655598,29.7845102 16.7262989,29.0143658 L15.0223936,26.5809368 C19.1552159,25.4407121 23.9165692,23.7174348 28.8536035,21.498004 C33.2332022,19.5283695 37.2130783,17.4100146 40.5421252,15.3376001 Z M49.6550815,3.6386435 C51.1338336,6.84204556 41.2816613,14.1869072 27.6302055,20.0421868 C13.9753547,25.8964742 1.70900701,28.0366258 0.224807702,24.8294968 C-0.722917718,22.7811815 1.91012184,20.3615541 8.26045057,16.4000559 C8.78746395,17.1865288 9.06677106,17.5994732 9.64791126,18.4574707 C7.65389788,20.157822 6.7019364,20.9121699 7.14412013,21.8640867 C8.20310062,24.1548586 17.0310258,22.5990762 26.860961,18.3847867 C36.6888441,14.1677625 43.7974355,8.89134031 42.7357691,6.60405362 C42.2949283,5.65039425 38.9815228,6.50353071 36.3370192,6.79539989 C36.0831257,6.42793665 35.1097749,5.09628556 34.9214146,4.82001841 C42.2288591,2.92523653 48.7055403,1.58908586 49.6550815,3.6386435 Z" id="Combined-Shape" fill-rule="nonzero"></path>
                                            <path d="M36.0319975,6.0679435 C36.0290734,6.06875632 36.0261491,6.06956925 36.0232245,6.07038226 C36.1537121,6.25476684 36.6291518,6.92738936 37.0041665,7.45634462 L40.4613359,12.3936942 C40.4976098,12.4454988 40.5318394,12.4983404 40.5640145,12.5521045 C37.7384584,14.850264 33.2907637,17.4981339 28.0537995,19.854283 C22.4992292,22.3512512 17.2544463,23.9807376 13.5647131,24.5016414 L9.95017082,19.33954 C9.71619883,19.0026906 9.49293603,18.6798534 9.21002152,18.2731915 C9.20852748,18.2741602 9.20703368,18.2751287 9.20554009,18.2760971 L8.87152603,17.7990756 C8.33226518,17.0289313 8.2448347,16.0295964 8.64216881,15.1775106 L14.4283797,2.76894135 C14.8257138,1.91685559 15.647448,1.34147111 16.584043,1.25952967 L30.2232846,0.0662506485 C31.1598795,-0.0156907931 32.0690442,0.408259658 32.6083051,1.17840397 L36.0319975,6.0679435 Z M30.9484551,4.20765796 C31.2553685,4.34617615 31.6113869,4.32093329 31.8956853,4.14049626 C32.3619831,3.84454886 32.5000793,3.22662708 32.2041319,2.76032934 L31.8420457,2.18982264 C31.3317091,1.46098649 30.4713092,1.05977544 29.5849503,1.13732179 L28.8531813,1.22785752 C28.506922,1.27069731 28.2080251,1.49091003 28.0644984,1.80892075 C27.837305,2.31231087 28.0612067,2.90456581 28.5645968,3.13175919 L30.9484551,4.20765796 Z" id="Combined-Shape"></path>
                                        </svg>
                                    </div>
                                    <Typography variant="title" color="inherit" noWrap style={{marginLeft: 15, float: 'left', lineHeight: '33px'}}>
                                        {t('header.title')}
                                    </Typography>
                                </div>
                                <Typography variant="caption" color="inherit" style={{marginRight: 15}}>
                                    {t('header.status')}: {nimiq.isConsensusEstablished ? t('header.connected') : t('header.notConnected')} @ #{nimiq.blockHeight}
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
                                <Switch>
                                    <Route exact path="/" component={Wallet} />
                                    <Route exact path="/mining" component={Mining} />
                                    <Route exact path="/settings" component={Settings} />
                                    <Redirect from='*' to='/' />
                                </Switch>
                            </main>
                    </div>
                </Router>
            </div>
        );
    }
}

MiniDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        nimiq: state.nimiq
    };
}

export default compose(
    connect(mapStateToProps),
    withStyles(styles, { withTheme: true }),
    translate('translations')
)(MiniDrawer);