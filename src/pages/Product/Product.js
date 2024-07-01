import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { FaHeartCircleCheck } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import '../../style/Product.css';
import 'animate.css';
import { fetchProductData, addToCart, incrementCount } from '../../redux/Product/action';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import config from '../../config';
import { Spinner } from 'react-bootstrap';
import Cart from '../Cart/Cart';
const fallbackImage = 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg';

const Product = () => {
  const dispatch = useDispatch();
  const productData = useSelector((state) => state.product.data);

  const [products, setProducts] = useState([]);
  const [toast, setToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProductData());
  }, [dispatch]);

  useEffect(() => {
    if (productData.length > 0) {
      const productsWithLikes = productData.map((product) => ({ ...product, liked: false }));
      setProducts(productsWithLikes);
    }
  }, [productData]);

  const toggleModal = () => setShowModal((prev) => !prev);

  const addProductHandle = (product) => {
    dispatch(incrementCount());
    setSelectedProducts((prev) => [...prev, product]);
    toggleModal();
  };

  const toggleLike = (index, product) => {
    dispatch(addToCart(product));
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index] = {
        ...updatedProducts[index],
        liked: !updatedProducts[index].liked,
      };
      return updatedProducts;
    });
    setToast(true);
    setTimeout(() => setToast(false), 5000);
  };

  const categories = [
    { label: 'Electronic', year: 1994 },
    { label: 'Fashion', year: 1972 },
    { label: 'Grocery', year: 1974 },
    { label: 'Mobile', year: 1993 },
    { label: 'Home & Furniture', year: 1993 },
  ];

  return (
    <div className="container-fluid product-body">
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
            options={categories}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField className="d-flex justify-content-end rounded bg-white" {...params} label="Category" />}
          />
        </div>
      </div>
      <div className="row">
      {products.length === 0 ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        products.map((item, i) => (
          <div className="col-2 p-3" key={item._id}>
            <div
              className="card py-0 p-0 rounded-3 shadow text-center "
              style={{ height: 'auto' }}
             
            >
              <div className="product-body p-0">
            {item.image && (
                  <img
                    src={`${config.IMAGE_URL}${item.image}`}
                    alt={item.name}
                    className="object-fit-cover"
                    style={{ height: '150px', width: '190px', objectFit: 'contain' }}
                    onClick={() => addProductHandle(item)}
                  />
                )}
              <h2>{item.name}</h2>
              <p>Price {item.price}</p>
              <div className="div">
                <div className="description d-flex justify-content-center">
                  <p>{item.description}</p>
                  <span className="ms-5" onClick={(e) => { e.stopPropagation(); toggleLike(i, item); }}>
                  {item.liked ? <FaHeart className="text-danger fs-5" /> : <FaHeartCircleCheck />}
                </span>
                </div>
              </div>
            </div>

            </div>
          
          </div>
        ))
      )}
    </div>

      <Cart show={showModal} handleClose={toggleModal} products={selectedProducts} />
      {toast && (
        <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: '11' }}>
          <div id="liveToast" className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
              <img src="..." className="rounded me-2" alt="..." />
              <strong className="me-auto">Notification</strong>
              <small>Just now</small>
              <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">You liked this product!</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
