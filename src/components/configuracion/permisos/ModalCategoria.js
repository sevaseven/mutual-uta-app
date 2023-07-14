import React, { useState } from "react";
import { AppBar, Box, Dialog, Tab, Tabs } from "@material-ui/core";
import { FormCategoria } from "./FormCategoria";
import ListaCategorias from "./ListaCategorias";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


export const ModalCategoria = (props) => {

    const [tab, setTab] = useState(0)

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };
    const handleClose = () => {
        props.setOpen(false);
    };

    return (
        <Dialog
            maxWidth="md"
            fullWidth={true}
            open={props.open}
            onClose={handleClose}
            style={{ overflowY: "auto" }}
        >
            <AppBar position="static" color="default">
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Alta Categoría" {...a11yProps(0)} />
                    <Tab label="Modificación Categoría" {...a11yProps(0)} />
                </Tabs>
            </AppBar>
            <TabPanel value={tab} index={0}>
                <FormCategoria setOpen={props.setOpen} />
            </TabPanel>
            <TabPanel value={tab} index={1}>
                <ListaCategorias setOpen={props.setOpen} />
            </TabPanel>
        </Dialog>
    );

};

export default ModalCategoria;