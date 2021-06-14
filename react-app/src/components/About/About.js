import React from "react";
import { Link, NavLink } from "react-router-dom";
import github from './github.png'
import linkedIn from './linkedIn.png'
import mikhail from './mikhail.jpeg'
import icarus from './icarus.jpg'
import hemang from './hemang.jpeg'
import danny from './danny.jpeg'

import './about.css'

const About = () => {
    

    return (
        <div className="about_container">
            <div className="about_title">About the Developers</div>
            <div className="about_contents">
            <p className='hemang_info'>
                <img className='hemang_image' src={hemang}></img>
                <br></br>
                <a href='https://www.linkedin.com/in/desaihemang42/'><img className='linkedIn' src={linkedIn} /></a>
                <a href='https://github.com/hemangdesai42'><img className='github' src={github}/></a>
            </p>
            <br></br>
            <p className='danny_info'>
                <img className='danny_image' src={danny}></img>
                <br></br>
                <a href='https://www.linkedin.com/in/danny-zhou-718006147/'><img className='linkedIn' src={linkedIn} /></a>
                <a href='https://github.com/DZhou005'><img className='github' src={github}/></a>
            </p>
            <br></br>
            <p className='icarus_info'>
                <img className='icarus_image' src={icarus}></img>
                <br></br>
                <a href='https://www.linkedin.com/in/icarus-buckhold/'><img className='linkedIn' src={linkedIn} /></a>
                <a href='https://github.com/ibuckhold'><img className='github' src={github}/></a>
            </p>
            <br></br>
            <p className='mikhail_info'>
                <img className='mikhail_image' src={mikhail}></img>
                <br></br>
                <a href='https://www.linkedin.com/in/mikhail-kashin-223b30111/'><img className='linkedIn' src={linkedIn} /></a>
                <a href='https://github.com/Mikhail-Kashin'><img className='github' src={github}/></a>
            </p>
            </div>
        </div>
    );
};

export default About;
