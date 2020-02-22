import React from 'react'
import CourseCard from '../Organism/CourseCard'


const Courses = () => {




    return (
            <div className="ed-grid s-grid-1 m-grid-3 lg-grid-4">
                <CourseCard img="https://drupal.ed.team/sites/default/files/styles/16_9_medium/public/imagenes-cdn-edteam/2020-02/scrum_normal-v05.png"
                    title="Scrum desde cero"
                    />
                <CourseCard img="https://res.cloudinary.com/edteam/image/upload/w_400/v1573259688/courses/bi-poster.png"
                    title="Business Inteligence"
                    />
                <CourseCard img="https://res.cloudinary.com/edteam/image/upload/w_400/v1573257385/courses/nodejs.png"
                    title="Node.js desde cero"
                    />
                <CourseCard img="https://drupal.ed.team/sites/default/files/styles/16_9_medium/public/imagenes-cdn-edteam/2019-09/adobe-xd.png"
                    title="Adobe XD desde cero"
                    />

            </div>
    )
}

export default Courses
