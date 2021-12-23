import React, {Component} from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Card from "../../Components/Card";
import { Button, Grid, IconButton } from "@material-ui/core";
import {LoginIcon, AccountBoxIcon} from '@mui/icons-material/Login';
import "./dashboard.css";
import{ getPostDetails, setPostDetails, addIsLike } from "../../Store/Actions/actions";
import UserForm from "../../Components/Form";
import LoginForm from "../../Components/Login";
import FilterToolbox from "../../Components/FilterToolbox";
import Post from "../Post";

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            postDetails: this.props.postDetails,
            showPopup: false,
            loginPopup: false,
            loggedUserId: 0,
            sortFilter:"",
        }
    }

    componentDidMount(){
        //getting post's from the props
        this.props.getPostDetails(()=>{ this.setState({postDetails: this.props.postDetails})})
        
        //getting the userid of the logged in user
         let id = parseInt(localStorage.getItem('userId'));
         this.setState({loggedUserId: id});

        //displaying sorted results if sortFilter exists - for when routing back from viewing full post

    }

    addIsLike = (element) => {
        // console.log(element.id);
        
        let current = this.state.postDetails;
        
        if(!current[element.id-1].isLike || current[element.id-1].isLike === false ){
            current[element.id-1].isLike = true
        }
        else{
            current[element.id-1].isLike = false
        }
                                                                                                                         
        this.props.addIsLike(current,
        ()=>{this.setState({
            postDetails: current,
        })}
        )
    }

    togglePopup = () => {
        this.setState({ showPopup: !this.state.showPopup });
    };
    
    toggleLoginPopup = () => {
        this.setState({ loginPopup: !this.state.loginPopup });
    };

    setLoggedUserId = () =>{
        //getting the userid of the logged in user
        let id = parseInt(localStorage.getItem('userId'));
        this.setState({loggedUserId: id});
    }

    logoutUser = () => {
        //removing userid from local storage
        localStorage.removeItem('userId');

        //updating the loggedUserId in state
        this.setState({loggedUserId: 0});
    }

    filterPosts = (data) => {
        //filtering data as per selected option in sort by dropdown
        this.setState({sortFilter: data});
        let filteredData = [];
        switch (data){

            //All Posts
            case 'All Posts':
                filteredData = this.props.postDetails;
                break;

            //My Posts
            case 'My Posts':
                const userId = localStorage.getItem('userId');
                filteredData = this.props.postDetails.filter(function(item){
                    return(
                        item.userId == userId
                    )
                });
                break;

            //Liked Posts
            case 'Liked Posts':
                filteredData = this.props.postDetails.filter(function(item){
                    return(
                        item.isLike == true
                    )
                });
                break;

            //Unliked Posts
            case 'Unliked Posts':
                filteredData = this.props.postDetails.filter(function(item){
                    return(
                        !item.isLike
                    )
                });
                break;

            default:
                break;
        }

        //setting state with the filtered data
        this.setState({postDetails: filteredData});
    }

    render(){
        const { showPopup, loginPopup } = this.state;
        return(
            this.state.postDetails.length === 0 ? <div>Loading...</div> :
            <>
                {showPopup && (
                    <UserForm
                        isPopupActive={showPopup}
                        closePopup={this.togglePopup}
                    />
                )}
                {loginPopup && (
                    <LoginForm
                    isPopupActive={loginPopup}
                    closePopup={this.toggleLoginPopup}
                    setLoggedUserId={this.setLoggedUserId}/>
                )}
                <div className="container"> 
                    <div className="header">
                        <div>Dashboard</div>
                        <div className="login-btn">
                            {this.state.loggedUserId === 0
                            ? <Button className="button" variant="contained" onClick={this.toggleLoginPopup}>Login</Button>
                            : <Button className="button" variant="contained" onClick={this.logoutUser}>Logout</Button>}
                        </div>
                    </div>

                    <div className="toolbox">
                        <FilterToolbox
                            filterPosts = {this.filterPosts}
                        />
                        <Button className="button" variant="contained" onClick={this.togglePopup}>New Post</Button>
                    </div>

                    <div className="card-block">
                        <Grid
                            className="card-grid-block"
                            container
                            rowSpacing={1}
                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        > 
                            {this.state.postDetails.reverse().map((element, index)=>{
                                return(
                                    <div>
                                        <Card 
                                        mappedData={element}
                                        addIsLike = {() => {this.addIsLike(element)}}
                                        openPost = {() => {
                                            this.props.history.push({
                                            pathname:"/post",
                                            state: { page: element },
                                        });}}
                                        >
                                    </Card></div>
                                )
                            })}                                                        
                        </Grid>
                        
                    </div>
                    
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      postDetails: state.postDetails.postDetails,
    };
  };
  
  export default connect(mapStateToProps, { getPostDetails, setPostDetails, addIsLike })(Dashboard);