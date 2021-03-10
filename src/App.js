import './App.css';
import React from "react";

function App() {
  const [textInput, setTextInput] = React.useState(`This is
a badly formatted file. This line is pretty long! It's way more than 80 characters! I feel a line wrap coming on!

This      is a second paragraph with extraneous whitespace.`);
  const [textOutput, setTextOutput] = React.useState('');

  const handleChange = event => {
    setTextInput(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    transformText(textInput);
  };

  const transformText = input => {
    let output = input;
    let word = "";
    // Stripping all spaces won't work in case of valid newline
    // let newStr = output.replace(/\s+/gm, " ")
    let outputArr = output.split(" ")
    let newOutput = ""
    // Use a regular for loop after refactor to make use of index
    for (word of outputArr) {
      // Keep the two new lines, assumuming two newlines are always valid
      if (word.indexOf('\n\n') !== -1) {
        console.log("contains two newlines")
      } else if (word.indexOf('\n') !== -1) { // Replace the newline with a space
        // get index of array element
        const index = outputArr.indexOf(word)
        console.log("contains newline")
        const newWord = word.replace(/\n/, " ")
        // console.log(newWord)
        // console.log(index)
        outputArr.splice(index, 1, newWord)
        // newOutput = newWord.join(" ")
      }
      // newOutput = word.join(" ")
    }
    console.log(outputArr);
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
