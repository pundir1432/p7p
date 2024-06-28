import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FaHeartCircleCheck } from "react-icons/fa6";

import { useDispatch, useSelector } from 'react-redux';
import '../../style/Product.css';
import 'animate.css';
import AddModal from './Addmodal';
import { productLoading,addToCart } from '../../redux/Product/action';

const Product = () => {
  const dispatch = useDispatch();
  const { data: productData, loading } = useSelector(state => state.product);

  const [products, setProducts] = useState([]);

  const [toast, setToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  useEffect(() => {
    dispatch(productLoading());
  }, [dispatch]);

 

  useEffect(() => {
    if (productData.length > 0) {
      const productsWithLikes = productData.map(product => ({ ...product, liked: false }));
      setProducts(productsWithLikes);
    }
  }, [productData]);

  const toggleLike = (index,product) => {
    dispatch(addToCart(product));

    setProducts(prevProducts => {
      const updatedProducts =  [...prevProducts];
      updatedProducts[index] = {
        ...updatedProducts[index],
        liked: !updatedProducts[index].liked,
      };
      return updatedProducts;
    });
    setToast(true);
    setTimeout(() => setToast(false), 5000); 
  };

  return (
    <div className="container-fluid product-body bg-secondary">
      <div className="row">
        <h1 className="text-center mt-lg-5 text-white product-heading animate__animated animate__bounce">
          Product <FaShoppingCart />
        </h1>
        {loading ? (
          <div className="d-flex mt-lg-5 justify-content-center">
            <div className="spinner-border mt-lg-5" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          products.map((item, i) => (
            <div className="col-3 p-3" key={i}>
              <div className="card bg-white rounded-3 text-center p-3" style={{height:'300px'}}>
                <div className="card-body mx-auto py-3">
                  <img src={item.image} alt="" style={{ height: '80px' }} />
                  <h4>{item.title.slice(0, 10)}</h4>
                  <p>{item.price}$</p>
                  <p>{item.description.slice(0, 60)}</p>
                  <div className="card-btn">
                    <button className="btn bg-none text-white" onClick={toggleModal}>Add</button>
                    {/* <span className="ms-5 fs-4" onClick={() => toggleLike(item)}> <FaHeartCircleCheck /></span> */}
                    <span className='ms-5' onClick={() => toggleLike(i,item)}>
                      {item.liked ? <FaHeart  className='text-danger fs-5' /> : <FaHeartCircleCheck />}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <AddModal show={showModal} handleClose={toggleModal} />
      {toast && (
        <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: '11' }}>
          <div id="liveToast" className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
              <img src="..." className="rounded me-2" alt="..." />
              <strong className="me-auto">Bootstrap</strong>
              <small>Just now</small>
              <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">
              You liked this product!
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
