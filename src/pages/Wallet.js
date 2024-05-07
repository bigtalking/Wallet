import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import BillForm from '../components/BillForm';
import InfoTable from '../components/InfoTable';

class Wallet extends React.Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    const data = await fetch('https://economia.awesomeapi.com.br/json/all');
    const coins = Object.values(await data.json())
      .filter((coin) => coin.codein !== 'BRLT');
    const currencies = coins.map((coin) => coin.code);
    dispatch({ type: 'CURRENCIES', payload: currencies });
  }

  render() {
    const { user: { email } } = this.props;
    return (
      <div>
        <Header email={ email } />
        <BillForm />
        <hr />
        <InfoTable />
      </div>);
  }
}

Wallet.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({ user: store.user });

export default connect(mapStateToProps)(Wallet);
