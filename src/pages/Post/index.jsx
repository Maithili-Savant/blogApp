import React, { Component } from "react";
import Paper from '@mui/material/Paper';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from "@material-ui/core";
import "./post.css";


function Post (props){
    return(
        <>
            <div className="post-container">
                <div className="post-toolbox">
                    <IconButton><ArrowBackIcon onClick = {() => {
                        props.history.push('/')}}></ArrowBackIcon></IconButton>
                </div>

                <Paper elivation={4} className="post-block">
                    <div className="post-title">
                        {props.location.state.page.title}
                    </div>

                    <div className="post-body">
                        {props.location.state.page.body}
                    </div>
                </Paper>
            </div>
        </>
    )
}

export default Post;
