/* eslint-env node, browser */
/* global React, ReactDOM */

class IndecisionApp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      options: []
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
    const title = 'Indecision App';
    const subtitle = 'Put your life into the hands of a computer';
    const template =
      <div>
        <Header title={title} subtitle={subtitle} />
        <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick} />
        <Options options={this.state.options} handleDeleteOptions={this.handleDeleteOptions} />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    ;
    return template;
  }
}

class Header extends React.Component {
  render () {
    const template =
      <div>
        <h1>{this.props.title}</h1>
        <p>{this.props.subtitle}</p>
      </div>
    ;
    return template;
  }
}

class Action extends React.Component {
  render () {
    const template =
      <div>
        <button
          onClick={this.props.handlePick}
          disabled={!this.props.hasOptions}>What should I do?</button>
      </div>
    ;
    return template;
  }
}

class Options extends React.Component {
  render () {
    const template =
      <div>
        <button onClick={this.props.handleDeleteOptions}>Remove All</button>
        <ol>
          {
            this.props.options.map((n) => <Option key={n} option={n} />)
          }
        </ol>
      </div>
    ;
    return template;
  }
}

class Option extends React.Component {
  render () {
    const template =
      <li key={this.props.optionKey}>{this.props.option}</li>
    ;
    return template;
  }
}

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

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
