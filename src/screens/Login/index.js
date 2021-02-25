import React, { useState } from "react";
import "./styles.css";

import { useHistory } from "react-router-dom";

import { Card, Button, Form, Message } from "semantic-ui-react";
import { AiOutlineAudit } from "react-icons/ai";

import { setToken } from "../../utils/localStorage";

function Login() {
  const [loading, setLoading] = useState(false);
  const [cardLoginState, setCardLoginState] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleSubmit = () => {
    if (typeof email !== "string") {
      setEmailError(true);
      return false;
    }

    if (email === "") {
      setEmailError(true);
      return false;
    }

    let reg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    if (!reg.test(email)) {
      setEmailError(true);
      return false;
    }

    if (password.length <= 4) {
      setEmailError(false);
      setPasswordError(true);
      return false;
    }

    setLoading(true);
    setEmailError(false);
    setPasswordError(false);

    setCardLoginState(true);
    setLoading(false);

    setToken(
      Math.random().toString(36).substr(2) +
        Math.random().toString(36).substr(2)
    );

    setTimeout(() => {
      history.push("/users");
    }, 3000);
  };

  return (
    <>
      <div className="color">
        <div className="login-header">
          <div>
            <AiOutlineAudit style={{ fontSize: 38, marginRight: 15 }} />
          </div>
          <div>
            <h1>Cadastro Simples</h1>
          </div>
        </div>
        <div style={{ width: 400, marginLeft: "35%", paddingTop: "1%" }}>
          <Card fluid>
            <Card.Content>
              <div className="flex">
                <Card.Description>Olá! Faça seu login</Card.Description>
                <a onClick={() => history.push("/forgot/password")}>
                  Esqueceu a senha ?
                </a>
              </div>
            </Card.Content>
            <Card.Content>
              <Form success>
                <Form.Input
                  data-testid="input-mail"
                  icon="user"
                  iconPosition="left"
                  type="text"
                  label="Email"
                  placeholder="Digite aqui seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={
                    emailError
                      ? {
                          content:
                            "Por favor, digite um endereço de e-mail valido.",
                          pointing: "below",
                        }
                      : null
                  }
                />
                <Form.Input
                  data-testid="input-password"
                  icon="protect"
                  iconPosition="left"
                  type="password"
                  label="Senha"
                  placeholder="Digite aqui sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={
                    passwordError
                      ? {
                          content:
                            "Ops... Sua senha deve conter mais de 4 caracteres.",
                          pointing: "below",
                        }
                      : null
                  }
                />
                <div>
                  <Button
                    aria-label="entrar"
                    type="submit"
                    secondary
                    size="large"
                    onClick={() => handleSubmit()}
                    fluid
                    loading={loading}
                    disabled={loading}
                  >
                    Entrar
                  </Button>
                </div>
              </Form>
            </Card.Content>
            {cardLoginState ? (
              <Card.Content>
                <Message
                  success
                  header="Login realizado com sucesso!"
                  content="Você será redirecionada para a página principal..."
                />
              </Card.Content>
            ) : null}
          </Card>
        </div>
      </div>
    </>
  );
}

export default Login;
