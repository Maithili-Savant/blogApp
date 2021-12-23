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
            userId: 0,
            id: 0,
            title:"",
            body:"",
            isEdit: false,
            editKey: 0,
            
        }
    }

    saveFormData = () => {
        //save the post data
        let postData = {
            userId: this.state.userId,
            id: this.state.id,
            title: this.state.title,
            body: this.state.body,
        };

        let reducerData = this.props.postDetails;
        if (this.state.isEdit) {
            reducerData[this.state.editKey] = postData;
            this.props.setPostDetails(reducerData, this.props.closePopup);
        }
        else {
            reducerData.push(postData);
            this.props.setPostDetails(reducerData, this.props.closePopup);
        }
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

    componentDidMount() {
        //Check if edit mode is enabled
        if (this.props.editData) {
          let data = this.props.editData;
          let editKey = this.props.editKey;
          
          this.setState({
            isEdit: true,
            editKey: editKey,
            userId: data.userId,
            id: data.id,
            title: data.title,
            body: data.body,
          });
        }
        else{
            this.setState({
                userId:parseInt(localStorage.getItem('userId')),
                id:this.props.postDetails.length+1,
            })
        }
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
                    <DialogTitle className="dialog-title">{this.state.isEdit ? "EDIT POST" : "ADD NEW POST"}</DialogTitle>
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
                                            placeholder={"Enter Title"}
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
                        variant="outlined"
                        onClick={this.saveFormData}
                    >
                        Post
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
  
  export default connect(mapStateToProps, { getPostDetails, setPostDetails })(UserForm);