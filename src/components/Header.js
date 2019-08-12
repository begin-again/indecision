import React from 'react';

const Header = (props) => {
  const template =
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
        ;
  return template;
};
Header.defaultProps = { title: 'Indecision' };

export default Header;
