import React from "react";
import "./card.css";
import { Button, IconButton } from "@material-ui/core";
import { FavoriteBorder } from "@material-ui/icons";

function card(props){
    return(
        <div className="card-container">
            <div className="post-title">{props.mappedData.title}</div>
            <div className="post-content">{props.mappedData.post}</div>
            <div className="card-toolbox">
                <div><IconButton><FavoriteBorder/></IconButton></div>
            </div>
        </div>
    )
}

export default card;