import React from 'react'
import CourseCard from '../Organism/CourseCard'
import Banner from '../Organism/Banner'
import { connect } from 'react-redux'



const Courses = ({dashboard, home, courses}) => {


    if(dashboard){
        return (
            <div className="ed-grid s-grid-1  lg-grid-3">
                {
                    courses.map(e => {
                        return Object.values(e).map( course =>
                            <CourseCard
                                key={course.id}
                                id={course.id}
                                img={course.img}
                                title={course.title}
                                summary={""}
                            />
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
            <Banner img={"https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=966&q=80"}
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
    courses: state.coursesReducer.coursesList
})


export default connect(mapStateToProps, {} )(Courses)


