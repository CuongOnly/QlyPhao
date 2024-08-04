import React from 'react';
import "./ErrorPage.css";
import { Button } from 'antd';

const ErrorPage = () => {

  const handleBack = (event) => {
    event.preventDefault();
    window.location.reload();
  };

  return (
    <section className="page_404">
      <div className="container">
        <div className="four_zero_four_bg">
          <h1 className="text-center">404</h1>
        </div>
        <div className="contant_box_404">
          <h3 className="h2" style={{fontSize:"24px"}}>Hình như có sự cố ở đây !!! </h3>
          <Button type="primary" onClick={handleBack} >Tải lại trang</Button>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
