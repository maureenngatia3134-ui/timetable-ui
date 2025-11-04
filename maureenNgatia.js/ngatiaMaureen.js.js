//maureenNgatia.js
// A simple JavaScript function to check if a number is even
// Function to reverse a string
const reverseString = (str) => {
  //split the string into an array of characters
  //  reverse the array
  //  join it back into a string
  return str.split("").reverse().join("");
}
//test cases
console.log(reverseString("hello")); // Output: "olleh"
console.log(reverseString("12345")); // Output: "54321"
console.log(reverseString("")); // Output: """"