import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import {connect} from "react-redux";
import Grid from 'material-ui/Grid';
import QRCode from 'qrcode-react';
import {CopyToClipboard} from 'react-copy-to-clipboard';


const styles = theme => ({
    qrCode: {
        height: '100%',
        width: '100%',
        margin: '0 auto',
        display: 'block'
    }
});

class Receive extends React.Component {

    state = {
        copied: false
    }

    onCopy = () => {
        this.setState({copied: true})
        setTimeout(() => {
            this.setState({copied: false})
        }, 2000)
    }

    render() {
        const { nimiq, classes } = this.props;
        return (
            <Grid container>
                <Grid item xs={4}>
                    <QRCode size={200} className={classes.qrCode} value={nimiq.selectedWallet ? nimiq.selectedWallet.address : ''} />
                </Grid>
                <Grid item xs={8}>
                    <CopyToClipboard text={nimiq.selectedWallet ? nimiq.selectedWallet.address : ''} onCopy={this.onCopy}>
                        <Typography variant="headline" component="h2">{nimiq.selectedWallet ? nimiq.selectedWallet.address : ''}{this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}</Typography>
                    </CopyToClipboard>
                    <Typography component="p">Share this wallet address to receive payments.</Typography>
                </Grid>
            </Grid>
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