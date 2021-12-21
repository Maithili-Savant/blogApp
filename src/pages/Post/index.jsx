import React, { Component } from "react";
import { connect } from "react-redux";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import "./post.css";


class Post extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    render(){
        return(
            <>
                <div className="post-container">
                    <div className="post-toolbox">
                        <ArrowBackIcon></ArrowBackIcon>
                    </div>
    
                    <div className="post-container">
                        <div className="post-title">
                            Title
                            {/* {this.props.location.state.page.title} */}
                        </div>
    
                        <div className="post-body">
                            Body
                            {/* {this.props.location.state.page.body} */}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Post;
