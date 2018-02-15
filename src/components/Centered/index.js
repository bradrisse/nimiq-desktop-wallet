import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

const styles = theme => ({
    container: {
        flexGrow: 1,
        height: "100%",
        width: "100%",
        margin: 0
    },
    gridContainer: {
        height: "100%"
    }
});

class Centered extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <Grid container className={classes.container}>
                <Grid item xs={12}>
                    <Grid container alignItems={"center"} direction={"row"} justify={"center"} className={classes.gridContainer}>
                        <Grid item>
                            {this.props.children}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

Centered.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Centered);