import Big from "big.js";

export const operate = (numberOne, numberTwo, operation) => {
    const operations={
        "+": (one, two) => one.plus(two).toString(),
        "-": (one, two) => one.minus(two).toString(),
        "x": (one, two) => one.times(two).toString(),
        "÷": (one, two) => {
            if (Number(two) === 0) {
                alert("Divide by 0 error");
                return 0;
            }
            return one.div(two).toString();
        },
    }

    const one = Big(numberOne || "0");
    const two = Big(
      numberTwo || (operation === "÷" || operation === "x" ? "1" : "0"),
    ); 

    if (operations[operation]) {  
        return operations[operation](one, two);
     }
    throw Error(`Unknown operation '${operation}'`);
  };