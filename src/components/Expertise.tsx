import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faDocker, faPython } from '@fortawesome/free-brands-svg-icons';
import Chip from '@mui/material/Chip';
import '../assets/styles/Expertise.scss';

const labelsFirst = [
    "JavaScript",
    "TypeScript",
    "Python",
    "React",
    "Node.js",
    "Nest.js",
    "React Native",
    "HTML/CSS",
    "SQL",
    "C++",
    "Java"
];

const labelsSecond = [
    "AWS",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Jenkins",
    "GitHub Actions",
    "Kafka",
    "RabbitMQ",
    "PySpark",
    "Data Bricks",
    "MySQL",
    "PostgreSQL",
    "MongoDB"
];

const labelsThird = [
    "Large Language Models",
    "LM Studio",
    "AI Integration",
    "Machine Learning",
    "Git",
    "Postman",
    "Power BI",
    "Figma",
    "SCRUM",
    "Vite",
    "Webpack"
];

function Expertise() {
    return (
    <div className="container" id="expertise">
        <div className="skills-container">
            <h1>Expertise</h1>
            <div className="skills-grid">
                <div className="skill">
                    <FontAwesomeIcon icon={faReact} size="3x"/>
                    <h3>Programming & Web Technologies</h3>
                    <p>Proficient in modern programming languages and web development frameworks. Experienced in building scalable applications using JavaScript ecosystem, Python for backend development, and mobile app development with React Native.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsFirst.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faDocker} size="3x"/>
                    <h3>Cloud, DevOps & Data Engineering</h3>
                    <p>Experienced in cloud infrastructure, containerization, and data engineering pipelines. Skilled in building scalable data solutions, implementing CI/CD workflows, and managing distributed systems with modern DevOps practices.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsSecond.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faPython} size="3x"/>
                    <h3>AI, Machine Learning & Tools</h3>
                    <p>Knowledgeable in artificial intelligence and machine learning technologies, particularly with Large Language Models. Proficient in using modern development tools and following agile methodologies for project management and collaboration.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Skills & Tools:</span>
                        {labelsThird.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Expertise;