import React, {FC} from 'react';
import {NavLink} from 'react-router-dom';
import {ToolbarNavigationItem} from './typings';

type ToolbarProps = {
    isFullToolbar: boolean;
};

const navItems = [
    {
        path: '/dashboard',
        title: 'Dashboard',
        isExternal: false,
    },
    {
        path: '/catalog',
        title: 'Catalog',
        isExternal: false,
    },
    {
        path: '/help-center',
        title: 'Help Center',
        isExternal: false,
    },
    {
        path: '/team',
        title: 'Team',
        isExternal: false,
    },
];

export const ToolbarPanel: FC<ToolbarProps> = () => {

    return (
        <div>
            {navItems?.map((item: ToolbarNavigationItem) => {
                return (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        // activeClassName={styles.active}
                    >
                        {item.title}
                    </NavLink>
                );
            })}
        </div>
    );
};