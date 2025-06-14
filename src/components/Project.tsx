import React from "react";
import '../assets/styles/Project.scss';

function Project() {
    return(
    <div className="projects-container" id="projects">
        <h1>Personal Projects</h1>
        <div className="projects-grid">
            <div className="project">
                <a href="https://github.com/HiteshSonetaNEU/VoiceNotes" target="_blank" rel="noreferrer"><h2>VoiceNotes - Speech-to-Text Note Taking App</h2></a>
                <p>A full-stack web application that converts speech to text using the Web Speech API. Built with React.js frontend and Node.js/Express backend with MongoDB Atlas. Features real-time voice transcription, note organization with topics, rich text editing, search functionality, and responsive design for both desktop and mobile platforms.</p>
                <div className="additional-links">
                    <a href="https://github.com/HiteshSonetaNEU/VoiceNotes" target="_blank" rel="noreferrer">GitHub Repository</a>
                </div>
            </div>
            <div className="project">
                <a href="https://github.com/HiteshSonetaNEU/High-Value-Links" target="_blank" rel="noreferrer"><h2>High-Value Link Scraper with AI Classification</h2></a>
                <p>An intelligent web scraper that identifies and extracts high-value links from websites using both rule-based algorithms and OpenAI's GPT models. Built with Python, FastAPI, and MongoDB. Features include recursive web crawling, LLM-powered link classification, REST API with background task processing, and scalable data storage with performance optimizations.</p>
                <div className="additional-links">
                    <a href="https://github.com/HiteshSonetaNEU/High-Value-Links" target="_blank" rel="noreferrer">GitHub Repository</a>
                </div>
            </div>
            <div className="project">
                <a href="https://ieeexplore.ieee.org/document/9198562" target="_blank" rel="noreferrer"><h2>Consumer Behavior Analytics using Machine Learning</h2></a>
                <p>Developed a Django-based system applying machine learning algorithms to enhance predictive accuracy by 20% for consumer behavior insights. Created an interactive JavaScript interface that improved user engagement by 50% and increased average transaction value by 20%. Published research paper cited in 9 industry publications and presented at 3 major conferences.</p>
                <div className="additional-links">
                    <a href="https://ieeexplore.ieee.org/document/9198562" target="_blank" rel="noreferrer">IEEE Publication</a>
                </div>
            </div>
            <div className="project">
                <a href="https://github.com/HiteshSonetaNEU" target="_blank" rel="noreferrer"><h2>Mock Interview App - AI-Powered Interview Practice <span className="work-in-progress">(Work in Progress)</span></h2></a>
                <p>An intelligent mock interview application that combines voice-to-text technology from my VoiceNotes project with local LLM integration. Uses LM Studio to generate topic-based interview questions and provides AI-powered response evaluation. Features include voice response capture, text input for coding answers, real-time feedback scoring, and personalized interview practice sessions for technical and behavioral questions.</p>
                <div className="additional-links">
                    <a href="https://github.com/HiteshSonetaNEU" target="_blank" rel="noreferrer">GitHub Repository (Coming Soon)</a>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Project;