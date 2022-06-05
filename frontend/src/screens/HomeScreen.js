import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';
import Product from '../components/Product';
import Paginate from '../components/Paginate';
import { listProducts } from '../actions/productActions';
import { useParams } from 'react-router-dom';

const HomeScreen = () => {
  const params = useParams();

  const keyword = params.keyword;
  const pageNumber = params.pageNumber || 1;

  const dispatch = useDispatch();

  // Kullanacağımız reducer'ımızı seçiyoruz.
  const productList = useSelector(state => state.productList);
  const { loading, error, products, page, pages } = productList;

  // Sayfa yüklendiğinde productReducer'ımıza listProduct aksiyonlu dispatchimizi önderiyoruz. gönderiyoruz.
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product {...product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
