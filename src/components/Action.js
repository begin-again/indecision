import React from 'react';

const Action = (props) => {
  const template =
    <div>
      <button
        className='big-button'
        onClick={props.handlePick}
        disabled={!props.hasOptions}>What should I do?
      </button>
    </div>
        ;
  return template;
};

export default Action;
