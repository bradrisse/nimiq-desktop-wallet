import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {connect} from "react-redux";
import { translate, Trans } from 'react-i18next';
import { compose } from 'recompose';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import {bindActionCreators} from "redux";
import {actions as nimiqActions} from "../../ducks/nimiq";
import ClassicThemeImg from '../../assets/images/classic-theme.png';
import DefaultThemeImg from '../../assets/images/default-theme.png';

const styles = theme => ({
    themeImg: {
        width: 200
    }
});

class ThemeSelect extends React.Component {

    handleChange = (type) => {
        this.props.nimiqActions.updateTheme(type);
        window.localStorage.setItem('theme', type);
    }

    render() {
        const { nimiq, classes, t } = this.props;

        return (
            <div>
                <Typography variant="caption">Select Theme</Typography>
                <Grid container>
                    <Grid item>
                        <Button onClick={() => {this.handleChange('default')}}>
                            <img src={DefaultThemeImg} className={classes.themeImg}/>
                        </Button>
                        <Typography variant="caption" align="center">Default</Typography>
                    </Grid>
                    <Grid item>
                        <Button onClick={() => {this.handleChange('classic')}}>
                            <img src={ClassicThemeImg} className={classes.themeImg}/>
                        </Button>
                        <Typography variant="caption" align="center">Classic</Typography>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

ThemeSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

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
    withStyles(styles),
    translate('translations')
)(ThemeSelect);