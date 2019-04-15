import React, { Component } from 'react';
import './App.css';
import { access } from 'fs';

class App extends Component {

  constructor(props) {
    super(props);
    // check if fresh session or redirected back after authentication
    var code = '';
    var access_token = null;
    var url = window.location.href;
    var urlParts = url.split('?');
    urlParts.forEach(part => {
      var data = part.split('=');
      if (data[0] === 'access_token') {
        access_token = data[1];
      } else if (data[0] === 'code') {
        code = data[1];
      }
    });
    this.state = {
      code: code,
      access_token: access_token
    };
  }

  componentDidMount() {
    if (!this.state.code && !this.state.access_token) {
      var code_redirect_url = encodeURI(`https://brave-raman-0a161b.netlify.com/?havecode`);
      window.location.href = `https://api.instagram.com/oauth/authorize/?client_id=7c118ddc9c8e42f9bb7983cbfa2049d3&redirect_uri=${code_redirect_url}&response_type=code`;
    } else if (!this.state.access_token) {
      var at_redirect_url = encodeURI(`https://brave-raman-0a161b.netlify.com/?got_access_token`);
      fetch(`https://api.instagram.com/oauth/access_token`, {
        method: 'post',
        body: JSON.stringify({
          client_id: '7c118ddc9c8e42f9bb7983cbfa2049d3',
          client_secret: '14046b027f2f48c38ef5c7e59a6e724a',
          grant_type: 'authorization_code',
          redirect_uri: at_redirect_url,
          code: this.state.code
        })
      })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({
          access_token: res.access_token
        });
      });
    } else {
      // fetch(`https://api.instagram.com/v1/self/media/recent?access_token=${this.state.access_token}`)
      fetch(`https://api.instagram.com/v1/users/self/?access_token=${this.state.access_token}`)
      .then(res => res.json())
      .then(res => {
        console.log('final');
        console.log(res);
      });
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Testing</h1>
      </div>
    );
  }
}

export default App;
