import React, { Component } from 'react';
import Form from "./form"
import Weather from "./weather"

export default class extends Component {

    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        displayMsg: undefined,
        cityVal: "",
        countryVal: "",
        API_KEY: "ee0f018e4ec05e39dd89371d32f75606"
      }

    
      getWeather = async (e) => {
        e.preventDefault();

        let resetWeather = {
            temperature: undefined,
            city: undefined,
            country: undefined,
            humidity: undefined,
            description: undefined,
            displayMsg: undefined
        };

        let resetVals = {
            cityVal: "",
            countryVal: ""
        };

        if (this.state.cityVal == "" || this.state.countryVal ==  ""){
            let tmpMsg = "The following fields are empty:";

            if (this.state.cityVal == "" && this.state.countryVal == "")
                tmpMsg += " City and Country";
            else {
                if (this.state.cityVal == "")
                    tmpMsg += " City";
                else if (this.state.countryVal == "")
                    tmpMsg += " Country";
            }
            this.setState({
                ...resetWeather,
                ...resetVals,
                displayMsg: tmpMsg
            });
            return;

        }

        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.cityVal},${this.state.countryVal}&appid=${this.state.API_KEY}&units=metric`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.cod === "404") {
                    this.setState({
                        ...resetWeather,
                        ...resetVals,
                        displayMsg: "THAT PLACE DONT EXIST"
                    });
                } else {
                    this.setState({
                        temperature: data.main.temp,
                        city: data.name,
                        country: data.sys.country,
                        humidity: data.main.humidity,
                        description: data.weather[0].description,
                        ...resetVals,
                        displayMsg: ""
                    });
                }
                return;

            })
            .catch((err) => {
                console.log(err)
                this.setState({
                    ...resetWeather,
                    ...resetVals,
                    displayMsg: "There has been an error!"
                });
            });

        this.setState({
            ...resetWeather,
            displayMsg: "Loading....dont be a dick and wait"
        });
      };

    cityChange = async (e) => {
        e.preventDefault();
        if (e.target.value.length < 69)
            this.setState({cityVal: e.target.value});
    };
    
    countryChange = async (e) => {
        e.preventDefault();
        if (e.target.value.length < 69)
            this.setState({countryVal: e.target.value});
    };

    render() {
        return (
            <div>
                <Form getWeather={this.getWeather} cVal={this.state.cityVal} ccVal={this.state.countryVal} valCChange={this.countryChange} valChange={this.cityChange} />
                <Weather 
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    displayMsg={this.state.displayMsg}
                />
            </div>
        );
    }
};
