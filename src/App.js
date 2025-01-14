import './App.css';
import React from "react";

function App() {
  const [textInput, setTextInput] = React.useState(`This is an extremely long line of text with lots and lot of characters in it. The previous sentence should be on a line by itself, and this one should also. However, this sentence is short. Multiple sentences fit here.


A very short paragraph.



Another short paragraph, after multiple blank lines.




Even more blank lines,    as well      as some erratic           space characters.
This
sentence
includes
a few words on lines by themselves that should be combined, and then
suchaverylongworditbelongsonalinebyitselfeventhoughitislongerthan80charactersandthelinebeforeisshort,
however, it's fine for these words to go on the next line. Formatting should continue normally at this point.`);
  const [textOutput, setTextOutput] = React.useState('');

  const handleChange = event => {
    setTextInput(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    transformText(textInput);
  };

  const formatParagraphs = paragraphs => {
    let formattedParagraphs = []
    paragraphs.forEach(paragraph => {
      const words = paragraph.split(/\s+/)
      let formattedLines = ""
      let line = ""
      let word = ""

      for (word of words) {
        if (line.length + word.length < 80) {
          line += `${word} `
        } else {
          line = line.slice(0, -1)
          line += `\n`
          formattedLines += line
          line = ""
          line += `${word} `
        }
      }

      line = line.slice(0, -1)
      formattedLines += line
      formattedParagraphs.push(formattedLines)
    })

    return formattedParagraphs
  }

  const transformText = input => {
    const paragraphs = input.split(/\n{2,}/gm)
    const formattedParagraphs = formatParagraphs(paragraphs)
    const reassembledText = formattedParagraphs.join('\n\n')
    setTextOutput(reassembledText)
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
