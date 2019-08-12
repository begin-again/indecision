/* eslint-env commonjs, browser */

import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Action from './Action';
import Header from './Header';

export default class IndecisionApp extends React.Component {
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
