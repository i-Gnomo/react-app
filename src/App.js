import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

// import Layout from './views/Layout';
import Home from './views/Home';
import NewCar from './views/NewCar';
import NewcarInfo from './views/NewcarInfo';
import News from './views/News';
import NewsDetail from './views/NewsDetail';
import Actives from './views/Actives';
import BrandList from './views/BrandList';
import FilterList from './views/FilterList';
import Compare from './views/Compare';

class App extends Component {

  componentWillUpdate(){
    console.log('componentWillUpdate');
  }
  componentDidUpdate(){
    console.log('componentDidUpdate');
  }

  render() {
    console.log(this);
    return (
        <Router>
          <div className="App">
            <Route path="/" exact component={Home} />
            <Route path="/home/" component={Home} />
            <Route path="/newcar/" component={NewCar} />
            <Route path="/newcarinfo/:carid" component={NewcarInfo} />
            <Route path="/news/" component={News} />
            <Route path="/newsdetail/:id" component={NewsDetail} />
            <Route path="/actives/" component={Actives} />
            <Route path="/brand/" component={BrandList} />
            <Route path="/filter/" component={FilterList} />
            <Route path="/compare/:ids" component={Compare} />
          </div>
        </Router>
    );
  }
}

export default App;