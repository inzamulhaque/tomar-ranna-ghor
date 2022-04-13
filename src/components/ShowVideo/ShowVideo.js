import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import useFirebase from '../../hooks/useFirebase';

const ShowVideo = () => {
    const { user, handleSignOut } = useFirebase();
    const [item, setItem] = useState({});
    const { itemId } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${itemId}`)
            .then(res => res.json())
            .then(data => setItem(data.meals[0]));
    }, [itemId]);

    const backHome = () => {
        navigate('/');
    }

    const { strYoutube, strMeal } = item;

    const youtube = strYoutube?.replace("watch?v=", "embed/");

    return (
        <>
            <Container className="mt-3">
                <Button variant="primary" onClick={backHome}>Back To Home</Button> {"  "}
                <Button variant="danger" onClick={handleSignOut}>Sign Out</Button>
                <br />
                <Button variant="secondary"> {user && (user.displayName || user.email)} </Button>
                <Row>
                    <Col xs={12} md={10} lg={8} className="mx-auto">

                        <iframe width="100%" height="350" src={`${youtube}`} title={strMeal} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        <h3>{strMeal}</h3>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ShowVideo;