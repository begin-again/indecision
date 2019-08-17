
import React from 'react';
import Option from './Option';

const Options = (props) => {
  const template =
    <div>
      <div className='widget-header'>
        <h3 className='widget-header__title'>Your Options</h3>
        <button
          className='button button--link'
          onClick={props.handleDeleteOptions}>
        Remove All
        </button>
      </div>
      {props.options.length === 0 && <p className='widget__message'>Please add an option to get started</p>}
      <ol>
        {
          props.options.map((option, i) => (
            <Option
              key={option}
              option={option}
              count={i + 1}
              handleDeleteOption={props.handleDeleteOption}
            />
          ))
        }
      </ol>
    </div>
        ;
  return template;
};

export default Options;
