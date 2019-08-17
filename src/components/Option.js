
import React from 'react';

const Option = (props) => {
  const template =
    <div
      className='option'
      key={props.optionKey}
    >
      <p className='option__text'>{props.count}. {props.option}</p>
      <button
        className='button button--link'
        onClick={() => {
          props.handleDeleteOption(props.option);
        }}
      >
        remove
      </button>
    </div>
        ;
  return template;
};

export default Option;
