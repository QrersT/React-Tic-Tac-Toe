import React from "react";

const Modal = () => {
  setTimeout(() => {
    const modal = document.querySelector(".modal");
    document.addEventListener("click", (e) => {
      e.target.classList.remove("._modal-active");
      modal.querySelector(".modal__content").classList.remove("_modal-content-active");
    });
  }, 100);
  return (
    <div className="modal">
      <div className="modal__content">
        <h2 className="modal__title"></h2>
        <button
          onClick={() => {
            document.querySelector(".modal").classList.remove("_modal-active");
          }}
          className="modal__btn-close">
          Ok
        </button>
      </div>
    </div>
  );
};

export default Modal;
