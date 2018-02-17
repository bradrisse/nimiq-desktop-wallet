import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import {connect} from "react-redux";
import { translate } from 'react-i18next';
import { compose } from 'recompose';
import { Field, reduxForm, reset } from 'redux-form'
import { TextField } from 'redux-form-material-ui';
import { FormControl } from 'material-ui/Form';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

const afterSubmit = (result, dispatch) => dispatch(reset('basic'));


class Basic extends React.Component {

    submit = (values) => {
        console.log('values ', values)
        values.amount = parseFloat(values.amount);
        values.fee = parseFloat(values.fee);
        this.props.onSubmit(values)
    }

    render() {
        const { classes, handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.submit)}>
                <Field className={classes.textField} name="receiver" component={TextField} placeholder="Wallet Address" label="Receiver" required/>
                <Field className={classes.textField} name="amount" component={TextField} placeholder="0.00000" label="Amount" type="number" required/>
                <Field className={classes.textField} name="fee" component={TextField} placeholder="0.00000" label="Fee" type="number" required/>
                <Button variant="raised" color="primary" className={classes.button} type="submit">
                    Next
                </Button>

            </form>
        );
    }
}

Basic.propTypes = {
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
)(Basic);