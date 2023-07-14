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

const BuscadorAbm = ({ title, handleSearch, placeholder = "Nombre" }) => {
    const classes = useStyles();
    const [textoBuscado, setTextoBuscado] = useState("");

    const handleKeyPress = e => {
        if (e.which === 13) {
            e.preventDefault();
            handleSearch(textoBuscado);
        }
    }

    const handleChange = (e) => {
        setTextoBuscado(e.target.value);
    }
    return (
        <Card className={classes.card}>
            <Typography style={{ marginBottom: 10 }} ><strong>{title}</strong></Typography>
            <Paper component="form" className={classes.paper}>
                <InputBase
                    className={classes.input}
                    placeholder={placeholder}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    value={textoBuscado}
                />
                <IconButton onClick={() => handleSearch(textoBuscado)} className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
        </Card>
    )
}

export default BuscadorAbm
