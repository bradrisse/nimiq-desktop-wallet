import React from "react";
import {Iqons} from './iqons.min.js';

class Iqon extends React.Component {

    componentDidMount() {
        const {address} = this.props
        Iqons.render(address, this.iqon);
    }

    render() {

        return (
            <div ref={e => {
                this.iqon = e;
            }} style={{width: 40, height: 40}}></div>
        );
    }
}

export default Iqon;
