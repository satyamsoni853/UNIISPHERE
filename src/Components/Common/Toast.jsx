import React from 'react';
import { Toast as BootstrapToast } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Toast = ({ show, onClose, message, type = 'success', delay = 3000 }) => {
  const bgClass = {
    success: 'success',
    error: 'danger',
    warning: 'warning',
    info: 'info'
  }[type] || 'success';

  return (
    <div
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 9999
      }}
    >
      <BootstrapToast
        show={show}
        onClose={onClose}
        delay={delay}
        autohide
        bg={bgClass}
        className="text-white"
      >
        <BootstrapToast.Body>{message}</BootstrapToast.Body>
      </BootstrapToast>
    </div>
  );
};

export default Toast; 