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
  }
  handleDeleteOptions () {
    this.setState(() => { return { options: [] }; });
  }

  handlePick () {
    const rndNum = Math.floor(Math.random() * this.state.options.length);
    console.log('handlePick', this.state.options[rndNum]);
    return this.state.options[rndNum];
  }

  handleAddOption (option) {
    if (!option) return 'Enter valid value to add';
    if (this.state.options.indexOf(option) > -1) return `this option alread exists`;
    this.setState((prevState) => {
      return {
        // use concat to prevent having to modify prevState
        options: prevState.options.concat([option])
      };
    });
  }

  render () {
    const subtitle = 'Put your life into the hands of a computer';
    const template =
      <div>
        <Header subtitle={subtitle} />
        <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick} />
        <Options options={this.state.options} handleDeleteOptions={this.handleDeleteOptions} />
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
      <ol>
        {
          props.options.map((n) => <Option key={n} option={n} />)
        }
      </ol>
    </div>
    ;
  return template;
};

const Option = (props) => {
  const template =
    <li key={props.optionKey}>{props.option}</li>
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
    this.setState(() => {
      return { error };
    });
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
