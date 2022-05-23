import './SplashPage.css'

import React from 'react';
import { NavLink } from 'react-router-dom';

const style = {
    'width': '30px',
    'height': '30px',
}

const SplashPage = () => {
    return (
        <div>
            <div className='image_div_background'>
                <img src='https://img.freepik.com/free-photo/fresh-colourful-ingredients-mexican-cuisine_23-2148254294.jpg?w=2000' />
            </div>
            <div className='intro_block'>
                <div>Welcome to <span className='ala_text bigger'>Ala</span><span className='carte_text bigger'>Carte</span></div>
                <div>Your new favorite spot for all the best recipes</div>
                <div>Create your own recipes for others to try</div>
                <div>Save recipes into your personal collections</div>
                <div className='link_block'>
                    <div className='link_icon icon'><a href='https://www.linkedin.com/in/mason-taylor-5a2139211/'><img style={style} src='http://cdn.onlinewebfonts.com/svg/img_137494.png' /></a></div>
                    <div className='link_icon icon'><a href='https://github.com/masontaylor7'><img style={style} src='https://cdn-icons-png.flaticon.com/512/25/25231.png' /></a></div>
                </div>
            </div>
        </div>
    );
};

export default SplashPage;
