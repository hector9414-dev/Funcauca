import React from 'react'
import CourseCard from '../Organism/CourseCard'
import Banner from '../Organism/Banner'
import { connect } from 'react-redux'
import CourseImg from '../../img/courses.jpg'



const Courses = ({dashboard, home, courses, loggedUser}) => {


    if(dashboard){
        return (
            <div className="ed-grid s-grid-1  lg-grid-3">
                {
                    courses.map(e => {
                        return Object.values(e).map( course =>

                            loggedUser.courses.map( userCourses =>{
                                if( userCourses===course.id){
                                    return(
                                        <CourseCard
                                        key={course.id}
                                        id={course.id}
                                        img={course.img}
                                        title={course.title}
                                        summary={""}
                                    />
                                    )
                                }
                            } )



                            // console.log(typeof(course.id))
                            // console.log(typeof(loggedUser.courses))

                            // console.log(course.id == loggedUser.courses)

                            
                        ) 
                    })
                }
           </div>
            
            
    )
    }

    if(home){

        return (
            <>
                <div className="ed-grid s-grid-1 m-grid-3 lg-grid-4">
                {
                    courses.map(e => {
                        return Object.values(e).map( course =>
                            <CourseCard
                                key={course.id}
                                id={course.id}
                                img={course.img}
                                title={course.title}
                                summary={course.summary}
                            />
                        ) 
                    })
                }
                </div>
            </>
        )

    }

    return (
        <>
            <Banner img={CourseImg}
                title={"Nuestros Cursos"}
                color={"black"}
                opacity={".4"}
                height={"15rem"}
                />
            <div className="ed-grid s-grid-1 m-grid-3 lg-grid-4">
            {
                courses.map(e => {
                    return Object.values(e).map( course =>
                        <CourseCard
                            key={course.id}
                            id={course.id}
                            img={course.img}
                            title={course.title}
                            summary={course.summary}
                        />
                    ) 
                })
                }
            </div>
            </>
    )

    
}

const mapStateToProps = state => ({
    loggedUser: state.userReducer.userLogged,
    courses: state.coursesReducer.coursesList
})

export default connect(mapStateToProps, {} )(Courses)


