import React from 'react';

const Container = ({ children }) => {
  return (
    <div className="container-box">
      <div className="custom-container">{children}</div>
    </div>
  );
};

export default Container;
