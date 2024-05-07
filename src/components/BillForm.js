import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class BillForm extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      currency: 'USD',
      method: 'dinheiro',
      tag: 'Alimentação',
      description: '',
    };
  }

  changeHandler = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  blurHandler = ({ target }) => {
    const num = parseFloat(target.value);
    if (num >= 0) this.setState({ [target.name]: num });
    else this.setState({ [target.name]: 0 });
  }

  clickHandler = async () => {
    const { saveData } = this.props;
    const data = await fetch('https://economia.awesomeapi.com.br/json/all');
    const exchangeRates = await data.json();
    saveData({ ...this.state, exchangeRates });
    this.setState({ value: 0 });
  }

  render() {
    const { store } = this.props;
    const { wallet: { currencies } } = store;
    const { value, currency, method, tag, description } = this.state;
    return (
      <form className="bill-form">
        <label htmlFor="value-input">
          Valor:
          <input
            value={ value }
            name="value"
            size="8"
            data-testid="value-input"
            id="value-input"
            onChange={ this.changeHandler }
            onBlur={ this.blurHandler }
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select
            name="currency"
            value={ currency }
            data-testid="currency-input"
            id="currency-input"
            onChange={ this.changeHandler }
          >
            {currencies.map((op) => <option key={ op } value={ op }>{op}</option>)}
          </select>
        </label>
        <label htmlFor="method-input">
          Metodo de Pagamento:
          <select
            name="method"
            value={ method }
            data-testid="method-input"
            id="method-input"
            onChange={ this.changeHandler }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria:
          <select
            name="tag"
            value={ tag }
            data-testid="tag-input"
            id="tag-input"
            onChange={ this.changeHandler }
          >
            {tags.map((op) => <option key={ op } value={ op }>{op}</option>)}
          </select>
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            name="description"
            value={ description }
            data-testid="description-input"
            id="description-input"
            onChange={ this.changeHandler }
          />
        </label>
        <button type="button" onClick={ this.clickHandler }>Adicionar despesa</button>
      </form>
    );
  }
}

BillForm.propTypes = {
  store: PropTypes.objectOf(PropTypes.any).isRequired,
  saveData: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({ store });

const mapDispatchToProps = (dispatch) => ({
  saveData: (payload) => dispatch({ type: 'ADD_EXPENSES', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(BillForm);
