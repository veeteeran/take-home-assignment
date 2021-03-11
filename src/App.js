import './App.css';
import React from "react";

function App() {
//   const [textInput, setTextInput] = React.useState(`This is
// a badly formatted file. This line is pretty long! It's way more than 80 characters! I feel a line wrap coming on!

// This      is a second paragraph with extraneous whitespace.`);
  const [textInput, setTextInput] = React.useState(`With this utility you generate a 16 character output based on your input of numbers and upper and lower case letters.  Random strings can be unique. Used in computing, a random string generator can also be called a random character string generator.`);
  const [textOutput, setTextOutput] = React.useState('');

  const handleChange = event => {
    setTextInput(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    transformText(textInput);
  };

  const transformText = input => {
    // Consider lines 22-35 as a separate function
    let output = input;
    let newStr;
    let outputArr = output.split(" ")
    for (let i = 0; i < outputArr.length; i++) {
      // Keep the two new lines, assuming two newlines are always valid
      if (outputArr[i].indexOf('\n\n') !== -1) {
      } else if (outputArr[i].indexOf('\n') !== -1) { // Replace the newline with a space
        const newWord = outputArr[i].replace(/\n/, " ")
        outputArr.splice(i, 1, newWord)
      }
    }
    newStr = outputArr.join(" ")
    // Matches whitespace but not newline or carriage return
    output = newStr.replace(/[^\S\r\n]+/gm, " ")

    outputArr = output.split(" ")
    let newOutput = ""
    let arr = []
    for (let j = 0; j < outputArr.length; j++) {
      if (newOutput.length + outputArr[j].length < 80) {
        newOutput += `${outputArr[j]} `
      } else {
        newOutput = newOutput.slice(0, -1) // slice off extra space at the end
        newOutput += `\n`
        arr.push(newOutput, `${outputArr[j]} `)
        newOutput = ""
      }
      // Push to array then start a new paragraph
      if (outputArr[j].indexOf('\n\n') !== -1) {
        arr.push(newOutput)
        newOutput = ""
      }
    }
    // Yikes definitely refactor
    arr[arr.length - 1] = arr[arr.length - 1].slice(0, -1)
    arr.push(newOutput)
    console.log(arr)
    output = arr.join("")
    // Max length of lines is 80 characters
    // If 80th character is in a word, break at previous space
    // A word more than 80 characters can stay on one line
    // 1 newline between paragraphs
    // 1 space or newline in formatted text
    setTextOutput(output);
  }
  
  return (
    <div className="App">
      <header>
        <h1>Career Lab | Take-Home Assignment</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <label>
          <textarea onChange={handleChange} value={textInput}/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
      <div id="result">
        {textOutput}
      </div>
    </div>
  );
}

export default App;
