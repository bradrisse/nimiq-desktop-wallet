import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { translate } from 'react-i18next';
import { compose } from 'recompose';
import { Field} from 'redux-form'
import { TextField, Select } from 'redux-form-material-ui';
import { MenuItem } from 'material-ui/Menu';
import {connect} from "react-redux";
import Grid from 'material-ui/Grid';
import Basic from './basic';

const styles = theme => ({
    textField: {
        width: 300,
    },
});


class Vesting extends React.Component {

    render() {
        const { classes, nimiq } = this.props;
        return (
            <Basic onSubmit={this.props.onSubmit}>
                <Grid item xs={12}>
                    <Field name="owner" component={Select} placeholder="Select vesting owner" label="Vesting Owner">
                        {nimiq.wallets.map((wallet, index) => (
                            <MenuItem key="index" value={wallet.address}>{wallet.address}</MenuItem>
                        ))}
                    </Field>
                </Grid>
                <Grid item xs={12}>
                    <Field className={classes.textField} name="step-blocks" component={TextField} label="Step Blocks"/>
                </Grid>
                <Grid item xs={12}>
                    <Field className={classes.textField} name="step-amount" component={TextField} label="Step Amount"/>
                </Grid>
                <Grid item xs={12}>
                    <Field className={classes.textField} name="start" component={TextField} label="Start"/>
                </Grid>
                <Grid item xs={12}>
                    <Field className={classes.textField} name="total" component={TextField} label="Total Amount"/>
                </Grid>
            </Basic>
        );
    }
}

Vesting.propTypes = {
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
    translate('translations')
)(Vesting);