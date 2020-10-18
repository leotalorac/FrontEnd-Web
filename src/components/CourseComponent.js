import React,  {Component} from 'react';
import StudyRoom from './StudyRoomComponent/StudyroomComponent';
import { STUDYROOMS} from '../shared/studyrooms';
import forumList from './forumList'
import Forum from '../views/forum'

import { Switch, Route, Redirect} from 'react-router-dom';
class Course extends Component{
    constructor(props){
        super(props);

        this.state = {
            studyrooms: STUDYROOMS,
        };
    }
    
    render(){
        const CoursesPage = () => {
            return(
                <div className="col">
                    <div className="row">
                        <h1>AQUI VAN CLASES</h1>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h2>Aqui va forum List</h2>
                        </div>
                        <div className="col">
                            <StudyRoom studyrooms={this.state.studyrooms}/>
                        </div>
                    </div>
                </div>
                
            );
        }

        return(
            <div>
                <Switch>
                    <Route path="/course" component={CoursesPage} />
                    <Route exact path="/forum" component={forumList}></Route>
                    <Route exact path="/forum/posts/:id" component={Forum}></Route>
                </Switch>
            </div>
        );
    }
  
}


export default Course;