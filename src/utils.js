export const initProjectData = () =>{
    const projects = getProjectsfromLs();
    if(projects?.length < 1){
        localStorage.setItem('projects', JSON.stringify([]));
    }
}

export const getProjectsfromLs = () => {
    const projectList = JSON.parse(localStorage.getItem('projects'));
    return projectList;
}

export const setProjectsToLs = (projects) =>{
    localStorage.setItem('projects', JSON.stringify(projects));
}
