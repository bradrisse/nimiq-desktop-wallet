import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import {connect} from "react-redux";


const styles = theme => ({

});

class Mining extends React.Component {


    render() {
        const { nimiq, classes } = this.props;
        return (
            <div>
                Mining
            </div>
        );
    }
}

Mining.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        nimiq: state.nimiq
    };
}

export default connect(mapStateToProps)(withStyles(styles)(Mining));