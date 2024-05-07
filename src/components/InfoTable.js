import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../store';

class InfoTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ex: [],
    };
  }

  componentDidMount() {
    this.tableRender();
    this.testFun();
  }

  clickHandler = () => {
    console.log(this.props);
  }

  testFun = () => {
    store.subscribe(this.tableRender);
  }

  tableRender = () => {
    const { expenses } = this.props;
    const tables = expenses.map((expense) => {
      const { value,
        currency,
        method,
        tag,
        description,
        exchangeRates } = expense;
      const valor = parseFloat(value);
      const exchangeInfo = Object.values(exchangeRates).find((obj) => (
        obj.code === currency
      ));
      console.log(exchangeInfo);
      const data = [
        description,
        tag,
        method,
        valor,
        exchangeInfo.name,
        parseFloat(exchangeInfo.ask),
        (valor * exchangeInfo.ask),
        'Real',
      ];
      const cells = data.map((cel) => (
        <td key={ cel }>{(typeof cel === 'number') ? cel.toFixed(2) : cel}</td>
      ));
      const table = (
        <tr>
          { cells }
        </tr>
      );
      return table;
    });
    this.setState({ ex: tables });
  }

  render() {
    const { ex } = this.state;

    return (
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { ex }
          </tbody>
        </table>
      </div>
    );
  }
}

InfoTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = ({ wallet }) => (
  { expenses: wallet.expenses }
);

// const mapDispatchToProps = (dispatch) => ({
//   saveData: (payload) => dispatch({ type: 'ADD_EXPENSES', payload }),
// });

export default connect(mapStateToProps)(InfoTable);
