import React from "react";
import Typography from 'material-ui/Typography';
import { translate } from 'react-i18next';

import FullHeight from '../FullHeight/index';
import Centered from '../Centered/index';

class Empty extends React.Component {

    render() {
        const {message, t, subtract} = this.props;

        return (
            <FullHeight subtract={subtract ? subtract : 0}>
                <Centered>
                   <Typography align="center">{t(message)}</Typography>
                </Centered>
            </FullHeight>
        );
    }
}

export default translate('translations')(Empty);
