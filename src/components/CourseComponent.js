import React,  {Component} from 'react';
import { withRouter} from "react-router"    ;
import StudyRoom from './StudyRoomComponent/StudyroomComponent';
import { STUDYROOMS} from '../shared/studyrooms';
import ForumList from '../components/forumList'



class Course extends Component{
    constructor(props){
        super(props);

        this.state = {
            studyrooms: STUDYROOMS,
            course_id: this.props.match.params.course_id
        };
    }
    
    render(){
            return(
                <div className="col">
                    <div className="row">
                        <h1>AQUI VAN CLASES</h1>
                    </div>
                    <div className="row">
                        <div className="col">
                            <ForumList course_id = {this.state.course_id} />
                        </div>
                        <div className="col">
                            <StudyRoom studyrooms={this.state.studyrooms}/>
                        </div>
                    </div>
                </div>
                
            );

      
    }
  
}


export default Course;