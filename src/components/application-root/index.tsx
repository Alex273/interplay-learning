import React, {FC, useState} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Layout} from '../layout';
import {Preloader} from '../common/preloader';
import {ToolbarPanel} from '../toolbar';

export const App: FC = () => {
    const [loaded, setLoaded] = useState(true);

    if (!loaded) {
        return <Preloader isOverlayBg />;
    }

    return (
        <BrowserRouter>
            <ToolbarPanel isFullToolbar={true} />
            <Layout loaded={true} />
            <div id="modal-dialog-wrapper"/>
        </BrowserRouter>
    );
};
