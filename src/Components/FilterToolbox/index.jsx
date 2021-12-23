import React, { Component } from "react";
import Select from '@mui/material/Select';
import {MenuItem, InputLabel, FormControl} from '@mui/material';
import "./filter.css";
import { options } from "../../Store/Data/data.js";

function Toolbox(props){
    const handelChange = (event) => {
        var data = event.target.value;
        props.filterPosts(data);
    }

    return(
        <>
            <div className="toolbar">
                <div>
                <FormControl sx={{ m: 1, minWidth: 100 }}>
                    <InputLabel id="filter-simple-select-label" className="sorttitle">Sort By</InputLabel>
                    <Select 
                        labelId="filter-simple-select-label"
                        label="Sort By"
                        onChange={handelChange}
                    >
                        {options.map((item)=>{
                            return(<MenuItem value={item}>{item}</MenuItem>)
                        })}
                    </Select>
                </FormControl>
                </div>
            </div>
        </>
    )
}

export default Toolbox;