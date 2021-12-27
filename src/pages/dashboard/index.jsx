import React, {Component, Suspense} from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Grid, IconButton } from "@material-ui/core";
import { Menu, MenuItem, Divider, Select, FormControl, InputLabel } from '@mui/material';
import "./dashboard.css";
import buttonStyle from "../../App.css";
import{ getPostDetails, setPostDetails, addIsLike } from "../../Store/Actions/actions";
import UserForm from "../../Components/Form";
import LoginForm from "../../Components/Login";
import FilterToolbox from "../../Components/FilterToolbox";
const Card = React.lazy(()=> import("../../Components/Card"));


class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            postDetails: this.props.postDetails,
            showPopup: false,
            loginPopup: false,
            loggedUserId: 0,
            sortFilter:"",
            popupMenu:false,
        }
    }

    componentDidMount(){
        //getting post's from the props
        this.props.getPostDetails(()=>{ this.setState({
            postDetails: this.props.postDetails,
            loggedUserId: 0,
        })})
        
        //getting the userid of the logged in user
        let id = parseInt(localStorage.getItem('userId'));
        this.setState({loggedUserId: id});
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

    toggleMenuPopup = () => {
        this.setState({ popupMenu: !this.state.popupMenu });
    }

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
        const { showPopup, loginPopup, popupMenu } = this.state;
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
                        <div className="dashboard">Dashboard</div>
                        <div className="login-btn">

                            {/* Menu for login, edit, delete and graph functionality */}
                            <Button className="button" variant="contained" onClick={this.toggleMenuPopup}>Menu</Button>
                            {popupMenu && <Menu
                                id="menu-popup"
                                anchorOrigin={{vertical:"top", horizontal:"right"}}
                                transformOrigin={{vertical:"top", horizontal:"right"}}
                                open={popupMenu}
                                onClick={this.toggleMenuPopup}
                            >
                                <MenuItem 
                                    value="login"
                                    onClick={this.state.loggedUserId === 0 ? this.toggleLoginPopup : this.logoutUser}>
                                    {this.state.loggedUserId === 0 ? "Login" : "Logout"} 
                                </MenuItem>
                                <Divider />
                                <MenuItem
                                    isPopupActive={popupMenu}
                                    closePopup={this.toggleMenuPopup}
                                    value="my posts"
                                    onClick = {() => {
                                        this.props.history.push({
                                            pathname:"/mypost",
                                        });}}
                                    >My Posts</MenuItem>
                                    <Divider />
                                    <MenuItem
                                    value="graph"
                                        onClick = {() => {
                                            this.props.history.push({
                                            pathname:"/graph",
                                            state: { 
                                                data: this.props.postDetails
                                             },
                                        });}}
                                    >Graph</MenuItem>

                            </Menu>}
                        </div>
                    </div>

                    {/* Sort by dropdown filter and button for uploading new post*/}
                    <div className="toolbox">
                        <FilterToolbox
                            filterPosts = {this.filterPosts}
                        />
                        <Button className="button" variant="contained" onClick={this.togglePopup}>New Post</Button>
                    </div>

                    {/* Grid displaying all the posts */}
                    <div className="card-block">
                        <Grid
                            className="card-grid-block"
                            container
                            rowSpacing={1}
                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        > 
                            {this.state.postDetails.reverse().map((element, index)=>{
                                return(
                                    <Suspense fallback={<div>Loading Posts...</div>}><div>
                                        <Card 
                                        mappedData={element}
                                        addIsLike = {() => {this.addIsLike(element)}}
                                        openPost = {() => {
                                            this.props.history.push({
                                            pathname:"/post",
                                            state: { page: element },
                                        });}}
                                        >
                                    </Card></div></Suspense>
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