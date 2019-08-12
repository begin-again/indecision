
import React from 'react';

const Option = (props) => {
  const template =
    <li
      key={props.optionKey}>{props.option}
      <button onClick={() => {
        props.handleDeleteOption(props.option);
      }}>remove</button>
    </li>
        ;
  return template;
};

export default Option;
