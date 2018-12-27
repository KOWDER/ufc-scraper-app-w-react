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
    this.props.newsFetching()
    this.props.fightersFetching()
  }

  // handle user inputs into the searchbox and pass the value to the state in inputbox
  handleInputChange = (e) => {
    this.props.changeInputValue(e.target.value)
  }

  // handle when the user search for a specific fighter
  handleFighterSearch = (e) => {
    e.preventDefault();

    const { fighters, inputBox } = this.props;

    // isolate the fighter by filtering the entire fighters Array in the state
    // find the fighter that corresponds to the inputBox value passed by the user
    let fighter = fighters.filter(el => {
      return `${el.firstName} ${el.lastName}`.toLowerCase() === inputBox.toLowerCase();
    });

    // if the fighter exists
    if (fighter.length > 0) {
      let id = fighter[0].id;
      this.props.profileFetching(id)
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
    this.props.articleFetching(id)
  }

  // trigger the handleFighterSearch function when the 'Enter' key is pressed in the fighterPage component
  handleEnterPress = (e) => {
    if(e.charCode === 13) {
      this.handleFighterSearch(e);
    }
  }

  render() {

    const { 
      loading, 
      fighters, 
      inputBox, 
      profile, 
      news, 
      doc,
    } = this.props;

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
          
          <Route 
            exact path="/" 
            render={
              () => <NewsPage 
                news={news} 
                handleClick={this.handleNewsClick} 
                loading={loading}
              />
            } 
          />

          <Route 
            path="/article" 
            render={
              () => <DocumentPage 
                loading={loading} 
                data={doc}
              />
            } 
          />

        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  fighters: state.fighters,
  news: state.news,
  profile: state.profile,
  inputBox: state.inputBox,
  doc: state.doc,
})

const mapDispatchToProps = (dispatch) => {
  return {
    fightersFetching: () => dispatch(action.fetchFighters()),
    newsFetching: () => dispatch(action.fetchNews()),
    changeInputValue: (e) => dispatch(action.inputBoxChange(e)),
    profileFetching: (id) => dispatch(action.fetchFighter(id)),
    articleFetching: (id) => dispatch(action.fetchArticle(id)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
