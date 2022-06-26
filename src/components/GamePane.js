import React from "react";
import Board from "./Board";
import "./GamePane.css";
import {FiSettings} from "react-icons/fi";
import {AiOutlineCloseCircle} from "react-icons/ai";
import { IconButton, Drawer, Slider } from "@mui/material";
import {AiOutlineReload} from "react-icons/ai";

export default function GamePane() {

    const [rows, setRows] = React.useState(10);
    const [columns, setColumns] = React.useState(10);
    const [mines, setMines] = React.useState(20);
    const [settingsOpen, setSettingsOpen] = React.useState(false);
    const [refresh, setRefresh] = React.useState(0);
    const [flags, setFlags] = React.useState(0);

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
        <Board rows={rows} cols={columns} mines={mines} onWin={() => console.log("WIN")} onLose={() => console.log("LOSE")} gameRefresh={refresh} setFlags={setFlags}/>
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
                        label
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
    </div>;
}