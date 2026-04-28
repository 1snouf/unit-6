// Get the input fields, button, and result paragraph from the HTML
const priceInput = document.getElementById("price");
const litersInput = document.getElementById("liters");
const calculateBtn = document.getElementById("calculateBtn");
const result = document.getElementById("result");

// Add a click event to the button
calculateBtn.addEventListener("click", function () {
  // Convert the input values into numbers
  const price = Number(priceInput.value);
  const liters = Number(litersInput.value);

  // Calculate the total petrol cost
  const total = price * liters;

  // Display the total cost on the screen
  result.textContent = "Total cost: " + total.toFixed(2);
});