import React from 'react'
import './Card.css'
const Card = (props) => {
    return (
        <div className='all '>
            <div className='card1' style={{ overflow: "hidden" }}>
                <img src='https://media.istockphoto.com/id/502426696/photo/beautiful-seascape.jpg?s=612x612&w=0&k=20&c=r0JGQkPUlAmKH2fxU0aZ05UcFUbKAplBrbkPuwhJYlQ=' width='193' />
                <h1>{props.title}</h1>
                <h3>{props.desc}</h3>
            </div>
        </div>
    )
}

export default Card
