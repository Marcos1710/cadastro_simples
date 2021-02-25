import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import {
  Button,
  Form,
  Breadcrumb,
  Grid,
  Segment,
  Header,
  Placeholder,
} from "semantic-ui-react";

import { serviceViaCep } from "../../services/viaCep";
import { usersApi } from "../../services/users";

import { setUser } from "../../store/ducks/users";

import Main from "../../components/Main";
import InputMask from "react-input-mask";

function Register() {
  const users = useSelector((state) => state.users);

  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [cpfError, setCpfError] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cep, setCep] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");

  const [messageError, setMessageError] = useState({});

  const [step, setStep] = useState(1);

  const dispatch = useDispatch();
  const history = useHistory();
  const inputRef = useRef(null);

  useEffect(() => {
    if (users.user.id) {
      setName(users.user.nome);
      setCpf(users.user.cpf);
      setEmail(users.user.email);
      setCep(users.user.endereco.cep);
      setStreet(users.user.endereco.rua);
      setNumber(users.user.endereco.numero);
      setNeighborhood(users.user.endereco.bairro);
      setCity(users.user.endereco.cidade);
    }
  }, [users.user]);

  useEffect(() => {
    if (
      name &&
      cpf &&
      email &&
      password &&
      cep &&
      street &&
      number &&
      neighborhood &&
      city
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [name, cpf, email, password, cep, street, number, neighborhood, city]);

  const sections = [
    { key: "Usuário", content: "Usuário" },
    { key: "Cadastrar", content: "Cadastrar" },
  ];

  /**
   * Função que busca o CEP informado
   */
  const getCepInViaCep = (value) => {
    if (value.replace(/[^0-9]/g, "").length === 8) {
      serviceViaCep
        .getCep(value.replace(/[^0-9]/g, ""))
        .then((response) => {
          if (response.erro) {
            throw true;
          }

          setStreet(response.logradouro);
          setNeighborhood(response.bairro);
          setCity(response.localidade);
          inputRef.current.focus();
        })
        .catch(() => {
          setMessageError({
            messageOne: "Não encontramos o CEP informado :(",
            messageTwo: "Tente novamente mais tarde!",
          });
        });
    }
  };

  /**
   * Função que verifica se o CPF é valido
   */
  const isCpf = (value) => {
    value = value.replace(/[^\d]+/g, "");

    if (value == "") return false;

    if (value.length != 11) return false;

    if (
      value == "00000000000" ||
      value == "11111111111" ||
      value == "22222222222" ||
      value == "33333333333" ||
      value == "44444444444" ||
      value == "55555555555" ||
      value == "66666666666" ||
      value == "77777777777" ||
      value == "88888888888" ||
      value == "99999999999"
    )
      return false;

    let sum = 0;
    let rest;

    for (var i = 1; i <= 9; i++) {
      sum = sum + parseInt(value.substring(i - 1, i)) * (11 - i);
    }

    rest = (sum * 10) % 11;
    if (rest == 10 || rest == 11) rest = 0;
    if (rest != parseInt(value.substring(9, 10))) return false;

    sum = 0;

    for (var i = 1; i <= 10; i++) {
      sum = sum + parseInt(value.substring(i - 1, i)) * (12 - i);
    }

    rest = (sum * 10) % 11;
    if (rest == 10 || rest == 11) rest = 0;
    if (rest != parseInt(value.substring(10, 11))) return false;

    return true;
  };

  /**
   * Função que define a tela de step
   */
  const handleStep = () => {
    let html;

    if (step === 1) {
      html = (
        <>
          <Grid.Row>
            <Grid.Column width={8}>
              <Form.Input
                data-testid="input-name"
                icon="user"
                iconPosition="left"
                type="text"
                label="Nome"
                placeholder="Digite aqui seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <span
                style={{
                  fontWeight: "bold",
                  display: "block",
                  marginBottom: 3,
                }}
              >
                CPF
              </span>
              <InputMask
                data-testid="input-cpf"
                type="text"
                mask="999.999.999-99"
                placeholder="Digite aqui seu CPF"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              ></InputMask>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <Form.Input
                data-testid="input-mail"
                icon="at"
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
            </Grid.Column>
            <Grid.Column width={8}>
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
            </Grid.Column>
          </Grid.Row>
        </>
      );
    } else if (step === 2) {
      html = (
        <>
          <Grid.Row>
            <Grid.Column width={3}>
              <span
                style={{
                  fontWeight: "bold",
                  display: "block",
                  marginBottom: 3,
                }}
              >
                CEP
              </span>
              <InputMask
                data-testid="input-cep"
                type="text"
                mask="99999-999"
                placeholder="Digite aqui o seu CEP"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                onKeyUp={() => getCepInViaCep(cep)}
              ></InputMask>
            </Grid.Column>
            <Grid.Column width={11}>
              <Form.Input
                data-testid="input-street"
                type="text"
                label="Rua"
                placeholder="Digite aqui seu endereço"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </Grid.Column>
            <Grid.Column width={2}>
              <span
                style={{
                  fontWeight: "bold",
                  display: "block",
                  marginBottom: 3,
                }}
              >
                Número
              </span>
              <input
                data-testid="input-number"
                ref={inputRef}
                type="text"
                placeholder="Digite número"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={8}>
              <Form.Input
                data-testid="input-neighborhood"
                type="text"
                label="Bairro"
                placeholder="Digite aqui o bairro"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <Form.Input
                data-testid="input-city"
                type="text"
                label="Cidade"
                placeholder="Digite aqui sua cidade"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid.Column>
          </Grid.Row>
        </>
      );
    }

    return html;
  };

  const handleRegisterNewUser = () => {
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

    if (!isCpf(cpf)) {
      setCpfError(true);
      setMessageError({
        messageOne: "O CPF digitado é inválido!",
        messageTwo: "Por favor digite um CPF...",
      });
      setEmailError(false);
      return false;
    }

    if (password.length <= 4) {
      setEmailError(false);
      setCpfError(false);
      setPasswordError(true);
      return false;
    }

    setLoading(true);
    setEmailError(false);
    setPasswordError(false);
    setCpfError(false);

    const body = {
      nome: name,
      cpf: cpf,
      email: email,
      endereco: {
        cep: cep,
        rua: street,
        numero: number,
        bairro: neighborhood,
        cidade: city,
      },
    };

    if (users.user.id && users.user.updateUser) {
      usersApi
        .updateUser({
          id: users.user.id,
          ...body,
        })
        .then(() => {
          setLoading(false);
          setSaveSuccess(true);
          dispatch(setUser({}));

          setTimeout(() => {
            history.push("/users");
          }, 3000);
        })
        .catch(() => {
          setLoading(false);
          setMessageError({
            messageOne: "Não foi possível alterar o usuário :(",
            messageTwo: "Tente novamente mais tarde!",
          });
        });
    } else {
      usersApi
        .setNewUser(body)
        .then(() => {
          setLoading(false);
          setSaveSuccess(true);
          dispatch(setUser({}));

          setTimeout(() => {
            history.push("/users");
          }, 3000);
        })
        .catch(() => {
          setLoading(false);
          setMessageError({
            messageOne: "Não foi possível criar o novo usuário :(",
            messageTwo: "Tente novamente mais tarde!",
          });
        });
    }
  };

  /**
   * Notification em caso de erro ou sucesso
   */
  const notification = () => {
    let html;

    if (cpfError || messageError.messageOne) {
      html = (
        <Segment
          style={{
            left: "76%",
            position: "fixed",
            top: "2%",
            zIndex: 1000,
            backgroundColor: "#f38080",
            color: "#000",
            width: 300,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Header>Oops...</Header>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                setCpfError(false);
                setMessageError({});
              }}
            >
              X
            </span>
          </div>
          <p>{messageError.messageOne}</p>
          <span>{messageError.messageTwo}</span>
        </Segment>
      );
    } else if (saveSuccess) {
      html = (
        <Segment
          style={{
            left: "76%",
            position: "fixed",
            top: "2%",
            zIndex: 1000,
            backgroundColor: "#63db4b",
            color: "#000",
            width: 300,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Header>Sucesso!</Header>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setSaveSuccess(false)}
            >
              X
            </span>
          </div>
          <p>Usuário salvo com sucesso.</p>
        </Segment>
      );
    }

    return html;
  };

  return (
    <Main title="Cadastro de usuários">
      <div className="header-content">
        <Breadcrumb size="big" icon="right angle" sections={sections} />
        <div>
          <Button
            size="large"
            onClick={() => {
              dispatch(setUser({}));
              history.push("/users");
            }}
            color="red"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            color="green"
            size="large"
            onClick={() => handleRegisterNewUser()}
            loading={loading}
            disabled={disable}
          >
            {users.user.updateUser ? "Atualizar" : "Salvar"}
          </Button>
        </div>
      </div>
      <div className="content" style={{ marginLeft: "2%" }}>
        {loading ? (
          <Placeholder fluid>
            <Placeholder.Header image>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
        ) : (
          <Form>
            <Grid>
              {handleStep()}

              <Grid.Row>
                <Grid.Column width={16}>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      size="large"
                      onClick={() => history.push("/users")}
                      secondary
                      disabled={step === 1 ? true : false}
                      onClick={() => setStep(step - 1)}
                    >
                      Voltar
                    </Button>
                    <Button
                      type="submit"
                      size="large"
                      color="green"
                      disabled={step === 2 ? true : false}
                      onClick={() => setStep(step + 1)}
                    >
                      Avançar
                    </Button>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <div style={{ textAlign: "center", marginTop: 40 }}>
              <span
                className="step"
                style={
                  step === 1 ? { opacity: 1 } : { backgroundColor: "#4caf50" }
                }
              ></span>
              <span
                className="step"
                style={step === 2 ? { opacity: 1 } : null}
              ></span>
            </div>
          </Form>
        )}
      </div>
      {notification()}
    </Main>
  );
}

export default Register;
