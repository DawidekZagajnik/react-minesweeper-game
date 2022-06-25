import React from "react";
import "./Tile.css";


export default function Tile({ onClick, revealed, value }) {

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

    if (!revealed) {
        return <div className="tile unrevealed-tile" onClick={onClick}/>
    }

    return <div className="tile">
        <div className="tile-number" style={{color: colors[value]}}>{
            typeof value !== "undefined" && value > 0 && value
        }</div>
    </div>
}