import React from 'react'
import Banner from '../Organism/Banner'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Courses from './Courses'

const Dashboard = ({loggedUser}) => {

    if(!localStorage.getItem("token")){ return <Redirect to="/" /> }
    

    return (
        <>
        <Banner 
            height={"15rem"} 
            color={"transparent"} 
            img={"https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=100"} 
            opacity={"1"}
            />

        {loggedUser ?
            <div className="page-body dashboard s-mt-4 s-pt-4">
                    <div className="ed-grid lg-grid-12 gap-2 dashboard-container" >
                    <div className="content-panel lg-cols-2" >
                        <img src={loggedUser.img} alt="avatar" className="dashboard-avatar s-mb-1"/>
                        <p className="t3 s-mb-1 center">{loggedUser.name}</p>
                        <Button>Editar perfil</Button>
                    </div>
                    <div className="courses-panel lg-cols-8 s-mt-4 lg-mt-0 ">
                        <p className="t2 s-mb-4 center">Mis cursos</p>
                        <Courses dashboard />
                        
                    </div>
                    <div className="utility-panel lg-cols-2">
                            <ul className="utility-list">
                                <li className="list-item normal">
                                    Mis Cursos
                                </li>
                                <li className="list-item normal">
                                    Certificados
                                </li>
                            </ul>
                    </div>
                </div>
            </div>
            :
            <p>cargando</p>            
        }
        
        </>
    )
}

const mapStateToProps = state => ({
    loggedUser: state.userReducer.userLogged
})

export default connect(mapStateToProps, {} )(Dashboard)




