//Name  : Hettiarachchi Harsha Prabhath Chamara
//ID    :M25W7571

// Get the calculator display
const display = document.getElementById("display");

// Get all calculator buttons
const buttons = document.querySelectorAll(".buttons button");

// Add click event to all buttons
buttons.forEach(button => {

    button.addEventListener("click", function () {

        const value = this.dataset.value;
        const action = this.dataset.action;

        // Number and operator buttons
        if (value !== undefined) {
            appendValue(value);
        }

        // Scientific calculator buttons
        else if (action !== undefined) {
            handleAction(action);
        }

    });

});


// Add numbers and operators to display
function appendValue(value) {

    if (display.value === "Error") {
        display.value = "";
    }

    if (display.value === "0") {
        display.value = value;
    } else {
        display.value += value;
    }
}


// Calculate the mathematical expression
function calculate() {

    const expression = display.value;

    // Allow only mathematical characters
    if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
        throw new Error("Invalid Expression");
    }

    const result = Function(
        '"use strict"; return (' + expression + ')'
    )();

    if (!Number.isFinite(result)) {
        throw new Error("Invalid Result");
    }

    return result;
}


// Handle calculator functions
function handleAction(action) {

    try {

        // Clear button
        if (action === "clear") {
            display.value = "";
            return;
        }

        // Equal button
        if (action === "equals") {
            display.value = formatResult(calculate());
            return;
        }

        // Get current number
        const number = calculate();

        let result;

        switch (action) {

            case "sin":
                result = Math.sin(number * Math.PI / 180);
                break;

            case "cos":
                result = Math.cos(number * Math.PI / 180);
                break;

            case "tan":
                if (Math.abs(Math.cos(number * Math.PI / 180)) < 1e-12) {
                    throw new Error("Undefined");
                }
                result = Math.tan(number * Math.PI / 180);
                break;

            case "sqrt":
                result = Math.sqrt(number);
                break;

            case "log":
                result = Math.log10(number);
                break;

            case "ln":
                result = Math.log(number);
                break;

            case "square":
                result = number * number;
                break;

            case "cube":
                result = number * number * number;
                break;

            default:
                return;
        }

        if (!Number.isFinite(result)) {
            throw new Error("Invalid Result");
        }

        display.value = formatResult(result);

    } catch (error) {

        display.value = "Error";

    }

}


// Format calculation result
function formatResult(number) {

    if (Math.abs(number) < 1e-12) {
        return "0";
    }

    return Number(number.toPrecision(12)).toString();
}
