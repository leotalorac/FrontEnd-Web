import React,  {Component} from 'react';
import StudyRoom from './StudyRoomComponent/StudyroomComponent';
import { STUDYROOMS} from '../shared/studyrooms';
import ForumList from '../components/forumList'
import Background from '../assets/images/logo_n.png';
import {getStudyRooms} from '../shared/studyroomHelpers';

class Course extends Component{
    constructor(props){
        super(props);

        this.state = {
            studyrooms: [],
        };

    }
    componentDidMount(){
        getStudyRooms()
        .then((res) => {
            this.setState({
                studyrooms: res.data.data.get_study_rooms
            })
        })
    }
    
    render(){
            return(
                
                <div className="col">
                    <div className="row">
                        <h1>AQUI VAN CLASES</h1>
                    </div>
                    <div className="row">
                        <div className="col">
                            <ForumList/>
                        </div>
                        <div className="col">
                            <StudyRoom 
                                studyrooms={this.state.studyrooms}
                            />
                        </div>
                    </div>
                </div>
                
            );

      
    }
  
}


export default Course;