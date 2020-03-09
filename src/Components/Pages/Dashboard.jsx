import React from 'react'
import Banner from '../Organism/Banner'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Courses from './Courses'
import Avatar from '../Atoms/Avatar'
import Axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'

const Dashboard = ({loggedUser}) => {

    let secondName 
    let firstName 
    const [flagUrl, setFlagUrl] = useState()

    if(loggedUser){
        if(((loggedUser.name).trim()).includes(" ")){
           const letterIndex = (loggedUser.name).indexOf(" ")
           secondName = (loggedUser.name)[letterIndex+1]+"."
           firstName = (loggedUser.name).split(" ")[0]

        }
        else{
            firstName = loggedUser.name
        }
    }

    const getFlag = async() =>{
        if(loggedUser){
            const response = await Axios.get(`https://restcountries.eu/rest/v2/name/${loggedUser.country}`)
            const tempData = response.data[0]
            setFlagUrl(tempData.flag)
            
        }
    }
    

    useEffect(()=>{
        getFlag()
    },[flagUrl])

    return (
        <main>
        <Banner 
            height={"15rem"} 
            color={"transparent"} 
            img={"https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=100"} 
            opacity={"1"}
            />

        {loggedUser ?
            <div className="page-body dashboard s-mt-4 s-pt-4">
                    <div className="ed-grid lg-grid-12 gap-2 dashboard-container" >
                    <aside className="content-panel lg-cols-2" >
                        <div className="dasboard-avatar-container">
                        <Avatar />
                        </div>
                        
                        {
                            loggedUser.lastName?
                            <p className="t5 s-mb-1 center">{firstName} {secondName} {loggedUser.lastName}</p>
                            :
                            <p className="t5 s-mb-0 center">{loggedUser.name}</p>

                        }
                        {
                            loggedUser.country?
                            <p className="small s-mb-1 center">{loggedUser.country} <img src={flagUrl} alt={loggedUser.country} className="country-flag"/> </p>
                            : 
                            null
                        }

                            <Link to="/editar-perfil">
                                <Button>
                                        Editar perfil
                                </Button>
                            </Link>
                    </aside>
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
        
        </main>
    )
}

const mapStateToProps = state => ({
    loggedUser: state.userReducer.userLogged,
})

export default connect(mapStateToProps, {} )(Dashboard)




