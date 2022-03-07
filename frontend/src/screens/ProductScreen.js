import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';

import Rating from '../components/Rating';

import products from '../products';

const ProductScreen = () => {
  let params = useParams();
  const { name, image, rating, numReviews, description, price, countInStock } =
    products.find(p => p._id === params.id);

  return (
    <>
      <Link to="/" className="btn btn-outline-dark my-3">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={image} alt={name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <h3>{name}</h3>
          </ListGroup>
          <ListGroup.Item>
            <Rating value={rating} text={`${numReviews} reviews`} />
          </ListGroup.Item>
          <ListGroup.Item>Price: ${price}</ListGroup.Item>
          <ListGroup.Item>Description: {description}</ListGroup.Item>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>
                      {countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={countInStock < 1}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
