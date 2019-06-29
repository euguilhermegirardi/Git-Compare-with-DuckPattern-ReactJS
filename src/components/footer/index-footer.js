// Created the folder "components" for global files.
// footer and main are not connected but, they listen to the "favorites" by "connect" so they att together when Redux att.

import React from 'react';
import { connect } from 'react-redux'; // Connects to the Redux state (ducks/index-reducers).
import PropTypes from 'prop-types'; // Do the PropTypes always when you have "props".

const Footer = ({ count }) => <p>You have {count} favorites.</p>;

const mapStateToProps = state => ({
  count: state.favorites.data.length, // As we connected to the redux state with "connect"...
  // we can map the "favorites" and get the quantity of favorites that was add.
});

Footer.propTypes = {
  count: PropTypes.number.isRequired,
};

export default connect (mapStateToProps)(Footer);