import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'; // Connects to the Redux state (ducks/index-reducers).
import { bindActionCreators } from 'redux'; // To set all the actions FROM the Component.
import { Creators as FavoriteActions } from '../../store/ducks/ducks-favorites'; // Connects all actions TO THE Component.
import PropTypes from 'prop-types';

class Main extends Component{

// The "Component" call some action from the Redux, this action returns one "type", the "reducer" listen to this type...
// ...and do something.


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
    repositoryInput: "", // The text that is typed in the Input form (necessary to add more itens).
  };

  handleAddRepository = (event) => {
    event.preventDefault();
    //e.preventDefault just to prevent the page to load (the page won't load when you submit the new information).

    this.props.addFavoriteRequest(this.state.repositoryInput);
    // As we imported "bindActionCreators" and passed "FavoriteActions" we can use "addFavoriteRequest" to set the actions.

    this.setState({ repository: ''});
  };

  render() {
    return (
      <Fragment> 

        <form onSubmit={this.handleAddRepository}
        // onSubmit = {this.handleAddRepository} access the function.
        // handleAddRepository will call the function "addFavoriteRequest".
        // this.setState will search the repository in the API.
        // this.props.addFavoriteRequest 
        >
          <input 
          placeholder="User/Repository"

          value={this.state.repositoryInput}
          // value will put the text in the state of the component.

          onChange={e => this.setState({ repositoryInput: e.target.value })}
          // onChange is a function that is called everytime when the user edit the input.
          // onChange return an event.
          // "e.target.value": event, target (input), 'value' inside of the input. This is where the change will occur.
          // So when the user edit the input we will change the input state to search the new information in the API.
          />

          <button type="submit">Add</button>

          {/* 'loading' information. Will execute the right side of the '&&' when the left side is true. */}
          { this.props.favorites.loading && <span>  Loading...</span>} 
        
          {/* !!* convert to boolean. "this.props.favorites.error - To show the error here." */}
          {!!this.props.favorites.error && ( 
            <span style={{ color:'#F00' }}>{this.props.favorites.error}</span>
          )}
        </form>

        <ul>
          {this.props.favorites.data.map(favorite=>(
          //favorites.data.map because the date in our INITIAL_STATE is inside of the 'data'.    

          // As we connected the "reducers" with "connect" and the "reducers" are an array we can run through it to get any information.
          // id, name, description, url are strings from the API.  
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
  // Reducer that we want is 'favorites' and we'll transform it (state) into props called 'favorites' inside of this component.
});

const mapDispatchToProps = dispatch => bindActionCreators(FavoriteActions, dispatch);
// To set all actions from here.

export default connect(mapStateToProps, mapDispatchToProps)(Main);
