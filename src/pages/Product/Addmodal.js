import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import '../../style/Product.css'; // Import the custom CSS
import { FaCartShopping } from 'react-icons/fa6';
import config from '../../config';

const AddModal = ({ show, handleClose, products }) => {
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
            products.map((item,i) => (
             

              
              <div key={i} className="card bg-white rounded-3 shadow text-center p-3" style={{ height: '200px',width:'200px' }}>
                <div className="card-body  py-1">
                <img
                  src={`${config.IMAGE_URL}${item.image}`}
                  // src={'../../../upload/AdobeStock_229428578-ide-fish.jpg'}
                  className="object-fit-cover"
                  style={{  height: "50px" }}
                />
                  <h6>{item.name}</h6>
                  <p>{item.price}$</p>
                  <p>{item.description.slice(0, 20)}</p>
                    <button className="btn bg-none text-white" >Add</button>
                   
                </div>
              </div>
       
            ))
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default AddModal;
