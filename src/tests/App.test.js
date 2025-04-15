import React from "react";
import ReactDOM from "react-dom";
import { App } from "../components/App";
import { operate } from "../logic/utitlity";
import { render, fireEvent, screen } from "@testing-library/react";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

test("adds numbers", () => {
  expect(operate("2", "3", "+")).toBe("5");
});

test("multiplies numbers", () => {
  expect(operate("2", "3", "x")).toBe("6");
});

test("divides numbers", () => {
  expect(operate("6", "3", "÷")).toBe("2");
});

test("substracts numbers", () => {
  expect(operate("6", "3", "-")).toBe("3");
});

test("throws an error", () => {
  expect(() => operate("6", "3", "$")).toThrow(Error("Unknown operation '$'"));
});

test("shows init value ", () => {
  render(<App />);
  expect(screen.getByTestId("Calculator_Result_Display").textContent).toBe(
    "0 ",
  );
});

test("shows input: 6 ", () => {
  render(<App />);
  fireEvent.click(screen.getByTestId("Calculator_6"));
  expect(screen.getByTestId("Calculator_Result_Display").textContent).toBe("6 ");
});

test("shows input: 66 ", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("Calculator_6"));
    fireEvent.click(screen.getByTestId("Calculator_6"));

    expect(screen.getByTestId("Calculator_Result_Display").textContent).toBe("66 ");
});

test("shows result of input: 6 + 6 = ", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("Calculator_6"));
    fireEvent.click(screen.getByTestId("Calculator_Addition"));
    fireEvent.click(screen.getByTestId("Calculator_6"));
    fireEvent.click(screen.getByTestId("Calculator_Equals"));

    expect(screen.getByTestId("Calculator_Result_Display").textContent).toBe("12 ");
});

test("shows result of input: 00 + 0 = ", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("Calculator_0"));
    fireEvent.click(screen.getByTestId("Calculator_0"));
    fireEvent.click(screen.getByTestId("Calculator_Addition"));
    fireEvent.click(screen.getByTestId("Calculator_0"));
    fireEvent.click(screen.getByTestId("Calculator_Equals"));

    expect(screen.getByTestId("Calculator_Result_Display").textContent).toBe("0 ");
});

test("shows result of input: 6 + 6 = 9 ", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("Calculator_6"));
    fireEvent.click(screen.getByTestId("Calculator_Addition"));
    fireEvent.click(screen.getByTestId("Calculator_6"));
    fireEvent.click(screen.getByTestId("Calculator_Equals"));
    fireEvent.click(screen.getByTestId("Calculator_9"));

    expect(screen.getByTestId("Calculator_Result_Display").textContent).toBe("9 ");
});

test("shows input: 3 + 6 = + ", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("Calculator_3"));
    fireEvent.click(screen.getByTestId("Calculator_Addition"));
    fireEvent.click(screen.getByTestId("Calculator_6"));
    fireEvent.click(screen.getByTestId("Calculator_Equals"));
    fireEvent.click(screen.getByTestId("Calculator_Addition"));

    expect(screen.getByTestId("Calculator_Result_Display").textContent).toBe("9 ");
});

test("shows result of input: 3 + 6 = + 9 = ", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("Calculator_3"));
    fireEvent.click(screen.getByTestId("Calculator_Addition"));
    fireEvent.click(screen.getByTestId("Calculator_6"));
    fireEvent.click(screen.getByTestId("Calculator_Equals"));
    fireEvent.click(screen.getByTestId("Calculator_Addition"));
    fireEvent.click(screen.getByTestId("Calculator_9"));
    fireEvent.click(screen.getByTestId("Calculator_Equals"));

    expect(screen.getByTestId("Calculator_Result_Display").textContent).toBe("18 ");
});
test("shows result of input: 3 +  = 3 = ", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("Calculator_3"));
    fireEvent.click(screen.getByTestId("Calculator_Addition"));
    fireEvent.click(screen.getByTestId("Calculator_Equals"));
    fireEvent.click(screen.getByTestId("Calculator_3"));
    fireEvent.click(screen.getByTestId("Calculator_Equals"));

    expect(screen.getByTestId("Calculator_Result_Display").textContent).toBe("6 ");
});

test("shows input: +", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("Calculator_Addition"));

    expect(screen.getByTestId("Calculator_Result_Display").textContent).toBe("0 ");
});


test("shows input : + 2", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("Calculator_Addition"));
    fireEvent.click(screen.getByTestId("Calculator_2"));

    expect(screen.getByTestId("Calculator_Result_Display").textContent).toBe("2 ");
});

test("shows input : + 2 +", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("Calculator_Addition"));
    fireEvent.click(screen.getByTestId("Calculator_2"));
    fireEvent.click(screen.getByTestId("Calculator_Addition"));

    expect(screen.getByTestId("Calculator_Result_Display").textContent).toBe("2 ");
});

test("shows input : + 2 + +", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("Calculator_Addition"));
    fireEvent.click(screen.getByTestId("Calculator_2"));
    fireEvent.click(screen.getByTestId("Calculator_Addition"));
    fireEvent.click(screen.getByTestId("Calculator_Addition"));
    fireEvent.click(screen.getByTestId("Calculator_Addition"));


    expect(screen.getByTestId("Calculator_Result_Display").textContent).toBe("2 ");
});



test("shows input : + 2 + 5", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("Calculator_Addition"));
    fireEvent.click(screen.getByTestId("Calculator_2"));
    fireEvent.click(screen.getByTestId("Calculator_Addition"));
    fireEvent.click(screen.getByTestId("Calculator_5"));

    expect(screen.getByTestId("Calculator_Result_Display").textContent).toBe("5 ");
});


test("shows input : + 2 5", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("Calculator_Addition"));
    fireEvent.click(screen.getByTestId("Calculator_2"));
    fireEvent.click(screen.getByTestId("Calculator_5"));

    expect(screen.getByTestId("Calculator_Result_Display").textContent).toBe("25 ");
});

test("shows result of input : + 6  + 5 =", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("Calculator_Addition"));
    fireEvent.click(screen.getByTestId("Calculator_6"));
    fireEvent.click(screen.getByTestId("Calculator_Addition"));
    fireEvent.click(screen.getByTestId("Calculator_5"));
    fireEvent.click(screen.getByTestId("Calculator_Equals"));

    expect(screen.getByTestId("Calculator_Result_Display").textContent).toBe("11 ");
});

test("shows input : 0 . 4", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("Calculator_0"));
    fireEvent.click(screen.getByTestId("Calculator_Dot"));
    fireEvent.click(screen.getByTestId("Calculator_4"));

    expect(screen.getByTestId("Calculator_Result_Display").textContent).toBe("0.4 ");
});

test("shows input : . 4", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("Calculator_Dot"));
    fireEvent.click(screen.getByTestId("Calculator_4"));

    expect(screen.getByTestId("Calculator_Result_Display").textContent).toBe("0.4 ");
});


test("shows input :  . 4 - . 2", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("Calculator_Dot"));
    fireEvent.click(screen.getByTestId("Calculator_4"));
    fireEvent.click(screen.getByTestId("Calculator_Subtraction"));
    fireEvent.click(screen.getByTestId("Calculator_Dot"));
    fireEvent.click(screen.getByTestId("Calculator_2"));

    expect(screen.getByTestId("Calculator_Result_Display").textContent).toBe("0.2 ");
});

test("shows result of input : . 4 - . 2 =", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("Calculator_Dot"));
    fireEvent.click(screen.getByTestId("Calculator_4"));
    fireEvent.click(screen.getByTestId("Calculator_Subtraction"));
    fireEvent.click(screen.getByTestId("Calculator_Dot"));
    fireEvent.click(screen.getByTestId("Calculator_2"));
    fireEvent.click(screen.getByTestId("Calculator_Equals"));

    expect(screen.getByTestId("Calculator_Result_Display").textContent).toBe("0.2 ");
});

test("shows input : 1 + 2 AC", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("Calculator_1"));
    fireEvent.click(screen.getByTestId("Calculator_Addition"));
    fireEvent.click(screen.getByTestId("Calculator_2"));
    fireEvent.click(screen.getByTestId("Calculator_AC"));

    expect(screen.getByTestId("Calculator_Result_Display").textContent).toBe("0 ");
});

test("shows input : + 2 AC", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("Calculator_Addition"));
    fireEvent.click(screen.getByTestId("Calculator_2"));
    fireEvent.click(screen.getByTestId("Calculator_AC"));

    expect(screen.getByTestId("Calculator_Result_Display").textContent).toBe("0 ");
});


test("shows input : 4 %", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("Calculator_4"));
    fireEvent.click(screen.getByTestId("Calculator_Percentage"));

    expect(screen.getByTestId("Calculator_Result_Display").textContent).toBe("0.04 ");
});



test("shows input : 4 % x 2", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("Calculator_4"));
    fireEvent.click(screen.getByTestId("Calculator_Percentage"));
    fireEvent.click(screen.getByTestId("Calculator_Multiplication"));
    fireEvent.click(screen.getByTestId("Calculator_2"));
    fireEvent.click(screen.getByTestId("Calculator_Equals"))


    expect(screen.getByTestId("Calculator_Result_Display").textContent).toBe("0.08 ");
});


test("shows input : 4 % x 2", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("Calculator_4"));
    fireEvent.click(screen.getByTestId("Calculator_Percentage"));
    fireEvent.click(screen.getByTestId("Calculator_Multiplication"));
    fireEvent.click(screen.getByTestId("Calculator_2"));

    expect(screen.getByTestId("Calculator_Result_Display").textContent).toBe("2 ");
});


test("shows input : 2 x 2 % ", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("Calculator_2"));
    fireEvent.click(screen.getByTestId("Calculator_Multiplication"));
    fireEvent.click(screen.getByTestId("Calculator_2"));
    fireEvent.click(screen.getByTestId("Calculator_Percentage"));

    expect(screen.getByTestId("Calculator_Result_Display").textContent).toBe("0.04 ");
});


test("shows input : 2 x x", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("Calculator_2"));
    fireEvent.click(screen.getByTestId("Calculator_Multiplication"));
    fireEvent.click(screen.getByTestId("Calculator_Multiplication"));

    expect(screen.getByTestId("Calculator_Result_Display").textContent).toBe("2 ");
});


test("shows input : 2 x x", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("Calculator_2"));
    fireEvent.click(screen.getByTestId("Calculator_Multiplication"));
    fireEvent.click(screen.getByTestId("Calculator_Multiplication"));

    expect(screen.getByTestId("Calculator_Result_Display").textContent).toBe("2 ");
});


test("shows input : 2 ÷ ÷", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("Calculator_2"));
    fireEvent.click(screen.getByTestId("Calculator_Division"));
    fireEvent.click(screen.getByTestId("Calculator_Division"));

    expect(screen.getByTestId("Calculator_Result_Display").textContent).toBe("2 ");
});


test("shows input : 2 ÷ x ÷ + - x", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("Calculator_2"));
    fireEvent.click(screen.getByTestId("Calculator_Division"));
    fireEvent.click(screen.getByTestId("Calculator_Multiplication"));
    fireEvent.click(screen.getByTestId("Calculator_Division"));
    fireEvent.click(screen.getByTestId("Calculator_Addition"));
    fireEvent.click(screen.getByTestId("Calculator_Subtraction"));
    fireEvent.click(screen.getByTestId("Calculator_Multiplication"));


    expect(screen.getByTestId("Calculator_Result_Display").textContent).toBe("2 ");
});


















test("shows result of substraction ", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("Calculator_2"));
    fireEvent.click(screen.getByTestId("Calculator_Subtraction"));
    fireEvent.click(screen.getByTestId("Calculator_3"));
    fireEvent.click(screen.getByTestId("Calculator_Equals"));

    expect(screen.getByTestId("Calculator_Result_Display").textContent).toBe("-1 ");
});


test("shows result of multiplication ", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("Calculator_2"));
    fireEvent.click(screen.getByTestId("Calculator_Multiplication"));
    fireEvent.click(screen.getByTestId("Calculator_3"));
    fireEvent.click(screen.getByTestId("Calculator_Equals"));

    expect(screen.getByTestId("Calculator_Result_Display").textContent).toBe("6 ");
});

test("shows result of multiplication ", () => {
    render(<App />);
    fireEvent.click(screen.getByTestId("Calculator_2"));
    fireEvent.click(screen.getByTestId("Calculator_Multiplication"));
    fireEvent.click(screen.getByTestId("Calculator_3"));
    fireEvent.click(screen.getByTestId("Calculator_Equals"));

    expect(screen.getByTestId("Calculator_Result_Display").textContent).toBe("6 ");
});




//#endregion



//     console.log(screen.getByTestId("Calculator_Result_Display").textContent); // Should log "2"

//     expect(screen.getByTestId("Calculator_Result_Display").textContent).toBe("2");

//     fireEvent.click(screen.getByTestId("Calculator_Addition"));
//     fireEvent.click(screen.getByTestId("Calculator_3"));
//     fireEvent.click(screen.getByTestId("Calculator_Equals"));

//     await waitFor(() => {
//         expect(screen.getByTestId("Calculator_Result_Display").textContent).toBe("5");
//       });
//   })

//   test('division by zero ', () => {
//     expect(operate("6", "0", "÷")).toBe("0");
//   });
