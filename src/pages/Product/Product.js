// Product.js
import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import '../../style/Product.css';
import 'animate.css';
import AddModal from './Addmodal';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast,setToast] = useState(false)
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  // Function to toggle modal
  const toggleModal = () => setShowModal(!showModal);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        // Initialize liked state for each product
        const productsWithLikes = data.map(product => ({ ...product, liked: false }));
        setProducts(productsWithLikes);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };
    fetchProducts();
  }, []);
  const toggleLike = (index) => {
    setToast(true)
    setProducts(prevProducts => {
        // Create a copy of the products array
        const updatedProducts = [...prevProducts];
        // Toggle the liked state of the specific product
        updatedProducts[index] = {
            ...updatedProducts[index],
            liked: !updatedProducts[index].liked
        };
        return updatedProducts;
    });
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
            products?.map((item, i) => (
                <div className="col-3 p-3" key={i}>
                    <div className="card- bg-white rounded-3 text-center p-3">
                        <div className="card-body mx-auto py-3">
                            <img src={item.image} alt="" style={{ height: '80px' }} />
                            <h4>{item.title.slice(0, 10)}</h4>
                            <p>{item.price}$</p>
                            <p>{item.description.slice(0, 60)}</p>
                            <div className="card-btn">
                                <button className="btn bg-none text-white" onClick={toggleModal}>Add</button>
                                <span className='ms-5' onClick={() => toggleLike(i)}>
                                    {item.liked ? <FaHeart className='text-danger fs-5' /> : <FaRegHeart />}
                                </span>
                            </div>


                        </div>
                    </div>
                </div>
            ))
        )}
      </div>
      {/* Modal component */}
      <AddModal show={showModal} handleClose={toggleModal} />
      {toast && <div className="position-fixed bottom-0 end-0 p-3" style={{zIndex:'11'}}>
  <div id="liveToast" className="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
    <div className="toast-header">
      <img src="..." className="rounded me-2" alt="..."/>
      <strong class="me-auto">Bootstrap</strong>
      <small>11 mins ago</small>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div className="toast-body">
      Hello, world! This is a toast message.
    </div>
  </div>
</div>}
      
    </div>
  );
};

export default Product;
