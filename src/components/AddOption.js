import React from 'react';

export default class AddOption extends React.Component {
  // eslint-disable-next-line
  state = {error: undefined};

  handleAddOption = (event) => {
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
