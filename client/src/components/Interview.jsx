import { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/theme/neat.css'
import 'codemirror/mode/xml/xml.js'
import 'codemirror/mode/javascript/javascript.js'

const starterCode = `
const bob = () => console.log("pollo")

const someFunction = () => {
  console.log('🐔🐔🐔')
}
`
const Interview = props => {
  const [code, setCode] = useState(starterCode)
  const [takeOver, setTakeOver] = useState(false)

  const options = {
    theme: 'material',
    tabSize: 2,
    mode: 'javascript',
    readOnly: !takeOver
  }
  return (
    <main className="Interview">
      <section class={`CodeMirror-container ${!takeOver ? 'read-only' : ''}`}>
        <CodeMirror
          value={code}
          options={options}

          onBeforeChange={(editor, data, value) => {
            setCode(value)
          }}
          onChange={(editor, data, value) => {
          }}
        />
      </section>
      <aside>
        <section className="webcam">
          <div>Interviewer</div>
          <div>Candidate</div>
        </section>
        <section>
          <button onClick={() => setTakeOver(!takeOver)}>Take over</button>
        </section>
      </aside>
    </main>
  )

}

export default Interview