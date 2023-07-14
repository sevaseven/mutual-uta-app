import React, { useState, Fragment } from 'react';
import { Tabs, Tab } from '@material-ui/core';

/**
 * @description Este componente fue creado para hacer más fácil la migración de MUI v4 a v5 y no estar cambiando en cada archivo en un futuro.
 * 
 * @typedef {{
 *  name: string,
 *  icon: import("react").ReactNode?,
 *  isDisabled: boolean?,
 *  component: import("react").ComponentType,
 * }} BaseList
 * 
 * @param {{
*  tabs: BaseList[];
* }} TabGeneric
*/

export const TabGeneric = ({tabs = []}) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Fragment>
            <Tabs value={activeTab} onChange={(e, value) => setActiveTab(value)}>
                {tabs.map(({isDisabled = false, name, icon}, index) => {
                    return (
                        <Tab key={index} label={name} icon={icon} disabled={isDisabled} />
                    );
                })}
            </Tabs>
            {tabs.map(({isDisabled = false, component}, index) => {
                if (isDisabled || activeTab !== index) {
                    return null;
                }
                return <div key={index}>{component}</div>;
            })}
        </Fragment>
    );
};
