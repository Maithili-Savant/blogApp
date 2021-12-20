import React, {Component} from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import "./dashboard.css";
import Card from "../../Components/card";
import { Button, Grid } from "@material-ui/core";
import{ getPostDetails, setPostDetails, addIsLike } from "../../Store/Actions/actions";
import UserForm from "../../Components/Form";

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            postDetails: this.props.postDetails,
            showPopup: false,
        }
    }

    componentDidMount(){
        this.props.getPostDetails(()=>{ this.setState({postDetails: this.props.postDetails})})
      }

    addIsLike = (element) => {
        let index = this.state.postDetails.indexOf(element);
        let current = this.state.postDetails;
        current[index].isLike = true;
        
        this.props.addIsLike(current,
        ()=>{this.setState({
            postDetails: current,
        })}
        )
    }

    togglePopup = () => {
        this.setState({ showPopup: !this.state.showPopup });
      };

    render(){
        const { showPopup } = this.state;
        return(
            this.state.postDetails.length === 0 ? <div>Loading...</div> :
            <>
                {showPopup && (
                    <UserForm
                    isPopupActive={showPopup}
                    closePopup={this.togglePopup}
                    />
                )}
                <div className="container"> 
                    <div className="header">Dashboard</div>

                    <div className="toolbox">
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
                                    <Card 
                                        mappedData={element}
                                        addIsLike = {() => {this.addIsLike(element)}}>
                                    </Card>
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