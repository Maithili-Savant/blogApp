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
import "./form.css";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="bottom" ref={ref} {...props} />;
});

class UserForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            title:"",
            body:"",
        }
    }

    saveFormData = () => {
        let postData = {
            userId: 1,
            id: this.props.postDetails.length+1,
            title: this.state.title,
            body: this.state.body,
            
        };

        let reducerData = this.props.postDetails;
        reducerData.push(postData);
        this.props.setPostDetails(reducerData, this.props.closePopup);
        this.clearFormField();
    };

    clearFormField = () => {
        this.setState({
          title: "",
          body: "",
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
                    <DialogTitle className="dialog-title">New Post</DialogTitle>
                    <DialogContent>
                        <Grid container direction="column" className={"dialog-container"}>
                            <Grid item lg={6} xl={6} sm={6} xs={12}>
                                <Grid container direction="column">
                                    <Grid item>
                                        <div className="common-label">
                                            Title
                                            <span style={{ color: "red" }}>*</span>
                                        </div>
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            className="input"
                                            placeholder={"Enter Tile"}
                                            variant="outlined"
                                            value={this.state.title}
                                            autoComplete={"off"}
                                            onChange={(e) => {
                                                this.onChangeHandler(e, "title");
                                            }}
                                        ></TextField>
                                    </Grid>

                                    <Grid item>
                                        <div className="common-label">
                                            Description
                                            <span style={{ color: "red" }}>*</span>
                                        </div>
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            className="input"
                                            placeholder={"Enter Description"}
                                            variant="outlined"
                                            multiline
                                            rows={8}
                                            value={this.state.body}
                                            onChange={(e) => {
                                                this.onChangeHandler(e, "body");
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
                        onClick={this.saveFormData}
                    >
                        Post
                    </Button>
                    <Button
                        className="form-button"
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
  
  export default connect(mapStateToProps, { getPostDetails, setPostDetails })(UserForm);