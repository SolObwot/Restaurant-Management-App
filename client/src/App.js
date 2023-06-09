import React, { Component } from 'react';
import logo from './logo.svg';
import './index.css'
import './App.css';
import { Route, Routes } from 'react-router-dom';
import ListRestuarant from './components/ListRestuarant';

class App extends Component {
  state = {
      data: null
    };
  
    componentDidMount() {
      this.callBackendAPI()
        .then(res => this.setState({ data: res.express }))
        .catch(err => console.log(err));
    }
      // fetching the GET route from the Express server which matches the GET route from server.js
    callBackendAPI = async () => {
      const response = await fetch('/api');
      const body = await response.json();
  
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body;
    };
  
    render() {
      return (

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<ListRestuarant />} />
          </Routes>
        </div>
      );
    }
  }

export default App;
