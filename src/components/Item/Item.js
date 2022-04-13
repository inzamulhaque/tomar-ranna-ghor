import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Item = ({ item }) => {
    const { idMeal, strMeal, strCategory, strArea, strInstructions, strMealThumb } = item;
    const navigate = useNavigate();

    const watchRecipe = () => {
        navigate(`/showVideo/${idMeal}`);
    }
    return (
        <>
            <Col xs={12} md={6} lg={4}>
                <Card>
                    <Card.Img variant="top" src={strMealThumb} className="w-100" />
                    <Card.Body>
                        <Card.Title>{strMeal}</Card.Title>
                        <Card.Text>
                            <h6>Category: {strCategory}</h6>
                            <p><small>{strArea} Food</small></p>
                            <p>
                                {
                                    strInstructions.length > 50 ? strInstructions.slice(0, 50) + "..." : strInstructions
                                }
                                {
                                    strInstructions.length > 50 && <Link to={`/foodInfo/${idMeal}`}> Read More</Link>
                                }
                            </p>
                        </Card.Text>
                        <Button variant="primary" onClick={watchRecipe}>watch Recipe</Button>
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
};

export default Item;