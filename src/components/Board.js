import React from "react";
import Tile from "./Tile";
import "./Board.css";
import makeBoard from "../service/makeBoard";


export default function Board({ rows, cols, onLose, onWin, mines }) {

    const tiles = React.useRef(makeBoard(rows, cols, 0));
    const [refresh, setRefresh] = React.useState(0);
    const [firstAction, setFirstAction] = React.useState(true);

    const revealTile = (row, col) => {
        if (tiles.current[row][col].hasMine) {
            for (let row = 0; row < tiles.current.length; row++) {
                for (let col = 0; col < tiles.current[0].length; col++) {
                    if (tiles.current[row][col].hasMine) tiles.current[row][col].revealed = true;
                }
            }
            setRefresh(Math.random());
            onLose();
        }
        else {
            tiles.current[row][col].revealed = true;
            if (tiles.current[row][col].value === 0) {
                for (let rowOffset = -1; rowOffset <= 1; rowOffset ++) {
                    for (let colOffset = -1; colOffset <= 1; colOffset ++) {
                        if (!(rowOffset === 0 && colOffset === 0) && 
                            0 <= row + rowOffset && row + rowOffset < tiles.current.length && 
                            0 <= col + colOffset && col + colOffset < tiles.current[0].length
                            ) {
                            if (!tiles.current[row + rowOffset][col + colOffset].hasMine && !tiles.current[row + rowOffset][col + colOffset].revealed) {
                                revealTile(row + rowOffset, col + colOffset);
                            }
                        }
                    }
                }
            }
        }
    };

    const markTile = (row, col, marked) => {
        tiles.current[row][col].hasFlag = marked;
        setRefresh(Math.random());
    }

    const handleTileClick = (row, column) => {
        if (firstAction) {
            tiles.current = makeBoard(rows, cols, mines, row, column);
            setFirstAction(false);
        }
        revealTile(row, column);
        let unrevealed = 0;
        let bombs = 0;
        for (let row = 0; row < tiles.current.length; row++) {
            for (let col = 0; col < tiles.current[0].length; col++) {
                unrevealed += tiles.current[row][col].revealed ? 0 : 1;
                bombs += tiles.current[row][col].hasMine ? 1 : 0;
            }
        }
        if (unrevealed === bombs) {
            for (let row = 0; row < tiles.current.length; row++) {
                for (let col = 0; col < tiles.current[0].length; col++) {
                    if (!tiles.current[row][col].revealed) tiles.current[row][col].hasFlag = true;
                }
            }
            setRefresh(Math.random());
            onWin();
        } else setRefresh(Math.random());
    };

    return <>
        {
            tiles.current.map((row, rIndex) => {
                return <div className="row" key={rIndex}>{
                    row.map((tile, cIndex) =>  
                        <Tile 
                            key={`${rIndex},${cIndex}`} 
                            onClick={() => handleTileClick(rIndex, cIndex)}
                            setMarked={(marked) => markTile(rIndex, cIndex, marked)}
                            {...tile}
                        />
                    )}
                </div>
            })
        }
    </>
}