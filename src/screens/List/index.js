import React, { useEffect, useState } from "react";
import "./styles.css";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  Table,
  Breadcrumb,
  Button,
  Placeholder,
  Segment,
  Header,
  Pagination,
  Icon,
  Input,
  Popup,
  Loader,
} from "semantic-ui-react";
import Swal from "sweetalert2";

import Main from "../../components/Main";

import { usersApi } from "../../services/users";

import { setUser } from "../../store/ducks/users";
import { setMenu } from "../../store/ducks/menu";

function List() {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPage, setTotalPage] = useState(0);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    listUsers();
  }, [page]);

  useEffect(() => {
    getUserName();
  }, [search]);

  const listUsers = async () => {
    setLoading(true);

    const total = await usersApi.getUsersTotal();
    setTotalPage(Math.ceil(total.length / rowsPerPage));

    const offset = page !== 1 ? rowsPerPage * (page - 1) : 0;
    const response = await usersApi.getUsers(offset, rowsPerPage + offset);
    setUsers(response);
    setLoading(false);
  };

  const getUserName = () => {
    setLoadingSearch(true);
    usersApi.getName(search).then((response) => {
      setTotalPage(Math.ceil(response.length / rowsPerPage));
      setUsers(response);
      setLoadingSearch(false);
    });
  };

  const sections = [
    { key: "Usuário", content: "Usuário" },
    { key: "Listar", content: "Listar" },
  ];

  /**
   * Notification em caso de erro ou sucesso
   */
  const notification = () => {
    let html;

    if (success === "fail") {
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
            <span style={{ cursor: "pointer" }} onClick={() => setSuccess("")}>
              X
            </span>
          </div>
          <p>Não foi possível excluir o usuário.</p>
          <span>Por favor, tente novamente!</span>
        </Segment>
      );
    } else if (success === "success") {
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
            <span style={{ cursor: "pointer" }} onClick={() => setSuccess("")}>
              X
            </span>
          </div>
          <p>O usuário foi excluído com sucesso.</p>
        </Segment>
      );
    }

    return html;
  };

  /**
   * Busca usuários por nome
   */
  const renderSearch = () => {
    return (
      <>
        <Input
          placeholder="digite o nome do usuário"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </>
    );
  };

  return (
    <Main title="Lista de usuários">
      <div className="header-content">
        <Breadcrumb size="big" icon="right angle" sections={sections} />
        <div className="button-menu">
          <Icon
            data-testid="button-menu"
            name="align justify"
            size="large"
            onClick={() => dispatch(setMenu(true))}
          />
        </div>
      </div>
      <div className="content" style={{ marginLeft: "2%" }}>
        {loading ? (
          <Placeholder fluid>
            <Placeholder.Header>
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
          <>
            <Table singleLine data-testid="table-users">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span>Nome</span>
                      <span>
                        <Popup
                          trigger={<Icon name="search" size="small" />}
                          content={renderSearch()}
                          position="bottom center"
                          on="click"
                        />
                      </span>
                    </span>
                  </Table.HeaderCell>
                  <Table.HeaderCell>CPF</Table.HeaderCell>
                  <Table.HeaderCell>E-mail</Table.HeaderCell>
                  <Table.HeaderCell>Cidade</Table.HeaderCell>
                  <Table.HeaderCell>Editar</Table.HeaderCell>
                  <Table.HeaderCell>Excluir</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {loadingSearch
                  ? null
                  : users.map((user) => {
                      return (
                        <Table.Row key={user.id}>
                          <Table.Cell>{user.nome}</Table.Cell>
                          <Table.Cell>{user.cpf}</Table.Cell>
                          <Table.Cell>{user.email}</Table.Cell>
                          <Table.Cell>{user.endereco.cidade}</Table.Cell>
                          <Table.Cell>
                            <Button
                              size="mini"
                              color="yellow"
                              onClick={() => {
                                dispatch(
                                  setUser({
                                    ...user,
                                    updateUser: true,
                                  })
                                );
                                history.push("/users/register");
                              }}
                            >
                              Editar
                            </Button>
                          </Table.Cell>
                          <Table.Cell>
                            <Button
                              size="mini"
                              color="red"
                              onClick={() => {
                                Swal.fire({
                                  title: "Atenção!",
                                  text: "Deseja realmente excluir o usuário ?",
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonColor: "#000",
                                  cancelButtonColor: "#d33",
                                  confirmButtonText: "Sim",
                                  cancelButtonText: "Não",
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    setLoading(true);
                                    usersApi
                                      .removeUser(user.id)
                                      .then(() => {
                                        setPage(1);
                                        setLoading(false);
                                        setSuccess("success");
                                      })
                                      .catch(() => {
                                        setLoading(false);
                                        setSuccess("fail");
                                      });
                                  }
                                });
                              }}
                            >
                              Excluir
                            </Button>
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
              </Table.Body>
            </Table>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              {loadingSearch ? (
                <Loader active inline="centered" />
              ) : (
                <Pagination
                  defaultActivePage={page}
                  firstItem={null}
                  lastItem={null}
                  pointing
                  secondary
                  totalPages={totalPage}
                  onPageChange={(event, data) => {
                    setPage(data.activePage);
                    setRowsPerPage(5);
                  }}
                />
              )}
            </div>
          </>
        )}
      </div>
      {notification()}
    </Main>
  );
}

export default List;
