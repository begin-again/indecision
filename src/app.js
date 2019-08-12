/* eslint-env node, browser */
/* global React, ReactDOM */

class IndecisionApp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      options: props.options
    };
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
  }

  componentDidMount () {
    try {
      console.log('componentDidMount, fetching data ...');
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);
      if (options) this.setState(() => ({ options }));
    } catch (error) {
      // utilise defaults
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      console.log('componentDidUpdate, saving data ...');
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }

  componentWillUnmount () {
    console.log('componentWillUnmount');
  }

  handleDeleteOptions () {
    this.setState(() => ({ options: [] }));
  }

  handleDeleteOption (optionText) {
    this.setState((prevState) => ({
      options: prevState.options.filter(option => option !== optionText)
    }));
  }

  handlePick () {
    const rndNum = Math.floor(Math.random() * this.state.options.length);
    console.log('handlePick', this.state.options[rndNum]);
    return this.state.options[rndNum];
  }

  handleAddOption (option) {
    if (!option) return 'Enter valid value to add';
    if (this.state.options.indexOf(option) > -1) return `this option alread exists`;
    this.setState((prevState) => ({ options: prevState.options.concat([option]) }));
  }

  render () {
    const subtitle = 'Put your life into the hands of a computer';
    const template =
      <div>
        <Header subtitle={subtitle} />
        <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick} />
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    ;
    return template;
  }
}

IndecisionApp.defaultProps = {
  options: []
};

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

const Action = (props) => {
  const template =
    <div>
      <button
        onClick={props.handlePick}
        disabled={!props.hasOptions}>What should I do?</button>
    </div>
    ;
  return template;
};

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

class AddOption extends React.Component {
  constructor (props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    };
  }

  handleAddOption (event) {
    event.preventDefault();
    const option = event.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);
    this.setState(() => ({ error }));
    if (!error) event.target.elements.option.value = '';
  }

  render () {
    const template =
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type='text' name='option' />
          <button>Add Option</button>
        </form>
      </div>
    ;
    return template;
  }
}

ReactDOM.render(<IndecisionApp options={['Do Nothing']} />, document.getElementById('app'));
