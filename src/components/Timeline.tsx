import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../assets/styles/Timeline.scss'

function Timeline() {
  return (
    <div id="history">
      <div className="items-container">
        <h1>Professional Experience</h1>
        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
            contentArrowStyle={{ borderRight: '7px solid  white' }}
            date="2023 - present"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">MS Software Engineering Systems</h3>
            <h4 className="vertical-timeline-element-subtitle">Northeastern University, Boston</h4>
            <p>
              Pursuing advanced coursework in cloud computing, data engineering, AI/ML integration, and modern software development methodologies
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="July 2024 - December 2024"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Software Development Co-op</h3>
            <h4 className="vertical-timeline-element-subtitle">Sute, Scituate, Massachusetts</h4>
            <p>
              Engineered React TypeScript web application displaying financial insights, connecting user bank accounts via Teller API to visualize spending patterns and prevent missed payments; decreased late payments by 15%. Built interactive dashboards enabling identification of wasteful spending habits, supporting users to save at least $50 per month. Implemented social media scraping scripts reducing manual data entry by 75%.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="July 2022 - August 2023"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Software Engineer</h3>
            <h4 className="vertical-timeline-element-subtitle">MAQ Software, Mumbai, India</h4>
            <p>
              Collaborated on developing React-based web applications, contributing to design and implementation. Led Power BI implementation for sales data analysis across 5 regions, improving forecast accuracy by 20% and reducing excess inventory by 15%. Optimized SQL queries, reducing response time by 40% and enhancing database performance. Improved PostgreSQL queries to reduce latency by 25% through indexing and query optimization.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="June 2021 - June 2022"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Implementation Engineer</h3>
            <h4 className="vertical-timeline-element-subtitle">Aviso, Mumbai, India</h4>
            <p>
              Developed and deployed full-stack web applications, contributing to both frontend and backend. Customized backend software to support personalized user experiences, enhancing client engagement and aligning application features with unique client needs. Resolved 95% of client issues, serving as a dedicated point of contact. Improved customer retention by 40% and boosted average order value by 25%.
            </p>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="October 2020 - June 2021"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Full Stack Developer</h3>
            <h4 className="vertical-timeline-element-subtitle">Code-B, Mumbai, India</h4>
            <p>
              Designed and hosted a complete-stack Nest.js and React application, supporting 3x user-based growth within four months when monolithic systems hit scaling limits, through careful refactoring to microservices, and setting up robust CI/CD pipelines. Built back-end services using Nest.js and AWS Lambda, shortening the servers' response times by 35% and the infrastructure cost by 15% in the quarterly peak-usage periods, by architecting microservices, reducing cold starts, and CI/CD-based automating deployments. Developed from scratch a React Native mobile application, implementing live-reload testing, and creating custom native bridges for platform-specific UI.
            </p>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;