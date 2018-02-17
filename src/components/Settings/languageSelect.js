import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import {connect} from "react-redux";
import { translate, Trans } from 'react-i18next';
import { compose } from 'recompose';
import {getI18n} from 'react-i18next';

const styles = theme => ({

});

class LanguageSelect extends React.Component {

    state = {
        language: 'en',
    };

    componentWillMount() {
        var _language = getI18n().language || window.localStorage.i18nextLng;
        if (_language === 'en-US') {
            _language = 'en'
        }
        this.setState({
            language: _language
        })
    }

    handleChange = event => {
        const { i18n, onLanguageChange } = this.props;
        this.setState({ language: event.target.value }, () => {
            i18n.changeLanguage(event.target.value);
        }, () => {
            if (onLanguageChange) {
                onLanguageChange(event.target.value)
            }
        });
    };


    render() {
        const { nimiq, classes, t } = this.props;

        return (
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="language">{t('settings.language')}</InputLabel>
                <Select
                    value={this.state.language}
                    onChange={this.handleChange}
                    input={<Input name="language" id="language" />}
                    style={{width: 300}}
                >
                    <MenuItem value={'en'}>English</MenuItem>
                    <MenuItem value={'es'}>Español (Spanish)</MenuItem>
                    <MenuItem value={'ru'}>Pусский (Russian)</MenuItem>
                    <MenuItem value={'nl'}>Nederlands (Dutch)</MenuItem>
                    <MenuItem value={'pt'}>Português (Portuguese)</MenuItem>
                    {/*<MenuItem value={'id'}>Bahasa indonesia (Indonesian)</MenuItem>*/}
                    {/*<MenuItem value={'vi'}>Tiếng Việt (Vietnamese)</MenuItem>*/}
                    {/*<MenuItem value={'ti'}>Tagalog (Filipino)</MenuItem>*/}
                    {/*<MenuItem value={'ko'}>한국어 (Korean)</MenuItem>*/}
                    {/*<MenuItem value={'it'}>Italiano (Italian)</MenuItem>*/}
                    {/*<MenuItem value={'fr'}>Français (French)</MenuItem>*/}
                    {/*<MenuItem value={'sv'}>Svenska (Swedish)</MenuItem>*/}
                    {/*<MenuItem value={'de'}>Deutsche (German)</MenuItem>*/}
                    {/*<MenuItem value={'hans'}>中文 (Chinese)</MenuItem>*/}
                    {/*<MenuItem value={'ja'}>日本語 (Japanese)</MenuItem>*/}
                </Select>
            </FormControl>
        );
    }
}

LanguageSelect.propTypes = {
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
)(LanguageSelect);