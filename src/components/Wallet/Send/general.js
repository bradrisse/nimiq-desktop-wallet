import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { translate } from 'react-i18next';
import { compose } from 'recompose';
import { Field} from 'redux-form'
import { TextField } from 'redux-form-material-ui';
import Grid from 'material-ui/Grid';
import Basic from './basic';

const styles = theme => ({
    textField: {
        width: 300,
    },
});


class General extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <Basic onSubmit={this.props.onSubmit}>
                <Grid item xs={12}>
                    <Field className={classes.textField} name="note" component={TextField} placeholder="Note" label="Enter an optional note" required/>
                </Grid>
            </Basic>
        );
    }
}

General.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(styles),
    translate('translations')
)(General);