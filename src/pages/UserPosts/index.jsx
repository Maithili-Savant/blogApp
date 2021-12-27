import React, {Component} from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
    TextField,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Button,
    IconButton,
    Typography,
  } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/EditOutlined";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./userposts.css";
import{ getPostDetails, setPostDetails, deletePostDetails } from "../../Store/Actions/actions";
import UserForm from "../../Components/Form";

class UserPosts extends Component{
    constructor(props){
        super(props);
        this.state = {
            postDetails: [],
            loggedUserId: 0,
            editData: undefined,
            editKey: 0,
            showPopup: false,
        }
    }

    componentDidMount(){        
        //getting the userid of the logged in user
        let id = parseInt(localStorage.getItem('userId'));

        //getting post's from the props of the user that is logged in
        this.props.getPostDetails(()=>{ 
            this.setState({
                loggedUserId: id,
                postDetails: this.props.postDetails.filter(function(item){
                return(
                    item.userId == id
                )
            })})
        })
    }


    togglePopup = () => {
        this.setState({ showPopup: !this.state.showPopup });

        //re-rendering after form is closed post editing
        if(this.state.editKey){
            this.setState({postDetails: this.props.postDetails.filter(function(item){
                return(
                    item.userId == parseInt(localStorage.getItem('userId'))
                )
            })});
        }
    };

    removeFunction = (data) => {
        //deleting the post from store
        let index = this.props.postDetails.indexOf(data);
        this.props.deletePostDetails(this.props.postDetails, index, () => {
            this.setState({postDetails: this.props.postDetails.filter(function(item){
                return(
                    item.userId == parseInt(localStorage.getItem('userId'))
                )
            })});
        });
    };
    
    editFunction = (data) => {
        //setting the index of the post that is to be edited
        let index = this.props.postDetails.indexOf(data);
        this.setState({ editData: data, editKey: index, showPopup: true });

    };

    render(){
        const { showPopup } = this.state;
        return(
            <>
            {/* back button */}
            <div className="post-toolbox">
                <IconButton><ArrowBackIcon onClick = {() => {
                    this.props.history.push('/')}}></ArrowBackIcon>
                </IconButton>
            </div>
            {!localStorage.getItem('userId') ? <div className="loader">Please Login in to check your uploaded posts.</div> :

            <div>
                {showPopup && (
                    <UserForm
                        isPopupActive={showPopup}
                        closePopup={this.togglePopup}
                        editData={this.state.editData}
                        editKey={this.state.editKey}
                    />
                )}

                <ThemeProvider>
                    <Typography component="div">
                        <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow className="tablehead">
                                    <TableCell align="left">Title</TableCell>
                                    <TableCell align="left">Post</TableCell>
                                    <TableCell align="left"></TableCell>
                                    <TableCell align="left"></TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {this.state.postDetails.map((row, index)=>
                                    <TableRow key={index} className="contentrow">
                                        <TableCell align="left">{row.title}</TableCell>
                                        <TableCell align="left">{row.body}</TableCell>
                                        <TableCell align="center">
                                            <IconButton><EditIcon onClick={()=>this.editFunction(row)}></EditIcon></IconButton>
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton><DeleteIcon onClick={()=>this.removeFunction(row)}></DeleteIcon></IconButton>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        </TableContainer>
                    </Typography>
                </ThemeProvider>


            </div>}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      postDetails: state.postDetails.postDetails,
    };
  };
  
export default connect(mapStateToProps, { getPostDetails, setPostDetails, deletePostDetails })(UserPosts);