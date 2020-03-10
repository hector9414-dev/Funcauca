import React from 'react'
import {Card, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CourseCard = ({img, title, summary, id, admin}) => {


    return (
        <Card className="s-mb-2 card">
            <Card.Img variant="top" src={img} alt={title} />
            <Card.Body>
            <Card.Title className="t4 s-mt-1">{title}</Card.Title>
            <Card.Text className="small s-mb-1 lg-mb-2">
                {summary}
            </Card.Text>
            <Link to={`/curso/${id}`}>
            <Button variant="primary" className="smaller card-button">Acceder</Button>
            </Link>
            </Card.Body>
        </Card>
    )
}

export default CourseCard

CourseCard.defaultProps= {
    summary: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat aut pariatur dolorum beatae sint adipisci "
}
