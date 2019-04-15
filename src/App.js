import React, { Component } from 'react';
import './App.css';
import { access } from 'fs';

class App extends Component {

  constructor(props) {
    super(props);
    // check if fresh session or redirected back after authentication
    var access_token = '';
    var url = window.location.href;
    var urlParts = url.split('?');
    urlParts.forEach(part => {
      var data = urlParts.split('=');
      if (data[0] == 'access_token') {
        access_token = data[1];
      }
    });
    this.state = {
      fresh: true,
      access_token: access_token
    };
  }

  componentDidMount() {
    if (this.state.fresh) {
      var redirect_url = 'https://brave-raman-0a161b.netlify.com/?haveaccesstoken';
      window.location.href = 'https://api.instagram.com/oauth/authorize/?client_id=7c118ddc9c8e42f9bb7983cbfa2049d3&redirect_uri='+encodeURI(redirect_url)+'&response_type=token';
    } else {
      fetch(`https://api.instagram.com/v1/self/media/recent?access_token=${this.state.access_token}`)
      .then(res => res.json())
      .then(res => {
        console.log('data received');
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
