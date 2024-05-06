"use strict"

// Wait for the entire content of the webpage to load before executing the script. This ensures all HTML elements are fully loaded before the script tries to interact with them.
document.addEventListener("DOMContentLoaded", () => {
    // Select the input display element where the calculator's output is shown.
    const inputDisplay = document.querySelector(".input");
    // Initialize the current input as "0". This is the default state of the calculator and handles leading zeros.
    let currentInput = "0";

    // A function to update the calculator's display.
    const updateDisplay = () => {
        // Set the display's text content to the current input or "0" if currentInput is empty.
        inputDisplay.textContent = currentInput || "0";
        // Adjust the font size based on the length of the current input.
        // Ensures the display text does not overflow the input display area.
        let fontSize = Math.max(30, 60 - currentInput.length * 3);
        inputDisplay.style.fontSize = `${fontSize}px`;
    };

    // Function to make sure the multipication adn division buttons work correctly 
    const sanitizeInput = (input) => {
        // Convert HTML entities or other non-standard characters to standard characters that JavaScript can evaluate.
        switch (input) {
            case '÷':  // HTML entity for division symbol
                return '/';
            case '×':  // HTML entity for multiplication symbol
                return '*';
            default:
                return input;
        }
    };

    // Attach a click event listener to each button with the class "btn".
    document.querySelectorAll(".btn").forEach(button => {
        button.addEventListener("click", () => {
            // Process the input after sanitizing button text to ensure proper mathematical symbols are used.
            processInput(sanitizeInput(button.textContent));
        });
    });

    // Listen for keydown events to handle keyboard input for the calculator.
    document.addEventListener("keydown", (e) => {
        const key = e.key;
        // Define an array of acceptable key inputs for the calculator.
        const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '.'];
        if (allowedKeys.includes(key)) {
            // If the key pressed is an allowed key, process the input.
            processInput(key);
        } else if (key === 'Enter' || key === '=') {
            // Treat the Enter key and the "=" key as the equals operation.
            processInput('=');
        } else if (key === 'Delete' || key === 'Backspace') {
            // Treat Delete and Backspace keys as the clear operation.
            processInput('C');
        }
    });

    // Define a function to process various types of inputs based on user interaction.
    const processInput = (input) => {
        if (input === 'C') {
            // Reset the current input to zero if "C" (clear) is pressed.
            currentInput = "0";
        } else if (input === '=') {
            // If "=" is pressed, evaluate the current mathematical expression.
            currentInput = evaluateExpression(currentInput);
        } else {
            // For numeric and operator inputs:
            if (currentInput === "0" || currentInput === "Error") {
                // Properly handle input when starting fresh or recovering from an error.
                currentInput = input === '.' ? '0.' : input;
            } else {
                // Append the input to the current input string.
                currentInput += input;
            }
        }
        // Update the display after processing the input.
        updateDisplay();
    };

    // Define a function to evaluate mathematical expressions.
    const evaluateExpression = (expression) => {
        try {
            // Attempt to evaluate the expression using JavaScript's eval function.
            const result = eval(expression);
            // Convert the result to a string and return it.
            return result.toString();
        } catch (error) {
            // If an error occurs during evaluation, return "Error".
            return "Error";
        }
    };
});




///Extra stuff to add

//Decided to add my own extra things to the calulator that wasnt in the optional list
// I wanted to add more styalistic things to my page that is made with javascript
//Below I added a celebration button to add claps when you get a problem right you have to mainly click it.
// I then also added a drop down menu that just changes the different colors of the calc




document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", () => {
        if (button.textContent === '👏🏾') {
            clapSound.play(); // Play the clapping sound if the clapping emoji button is clicked
        } else {
            processInput(button.textContent); // Process other button clicks normally
        }
    });
});




document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector('.container');
    const toggle = document.getElementById('color-toggle');

    toggle.addEventListener('change', () => {
        container.classList.remove('green-theme', 'yellow-theme'); // Remove previous themes
        switch(toggle.value) {
            case 'green':
                container.classList.add('green-theme');
                break;
            case 'yellow':
                container.classList.add('yellow-theme');
                break;
            default:
                break; // No theme class added for default
        }
    });
});
