import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) => (
  <Modal
    isOpen={Boolean(props.selectedOption)}
    contentLabel='Selected Option'
    ariaHideApp={false}
    handleClearOption={props.handleClearOption}
    onRequestClose={props.handleClearSelectedOption}
    closeTimeoutMS={200}
    className='modal'
  >
    <h3 className='modal__title'>Selected Option</h3>
    {props.selectedOption && <p className='modal__body'>{props.selectedOption}</p>}
    <button
      className='button'
      onClick={props.handleClearSelectedOption}
    >
      OK
    </button>
  </Modal>
);

export default OptionModal;
