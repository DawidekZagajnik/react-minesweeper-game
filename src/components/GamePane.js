import React from "react";
import Board from "./Board";

export default function GamePane() {

    const [rows, setRows] = React.useState(10);
    const [columns, setColumns] = React.useState(10);
    const [mines, setMines] = React.useState(20);

    return <>
        <Board rows={rows} cols={columns} mines={mines} onWin={() => console.log("WIN")} onLose={() => console.log("LOSE")}/>
    </>;
}