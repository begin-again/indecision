import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) => (
  <Modal
    isOpen={Boolean(props.selectedOption)}
    contentLabel='Selected Option'
    ariaHideApp={false}
    handleClearOption={props.handleClearOption}
    onRequestClose={props.handleClearSelectedOption}
  >
    <h3>Selected Option</h3>
    {props.selectedOption && <p>{props.selectedOption}</p>}
    <button onClick={props.handleClearSelectedOption}>OK</button>
  </Modal>
);

export default OptionModal;
