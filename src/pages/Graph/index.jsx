import React from 'react';
import Plot from 'react-plotly.js';


class Graph extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            postDetails: this.props.postDetails,
            date: [],
            postId : [],
            userId : [],

        }
    }

    componentDidMount(){
        //getting post's from the props
        this.setState({postDetails: this.props.location.state.data});

        //Calling randomDate function
        this.randomDate(new Date(2018, 0, 1), new Date());

        //seperating out post Id's to be displayed on x-axis
        this.getPostData();
    }

    randomDate = (start, end) => {
        //generating random dates as per the total number of the posts  
        let dataArr = [];
        for(let i=0; i<this.props.location.state.data.length; i++){
            dataArr[i] = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
            dataArr[i] = dataArr[i].toISOString().substr(0,10);
        }
        this.setState({date : this.dataArr});
    }

    getPostData = () =>{
        let modifiedPostId = this.props.location.state.data.map(function(item){
            return item.id;
        });

        let modifiedUserId = this.props.location.state.data.map(function(item){
            return item.userId;
        });
        this.setState({postId : this.modifiedPostId, userId: this.modifiedUserId});

    }

  render() {
    return (
      <Plot
        data={[
          {
            x: this.state.date,//Timeline
            y: this.state.postDetails,//No of posts
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'black'},
          },
          {type: 'bar', x: this.state.date, y: this.state.postDetails},
        ]}
        layout={ {width: 1200, height: 600, title: 'Plot Displaying the Graph for Posts Uploaded'} }
      />
    );
  }
}

  
export default Graph;