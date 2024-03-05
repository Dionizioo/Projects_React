import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handleSenhaChange = (e) => {
    setSenha(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Armazenar o login e senha no localStorage
    localStorage.setItem("login", login);
    localStorage.setItem("senha", senha);
    if (login === "admin" && senha === "admin") {
      navigate("/admin");
    }
    // Limpar campos de login e senha
    setLogin("");
    setSenha("");
  };

  return (
    <div className="new_post">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form_control">
          <label htmlFor="login">Login:</label>
          <input
            type="text"
            name="login"
            placeholder="Digite o seu Login"
            id="login"
            value={login}
            onChange={handleLoginChange}
          />
        </div>
        <div className="form_control">
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            name="senha"
            placeholder="Digite a sua senha"
            id="senha"
            value={senha}
            onChange={handleSenhaChange}
          />
        </div>
        <input type="submit" value="Entrar" className="btn" />
      </form>
    </div>
  );
};

export default Login;
