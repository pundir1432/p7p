import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { FaHeartCircleCheck } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import '../../style/Product.css';
import 'animate.css';
import AddModal from './Addmodal';
import { fetchProductData, addToCart, incrementCount } from '../../redux/Product/action';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import config from '../../config';
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
    { label: 'Clothes', year: 1994 },
    { label: 'Shoes', year: 1972 },
    { label: 'Watch', year: 1974 },
    { label: 'Goggles', year: 2008 },
    { label: 'Camera', year: 1957 },
    { label: 'Mobile', year: 1993 },
    { label: 'Airbuds', year: 1994 },
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
        {products.map((item, i) => (
          <div className="col-3 p-3" key={item._id}>
            <div className="card bg-white rounded-3 shadow text-center p-3" style={{ height: '320px' }}>
              <div className="card-body mx-auto py-3">
              {item.image && (
        <img
          src={`${config.IMAGE_URL}${item.image}`}
          alt={item.name}
          className="object-fit-cover"
          style={{ height: "80px" }}
        />
      )}
                <h6>{item.name}</h6>
                <p>Price {item.price}$</p>
                <p>{item.description.slice(0, 20)}</p>
                <div className="card-btn">
                  <button className="btn bg-none text-white" onClick={() => addProductHandle(item)}>
                    Add
                  </button>
                  <span className="ms-5" onClick={() => toggleLike(i, item)}>
                    {item.liked ? <FaHeart className="text-danger fs-5" /> : <FaHeartCircleCheck />}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AddModal show={showModal} handleClose={toggleModal} products={selectedProducts} />
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
