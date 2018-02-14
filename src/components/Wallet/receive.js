import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import {connect} from "react-redux";
var QRCode = require('qrcode-react');


const styles = theme => ({

});

class Receive extends React.Component {


    render() {
        const { nimiq, classes } = this.props;
        return (
            <div>
                <Typography component="p">{nimiq.selectedWallet.address}</Typography>
                <QRCode value={nimiq.selectedWallet.address} />
            </div>
        );
    }
}

Receive.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        nimiq: state.nimiq
    };
}

export default connect(mapStateToProps)(withStyles(styles)(Receive));