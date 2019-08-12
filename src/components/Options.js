
import React from 'react';
import Option from './Option';

const Options = (props) => {
  const template =
    <div>
      <button onClick={props.handleDeleteOptions}>Remove All</button>
      {props.options.length === 0 && <p>Please add an option to get started</p>}
      <ol>
        {
          props.options.map((n) => (
            <Option
              key={n}
              option={n}
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
