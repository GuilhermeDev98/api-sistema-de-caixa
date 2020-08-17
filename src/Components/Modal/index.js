import React from "react";

import "./modal.css";

const Modal = ({ open, Component }) => {
  return (
    <div
      className={`swal-overlay ${open ? "swal-overlay--show-modal" : null}`}
      tabindex="-1"
    >
      <div class="swal-modal" role="dialog" aria-modal="true">
        <div class="swal-icon swal-icon--error">
          <div class="swal-icon--error__x-mark">
            <span class="swal-icon--error__line swal-icon--error__line--left"></span>
            <span class="swal-icon--error__line swal-icon--error__line--right"></span>
          </div>
        </div>
        <div class="swal-content">
          <div class="text-center">
            <strong>
              Não é possivel finalizar a venda sem nenhum produto!
            </strong>
          </div>
        </div>
        <div class="swal-footer">
          <div class="swal-button-container">
            <button class="swal-button swal-button--confirm">OK</button>

            <div class="swal-button__loader">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
