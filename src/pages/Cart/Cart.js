import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import '../../style/Product.css'; // Import the custom CSS
import { FaCartShopping } from 'react-icons/fa6';
import config from '../../config';
import { SiThurgauerkantonalbank } from "react-icons/si";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { FaCartArrowDown } from "react-icons/fa";




const Cart = ({ show, handleClose, products }) => {
    return (
        <>
            <Offcanvas show={show} onHide={handleClose} placement="end" style={{ width: '900px' }}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Product sale <FaCartShopping /></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body  >
                    {products.length === 0 ? (
                        <p>No products added.</p>
                    ) : (
                        products.map((item, i) => (



                            <div key={i} className=" mb-3 w-100 bg-white rounded-3  text-center p-3" style={{ height: '690px', width: '200px' }}>
                                <div className="card-body d-flex  py-1">
                                    <div className="col-7 border-end ">
                                        <img
                                            src={`${config.IMAGE_URL}${item.image}`}
                                            // src={'../../../upload/AdobeStock_229428578-ide-fish.jpg'}
                                            className="object-fit-cover "
                                            style={{ height: "400px", width: '400px' }}
                                        />
                                        <div className="btn d-flex justify-content-between">
                                            <button className='bg-none' style={{ width: '200px' }}><FaCartArrowDown /> GO TO CART</button>
                                            <button className='bg-none' style={{ width: '200px' }}><HiOutlineCurrencyDollar /> BUY NOW</button>
                                        </div>
                                    </div>

                                    <div className="col-5 mt-lg-2 p-lg-2 text-start ">
                                        <h2>{item.name}</h2>
                                        <p className="text-success">Extra ₹1513 off
                                        </p>
                                        <p className='fw-bold'>Price {item.price}$ <del className='text-muted'>5000</del> <span className='text-success'>39% off</span></p>
                                        <p className='text-muted'>{item.description.slice(0, 20)}</p>
                                        <h4>Available offers</h4>
                                        <p> <SiThurgauerkantonalbank className='text-success' /> Bank OfferGet ₹50 Instant Discount on first Flipkart UPI transaction on order of ₹200 and above <span className="text-primary">T&C</span></p>
                                        <p> <SiThurgauerkantonalbank className='text-success' /> Bank OfferGet ₹50 Instant Discount on first Flipkart UPI transaction on order of ₹200 and above <span className="text-primary">T&C</span></p>
                                        <p> <SiThurgauerkantonalbank className='text-success' /> Bank OfferGet ₹50 Instant Discount on first Flipkart UPI transaction on order of ₹200 and above <span className="text-primary">T&C</span></p>
                                        <p> <SiThurgauerkantonalbank className='text-success' /> Bank OfferGet ₹50 Instant Discount on first Flipkart UPI transaction on order of ₹200 and above <span className="text-primary">T&C</span></p>
                                    </div>
                                </div>
                            </div>

                        ))
                    )}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default Cart;
