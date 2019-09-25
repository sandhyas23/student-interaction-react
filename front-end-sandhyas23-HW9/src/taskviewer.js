import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactCommonmark from 'react-commonmark';
import Prism from 'prismjs';
import Moment from 'react-moment';
import { Button, ButtonToolbar} from 'react-bootstrap';
import 'prismjs/themes/prism.css';

export class TaskViewer extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidUpdate() {
        Prism.highlightAll();
    }
    componentDidMount() {
        Prism.highlightAll();
    }

    removeTask = () => {
        this.props.removeTask();
    }

    updateTask = () => {
        this.props.updateTask();
    }
    addTask = () => {
        this.props.addTask();
    }

    render() {
        if (this.props.sampleTasks.length === 0) {
            var markdownInstruction = ''
            var rawHtml = <div className="language-html">
                <ReactCommonmark source={markdownInstruction} />
            </div>

            return <div>
                {rawHtml}
                <p><Button onClick ={this.addTask}>Add</Button></p>
            </div>
        }
        else {
            var markdownInstruction = this.props.sampleTasks[this.props.currentTask].instructions;
            var rawHtml = <div className="language-html">
                <ReactCommonmark source={markdownInstruction} />
            </div>

            return <div>
               
                {rawHtml}
                Status : {this.props.sampleTasks[this.props.currentTask].status} <br/>
                Due    : <Moment format="MMM DD YYYY hh:mm A">{this.props.sampleTasks[this.props.currentTask].due}</Moment><br />
                <ButtonToolbar>
                    <Button onClick ={this.addTask}>Add</Button>
                    <Button onClick={this.updateTask}>Update</Button>
                    <Button onClick={this.removeTask} disabled={this.props.sampleTasks.length <= 0}>Delete</Button>
                </ButtonToolbar>

            </div>
        }

    }
}




