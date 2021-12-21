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


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="bottom" ref={ref} {...props} />;
});

class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            userId:"",
        }
    }

    login = () => {
        let enteredId = this.state.userId;

    }

    clearFormField = () => {
        this.setState({
          userId: "",
        });
    };

    onChangeHandler = (e, type) => {
        //Dynamic state setting
        this.setState({ [type]: e.target.value });
    };
    

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
                        onClick={this.props.closePopup}
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