import React from 'react'
import hero from '../../img/Hero-image.jpg'
import logo from '../../img/logo-no-text-.png'

const Banner = ({home, img, title, subtitle}) => {

    return (
        
        home ?
            <div className="main-banner home img-container dark-color s-cross-center" id="main-banner">
                <div className="ed-grid lg-grid-6">
                    <div className="lg-cols-6">
                            <div className="logo-container s-cross-center s-pb-1 s-mb-4">
                            <img src={logo} alt="img" className="hero-logo "/>
                            </div>
                        <img className="main-banner__img" src={hero} alt="hero"/>
                        <div className="main-banner__data  s-center s-mt-4">
                            <p className="t1 s-mb-0">Fundacion Educativa del Cauca</p>
                            <p className="t3 s-mb-0">Educación virtual con Calidad</p>
                        </div>
                    </div>
                </div>
            </div>
        :
            <div className="main-banner course-banner img-container primary-color s-mb-4" id="main-banner">
                <div className="ed-grid lg-grid-6">
                    <div className="lg-cols-4 lg-x-2">
                        <img className="main-banner__img" src={img} alt="hero"/>
                        <div className="main-banner__data s-center ">
                            <p className="t2 s-mb-0"> { title } </p>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Banner
