import React from 'react';
import classNames from 'classnames';
import {ViewProps} from './typings';
// import style from './styles.scss';

type PreloaderProps = ViewProps;

export const Preloader: React.FC<PreloaderProps> = ({isOverlayBg = false, className = ''}: PreloaderProps) => {
    return (
        // <div
        //     className={classNames(style.preloader__overlay, className, {[style.preloader__overlay_bg]: isOverlayBg})}
        //     data-test="preloader-element"
        // >
        //     <div className={classNames(style.preloader__content)} />
        // </div>
        'Preloader component !!!'
    );
};