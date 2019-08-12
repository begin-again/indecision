/* eslint-env node, browser */
/* global React, ReactDOM */

console.info('app.js is running');

var app = {
  title: 'Indecision App',
  subtitle: 'Put you life in the hands of a computer',
  options: []
};

const onFormSubmit = (event) => {
  event.preventDefault();
  const option = event.target.elements.option.value;
  if (option) {
    app.options.push(option);
    event.target.elements.option.value = '';
    reRender();
  }
};

const removeAll = () => {
  app.options = [];
  reRender();
};

const onMakeDecision = () => {
  const rndNum = Math.floor(Math.random() * app.options.length);
  const option = app.options[rndNum];
  alert(option);
};

const appRoot = document.getElementById('app');
const reRender = () => {
  const template =
    <div>
      <h1>{app.title}</h1>
      {app.subtitle && <p>{app.subtitle}</p>}
      <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
      <button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
      <button onClick={removeAll}>Remove All</button>
      <ol>
        {
          app.options.map((n, i) => <li key={i}>{n}</li>)
        }
      </ol>
      <form onSubmit={onFormSubmit}>
        <input type='text' name='option' />
        <button>Add Option</button>

      </form>
    </div>
    ;

  ReactDOM.render(template, appRoot);
};

reRender();
