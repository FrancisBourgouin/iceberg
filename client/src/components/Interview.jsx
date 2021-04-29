import { useEffect, useRef, useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2'

import useWebcam from '../hooks/useWebcam'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/theme/neat.css'
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

  const webcamFeed = useRef()
  const { authorized, webcamList, stream, chooseStream } = useWebcam()

  useEffect(() => {
    if (!stream) {
      return
    }
    navigator
      .mediaDevices
      .getUserMedia({ video: true })
      .then(stream => {
        webcamFeed.current.srcObject = stream
      })
  }, [stream])



  const streams = webcamList.map(streamItem => {
    return <li onClick={() => chooseStream(streamItem)}>{(stream && stream.label === streamItem.label) ? "X" : ""} - {streamItem.label}</li>
  })

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
          <video ref={webcamFeed} onLoadedData={() => webcamFeed.current.play()}></video>
          <div>Candidate</div>
        </section>
        <section>
          {streams}
        </section>
        <section>
          <button onClick={() => setTakeOver(!takeOver)}>Take over</button>
        </section>
      </aside>
    </main>
  )

}

export default Interview