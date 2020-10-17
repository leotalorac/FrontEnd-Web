import React from 'react'
import "./class.styles.css"
import {withRouter} from "react-router-dom";
import SideBar from "../../components/side-bar/SideBar"

class Class extends React.Component{

    constructor(props){
        super(props);
        this.state = {
		}
		
		
	}
	
	handlerSelect = (key) => {
        
    }

	render(){
		const data = [
			{
				id:1, 
				text:"My Courses",
				icon:"courses"
			},
			{
				id:2, 
				text:"Go Back",
				icon:"back"
			},
		]
		return(
			<div>
				<h1>Hello World</h1>
				<SideBar data={data} handler={this.handlerSelect}/>
			</div>
			
		)
	}
}

export default withRouter(Class);