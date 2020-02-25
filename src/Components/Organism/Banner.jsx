import React from 'react'
import hero from '../../img/Hero-image.jpg'
import logo from '../../img/logo-no-text-.png'

const Banner = ({home, course, img, title, description, height, color, opacity}) => {



    if(home){
        return (
            <div className="main-banner home img-container dark-color s-cross-center" id="main-banner" >
                <div className="ed-grid lg-grid-6">
                    <div className="lg-cols-6">
                            <div className="logo-container s-cross-center s-pb-1 s-mb-4">
                            <img src={logo} alt="img" className="hero-logo" style={{opacity:"1 !important"}} />
                            </div>
                        <img className="main-banner__img" src={hero} alt="hero"/>
                        <div className="main-banner__data  s-center s-mt-4">
                            <p className="t1 s-mb-0">Fundacion Educativa del Cauca</p>
                            <p className="t3 s-mb-0">Educación virtual con Calidad</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (course){
        
        return (
            <div className="main-banner course-banner img-container s-mb-4" id="main-banner" style={{background:`${color}`, height:`${height}`}}>
                <div className="ed-grid lg-grid-6">
                    <div className="lg-cols-4">
                        <div className="course-data main-banner__data s-left ">
                            <p className="t1 s-mb-1 course-title"> {title} </p>
                            <p className="course-description" > {description} </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        
            <div className="main-banner courses-banner img-container s-mb-4" id="main-banner" style={{background:`${color}`, height:`${height}`}}>
                <div className="ed-grid lg-grid-6">
                    <div className="lg-cols-4 lg-x-2">
                        <img className="banner__img" src={img} alt="hero" style={{opacity:`${opacity}`}} />
                        <div className="main-banner__data s-center ">
                            <p className="t2 s-pt-4 s-mb-0"> { title } </p>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Banner


Banner.defaultProps = {
    color : "rgb(5, 90, 47)",
    opacity: ".1"
}