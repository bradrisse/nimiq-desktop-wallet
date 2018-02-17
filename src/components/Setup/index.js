import React from "react";
import {withStyles} from "material-ui/styles";
import {connect} from "react-redux";
import Card from 'material-ui/Card';
import FullHeight from '../FullHeight';
import { translate } from 'react-i18next';
import Button from 'material-ui/Button';
import Centered from '../Centered';
import { compose } from 'recompose';
import LanguageSelect from '../Settings/languageSelect.js';
import {bindActionCreators} from "redux";
import {actions as nimiqActions} from "../ducks/nimiq";

const styles = theme => ({
    message: {
        color: 'white'
    },
    button: {
        margin: '15px auto 0',
        display: 'block'
    },
});

class Setup extends React.Component {

    handleContinue = () => {
        this.props.nimiqActions.completeSetup(true)
    }


    render() {
        const {classes} = this.props;

        return (
            <FullHeight>
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
