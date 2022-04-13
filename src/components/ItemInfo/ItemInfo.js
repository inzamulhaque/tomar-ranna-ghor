import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const ItemInfo = () => {
    const [item, setItem] = useState({});
    const { itemId } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${itemId}`)
            .then(res => res.json())
            .then(data => setItem(data.meals[0]));
    }, [itemId]);

    const backHome = () => {
        navigate("/");
    }

    return (
        <>
            <Container className="mt-5">
                <Button variant="primary" onClick={backHome}>Back To Home</Button>
                <Row className="mt-3">
                    <Col xs={12} md={8} lg={6} className="mx-auto">
                        <Card>
                            <Card.Img variant="top" src={item.strMealThumb} height="500" />
                            <Card.Body>
                                <Card.Title>{item.strMeal}</Card.Title>
                                <Card.Text>
                                    <p>{item.strInstructions}</p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ItemInfo;