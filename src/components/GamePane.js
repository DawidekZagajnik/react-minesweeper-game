import React from "react";
import Board from "./Board";
import "./GamePane.css";
import {FiSettings} from "react-icons/fi";
import {AiOutlineCloseCircle} from "react-icons/ai";
import { IconButton, Drawer, Slider, Snackbar } from "@mui/material";
import {AiOutlineReload} from "react-icons/ai";

export default function GamePane() {

    const [rows, setRows] = React.useState(10);
    const [columns, setColumns] = React.useState(10);
    const [mines, setMines] = React.useState(20);
    const [settingsOpen, setSettingsOpen] = React.useState(false);
    const [refresh, setRefresh] = React.useState(0);
    const [flags, setFlags] = React.useState(0);
    const [lost, setLost] = React.useState(false);
    const [won, setWon] = React.useState(false);
    const [snackBarOpen, setSnackBarOpen] = React.useState(false);

    const handleWin = () => {
        setWon(true);
        setSnackBarOpen(true);
    };

    const handleLose = () => {
        setLost(true);
        setSnackBarOpen(true);
    }

    return <div className="game-pane">
        <div style={{display: "flex", flexDirection: "row"}}>
            <IconButton onClick={() => setSettingsOpen(true)} style={{color: "#08a"}}>
                <FiSettings size={40}/>
            </IconButton>
            <IconButton onClick={() => setRefresh(Math.random())} style={{color: "#08a"}}>
                <AiOutlineReload size={40}/>
            </IconButton>
            <h2 style={{marginLeft: 10, fontSize: 24, color: "#08a"}}>{`${flags}/${mines}`}</h2>
        </div>
        <Board rows={rows} cols={columns} mines={mines} onWin={handleWin} onLose={handleLose} gameRefresh={refresh} setFlags={setFlags} onReset={() => {
            setWon(false); 
            setLost(false);
            setSnackBarOpen(false);
        }}/>
        <Drawer
            anchor="left"
            open={settingsOpen}
            onClose={() => setSettingsOpen(false)}
        >
            <div className="settings-form">
                <IconButton sx={{right: 20, position: "absolute"}} onClick={() => setSettingsOpen(false)}>
                    <AiOutlineCloseCircle size={30}/>
                </IconButton>
                <h1>Settings</h1>
                <div className="form-field">
                    <h2>Rows</h2>
                    <Slider
                        defaultValue={10}
                        step={1}
                        min={4}
                        max={100}
                        valueLabelDisplay="on"
                        value={rows}
                        onChange={e => setRows(e.target.value)}
                        sx={{color: "#0bd"}}
                    />
                </div>
                <div className="form-field">
                    <h2>Columns</h2>
                    <Slider
                        defaultValue={10}
                        step={1}
                        min={4}
                        max={100}
                        valueLabelDisplay="on"
                        value={columns}
                        onChange={e => setColumns(e.target.value)}
                        sx={{color: "#0bd"}}
                    />
                </div>
                <div className="form-field">
                    <h2>Mines</h2>
                    <Slider
                        defaultValue={20}
                        step={1}
                        min={4}
                        max={rows * columns - 9}
                        valueLabelDisplay="on"
                        value={mines}
                        onChange={e => setMines(e.target.value)}
                        sx={{color: "#0bd"}}
                    />
                </div>
            </div>
        </Drawer>
        <Snackbar
            ContentProps={{sx: {backgroundColor: "#40a", color: "#0bd"}}}
            anchorOrigin={{horizontal: "center", vertical: "bottom"}}
            autoHideDuration={6000}
            action={
                <IconButton onClick={() => setRefresh(Math.random())} style={{color: "#08a"}}>
                    <AiOutlineReload size={30}/>
                </IconButton>
            }   
            open={snackBarOpen && (lost || won)}
            message={`You ${lost ? "lost" : won ? "won" : ""}! Click button on the right to reset the game:`}
        />
    </div>;
}