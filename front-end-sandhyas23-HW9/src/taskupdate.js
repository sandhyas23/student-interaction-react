import React from 'react';
import ReactCommonmark from 'react-commonmark';
import Prism from 'prismjs';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Col, Container, Row } from 'react-bootstrap';
var moment = require('moment');



export class TaskUpdate extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.mode === "update") {
            this.state = { task: this.props.task, mode: this.props.mode }
        }
        else if (this.props.mode === "add") {
            this.state = { "task-name": '', due: '', status: 'open', instructions: '' }
        }
        //console.log(this.state.task);
        this.handleChange = this.handleChange.bind(this);
        this.commitValue = this.commitValue.bind(this);
        this.addChange = this.addChange.bind(this);
        this.addValue = this.addValue.bind(this);
        this.cancelTask = this.cancelTask.bind(this);

    }
    componentDidUpdate() {
        Prism.highlightAll();
    }
    componentDidMount() {
        Prism.highlightAll();
    }

    handleChange(event) {

        let task = Object.assign({}, this.state.task);    //creating copy of object
        task[event.target.name] = event.target.value;                        //updating value
        this.setState({ task });

    }

    commitValue(event) {
        const _this = this;
        const taskName = this.state.task["task-name"];
        const taskToUpdate = this.state.task;
        fetch('/tasks/' + taskName, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(taskToUpdate)
        }).then(function (response) {
            _this.props.sampleTasks.splice(_this.props.currentTask, 1, taskToUpdate);
            _this.props.update();
            event.preventDefault();
        });

    }

    addChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;


        this.setState({
            [name]: value
        });

    }

    addValue(event) {
        let _this = this
        let taskToSave = {
            "task-name": this.state["task-name"], due: this.state.due,
            status: this.state.status, instructions: this.state.instructions
        };
        fetch('/tasks', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(taskToSave)
        }).then(function (response) {
            _this.props.sampleTasks.push(taskToSave);
            _this.props.update();
            event.preventDefault();
        });

    }

    cancelTask() {
        this.setState({ mode: "view" })
        this.props.update();
    }

    render() {

        //let dueTime = moment(data.due).utc().format('HH:mm');
        if (this.props.mode === "update") {
            let due = moment(this.state.task["due"]).format('YYYY-MM-DD hh:mm A');
            var markdownInstruction = this.state.task["instructions"]
            var rawHtml = <div className="language-html">
                <ReactCommonmark source={markdownInstruction} />
            </div>

            if (this.state.task["status"] === "closed") {
                var op = "open";
            }
            else {
                var op = "closed";
            }
            return <div>
                <Container>
                    <Row>
                        <Col>
                            <Form>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>
                                            Name:</Form.Label>
                                        <Form.Control name="task-name" value={this.state.task["task-name"]}
                                            disabled="disabled" />
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>
                                            due date: </Form.Label>
                                        <Form.Control name="due" value={due} onChange={this.handleChange} />
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>
                                            status:</Form.Label>
                                        <Form.Control name="status" as="select" onChange={this.handleChange}>
                                            <option defaultValue={this.state.task["status"]}>{this.state.task["status"]}</option>
                                            <option value={op}>{op}</option>

                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row><Form.Group as={Col} ><Form.Label>
                                    instruction:</Form.Label>
                                    <Form.Control as="textarea" name="instructions" value={this.state.task["instructions"]}
                                        rows="10" s="25" onChange={this.handleChange} /> </Form.Group>
                                </Form.Row>
                                <input type="button" value="commit" onClick={this.commitValue} />
                                <input type="button" value="cancel" onClick={this.cancelTask} />

                            </Form>
                        </Col>
                        <Col>
                            <strong><center>Preview:</center></strong>
                            {rawHtml}
                        </Col>
                    </Row>
                </Container>
            </div>
        }
        else {
            var markdownInstruction = this.state.instructions;
            var rawHtml = <div className="language-html">
                <ReactCommonmark source={markdownInstruction} />
            </div>
            if (this.state["status"] === "closed") {
                var op = "open";
            }
            else {
                var op = "closed";
            }

            return <div>
                <Container>
                    <Row>
                        <Col>
                            <Form>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>
                                            Name:</Form.Label>
                                        <Form.Control name="task-name" value={this.state["task-name"]} onChange={this.addChange} />
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>
                                            due date: </Form.Label>
                                        <Form.Control name="due" value={this.state.due} onChange={this.addChange} rows="1" />
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>status:</Form.Label>
                                        <Form.Control name="status" as="select" onChange={this.addChange} >
                                            <option defaultValue={this.state.status}>{this.state.status}</option>
                                            <option value={op}>{op}</option>

                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row><Form.Group as={Col} ><Form.Label>
                                    instruction:</Form.Label>
                                    <Form.Control as="textarea" name="instructions" value={this.state.instructions}
                                        rows="10" s="25" onChange={this.addChange} /> </Form.Group>
                                </Form.Row>
                                <input type="button" value="commit" onClick={this.addValue} />
                                <input type="button" value="cancel" onClick={this.cancelTask} />

                            </Form>
                        </Col>
                        <Col>
                            <strong><center>Preview:</center></strong>
                            {rawHtml}
                        </Col>
                    </Row>
                </Container>
            </div>




        }

    }
}





