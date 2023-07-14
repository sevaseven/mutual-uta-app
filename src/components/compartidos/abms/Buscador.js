import { Card, IconButton, InputBase, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles({
    paper: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    card: {
        padding: "1rem"
    }
});

export const Buscador = ({ title, handleSearch, placeholder = "Nombre", titleStyle = {} }) => {
    const classes = useStyles();
    const [textoBuscado, setTextoBuscado] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setTextoBuscado(e.target.value);
        handleSearch(e.target.value);
    }
    return (
        <Card className={classes.card}>
            <Typography style={{ ...titleStyle, marginBottom: 10 }} ><strong>{title}</strong></Typography>
            <Paper component="form" className={classes.paper}>
                <InputBase
                    className={classes.input}
                    placeholder={placeholder}
                    onChange={handleChange}
                    value={textoBuscado}
                />
                <IconButton disabled className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
        </Card>
    )
};
