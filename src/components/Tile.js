import React from "react";
import "./Tile.css";
import {FaBomb} from "react-icons/fa";
import {BsFlag} from "react-icons/bs";
import {ImCross} from "react-icons/im";


export default function Tile({ onClick, revealed, value, hasMine, hasFlag, setMarked }) {

    const colors = {
        0: "black", // Never displayed anyway
        1: "#00f",
        2: "#070",
        3: "#900",
        4: "#505",
        5: "#770",
        6: "#555",
        7: "#400",
        8: "black"
    };

    if (!revealed && hasFlag) {
        return <div className="tile unrevealed-tile" onContextMenu={(e) => {e.preventDefault(); setMarked(false);}}><BsFlag size={30}/></div>
    }

    else if (!revealed) {
        return <div className="tile unrevealed-tile" onClick={onClick} onContextMenu={(e) => {e.preventDefault(); setMarked(true);}}/>
    }

    else if (revealed && hasFlag && hasMine) {
        return <div className="tile">
            <FaBomb size={30} color="#000"/>
            <ImCross size={30} color="#900" style={{marginLeft: -29}}/>
        </div>
    }

    return <div className="tile" onContextMenu={e => e.preventDefault()}>
        <div className="tile-number" style={{color: colors[value]}}>{
            hasMine ? <FaBomb size={30} color="#000"/> : typeof value !== "undefined" && value > 0 && value
        }</div>
    </div>
}