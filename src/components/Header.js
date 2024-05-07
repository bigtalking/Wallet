import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { store } = this.props;
    const { user: { email }, wallet: { total } } = store;
    const totalFixed = (total === undefined) ? 0 : total.toFixed(2);
    return (
      <header className="header">
        <div id="email" data-testid="email-field">
          Email:
          {' '}
          { email }
        </div>
        <span className="span">
          Despesa Total: R$
          <div data-testid="total-field">
            { totalFixed }
          </div>
        </span>
        <div data-testid="header-currency-field">
          BRL
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  store: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (store) => ({ store });

export default connect(mapStateToProps)(Header);
