import React, { useState, useEffect } from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/')
      .then((res) => res.json())
      .then((data) => this.setState({ title: data.title }));
  }

  render() {
    return (
      <div className="App">
        <a href="http://localhost:3001/api/kakao">
          <text>로그인</text>
        </a>
      </div>
    );
  }
}

export default App;
