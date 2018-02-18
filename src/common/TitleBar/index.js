import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    flex: {
        flex: 1
    }
});

class TitleBar extends React.Component {

    render() {
        const { classes, title, onClose } = this.props;

        return (
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="title" color="inherit" className={classes.flex}>
                        {title}
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        color="inherit"
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        );
    }
}

TitleBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitleBar);