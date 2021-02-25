import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./store/ducks";

import Login from "./screens/Login";
import List from "./screens/List";
import Register from "./screens/Register";

// cria um Wrapper para utilizar nas páginas necessárias que precisam do store
// https://redux.js.org/recipes/writing-tests#connected-components
function renderRedux(
  ui,
  {
    initialState,
    store = createStore(reducers, initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// Inicio dos testes
describe("testing page login", () => {
  test("should fill the mail", () => {
    const { getByTestId } = render(<Login />);

    const inputMail = getByTestId("input-mail");
    fireEvent.change(inputMail, { target: { vallue: "marcos@dev.com.br" } });
  });

  test("should fill the password", () => {
    const { getByTestId } = render(<Login />);

    const inputPassword = getByTestId("input-password");
    fireEvent.change(inputPassword, { target: { vallue: "123456" } });
  });

  test("should render the button of login", () => {
    const { getByText } = render(<Login />);

    const getByBtnLogin = getByText("Entrar");
    expect(getByBtnLogin).toBeInTheDocument();
  });

  test("should click in the button of login", () => {
    const { getByText } = render(<Login />);

    const btnSubmit = getByText("Entrar");
    fireEvent.click(btnSubmit);
  });
});

describe("testing page list users", () => {
  test("should render the button of show menu", () => {
    const { getByTestId } = renderRedux(<List />);

    const btnShowMenu = getByTestId("button-menu");
    expect(btnShowMenu).toBeInTheDocument();
  });

  test("should click in the button of show menu", () => {
    const { getByTestId } = renderRedux(<List />);

    const btnShowMenu = getByTestId("button-menu");
    fireEvent.click(btnShowMenu);
  });
});

describe("testing page form create new user step one", () => {
  test("should fill the name", () => {
    const { getByTestId } = renderRedux(<Register />);

    const inputName = getByTestId("input-name");
    fireEvent.change(inputName, { target: { vallue: "marcos" } });
  });

  test("should fill the CPF", () => {
    const { getByTestId } = renderRedux(<Register />);

    const inputCpf = getByTestId("input-cpf");
    fireEvent.change(inputCpf, { target: { vallue: "773.510.930-08" } });
  });

  test("should fill the email", () => {
    const { getByTestId } = renderRedux(<Register />);

    const inputMail = getByTestId("input-mail");
    fireEvent.change(inputMail, { target: { vallue: "marcos@dev.com.br" } });
  });

  test("should fill the password", () => {
    const { getByTestId } = renderRedux(<Register />);

    const inputPass = getByTestId("input-password");
    fireEvent.change(inputPass, { target: { vallue: "123456" } });
  });

  test("should render the button of next", () => {
    const { getByText } = renderRedux(<Register />);

    const getByBtnNext = getByText("Avançar");
    expect(getByBtnNext).toBeInTheDocument();
  });
});

describe("testing page form create new user step two", () => {
  test("should click in the button next", () => {
    const { getByText } = renderRedux(<Register />);

    const getByBtnNext = getByText("Avançar");
    fireEvent.click(getByBtnNext);
  });

  test("should fill the cep", () => {
    const { getByText, getByTestId } = renderRedux(<Register />);

    const getByBtnNext = getByText("Avançar");
    fireEvent.click(getByBtnNext);

    const inputCep = getByTestId("input-cep");
    fireEvent.change(inputCep, { target: { vallue: "59153-150" } });
  });

  test("should fill the street", () => {
    const { getByText, getByTestId } = renderRedux(<Register />);

    const getByBtnNext = getByText("Avançar");
    fireEvent.click(getByBtnNext);

    const inputStreet = getByTestId("input-street");
    fireEvent.change(inputStreet, {
      target: { vallue: "Avenida Ayrton Senna" },
    });
  });

  test("should fill the number", () => {
    const { getByText, getByTestId } = renderRedux(<Register />);

    const getByBtnNext = getByText("Avançar");
    fireEvent.click(getByBtnNext);

    const inputNumber = getByTestId("input-number");
    fireEvent.change(inputNumber, { target: { vallue: "1823" } });
  });

  test("should fill the neighborhood", () => {
    const { getByText, getByTestId } = renderRedux(<Register />);

    const getByBtnNext = getByText("Avançar");
    fireEvent.click(getByBtnNext);

    const inputNeighborhood = getByTestId("input-neighborhood");
    fireEvent.change(inputNeighborhood, {
      target: { vallue: "nova parnamirim" },
    });
  });

  test("should fill the city", () => {
    const { getByText, getByTestId } = renderRedux(<Register />);

    const getByBtnNext = getByText("Avançar");
    fireEvent.click(getByBtnNext);

    const inputCity = getByTestId("input-city");
    fireEvent.change(inputCity, {
      target: { vallue: "Parnamirim" },
    });
  });
});
