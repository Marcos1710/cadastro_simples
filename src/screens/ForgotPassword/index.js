import React, { useState } from "react";
import "./styles.css";

import { useHistory } from "react-router-dom";

import { Card, Button, Form, Message } from "semantic-ui-react";
import { AiOutlineAudit } from "react-icons/ai";

function ForgotPassword() {
  const [emailError, setEmailError] = useState(false);
  const [cardForgotPassword, setCardForgotPassword] = useState(false);

  const [email, setEmail] = useState("");

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

    setEmailError(false);
    setCardForgotPassword(true);
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
        <div className="login">
          <Card fluid>
            <Card.Content>
              <div className="flex">
                <Card.Description>Recuperação de senha</Card.Description>
                <a onClick={() => history.push("/")}>Voltar ao login</a>
              </div>
            </Card.Content>
            <Card.Content>
              <Form success>
                <Form.Input
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
                          content: "Please enter a valid email address",
                          pointing: "below",
                        }
                      : null
                  }
                />
                <div className="center">
                  <Button
                    fluid
                    secondary
                    size="large"
                    onClick={() => handleSubmit()}
                  >
                    Enviar
                  </Button>
                </div>
              </Form>
            </Card.Content>
            {cardForgotPassword ? (
              <Card.Content>
                <Message
                  error
                  header="Oops..."
                  content="Desculpe, essa funcionalidade ainda está em desenvolvimento."
                />
              </Card.Content>
            ) : null}
          </Card>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
