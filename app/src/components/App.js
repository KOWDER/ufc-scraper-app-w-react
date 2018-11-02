import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import AboutPage from './AboutPage';
import FighterPage from './FighterPage';
import NewsPage from './NewsPage';
import DocumentPage from './DocumentPage';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      fighting: {
        inputBox: '',
        fighters: [],
        profile: []
      },
      news: [],
      doc: []
    }
  }

  componentDidMount() {
    fetch("/fighters")
      .then(res => res.json())
      .then(data => {
        this.setState(prevState => ({
          fighting: {
            ...prevState.fighting,
            fighters: data
          }
        }));
      })
      .catch(error => console.error('Error:', error));
    
    fetch("/news")
      .then(res => res.json())
      .then(articles => {
        this.setState({
          news: articles
        });
      })
      .catch(error => console.error('Error:', error));
  }

  handleInputChange = (e) => {
    const val = e.target.value;

    this.setState(prevstate => ({
      fighting: {
        ...prevstate.fighting,
        inputBox: val
      }
    }));
  }

  handleFighterSearch = (e) => {
    e.preventDefault();

    const { fighting } = this.state;

    let fighter = fighting.fighters.filter(fighter => {
      return `${fighter.firstName} ${fighter.lastName}`.toLowerCase() === fighting.inputBox.toLowerCase();
    });

    if (fighter.length > 0) {
      return this.setState({ loading: true }, () => {
        fetch(`/fighters/${fighter[0].id}`)
          .then(res => res.json())
          .then(data => {
            this.setState(prevstate => ({
              loading: false,
              fighting: {
                ...prevstate.fighting,
                profile: data,
                inputBox: ''
              }
            }));
          })
          .catch(error => console.error('Error:', error));
      }) 
    } else {
      alert('Invalid Fighter Name.');
    }
  }

  handleNewsClick = (e) => {
    let id = e.target.parentNode.dataset.id;
    
    return this.setState({ loading: true }, () => {
      fetch(`/news/${id}`)
        .then(res => res.json())
        .then(data => {
          this.setState({
            loading: false,
            doc: data
          });
        })
        .catch(error => console.error('Error:', error));
      })
  }

  handleEnterPress = (e) => {
    if(e.charCode === 13) {
      this.handleFighterSearch(e);
    }
  }

  render() {
    const { loading, fighting, news, doc } = this.state;
    return (
      <div>
        <header>
          <nav>
            <ul>
              <Link className="header-homelink" to="/">UFCify</Link>
              <Link className="header-link" to="/fighter">Fighter</Link>
              <Link className="header-link" to="/about">About</Link>
            </ul> 
          </nav>
        </header>
        <Switch>
          <Route path="/about" render={() => <AboutPage />} />
          <Route path="/fighter" render={() => <FighterPage loading={loading} data={fighting} handleKeyPress={this.handleEnterPress} handleChange={this.handleInputChange} handleSearch={this.handleFighterSearch}/>} />
          <Route exact path="/" render={() => <NewsPage data={news} handleClick={this.handleNewsClick}/>} />
          <Route path="/article" render={() => <DocumentPage loading={loading} data={doc}/>} />
        </Switch>
      </div>
    )
  }
}

export default App;