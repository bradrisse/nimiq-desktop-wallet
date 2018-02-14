import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import {connect} from "react-redux";
import { translate, Trans } from 'react-i18next';

const styles = theme => ({

});

class Settings extends React.Component {

    state = {
        language: 'en',
    };

    handleChange = event => {
        const { i18n } = this.props;
        this.setState({ [event.target.name]: event.target.value }, () => {
            i18n.changeLanguage(event.target.value);
        });
    };


    render() {
        const { nimiq, classes, t } = this.props;

        return (
            <div>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-simple">t('settings.language')</InputLabel>
                        <Select
                            value={this.state.language}
                            onChange={this.handleChange}
                            input={<Input name="language" id="language" />}
                        >
                            <MenuItem value={'en'}>English</MenuItem>
                            <MenuItem value={'es'}>Español (Spanish)</MenuItem>
                            <MenuItem value={'de'}>Deutsche (German)</MenuItem>
                            <MenuItem value={'hans'}>中文 (Chinese)</MenuItem>
                            <MenuItem value={'ja'}>日本語 (Japanese)</MenuItem>
                            <MenuItem value={'ru'}>Pусский (Russian)</MenuItem>
                            <MenuItem value={'fr'}>Français (French)</MenuItem>
                            <MenuItem value={'sv'}>Svenska (Swedish)</MenuItem>
                        </Select>
                </FormControl>
            </div>
        );
    }
}

Settings.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        nimiq: state.nimiq
    };
}

export default connect(mapStateToProps)(withStyles(styles)(translate('translations')(Settings)));