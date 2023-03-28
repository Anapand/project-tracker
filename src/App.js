import React, { useEffect } from 'react';
import {  Routes, Route   } from 'react-router-dom';

import Header from './components/Header';


import logo from './logo.svg';
import './App.css';
import Project from './container/ProjectTracker/Project';
import Task from './container/ProjectTracker/Task';
import { initProjectData } from './utils';

function App() {
  useEffect(()=>{
    initProjectData();
  }, []);
  return (
    <>
      <div className='container'>
        <Header />
          <Routes path="/" element={<Project />}>
              <Route path="/" element={<Project />} />
              <Route exact strict path="project" element={<Project />} />
              <Route exact strict path="task/:projectId" element={<Task />} />
          </Routes>
      </div>
    </>
  );
}

export default App;
