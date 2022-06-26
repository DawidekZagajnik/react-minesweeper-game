export default function makeBoard(rows, cols, bombs, restrictedRow, restrictedCol) {
    
    if (bombs > rows * cols) {
        bombs = rows * cols / 2;
    }

    const restricted = [
        `${restrictedRow},${restrictedCol}`,
        `${restrictedRow - 1},${restrictedCol - 1}`,
        `${restrictedRow + 1},${restrictedCol + 1}`,
        `${restrictedRow - 1},${restrictedCol + 1}`,
        `${restrictedRow + 1},${restrictedCol - 1}`,
        `${restrictedRow},${restrictedCol + 1}`,
        `${restrictedRow},${restrictedCol - 1}`,
        `${restrictedRow + 1},${restrictedCol}`,
        `${restrictedRow - 1},${restrictedCol}`,
    ];

    let bombCoords = [];
    while (bombCoords.length < bombs) {
        let row = Math.floor(Math.random() * rows);
        let col = Math.floor(Math.random() * cols);

        if (!bombCoords.includes(`${row},${col}`) && !restricted.includes(`${row},${col}`)) {
            bombCoords.push(`${row},${col}`);
        }
    }

    let board = [];
    for (let row = 0; row < rows; row++) {
        board.push([]);
        for (let col = 0; col < cols; col++) {
            const tile = {
                revealed: false,
                value: 0,
                hasFlag: false,
                hasMine: bombCoords.includes(`${row},${col}`)
            };
            board[row].push(tile);
        }
    }

    for (let row = 0; row < board.length; row++){
        for (let col = 0; col < board[0].length; col++){
            
            for (let rowOffset = -1; rowOffset <= 1; rowOffset++){
                for (let colOffset = -1; colOffset <= 1; colOffset++){
                    if (!(rowOffset === 0 && colOffset === 0) && 
                        0 <= row + rowOffset && row + rowOffset < board.length && 
                        0 <= col + colOffset && col + colOffset < board[0].length
                        ) {
                        if (board[row + rowOffset][col + colOffset].hasMine) {
                            board[row][col].value++;
                        }
                    }
                }
            }
        
        }
    }

    return board;
}