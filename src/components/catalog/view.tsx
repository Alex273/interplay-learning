import React, {FC} from 'react';
import {Preloader} from '../common/preloader';

type Props = {
    loaded: boolean;
};

export const View: FC<Props> = (props: Props) => {
    const {loaded} = props;

    if (!loaded) {
        return <Preloader isOverlayBg />;
    }

    return (
       <div>Catalog</div>
    )
}