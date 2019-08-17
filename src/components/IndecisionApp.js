import React from 'react';
import OptionModal from './OptionModal';
import AddOption from './AddOption';
import Options from './Options';
import Action from './Action';
import Header from './Header';

export default class IndecisionApp extends React.Component {
  state = {
    options: [],
    selectedOption: undefined
  };

  handleCloseSelectedOption = () => {
    this.setState(() => ({
      selectedOption: undefined
    }))
  }

  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }));
  };

  handleDeleteOption = (optionText) =>  {
    this.setState((prevState) => ({
      options: prevState.options.filter(option => option !== optionText)
    }));
  }

  handleClearSelectedOption = () => {
    this.setState(() => ({
      selectedOption:  undefined
    }))
  }

  handlePick = () => {
    const rndNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[rndNum];
    this.setState(() => ({
      selectedOption: option
    }))
  }

  handleAddOption = (option) => {
    if (!option) return 'Enter valid value to add';
    if (this.state.options.indexOf(option) > -1) return `this option alread exists`;
    this.setState((prevState) => ({ options: prevState.options.concat([option]) }));
  }

  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);
      if (options) this.setState(() => ({ options }));
    } catch (error) {
      // utilise defaults
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  render () {
    const subtitle = 'Put your life into the hands of a computer';
    const template =
      <div>
        <Header subtitle={subtitle} />
        <div className="container">
          <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick} />
          <div className="widget">
            <Options
              options={this.state.options}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption handleAddOption={this.handleAddOption} />
          </div>
        </div>
        <OptionModal 
          selectedOption={this.state.selectedOption} 
          handleClearSelectedOption={this.handleClearSelectedOption} 
        />
      </div>
            ;
    return template;
  }
}

IndecisionApp.defaultProps = {
  options: []
};
