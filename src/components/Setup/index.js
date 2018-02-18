import React from "react";
import {withStyles} from "material-ui/styles";
import {connect} from "react-redux";
import Card from 'material-ui/Card';
import FullHeight from '../../common/FullHeight';
import { translate } from 'react-i18next';
import Button from 'material-ui/Button';
import Centered from '../../common/Centered';
import { compose } from 'recompose';
import LanguageSelect from '../Settings/languageSelect.js';
import {bindActionCreators} from "redux";
import {actions as nimiqActions} from "../../ducks/nimiq";
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

const styles = theme => ({
    message: {
        color: 'white'
    },
    button: {
        margin: '15px auto 0',
        display: 'block'
    },
    flex: {
        flex: 1,
    },
    middleLogo: {
        margin: '0 auto',
        display: 'block',
        width: 50
    }
});

class Setup extends React.Component {

    handleContinue = () => {
        this.props.nimiqActions.completeSetup(true)
    }


    render() {
        const {classes} = this.props;

        return (
            <FullHeight>
                <AppBar>
                    <Toolbar>
                        <div className={classes.flex}>
                            <div className={classes.middleLogo}>
                                <svg fill='#F6AE2D' width="50px" height="45px" viewBox="0 0 50 45" xmlns='http://www.w3.org/2000/svg'>
                                    <path d="M39.011022,2.07715431 C38.3416834,0.929859719 36.7214429,0 35.3947896,0 L14.5531062,0 C13.2244489,0 11.6072144,0.929859719 10.9368737,2.07715431 L0.534068136,19.9268537 C-0.135270541,21.0741483 -0.135270541,22.9348697 0.534068136,24.0821643 L10.9368737,41.9318637 C11.6062124,43.0791583 13.2264529,44.01002 14.5531062,44.01002 L35.3947896,44.01002 C36.7234469,44.01002 38.3406814,43.0801603 39.011022,41.9318637 L49.4138277,24.0821643 C50.0831663,22.9348697 50.0831663,21.0751503 49.4138277,19.9268537 L39.011022,2.07715431 Z M27.3146293,34.8146293 L27.3146293,38.9328657 L23.4328657,38.9328657 L23.4328657,34.9719439 C21.0751503,34.6893788 18.2775551,33.6673347 16.3907816,31.9539078 L18.9529058,28.0400802 C20.996994,29.5490982 22.756513,30.3346693 24.6743487,30.3346693 C26.9218437,30.3346693 27.9118236,29.4228457 27.9118236,27.6002004 C27.9118236,23.5290581 17.3507014,23.6082164 17.3507014,16.4719439 C17.3507014,12.5901804 19.6753507,9.90180361 23.4328657,9.14729459 L23.4328657,5.06112224 L27.3146293,5.06112224 L27.3146293,9.06913828 C29.8767535,9.42985972 31.7154309,10.6883768 33.2715431,12.3226453 L30.3166333,15.6553106 C28.8707415,14.3507014 27.6452906,13.6743487 25.9629259,13.6743487 C24.0460922,13.6743487 23.008016,14.4288577 23.008016,16.2054108 C23.008016,19.9619238 33.5701403,19.6472946 33.5701403,27.2234469 C33.5551102,31.011022 31.4328657,33.9498998 27.3146293,34.8146293 Z" id="Shape"></path>
                                </svg>
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
                <Centered>
                    <Card style={{padding: 30}}>
                        <LanguageSelect/>
                        <br/>
                        <Button variant="raised" color="primary" className={classes.button} onClick={this.handleContinue}>Continue</Button>
                    </Card>
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

function mapPropsToDispatch(dispatch) {
    return {
        nimiqActions: bindActionCreators(nimiqActions, dispatch)
    };
}

export default compose(
    connect(mapStateToProps, mapPropsToDispatch),
    withStyles(styles, {withTheme: true}),
    translate('translations')
)(Setup);
