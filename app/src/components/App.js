import React, { Component } from 'react';
import { Route, NavLink, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as action from '../actions';

import AboutPage from './AboutPage';
import FighterPage from './FighterPage';
import NewsPage from './NewsPage';
import DocumentPage from './DocumentPage';

class App extends Component {

  
  // initial fetch from localhost:5000 that stores 
  // all the fighters and news on it endpoints from the UFC api
  componentDidMount() {
    this.props.fetchNews()
    this.props.fetchFighters()
  }

  // handle user inputs into the searchbox and pass the value to the state in inputbox
  handleInputChange = (e) => {
    this.props.inputBoxChange(e.target.value)
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
      this.props.fetchFighter(id)
    } else {
      // if no fighter matches the name typed by the user, display alert
      alert('Invalid Fighter Name.');
    }
  }

  // handle when the user clicks on a specific article on the news page
  handleNewsClick = (e) => {
    // each article is wrapped in an element that has its ID in the dataset of the wrapping element
    // actually 2 elements have it, the image, and the descritpion, to make the entire element responsive to the click.
    let id = e.target.parentNode.dataset.id;
    this.props.fetchArticle(id)
  }

  // trigger the handleFighterSearch function when the 'Enter' key is pressed in the fighterPage component (better UX)
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
              <NavLink className="header-homelink" to="/">UFCify</NavLink>
              <NavLink exact className="header-link" to="/" activeStyle={{fontWeight: "bold",color: "red"}}>News</NavLink>
              <NavLink className="header-link" to="/fighter" activeStyle={{fontWeight: "bold",color: "red"}}>Fighter</NavLink>
              <NavLink className="header-link" to="/about" activeStyle={{fontWeight: "bold",color: "red"}}>About</NavLink>
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
    fetchFighters: () => dispatch(action.fetchFighters()),
    fetchNews: () => dispatch(action.fetchNews()),
    inputBoxChange: (e) => dispatch(action.inputBoxChange(e)),
    fetchFighter: (id) => dispatch(action.fetchFighter(id)),
    fetchArticle: (id) => dispatch(action.fetchArticle(id)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
