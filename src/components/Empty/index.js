import React from "react";
import {withStyles} from "material-ui/styles";
import Typography from 'material-ui/Typography';
import FullHeight from '../FullHeight';
import Grid from 'material-ui/Grid';
import { translate } from 'react-i18next';

const styles = theme => ({
    container: {
        flexGrow: 1, height: "100%", width: "100%", margin: 0
    },
    centerGrid: {
        height: "100%"
    }
});

class Empty extends React.Component {

    render() {
        const {classes, message, t, subtract} = this.props;

        return (
            <FullHeight subtract={subtract ? subtract : 0}>
                <Grid container className={classes.container}>
                    <Grid item xs={12}>
                        <Grid container alignItems={"center"} direction={"row"} justify={"center"} className={classes.centerGrid}>
                            <Grid item>
                                <Typography align="center">{t(message)}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </FullHeight>
        );
    }
}


export default withStyles(styles, {withTheme: true})(translate('translations')(Empty));
