import React from 'react';
import sampleTasks from './tasks1.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, DropdownButton } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/lib/DropdownItem';
import { TaskViewer } from './taskviewer';
import { TaskUpdate } from './taskupdate';


export class TaskMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sampleTasks: sampleTasks, currentTask: 0, viewMode: false, updateMode:false };
  }

  showTask(eventKey) {

    this.setState({ viewMode: true, currentTask: eventKey });
    
  }


  showTaskinfo() {
    const isTask = this.state.viewMode;
    if (isTask) {
      return <TaskViewer sampleTasks={this.state.sampleTasks} currentTask={this.state.currentTask}
        removeTask={this.removeTask.bind(this)} updateTask={this.updateTask.bind(this)} />
    }
  }
  updateArray() {
    this.setState({ sampleTasks: sampleTasks });
  }

  handleSelect(eventKey) {
    alert(eventKey);

  }

  removeTask() {
    if (this.state.sampleTasks.length > 0) {
      //console.log(this.state.allQuestions.length);
      if (this.state.currentTask > 0) {
        this.state.sampleTasks.splice(this.state.currentTask, 1);
        this.setState({ currentTask: this.state.currentTask - 1 });
      }
      else {
        this.state.sampleTasks.splice(this.state.currentTask, 1);
        this.setState({ currentTask: this.state.currentTask });

      }
    }
  }


  updateTask(){
    this.setState({updateMode:true})
    console.log(this.state.currentTask);
  }

  updateTaskView(){
    const upTask = this.state.updateMode;
    if (upTask) {
      return <TaskUpdate sampleTasks={this.state.sampleTasks} currentTask={this.state.currentTask}
      update={this.updateArray.bind(this)}/>
    }

  }




  render() {
    let listItems = this.state.sampleTasks.map((task, index, array) => {
      return <NavDropdown.Item eventKey={index} key={`task${index}`} onSelect={k => this.showTask(k)}>
        {task.taskname}</NavDropdown.Item>
    });

    return <div>
      <Nav variant="pills">
        <Nav.Item >
          <Nav.Link eventKey="a" href="#/home" onSelect={k => this.handleSelect(k)} >
            Home
            </Nav.Link>
        </Nav.Item>
        <NavDropdown title="Tasks" id="nav-dropdown" >
          {listItems}
        </NavDropdown>
      </Nav>
      {this.showTaskinfo()}
      {this.updateTaskView()}
    </div>

  }
}
