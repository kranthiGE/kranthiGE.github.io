/*
Worker JS to resize pizzas based on slider change

Creator: Kranthi, Front end udacity developer
Created date: 26-Dec-15
*/

// Returns the size difference to change a pizza element from one size to another. Called by changePizzaSlices(size).
 // Modified by Kranthi on 26-Dec-15
 // windowWidth is common for all elements and so removed redundant calculation
 // sizeSwitcher need not be executed for every element as it is common and is based on size which is available in changePizzaSizes function
this.onmessage = function(e) {
  var pizzaSize = e.data.pizzaSize;
  var width = e.data.winWidth;
  var offsetWidth = e.data.offsetWidth;
  try{
    postMessage(changeSize(pizzaSize, width, offsetWidth));
  } catch (e) {
    function PizzaChangeException(message) {
      this.name = "PizzaChangeException";
      this.message = message;
    };
    throw new PizzaChangeException('Error occurred when changing pizza size');
    postMessage(undefined);
  }
}

function determineDx (newSize, windowWidth, offsetWidth) {
  var oldWidth = offsetWidth;
  var oldSize = oldWidth / windowWidth;
  var dx = (newSize - oldSize) * windowWidth;
  return dx;
}

function sizeSwitcher (size) {
  switch(size) {
    case "1":
      return 0.25;
    case "2":
      return 0.3333;
    case "3":
      return 0.5;
    default:
      console.log("bug in sizeSwitcher");
  }
}

// created by Kranthi on 26Dec-15
// querySelector object can be delcared once and reusable
// returns width by calculating based on inputs
function changeSize(size, windowWidth, offsetWidth) {
  var newSize = sizeSwitcher(size);
  var dx = determineDx(newSize, windowWidth, offsetWidth);
  return (offsetWidth + dx) + 'px';
}