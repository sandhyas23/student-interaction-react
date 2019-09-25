import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, NavDropdown} from 'react-bootstrap';
import { TaskViewer } from './taskviewer';
import { TaskUpdate } from './taskupdate';


export class App extends React.Component {
  constructor(props) {
    super(props);
    
   
    this.state = { sampleTasks:[], currentTask: 0, mode:"view" };
  }
  componentDidMount(){
      let _this = this
    fetch('/tasks').then(response => response.json()).then(function(data) {

        console.log("this is what we got" +data);
        _this.setState({sampleTasks: data.tasks});
        
      })
  }

  showTask(eventKey) {
    this.setState({ mode:"view", currentTask: eventKey });
   
  }

  showTaskinfo() {
    const isTask = this.state.mode;
    if (isTask === "view") {
      return <TaskViewer sampleTasks={this.state.sampleTasks} currentTask={this.state.currentTask}
        removeTask={this.removeTask.bind(this)} updateTask={this.updateTask.bind(this)}
        addTask={this.addTask.bind(this)} />
    }
    else {
        return <TaskUpdate sampleTasks={this.state.sampleTasks} currentTask={this.state.currentTask}
      update={this.updateArray.bind(this)} task={this.state.sampleTasks[this.state.currentTask]} 
      mode={this.state.mode}/>

    }
  
  }
  updateArray() {
    this.setState({ mode: "view" });
  }

  handleSelect(eventKey) {
    alert(eventKey);

  }

  removeTask() {

        const _this=this;
        const taskName = this.state.sampleTasks[this.state.currentTask]["task-name"];
        const taskToDelete = this.state.sampleTasks[this.state.currentTask];
        fetch('/tasks/'+taskName, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(taskToDelete)
        }).then(function(response) {
            if (_this.state.sampleTasks.length > 0) {
                if (_this.state.currentTask > 0) {
                  _this.state.sampleTasks.splice(_this.state.currentTask, 1);
                  _this.setState({ currentTask: _this.state.currentTask - 1});
                }
                else {
                  _this.state.sampleTasks.splice(_this.state.currentTask, 1);
                  _this.setState({ currentTask: _this.state.currentTask });
          
                }
              }
             
        });
  }


  updateTask(){
    this.setState({mode:"update"})
    console.log(this.state.currentTask);
  }
  addTask(){
    this.setState({mode:"add"})
    console.log(this.state.currentTask);
  }

  render() {
    let listItems = this.state.sampleTasks.map((task, index, array) => {
      return <NavDropdown.Item eventKey={index} key={`task${index}`} onSelect={k => this.showTask(k)}>
        {task["task-name"]}</NavDropdown.Item>
    });
    if (this.state.sampleTasks.length <=0){
        return <div> 
        {this.showTaskinfo()}
        </div>
    }
    else{
    return <div>
      <Nav variant="pills">
        <Nav.Item >
          <Nav.Link eventKey="a" href="/home" >
            Home
            </Nav.Link>
        </Nav.Item>
        <NavDropdown title={this.state.sampleTasks[this.state.currentTask]["task-name"]} id="nav-dropdown" >
          {listItems}
        </NavDropdown>
      </Nav>
      {this.showTaskinfo()}
      
    </div>
    }

  }
}

