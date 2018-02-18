import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {connect} from "react-redux";
import { Field, reduxForm, reset } from 'redux-form'
import { TextField } from 'redux-form-material-ui';
import { compose } from 'recompose';
import { translate } from 'react-i18next';
import TitleBar from '../../../common/TitleBar';

const styles = theme => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        position: 'relative',
        padding: 30
    },
    textField: {
        width: 300,
    }
});

const afterSubmit = (result, dispatch) => dispatch(reset('basic'));

class Restore extends React.Component {

    submit = (values) => {
        console.log('restore submit ', values)
    }

    render() {
        const { nimiq, classes, onClose, handleSubmit } = this.props;
        return (
            <div>
                <TitleBar title="Restore Wallet" onClose={onClose}/>
                <div className={classes.paper}>
                    <form onSubmit={handleSubmit(this.submit)}>
                        <Field className={classes.textField} name="wallet-name" component={TextField} label="Wallet Name" required/>
                        <Field className={classes.textField} name="recovery-phrase" component={TextField} label="Recovery Phrase" multiline rowsMax="4" required/>
                    </form>
                </div>
            </div>
        );
    }
}

Restore.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        nimiq: state.nimiq
    };
}

export default compose(
    connect(mapStateToProps),
    withStyles(styles),
    translate('translations'),
    reduxForm({form: 'basic', onSubmitSuccess: afterSubmit})
)(Restore);