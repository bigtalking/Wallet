import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Login.css';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      btnDis: true,
      email: '',
      senha: '',
    };
  }

  // https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/ -- referencia da função
  validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  // verifica se os campos são validos ------------------------------------------------------

  verifier = () => {
    const { email, senha } = this.state;
    const minLen = 6;
    const lengthVer = senha.length >= minLen;
    const emailVer = this.validateEmail(email);
    const valid = lengthVer && emailVer;
    this.setState({ btnDis: !valid });
  }

  changeHandler = ({ target }) => {
    this.setState({ [target.name]: target.value }, this.verifier);
  }

  // Função do botão Entrar ------------------------------------------------------------------

  clickHandler = () => {
    const { email } = this.state;
    const { login } = this.props;
    login(email);
  }

  render() {
    const { btnDis, email, senha } = this.state;
    return (
      <div className="main">
        <div className="login">
          <h1>Login</h1>
          <form>
            <input
              name="email"
              placeholder="email"
              data-testid="email-input"
              onChange={ this.changeHandler }
              value={ email }
            />
            <input
              type="password"
              name="senha"
              placeholder="senha"
              data-testid="password-input"
              onChange={ this.changeHandler }
              value={ senha }
            />
            <Link to="/carteira">
              <button
                type="button"
                disabled={ btnDis }
                onClick={ this.clickHandler }
              >
                Entrar
              </button>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch({ type: 'LOGIN', email }),
});

export default connect(null, mapDispatchToProps)(Login);
