import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { Grid, Icon, Menu, Sidebar, Popup, Divider } from "semantic-ui-react";
import { AiOutlineAudit } from "react-icons/ai";

import { removeToken } from "../../utils/localStorage";
import { setMenu } from "../../store/ducks/menu";

import "./styles.css";

function Main(props) {
  const menu = useSelector((state) => state.menu.menu);

  const [activeItem, setActiveItem] = useState("Listar");

  const history = useHistory();
  const dispatch = useDispatch();

  const exit = () => {
    removeToken();
    history.push("/");
  };

  const contentAvatar = () => {
    return (
      <>
        <h4>Dev Tech</h4>
        <p>dev@tech.com.br</p>
        <Divider />
        <p className="exit" onClick={() => exit()}>
          Sair
        </p>
      </>
    );
  };

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
    if (name === "Listar") {
      history.push("/users");
    } else if (name === "Registrar") {
      history.push("/users/register");
    }
  };

  return (
    <Grid className="color">
      <Grid.Column>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            inverted
            onHide={() => dispatch(setMenu(false))}
            vertical
            visible={menu}
            width="thin"
          >
            <Menu.Item>
              <AiOutlineAudit style={{ fontSize: 38 }} color="#FFF" />
            </Menu.Item>
            <Menu.Item as="a" onClick={() => history.push("/users")}>
              <Icon name="users" />
              Listar
            </Menu.Item>
            <Menu.Item as="a" onClick={() => history.push("/users/register")}>
              <Icon name="id card outline" />
              Cadastrar
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={menu}>
            <Grid.Column>
              <Grid.Row>
                <Grid.Column>
                  <Menu inverted attached="top">
                    <Menu.Menu position="left">
                      <div className="toolbar" style={{ marginLeft: 35 }}>
                        <div>
                          <AiOutlineAudit
                            style={{ fontSize: 38 }}
                            color="#FFF"
                          />
                        </div>
                        <div style={{ marginLeft: 10, color: "#FFF" }}>
                          <h3>{props.title}</h3>
                          Bem vindo! ao cadastro simples.
                        </div>
                      </div>

                      {menu ? null : (
                        <div className="buttons-menu">
                          <Menu.Item
                            name="Listar"
                            active={activeItem === "Listar"}
                            onClick={handleItemClick}
                          />
                          <Menu.Item
                            name="Registrar"
                            active={activeItem === "Registrar"}
                            onClick={handleItemClick}
                          />
                        </div>
                      )}
                    </Menu.Menu>

                    <Menu.Menu position="right">
                      <div className="avatar">
                        <Popup
                          trigger={
                            <Icon name="sign-out" size="large" circular />
                          }
                          content={contentAvatar()}
                          position="top left"
                          on="click"
                        />
                      </div>
                    </Menu.Menu>
                  </Menu>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>{props.children}</Grid.Row>
            </Grid.Column>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Grid.Column>
    </Grid>
  );
}

export default Main;
