import React, { useEffect, useState } from 'react'


export default function useWebcam() {
  const [authorized, setAuthorized] = useState(null)
  const [webcamList, setWebcamList] = useState([])
  const [selectedDevice, setSelectedDevice] = useState(null)
  const [stream, setStream] = useState(null)

  const chooseStream = (stream) => {
    setSelectedDevice(stream)
  }

  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      console.log("enumerateDevices() not supported.");
      return;
    }

    navigator.mediaDevices.enumerateDevices()
      .then(function (devices) {
        devices.forEach(function (device) {
          if (device.kind === 'videoinput') {
            console.log(device.kind + ": " + device.label +
              " id = " + device.deviceId);

            setWebcamList(prev => [...prev, { label: device.label, id: device.deviceId }])

          }

        });
      })
      .catch(function (err) {
        console.log(err.name + ": " + err.message);
        setAuthorized(false)
      });
  }, [])

  useEffect(() => {
    if (selectedDevice) {
      const constraint = { video: { deviceId: selectedDevice.id } }

      navigator.mediaDevices.getUserMedia(constraint).then(function (stream) {
        setStream(stream)
        setAuthorized(true)
      }).catch(function (err) {
        /* handle the error */
        setAuthorized(false)
      });
    }
  }, [selectedDevice])

  return { authorized, webcamList, stream, chooseStream }

}