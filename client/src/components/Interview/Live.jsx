import { useEffect, useRef, useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2'
import io from 'socket.io-client'
import { useParams } from "react-router-dom";

import useWebcam from '../../hooks/useWebcam'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/theme/neat.css'
import 'codemirror/mode/javascript/javascript.js'
import '../../styles/Live.scss'
import '../../styles/editor/iceberg-code-dark.scss'


const starterCode = `const bob = () => console.log("pollo")

const someFunction = () => {
  console.log('🐔🐔🐔')
}
`
const Live = props => {
  const { interviewer } = props
  const [code, setCode] = useState(starterCode)
  const [takeOver, setTakeOver] = useState(!interviewer)
  const [viewSettings, setViewSettings] = useState(false)
  const [socket, setSocket] = useState(null)

  const webcamFeed = useRef()
  const { webcamList, stream, chooseStream } = useWebcam()
  const { interviewId } = useParams();

  const updateCode = value => {
    setCode(value)
    socket.emit('updateCode', { interviewId, code: value })
  }

  const updateTakeOver = () => {
    socket.emit('lockCode', { interviewId, lock: takeOver })

    setTakeOver(!takeOver)
  }


  const toggleSettings = () => setViewSettings(!viewSettings)

  useEffect(() => {
    const newSocket = io()

    newSocket.on('message', (data) => console.log(data))
    newSocket.on('connect', () => {
      newSocket.emit('join', { interviewId })
    })
    newSocket.on('codeUpdate', data => {
      setCode(data)
    })
    newSocket.on('codeLock', data => {
      console.log('settakeover')
      setTakeOver(data)
    })

    setSocket(newSocket)
  }, [])

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
    theme: 'iceberg-dark',
    tabSize: 2,
    mode: 'javascript',
    readOnly: !takeOver
  }
  return (
    <main className="Live">
      <section class={`CodeMirror-container ${!takeOver ? 'read-only' : ''}`}>
        <CodeMirror
          value={code}
          options={options}

          onBeforeChange={(editor, data, value) => {
            updateCode(value)
          }}
          onChange={(editor, data, value) => {
          }}
        />
      </section>
      <aside>
        <section className="webcam">
          <video
            ref={webcamFeed}
            onLoadedData={() => webcamFeed.current.play()}
            onClick={toggleSettings}></video>
          <section>
            {viewSettings && streams}
          </section>
          <video ></video>
        </section>

        {interviewer && <section>
          <button onClick={updateTakeOver}>
            {!takeOver && <span>Take over</span>}
            {takeOver && <span>Give back control</span>}
          </button>
        </section>}
      </aside>
    </main>
  )

}

export default Live