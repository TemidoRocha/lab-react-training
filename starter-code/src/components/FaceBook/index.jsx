import React, { Component } from 'react';
import profiles from './../../data/berlin.json';
import './style.scss';

export default class FaceBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backBlueAll: false,
      filterText: ''
    };
    this.backBlueAll = this.backBlueAll.bind(this);
    this.handleCountryKey = this.handleCountryKey.bind(this);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }
  backBlueAll() {
    profiles
      .reduce(
        (unique, item) => (unique.includes(item.country) ? unique : [...unique, item.country]),
        []
      )
      .map((country, i) =>
        this.setState({
          backBlueAll: !this.state.backBlueAll,
          [country]: this.state.backBlueAll
        })
      );
    console.log(this.state);
  }

  handleCountryKey(country) {
    console.log(country, this.state);
    if (this.state.backBlueAll) {
      return this.setState({
        [country]: !this.state[country]
      });
    } else {
      return this.setState({
        backBlueAll: true,
        [country]: !this.state[country]
      });
    }
  }

  handleFilterTextChange(e) {
    this.setState({
      filterText: e.target.value
    });
  }

  render() {
    return (
      <div>
        <div className="profileButtons">
          <input
            className="inputSearch"
            type="search"
            placeholder="search by first or last name..."
            value={this.state.filterText}
            onChange={this.handleFilterTextChange}
            name="firstNameSearch"
          />
          <button onClick={this.backBlueAll}>All</button>
          {profiles
            .reduce(
              (unique, item) =>
                unique.includes(item.country) ? unique : [...unique, item.country],
              []
            )
            .map((country, i) => (
              <button key={country} onClick={() => this.handleCountryKey(country)}>
                {country}
              </button>
            ))}
        </div>
        {profiles
          .filter(
            filtered =>
              filtered.firstName.toLowerCase().includes(this.state.filterText.toLowerCase()) ||
              filtered.lastName.toLowerCase().includes(this.state.filterText.toLowerCase())
          )
          .map((singleProfile, i) => (
            <div
              className="profile"
              key={i}
              style={this.state[singleProfile.country] ? { backgroundColor: 'lightblue' } : {}}
            >
              <img src={singleProfile.img} alt={singleProfile.firstName} />
              <div className="notes">
                <h3>
                  <strong>First Name: </strong>
                  {singleProfile.firstName}
                </h3>
                <h3>
                  <strong>Last Name: </strong>
                  {singleProfile.lastName}
                </h3>
                <h3>
                  <strong>Country: </strong>
                  {singleProfile.country}
                </h3>
                <h3>
                  <strong>Type: </strong>
                  {singleProfile.isStudent ? 'Student' : 'Teacher'}
                </h3>
              </div>
            </div>
          ))}
      </div>
    );
  }
}
