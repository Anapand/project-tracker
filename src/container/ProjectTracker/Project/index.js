import React, { useEffect, useRef, useState } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getProjectsfromLs, setProjectsToLs } from "../../../utils";
import { useNavigate } from "react-router-dom";


const Project = ()=>{
    const navigate = useNavigate();
    const [projectName, setProjectName] = useState('');
    const [projects, setProjects] = useState([]);

    const nameElement = useRef()

    const updateProject = ()=>{
        let projectList = getProjectsfromLs();
        projectList = projectList?.map(project => {
            console.log(project)
            const totalEstimate = project?.tasks?.reduce((acc, item)=>acc+parseFloat(item?.estimate), 0);
            project.estimate = totalEstimate;
            return project;
        });
        setProjects(projectList);
    }

    useEffect(()=>{
        updateProject();
        
    }, []);

    const updateName = (evt) => {
        setProjectName(evt.target.value);
    }

    const addProject = ()=>{
        const projectList = projects || [];
        projectList.push({id: projectList.length, name: projectName, tasks: [], estimate: 0});
        setProjectsToLs(projectList);
        nameElement.current.value = ''
        updateProject();
    }

    const goToProjectDetails = (id)=>{
        navigate(`task/${id}`);
    }

    return (
        <>
            <div className="row mt-4 mb-2">
                <h4>Add New Project </h4>
            </div>
            <div className="row mt-4">
                <div className="col">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control ref={nameElement} value={nameElement?.current?.value} type="text" onChange={updateName} placeholder="Enter Project Name" />
                    </Form.Group>
                    </Form>
                </div>
                <div className="col pt-2">
                    <Button variant="primary" className="mt-4" onClick={addProject}>Add Project</Button>
                </div>
                <div className="col"></div>
            </div>

            <div className="row mt-4 mb-2">
                <h4>Project List</h4>
            </div>
            <div className="row">
                <div className="col">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Id</th>
                            <th>Project Name</th>
                            <th>Estimate(In hrs)</th>
                            <th>#Task</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects?.map((project)=>{
                                return (
                                    <tr className="cursor-pointer" onClick={()=>goToProjectDetails(project?.id)} key={project?.id}>
                                        <td>{project?.id}</td>
                                        <td>{project?.name}</td>
                                        <td>{project?.estimate}</td>
                                        <td>{project?.tasks?.length || 0}</td>
                                    </tr>
                                );
                            })}

                        {projects?.length < 1 && ( 
                                    <tr>
                                        <td colspan="3">No project added yet</td>
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

export default Project;