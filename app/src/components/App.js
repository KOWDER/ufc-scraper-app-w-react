import React, { Component } from 'react';
import { Route, Link, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as action from '../actions';

import AboutPage from './AboutPage';
import FighterPage from './FighterPage';
import NewsPage from './NewsPage';
import DocumentPage from './DocumentPage';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      inputBox: '',
      fighters: [],
      profile: [],
      news: [],
      doc: []
    }
  }
  
  // initial fetch from localhost:5000 that stores 
  // all the fighters and news on it endpoints from the UFC api
  componentDidMount() {
    fetch("/api/fighters")
      .then(res => res.json())
      .then(data => {
        this.setState({ fighters: data });
      })
      .catch(error => console.error('Error:', error));
    
    fetch("/api/news")
      .then(res => res.json())
      .then(articles => {
        this.setState({ news: articles });
      })
      .catch(error => console.error('Error:', error));
  }

  // handle user inputs into the searchbox and pass the value to the state in inputbox
  handleInputChange = (e) => {
    const val = e.target.value;

    this.setState({ inputBox: val });
  }

  // handle when the user search for a specific fighter
  handleFighterSearch = (e) => {
    e.preventDefault();

    const { fighters, inputBox } = this.state;

    // isolate the fighter by filtering the entire fighters Array in the state
    // find the fighter that corresponds to the inputBox value passed by the user
    let fighter = fighters.filter(el => {
      return `${el.firstName} ${el.lastName}`.toLowerCase() === inputBox.toLowerCase();
    });

    // if the fighter exists
    if (fighter.length > 0) {
      // set loading to true to trigger the Spinner component until data is fetched
      return this.setState({ loading: true }, () => {
        // in the callback fetch the data by passing the fighter's id as an endpoint to the url
        fetch(`/api/fighters/${fighter[0].id}`)
          .then(res => res.json())
          // when the data is fetched, set loading to false to end the Spinner component
          // update the state of fighting.profile with the fecthed data
          // clean the fighting.inputBox state
          .then(data => {
            this.setState({
              loading: false,
              profile: data,
              inputBox: ''
            });
          })
          .catch(error => console.error('Error:', error));
      }) 
    } else {
      // if no fighter matches the name typed by the user, display alert
      alert('Invalid Fighter Name.');
    }
  }

  // handle when the user clicks on a specific article on the news page
  handleNewsClick = (e) => {
    // each article is wrapped in an element that has its ID in the dataset of the wrapping element
    // actually 2 parent elements have it, the image, and the descritpion to avoid misclicks.
    let id = e.target.parentNode.dataset.id;
    
    // set loading to true to trigger Spinner component
    return this.setState({ loading: true }, () => {
      // pass the id of the article to the url of the fetch function
      fetch(`/api/news/${id}`)
        .then(res => res.json())
        .then(data => {
          // set loading to false to hide Spinner component since data was fetched
          // set the state of doc (which is the specific article) to the data
          this.setState({
            loading: false,
            doc: data
          });
        })
        .catch(error => console.error('Error:', error));
      })
  }

  // trigger the handleFighterSearch function when the 'Enter' key is pressed in the fighterPage component
  handleEnterPress = (e) => {
    if(e.charCode === 13) {
      this.handleFighterSearch(e);
    }
  }

  render() {
    const { loading, fighters, inputBox, profile, news, doc } = this.state;
    return (
      <div>
        <header>
          <nav>
            <ul>
              <Link className="header-homelink" to="/">UFCify</Link>
              <Link className="header-link" to="/">News</Link>
              <Link className="header-link" to="/fighter">Fighter</Link>
              <Link className="header-link" to="/about">About</Link>
            </ul> 
            <div className="header-link">ADD:{this.props.add}</div>
            <button onClick={this.props.onAdd}>add</button>
          </nav>
        </header>
        <Switch>
          <Route path="/about" render={() => <AboutPage />} />

          <Route 
            path="/fighter" 
            render={
              () => <FighterPage 
                loading={loading} 
                fighters={fighters}
                inputBox={inputBox}
                profile={profile}
                handleKeyPress={this.handleEnterPress} 
                handleChange={this.handleInputChange} 
                handleSearch={this.handleFighterSearch}
              />
            } 
          />
          
          <Route exact path="/" render={() => <NewsPage data={news} handleClick={this.handleNewsClick}/>} />

          <Route path="/article" render={() => <DocumentPage loading={loading} data={doc}/>} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    add: state.add
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd: () => dispatch(action.addUp(1))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));