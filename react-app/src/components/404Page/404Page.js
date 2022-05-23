import React from 'react';
import './404Page.css'

const ErrorPage = () => {

    const style = {
        'width': '30px',
        'height': '30px',
    }

    return (
        <div>
            <div className='image_div_background'>
                <img src='https://cdn.cnn.com/cnnnext/dam/assets/200414152441-disheslead.jpg' />
            </div>
            <div className='intro_block'>
                <div>Sorry, </div>
                <div>The page you are searching for does not exist on <span className='ala_text bigger'>Ala</span><span className='carte_text bigger'>Carte</span></div>
                <div className='link_block'>
                    <div className='link_icon icon'><a href='https://www.linkedin.com/in/mason-taylor-5a2139211/'><img style={style} src='http://cdn.onlinewebfonts.com/svg/img_137494.png' /></a></div>
                    <div className='link_icon icon'><a href='https://github.com/masontaylor7'><img style={style} src='https://cdn-icons-png.flaticon.com/512/25/25231.png' /></a></div>
                </div>
            </div>

        </div>
    );
};

export default ErrorPage;
