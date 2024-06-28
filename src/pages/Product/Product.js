import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FaHeartCircleCheck } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import '../../style/Product.css';
import 'animate.css';
import AddModal from './Addmodal';
import { incrementCount, productLoading } from '../../redux/Product/action';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Tooltip } from 'react-bootstrap';

const Product = () => {
  const dispatch = useDispatch();
  const { data: productData, loading } = useSelector(state => state.product);

  const [products, setProducts] = useState([]);
  const [toast, setToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const addProductHandle = (product) => {
    dispatch(incrementCount());
    setSelectedProducts(prevSelectedProducts => [...prevSelectedProducts, product]);
    setShowModal(true);
  };

  useEffect(() => {
    dispatch(productLoading());
  }, [dispatch]);

  useEffect(() => {
    if (productData.length > 0) {
      const productsWithLikes = productData.map(product => ({ ...product, liked: false }));
      setProducts(productsWithLikes);
    }
  }, [productData]);

  const toggleLike = (index) => {
    setProducts(prevProducts => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index] = {
        ...updatedProducts[index],
        liked: !updatedProducts[index].liked,
      };
      return updatedProducts;
    });
    setToast(true);
    setTimeout(() => setToast(false), 5000); // Hide toast after 5 seconds
  };

  const top100Films = [
    { label: 'Clothes', year: 1994 },
    { label: 'Shoes', year: 1972 },
    { label: 'Watch', year: 1974 },
    { label: 'Goggles', year: 2008 },
    { label: 'Camera', year: 1957 },
    { label: 'Mobile', year: 1993 },
    { label: 'Airbuds', year: 1994 },
  ];

  return (
    <div className="container-fluid product-body bg-secondary">
      <div className="row">
        <div className="col-6 text-end">
          <h1 className="mt-lg-5 me-0 text-white product-heading animate__animated animate__bounce">
            Product <FaShoppingCart />
          </h1>
        </div>
        <div className="col-6 d-flex justify-content-end">
          <Autocomplete
            disablePortal
            className="mt-lg-4"
            id="combo-box-demo"
            options={top100Films}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField className="d-flex justify-content-end rounded bg-white" {...params} label="Movie" />}
          />
        </div>
      </div>
      <div className="row">
        {loading ? (
          <div className="d-flex mt-lg-5 justify-content-center">
            <div className="spinner-border mt-lg-5" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          products.map((item, i) => (
            <div className="col-3 p-3" key={i}>
              <div className="card bg-white rounded-3 shadow text-center p-3" style={{ height: '320px' }}>
                <div className="card-body mx-auto py-3">
                  <img src={item.image} alt="" style={{ height: '80px' }} />
                  <Tooltip title={item.title}>
                  <h4>{item.title.slice(0, 10)}</h4>

                  </Tooltip>
                  <p>{item.price}$</p>
                  <p>{item.description.slice(0, 60)}</p>
                  <div className="card-btn">
                    <button className="btn bg-none text-white" onClick={() => addProductHandle(item)}>Add</button>
                    <span className="ms-5" onClick={() => toggleLike(i)}>
                      {item.liked ? <FaHeart className="text-danger fs-5" /> : <FaHeartCircleCheck />}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <AddModal show={showModal} handleClose={toggleModal} products={selectedProducts} />
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
