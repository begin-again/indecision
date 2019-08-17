import React from 'react';

const Header = (props) => {
  const template =
    <div className='header'>
      <div className='container'>
        <h1 className='header__title'>{props.title}</h1>
        {props.subtitle && <h2 className='header__subtitle'>{props.subtitle}</h2>}
      </div>
    </div>
        ;
  return template;
};
Header.defaultProps = { title: 'Indecision' };

export default Header;
