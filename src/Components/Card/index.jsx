import React from "react";
import "./card.css";
import { Button, IconButton } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";

function Card(props){
    return(
        <div className="card-container">
            <div className="post-title">{props.mappedData.title}</div>
            <div className="post-content">{props.mappedData.body}</div>
            <div className="card-toolbox">
                <div>
                <IconButton>
                    <Favorite onClick={() => props.addIsLike()}
                    style={{color: props.mappedData.isLike === true ? "red" : "grey"}}
                    />
                </IconButton>
                </div>
            </div>
        </div>
    )
}

export default Card;