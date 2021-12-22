import React, { Component } from "react";
import Slide from "@material-ui/core/Slide";
import {
  Button,
  Grid,
  InputBase,
  TextField
} from "@material-ui/core";
import { connect } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { getPostDetails, setPostDetails} from "../../Store/Actions/actions";
import "./login.css";

//Transition effect when dialog opens
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="bottom" ref={ref} {...props} />;
});

class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            postDetails: this.props.postDetails,
            userId:0,
            errors:{
                userId: "",
            },
        }
    }

    login = () => {
        let validationPass = this.handleValidation();
        let errors = parseInt(this.state.errors);
        if(validationPass){
            let enteredId = this.state.userId;

            // check if the entered id exists
            let userIdExists = this.props.postDetails.filter(function(item){
                return(
                   item.userId == enteredId ? true : false
                );
            });
            // console.log(userIdExists.length);
    
            if(userIdExists.length == 0){
                // Error message for invalid user id
                errors.userId = "This User ID does not exist.";
                this.setState({ errors: errors });  
            }else{
                // save the logged in user id
                localStorage.setItem('userId', enteredId);

                //clear data from input filed and close popup
                this.clearFormField(this.props.closePopup);
            }
        }   
    }

    clearFormField = (callback) => {
        //clear entered user id after login or cancle button is clicked
        this.setState({
          userId: "",
        });
        this.props.setLoggedUserId();

        callback();
    };

    onChangeHandler = (e, type) => {
        //Dynamic state setting
        if (this.state.errors[type]) {
            let errors = this.state.errors;
            errors[type] = "";
            this.setState({ errors: errors });
          }
          this.setState({ [type]: e.target.value });
    };

    handleValidation = () => {
        let formIsValid = true;
        let errors = this.state.errors;

        //for blank & incorrect input
        if(!this.state.userId || !this.state.userId.length){
            formIsValid = false;
            errors.userId = "Please Enter a valid User ID.";
            this.setState({ errors: errors });
        }

        return formIsValid;
    }
    

    render() {
        const { isPopupActive, closePopup } = this.props;
        return (
            <>
                <Dialog
                    open={isPopupActive}
                    TransitionComponent={Transition}
                    fullWidth
                    maxWidth="md">
                    <DialogTitle className="dialog-title">Login</DialogTitle>
                    <DialogContent>
                        <Grid container direction="column" className={"dialog-container"}>
                            <Grid item lg={6} xl={6} sm={6} xs={12}>
                                <Grid container direction="column">
                                    <Grid item>
                                        <div className="common-label">
                                            User Id
                                            <span style={{ color: "red" }}>*</span>
                                        </div>
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            className="input"
                                            placeholder={"Enter User ID"}
                                            variant="outlined"
                                            value={this.state.title}
                                            autoComplete={"off"}
                                            onChange={(e) => {
                                                this.onChangeHandler(e, "userId");
                                            }}
                                        ></TextField>
                                        {this.state.errors.userId && (
                                            <div className="form-input-error">
                                                {this.state.errors.userId}
                                            </div>
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions className="form-button-container">
                    <Button
                        className="form-button"
                        variant="outlined"
                        onClick={this.login}
                    >
                        Login
                    </Button>
                    <Button
                        className="form-button"
                        variant="outlined"
                        onClick={() => this.clearFormField(this.props.closePopup)}
                    >
                        Cancel
                    </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      postDetails: state.postDetails.postDetails,
    };
  };
  
  export default connect(mapStateToProps, { getPostDetails, setPostDetails })(LoginForm);