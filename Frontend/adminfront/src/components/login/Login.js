import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ closeModal, setUserRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:4567/porkys/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("data:", data);
      if (response.status === 200) {
        // Guardar rol y cerrar modal
        setUserRole(data.role);
        closeModal();

        // Guardar el ID de la persona y el rol en localStorage
        if (data.id_persona && data.role) {
          localStorage.setItem(
            "userinfo",
            JSON.stringify({ id_persona: data.id_persona, role: data.role, token: data.token })
          );
        }

        // Redirigir según el rol
        if (data.role === "admin") {
          navigate("/paneladmin");
        } else if (data.role === "cliente") {
          navigate("/");
        }
      } else {
        alert(data.message || "Credenciales inválidas");
      }
    } catch (error) {
      console.error("Error de login:", error);
      alert("Hubo un error al intentar hacer login");
    }
  };

  return (
    <div className="login-modal-overlay" onClick={closeModal}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <div className="login-card">
          <h2 className="text-gradient">Iniciar sesión</h2>
          <div className="form">
            <div className="form-group mb-3">
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
              />
            </div>
          </div>
          <button className="btn-pink" onClick={handleLogin}>
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
