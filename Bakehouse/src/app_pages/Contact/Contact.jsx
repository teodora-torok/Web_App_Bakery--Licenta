import React from 'react';
import { Media } from '../../assets/assets';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact3 py-5">
      <div className="row no-gutters">
        <div className="container">
          <div className="row">
            {/* Image section */}
            <div className="col-lg-6">
              <div className="card-shadow">
                <img
                  src={Media.bakery_logo}
                  className="img-fluid"
                  alt="Contact"
                />
              </div>
            </div>

            {/* Contact Info section */}
            <div className="col-lg-6">
              <div className="contact-box">
                <h1 className="font-weight mt-2 mb-4">Contact Us</h1>
                <div className="row">
                  {/* Address */}
                  <div className="col-lg-12 mb-4 d-flex align-items-center">
                    <div className="mr-3">
                      <img src={Media.location} alt="Location Icon" />
                    </div>
                    <div>
                      <p className="mb-0">Piața Unirii nr.10<br />Timișoara</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="col-lg-12 mb-4 d-flex align-items-center">
                    <div className="mr-3">
                      <img src={Media.phone} alt="Phone Icon" />
                    </div>
                    <div>
                      <p className="mb-0">+40 756 572 165<br />0256 211 000</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="col-lg-12 mb-4 d-flex align-items-center">
                    <div className="mr-3">
                      <img src={Media.mail} alt="Email Icon" />
                    </div>
                    <div>
                      <p className="mb-0">urban_bakehouse@gmail.com<br />urban_bakehouse@yahoo.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div> 
    </div>
  );
};

export default Contact;
