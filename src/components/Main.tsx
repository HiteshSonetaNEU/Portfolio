import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../assets/styles/Main.scss';
import HiteshImage from '../assets/images/HiteshSoneta.jpeg';

function Main() {

  return (
    <div className="container">
      <div className="about-section">
        <div className="image-wrapper">
          <img src={HiteshImage} alt="Hitesh Soneta" />
        </div>
        <div className="content">
          <div className="social_icons">
            <a href="https://github.com/HiteshSonetaNEU" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/hitesh-soneta/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
          </div>
          <h1>Hitesh Soneta</h1>
          <p>Software Engineer | Cloud & AI Specialist</p>
          <p className="contact-info">Boston, MA | (857) 707-6242 | sonetah@gmail.com</p>

          <div className="mobile_social_icons">
            <a href="https://github.com/HiteshSonetaNEU" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/hitesh-soneta/" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;