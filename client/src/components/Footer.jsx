import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <div className="section" id="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-3 col-sm-12">
              <div className="footer-site-logo">Blog App</div>
              <div className="footer-about text-left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 col-sm-12">
              <h5>Quick Links</h5>
              <div className="items">
                <div>Item 1</div>
                <div>Item 2</div>
                <div>Item 3</div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 col-sm-12">
              <h5>Legal Stuff</h5>
              <div className="items">
                <div>Item 1</div>
                <div>Item 2</div>
                <div>Item 3</div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 col-sm-12">
              <h5>Social Media</h5>
              <div className="items">
                <div>Item 1</div>
                <div>Item 2</div>
                <div>Item 3</div>
              </div>
            </div>
          </div>
          
        </div>
        <div className="text-center row-2">
            <div>© 2023 Blog App. All rights reserved. Developed by <a href="#">Jahangir Naseer</a></div>
          </div>
      </div>
    </>
  );
};

export default Footer;
