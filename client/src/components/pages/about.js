import React from 'react';

function About (){

  return (
    <div className="container">
      <header>
        <h1>
          About Page
        </h1>
      </header>
      <div className="content">
        <h1>What is Project Dashboard?</h1>
        <p>Project Dashboard is a one stop overview for seeing general project profitability.</p>
        <h2>Features included:</h2>
        <ol>
          <li>Creating projects to monitor</li>
          <li>Refresh Teamwork data from watched projects</li>
          <li>Adding users who can view project data</li>
        </ol>
        <h2>Features to implement:</h2>
        <ol>
          <li>Add Toggl integration</li>
          <li>Import Toggl time entries for projects</li>
          <li>Graph/display real time spent between projects</li>
        </ol>
      </div>
    </div>
  )
}


export default About;