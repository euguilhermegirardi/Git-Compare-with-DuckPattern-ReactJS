import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'; 
import { bindActionCreators } from 'redux';
import { Creators as FavoriteActions } from '../../store/ducks/ducks-favorites';
import PropTypes from 'prop-types';

class Main extends Component{

  static propTypes = {
    addFavoriteRequest: PropTypes.func.isRequired,
    favorites: PropTypes.shape({
      loading: PropTypes.bool,
      data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
        url: PropTypes.string,
      })),
      error: PropTypes.string,
    }).isRequired,
  };

  state = {
    repositoryInput: "",
  };

  handleAddRepository = (event) => {
    event.preventDefault();

    this.props.addFavoriteRequest(this.state.repositoryInput);

    this.setState({ repository: ''});
  };

  render() {
    return (
      <Fragment> 
        <form onSubmit={this.handleAddRepository}>
          <input 
          placeholder="User/Repository"
          value={this.state.repositoryInput}
          onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">Add</button>
          { this.props.favorites.loading && <span>  Loading...</span>} 
          {!!this.props.favorites.error && ( 
            <span style={{ color:'#F00' }}>{this.props.favorites.error}</span>
          )}
        </form>
        <ul>
          {this.props.favorites.data.map(favorite=>( 
            <li key={favorite.id}>
              <p>
              <strong>{favorite.name}</strong> ({favorite.description})  
              </p>
              <a href={favorite.url}>Access</a>
            </li>
          ))}
        </ul>
      </Fragment>
    )
  }
};

const mapStateToProps = state => ({
  favorites: state.favorites,
});

const mapDispatchToProps = dispatch => bindActionCreators(FavoriteActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
