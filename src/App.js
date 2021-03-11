import './App.css';
import React from "react";

function App() {
//   const [textInput, setTextInput] = React.useState(`This is
// a badly formatted file. This line is pretty long! It's way more than 80 characters! I feel a line wrap coming on!

// This      is a second paragraph with extraneous whitespace.`);
  const [textInput, setTextInput] = React.useState(`Withthisutilityyougeneratea16characteroutputbasedonyourinputofnumbersandupperandlowercaseletters.    Random strings can be unique. Used in     computing, 
  
  
  a random
  string
  generator can also be called a random character string generator.`);
  const [textOutput, setTextOutput] = React.useState('');

  const handleChange = event => {
    setTextInput(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    transformText(textInput);
  };

  const deleteWhitespace = text => {
    let textArray = text.split(" ");
    let newWord;
    let output;

    for (let i = 0; i < textArray.length; i++) {
      // Condition does nothing, assuming two newlines are always valid
      if (textArray[i].indexOf('\n\n') !== -1) {
      } else if (textArray[i].indexOf('\n') !== -1) { // Replace the newline with a space
        newWord = textArray[i].replace(/\n/, " ");
        textArray.splice(i, 1, newWord);
      }
    }

    output = textArray.join(" ");
    // Regex matches whitespace but not newline or carriage return
    output = output.replace(/[^\S\r\n]+/gm, " ");

    return output;
  }

  const max80Chars = text => {
    let textArray = text.split(" ");
    let str = "";
    let outputArray = [];
    let output;

    for (let j = 0; j < textArray.length; j++) {
      if (str.length + textArray[j].length < 80) {
        str += `${textArray[j]} `;
      } else {
        str = str.slice(0, -1); // slice off extra space at the end
        str += `\n`;
        outputArray.push(str);
        str = ""; // empty str after push
        str += `${textArray[j]} `;
      }
      // Start of a new paragraph
      if (textArray[j].indexOf('\n\n') !== -1) {
        outputArray.push(str);
        str = "";
      }
    }
    str = str.slice(0, -1); // slice off extra space at the end
    outputArray.push(str); // Push remaining string to array
    output = outputArray.join("");

    return output;
  }

  const transformText = input => {
    let output = input;

    output = deleteWhitespace(output)
    output = max80Chars(output)
    
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
