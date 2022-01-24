import React, { useState, useEffect } from "react";
//const [loginData, setLoginData] = useState('');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      loginData: null,
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/api/")
      .then((res) => res.json())
      .then((data) => this.setState({ title: data.title }));
    // fetch("http://localhost:3001/api/kakao/callback")
    //   .then((res) => res.json())
    //   .then((data) => this.setState({ loginData: data }));
  }

  render() {
    return (
      <div className="App">
        <a href="http://localhost:3001/api/kakao">
          <text>로그인</text>
        </a>
        {/* {this.loginData ? (
          <text>{this.loginData}</text>
        ) : (
          <text>로그인한 상태 아님</text>
        )} */}
      </div>
    );
  }
}

export default App;
