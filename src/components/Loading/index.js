import React from "react";
import {withStyles} from "material-ui/styles";
import {connect} from "react-redux";
import Typography from 'material-ui/Typography';
import FullHeight from '../FullHeight';
import Grid from 'material-ui/Grid';
import { translate } from 'react-i18next';

const styles = theme => ({
    background: {
        background: '#042146'
    },
    container: {
        flexGrow: 1,
        height: "100%",
        width: "100%",
        margin: 0
    },
    message: {
        color: 'white'
    },
    gridContainer: {
        height: '100%'
    }
});

class Loading extends React.Component {

    render() {
        const {nimiq, classes, t} = this.props;

        return (
            <FullHeight className={classes.background}>
                <Grid container className={classes.container}>
                    <Grid item xs={12}>
                        <Grid container alignItems={"center"} direction={"row"} justify={"center"} className={classes.gridContainer}>
                            <Grid item>
                                <svg fill='#F6AE2D' width="212px" height="184px" viewBox="0 0 212 184" xmlns='http://www.w3.org/2000/svg'>
                                    <path d="M50.2052482,1.40371836 L1.62037037,84.9598635 L50.2052482,168.516019 L149.794758,168.516019 L198.379631,84.9598635 L149.794758,1.40371836 L50.2052482,1.40371836 Z M68.1636151,37.0736134 L74.0825282,37.0736134 C76.3139833,37.0736134 78.1569662,37.3329749 79.6100054,37.842966 C81.0630456,38.3529468 82.2462336,39.3364973 83.1803327,40.8154571 L115.882605,90.310356 L119.618991,95.824034 L119.618991,41.5032103 C119.618991,40.0242494 120.286212,38.9299648 121.635452,38.2159844 C122.984703,37.451008 125.091612,37.0736144 127.945791,37.0736144 L131.919407,37.0736144 C134.773596,37.0736144 136.849365,37.4509989 138.146713,38.2159844 C139.495964,38.9299638 140.163174,40.0242494 140.163174,41.5032103 L140.163174,73.7226878 L151.870526,73.7226878 C154.776609,73.7226878 156.223701,76.4489337 156.223701,81.9057801 L156.223701,85.7991638 C156.223701,91.2050182 154.776609,93.9123104 151.870526,93.9123104 L140.163174,93.9123104 L140.163174,128.568072 C140.163174,131.423989 137.420195,132.846127 131.919407,132.846127 L126.617293,132.846127 C124.333954,132.846127 122.490962,132.617347 121.089818,132.158364 C119.688675,131.648393 118.524761,130.683774 117.590662,129.255805 L83.3463892,77.7676074 L80.3810055,73.4895464 L80.3810055,128.568072 C80.3810055,131.423989 77.638025,132.846127 72.1372326,132.846127 L68.1636151,132.846127 C62.6109466,132.846127 59.8368222,131.423989 59.8368222,128.568072 L59.8368222,94.9264611 L48.2599557,94.9264611 C45.3538742,94.9264611 43.9067689,92.2191588 43.9067689,86.8133033 L43.9067689,82.9199196 C43.9067689,77.4630803 45.3538742,74.7368243 48.2599557,74.7368243 L59.8368222,74.7368243 L59.8368222,41.5032082 C59.8368222,40.0242474 60.5040329,38.9299628 61.8532826,38.2159824 C63.2025281,37.4510029 65.3094481,37.0736134 68.1636151,37.0736134 Z" id="path4"></path>
                                </svg>
                                <Typography className={classes.message} align="center">{nimiq.message} {t('loading.syncing')} {nimiq.blockHeight}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </FullHeight>
        );
    }
}

function mapStateToProps(state) {
    return {
        nimiq: state.nimiq
    };
}

export default connect(mapStateToProps)(withStyles(styles, {withTheme: true})(translate('translations')(Loading)));
