import React from 'react'
import "./ContactPage.css";
import Glasscard from '../components/Glasscard';

export default function ContactPage() {
  return (
    <Glasscard className="contactpagecard">
        <div className="title">Get in touch</div>
        <div className="content">
            Hi, I'm Deepak Prasad. I love to create experiences that are cutting edge and out of ordinary. You can contact me on handles below.
        </div>
        <div className="contacticons">
            <a href="https://www.linkedin.com/in/deepak-prasad-5747ab212/" target="_blank">
                <img src="./icons/linkedinicon.svg" className='contactpageicon' alt="linkedinhandle" title="https://www.linkedin.com/in/deepak-prasad-5747ab212/" />
            </a>
            <a href="https://github.com/TheClearSky" target="_blank">
                <img src="./icons/githubicon.svg" className='contactpageicon' alt="githubhandle" title="https://github.com/TheClearSky" />
            </a>
        </div>
    </Glasscard>
  )
}
