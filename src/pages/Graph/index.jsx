import React from 'react';
import Plot from 'react-plotly.js';
import { connect } from "react-redux";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from "@material-ui/core";
import{ addDate } from "../../Store/Actions/actions";



class Graph extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            postDetails: this.props.postDetails,
            date: [],
            listDate: [],
            listCount:[],

        }
    }

    componentDidMount(){
        //getting post's from the props
        this.setState({postDetails: this.props.location.state.data});

        //Calling randomDate function
        this.randomDate(new Date(2015, 0, 1), new Date());

        //create final array where dates are sorted and duplicates are removed & array where no of posts uploaded per year are stores.
        this.setPlotData();
    }

    //generating date of upload for posts
    randomDate = (start, end) => { 
        let dataArr = [];
        let current = this.state.postDetails;

        //generate date and store in postDetails.
        for(let i=0; i<this.props.location.state.data.length; i++){
            dataArr[i] = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
            // dataArr[i] = dataArr[i].getFullYear();
            current[i].date = dataArr[i];
        }
        //save the date in postDetails and setState with update postDetails
        this.props.addDate(current,
          ()=>{this.setState({
              postDetails: current,
          })}
          )
    }

    setPlotData = () => {
      let dateArr = this.state.date;

      //Array storing total no of posts as per the year of upload
      let list = [];
      let postData = this.state.postDetails;
      let listCount = [];
      let listDate = [];

      for(let i=0; i<postData.length;i++){
        let year = postData[i].date.getFullYear(); 

        if(!list[year]){
          list[year] = [];
        }

        list[year].push({
          userId: postData[i].userId,
        });
      }

      //push year into listDate and push no of posts in listCount
      for(let i=0;i<list.length;i++){
        if(list[i]){
          listDate.push(i);
          listCount.push(list[i].length);
        }
      }

      //update the state with new data
      this.setState({
        listDate: listDate,
        listCount: listCount,
      })

    }

  render() {
    
    return (
      <>
        <div className="post-toolbox">
          <IconButton><ArrowBackIcon onClick = {() => {
              this.props.history.push('/')}}></ArrowBackIcon></IconButton>
        </div>
        <Plot
          className='plotgraph'
          data={[
            {
              x: this.state.listDate,//Timeline, display year
              y: this.state.listCount,//Total No of posts, display total post's in that years
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'black'},
            },
            {type: 'bar', x: this.state.listDate, y: this.state.listCount},//will display bars as per the data given in x and y axis
          ]}
          layout={ {width: 1200, height: 600, title: 'Plot Displaying the Graph for Posts Uploaded'} }
        />
      </>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    postDetails: state.postDetails.postDetails,
  };
};

export default connect(mapStateToProps, { addDate })(Graph);