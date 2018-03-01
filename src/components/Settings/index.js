import React from 'react';
import LanguageSelect from './languageSelect.js';
import ThemeSelect from './themeSelect.js';


class Settings extends React.Component {


    render() {

        return (
            <div style={{padding: 30}}>
                <LanguageSelect />
                <ThemeSelect />
            </div>
        );
    }
}

export default Settings;