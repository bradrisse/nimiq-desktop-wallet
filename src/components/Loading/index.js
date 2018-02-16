import React from "react";
import {withStyles} from "material-ui/styles";
import {connect} from "react-redux";
import Typography from 'material-ui/Typography';
import FullHeight from '../FullHeight';
import { translate } from 'react-i18next';
import Centered from '../Centered';
import { compose } from 'recompose';

const styles = theme => ({
    background: {
        // background: 'linear-gradient(#3523ae,#1c0446) fixed'
    },
    message: {
        color: 'white'
    }
});

class Loading extends React.Component {

    render() {
        const {nimiq, classes, t} = this.props;

        return (
            <FullHeight className={classes.background}>
                <Centered>
                    <svg fill='#F6AE2D' width="212px" height="187px" viewBox="0 0 212 187" xmlns='http://www.w3.org/2000/svg'>
                        <path d="M165.406733,8.80713427 C162.568737,3.94260521 155.698918,0 150.073908,0 L61.7051703,0 C56.0716633,0 49.2145892,3.94260521 46.3723447,8.80713427 L2.2644489,84.4898597 C-0.573547094,89.3543888 -0.573547094,97.2438477 2.2644489,102.108377 L46.3723447,177.791102 C49.2103407,182.655631 56.0801603,186.602485 61.7051703,186.602485 L150.073908,186.602485 C155.707415,186.602485 162.564489,182.65988 165.406733,177.791102 L209.514629,102.108377 C212.352625,97.2438477 212.352625,89.3586373 209.514629,84.4898597 L165.406733,8.80713427 Z M115.814028,147.614028 L115.814028,165.075351 L99.3553507,165.075351 L99.3553507,148.281042 C89.3586373,147.082966 77.4968337,142.749499 69.4969138,135.484569 L80.3603206,118.88994 C89.0272545,125.288176 96.4876152,128.618998 104.619238,128.618998 C114.148617,128.618998 118.346132,124.752866 118.346132,117.02485 C118.346132,99.7632064 73.5669739,100.098838 73.5669739,69.8410421 C73.5669739,53.3823647 83.423487,41.9836473 99.3553507,38.7845291 L99.3553507,21.4591583 L115.814028,21.4591583 L115.814028,38.4531463 C126.677435,39.9826052 134.473427,45.3187174 141.071343,52.248016 L128.542525,66.378517 C122.411944,60.8469739 117.216032,57.9792385 110.082806,57.9792385 C101.955431,57.9792385 97.553988,61.1783567 97.553988,68.7109419 C97.553988,84.6385571 142.337395,83.3045291 142.337395,115.427415 C142.273667,131.486733 133.275351,143.947575 115.814028,147.614028 Z" id="Shape"></path>
                    </svg>
                    <Typography className={classes.message} align="center">{nimiq.message} {t('loading.syncing')} {nimiq.blockHeight}</Typography>
                </Centered>
            </FullHeight>
        );
    }
}

function mapStateToProps(state) {
    return {
        nimiq: state.nimiq
    };
}

export default compose(
    connect(mapStateToProps),
    withStyles(styles, {withTheme: true}),
    translate('translations')
)(Loading);
