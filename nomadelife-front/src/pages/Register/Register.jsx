import React from 'react'
import styles from './Register.module.css'
import { useState, useEffect } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const { register, error, loading } = useAuthentication()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [formError, setFormError] = useState(null)


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validateForm = () => {
    let errors = [];
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      errors.push("Todos os campos são obrigatórios.");
    }
    if (formData.password !== formData.confirmPassword) {
      errors.push("As senhas não coincidem.");
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.push("E-mail inválido.");
    }
    if (errors.length > 0) {
      setFormError(errors.join(" "));
      return false;
    }
    setFormError(null);
    return true;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      console.log("Chamando a função register...")
      await register(formData);
      console.log("Registro completado!")
    }
  }
  

  return (
    <div className="register-container">
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirme a Senha</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {formError && <div className="error-message">{formError}</div>}
        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  )
}

export default Register
