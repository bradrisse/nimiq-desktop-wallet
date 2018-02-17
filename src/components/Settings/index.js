import React from 'react';
import LanguageSelect from './languageSelect.js';


class Settings extends React.Component {


    render() {

        return (
            <div style={{padding: 30}}>
                <LanguageSelect />
            </div>
        );
    }
}

export default Settings;