import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectsfromLs, setProjectsToLs } from "../../../utils";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Task = ()=>{
    let { projectId } = useParams();
    const [taskDetails, setTaskDetails] = useState({});
    const [projectDetails, setProjectDetails] = useState([]);

    const nameElement = useRef();
    const estimateElement = useRef();
    const descElement = useRef();

    const updateProjectDetails = () => {
        const projects = getProjectsfromLs();
        const project = projects.find(item => item?.id==projectId)
        setProjectDetails(project);
    }
    
    useEffect(()=>{
        updateProjectDetails();
    }, []);

    const updateFieldValue = (evt, field) =>{
        const taskDetailsTemp = {...taskDetails};
        taskDetailsTemp[field] =  evt?.target?.value;
        setTaskDetails(taskDetailsTemp);
    }
    
    const addTask = () => {
        const tasks = projectDetails?.tasks || [];
        taskDetails.id = tasks?.length;
        tasks.push(taskDetails);
        const projectTemp = projectDetails;
        projectTemp['tasks'] = tasks;

        //Update local storage
        const projects = getProjectsfromLs();
        const projectIndex = projects.findIndex(item => item?.id==projectId);
        projects[projectIndex] = projectTemp;
        setProjectsToLs(projects);

        // Update field value
        nameElement.current.value = '';
        estimateElement.current.value = '';
        descElement.current.value = '';

        // update react state
        updateProjectDetails();
    }

    return (
        <>
            <div className="row mt-4 mb-2">
                <h4>Project Name: {projectDetails?.name} </h4>
            </div>
            <div className="row mt-4">
                <div className="col-3">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Task Name</Form.Label>
                            <Form.Control ref={nameElement}  value={nameElement?.current?.value} type="text" onChange={(evt)=>updateFieldValue(evt, 'taskName',)} placeholder="Enter Task Name" />
                        </Form.Group>
                    </Form>
                </div>
                <div className="col-3">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Task Estimate(In hrs)</Form.Label>
                            <Form.Control ref={estimateElement}  value={estimateElement?.current?.value} type="text" onChange={(evt)=>updateFieldValue(evt,'estimate')} placeholder="Enter Task Estimate" />
                        </Form.Group>
                    </Form>
                </div>
                <div className="col-3">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Task Description</Form.Label>
                            <Form.Control ref={descElement}  value={descElement?.current?.value} type="text" onChange={(evt)=>updateFieldValue(evt,'description')} placeholder="Enter Task Description" />
                        </Form.Group>
                    </Form>
                </div>
                <div className="col pt-2">
                    <Button variant="primary" className="mt-4" onClick={addTask}>Add Task</Button>
                </div>
                <div className="col"></div>
            </div>

            <div className="row mt-4 mb-2">
                <h4>Project Tasks</h4>
            </div>
            <div className="row">
                <div className="col">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Task Name</th>
                            <th>Estimate(In hrs)</th>
                            <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projectDetails?.tasks?.map((task)=>{
                                return (
                                    <tr key={task?.id}>
                                        <td>{task?.taskName}</td>
                                        <td>{task?.estimate}</td>
                                        <td>{task?.description}</td>
                                    </tr>
                                );
                            })}

                        {projectDetails?.tasks?.length < 1 && ( 
                                    <tr>
                                        <td colspan="3">No task added yet</td>
                                    </tr>
                        )}
                            
                        </tbody>
                    </Table>
                </div>
                <div className="col"></div>
            </div>
        </>
    );
}

export default Task;