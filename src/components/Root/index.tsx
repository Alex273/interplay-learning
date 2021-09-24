import React, {FC, useState} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Layout} from '../layout';
import {Preloader} from '../common/preloader';

export const App: FC = () => {
    const [loaded, setLoaded] = useState(true);

    if (!loaded) {
        return <Preloader isOverlayBg />;
    }

    return (
        <BrowserRouter>
            <Layout/>
            <div id="modal-dialog-wrapper"/>
        </BrowserRouter>
    );
};