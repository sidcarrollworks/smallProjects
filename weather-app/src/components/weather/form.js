import React, { Component } from 'react';

class Form extends Component {

    render() {
        return (
            <form onSubmit={this.props.getWeather}>
                <input onChange={this.props.valChange} value={this.props.cVal} type="text" name="city" placeholder="City..."/>
                <input onChange={this.props.valCChange} value={this.props.ccVal} type="text" name="country" placeholder="Country..."/>
                <button>Get Weather</button>
            </form>
        );
    }
};

export default Form
