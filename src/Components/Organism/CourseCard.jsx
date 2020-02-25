import React from 'react'
import {Card, Button} from 'react-bootstrap'

const CourseCard = ({img, title, summary}) => {

    console.log(img)
    console.log(title)
    console.log(summary)
    return (
        <Card className="s-mb-2 card">
            <Card.Img variant="top" src={img} />
            <Card.Body>
            <Card.Title className="t4 s-mt-1">{title}</Card.Title>
            <Card.Text className="small s-mb-1 lg-mb-2">
                {summary}
            </Card.Text>
            <Button variant="primary" className="smaller">Acceder</Button>
            </Card.Body>
        </Card>
    )
}

export default CourseCard

CourseCard.defaultProps= {
    summary: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat aut pariatur dolorum beatae sint adipisci "
}
