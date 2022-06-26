import React from "react";
import Tile from "./Tile";
import "./Board.css";
import makeBoard from "../service/makeBoard";


export default function Board({ rows, cols, onLose, onWin, mines, gameRefresh, setFlags }) {

    const tiles = React.useRef(makeBoard(rows, cols, 0));
    const [refresh, setRefresh] = React.useState(0);
    const firstAction = React.useRef(true);
    const lost = React.useRef(false);

    React.useEffect(() => {
        tiles.current = makeBoard(rows, cols, 0);
        firstAction.current = true;
        lost.current = false;
        setFlags(0);
        setRefresh(Math.random());
    }, [rows, cols, mines, gameRefresh])

    const revealTile = (row, col) => {
        if (tiles.current[row][col].hasMine) {
            for (let row = 0; row < tiles.current.length; row++) {
                for (let col = 0; col < tiles.current[0].length; col++) {
                    if (tiles.current[row][col].hasMine || tiles.current[row][col].hasFlag) tiles.current[row][col].revealed = true;
                }
            }
            setRefresh(Math.random());
            lost.current = true;
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
                            if (!tiles.current[row + rowOffset][col + colOffset].hasMine && 
                                !tiles.current[row + rowOffset][col + colOffset].revealed && 
                                !tiles.current[row + rowOffset][col + colOffset].hasFlag) {
                                revealTile(row + rowOffset, col + colOffset);
                            }
                        }
                    }
                }
            }
        }
    };

    const countFlags = () => {
        let res = 0;
        for (let row = 0; row < tiles.current.length; row++) {
            for (let col = 0; col < tiles.current[0].length; col++) {
                res += tiles.current[row][col].hasFlag ? 1 : 0;
            }
        }
        return res
    }

    const markTile = (row, col, marked) => {
        if (!marked || countFlags() < mines) {
            tiles.current[row][col].hasFlag = marked;
            setRefresh(Math.random());
            setFlags(countFlags());
        }
    }

    const handleTileClick = (row, column) => {
        if (firstAction.current) {
            let newTiles = makeBoard(rows, cols, mines, row, column);
            for (let row = 0; row < tiles.current.length; row++) {
                for (let col = 0; col < tiles.current[0].length; col++) {
                    newTiles[row][col].hasFlag = tiles.current[row][col].hasFlag;
                }
            }
            tiles.current = newTiles;
            firstAction.current = false;
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
            setFlags(countFlags());
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
                            onClick={lost.current ? () => {} : () => handleTileClick(rIndex, cIndex)}
                            setMarked={lost.current ? () => {} : (marked) => markTile(rIndex, cIndex, marked)}
                            {...tile}
                        />
                    )}
                </div>
            })
        }
    </>
}