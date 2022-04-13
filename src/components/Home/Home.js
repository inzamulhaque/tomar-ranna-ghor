import React, { useState, useEffect } from 'react';
import { Button, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap';
import Item from '../Item/Item'
import "./Home.css";

const Home = () => {
    const [items, setItems] = useState([]);
    const [searchText, setSearchText] = useState("");

    const handleSearchBlur = event => {
        setSearchText(event.target.value);
    }

    useEffect(() => {
        const foodName = searchText || "fish";
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
            .then(res => res.json())
            .then(data => setItems(data.meals));
    }, [searchText]);

    return (
        <>
            <Container>
                <h1 className="text-center text-primary mt-3">তোমার রান্নাঘর</h1>
                <Row>
                    <Col xs={12} md={8} lg={6} className="mx-auto">
                        <Row className="searchRow">
                            <Col xs={8}>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Search Your Food By Food Name"
                                    className="mb-3"
                                >
                                    <Form.Control type="text" placeholder="Search Ypur Food By Food Name" className="searchBox" onBlur={handleSearchBlur} />
                                </FloatingLabel>
                            </Col>
                            <Col xs={4}>
                                <Button variant="outline-success">Search</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="mt-3 g-5">
                    {
                        items && items.map(item => <Item key={item.idMeal} item={item} />)
                    }
                </Row>
            </Container>
        </>
    );
};

export default Home;