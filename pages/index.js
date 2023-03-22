import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import react, { useState } from 'react'
import { headers } from '../next.config'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [image, setImage] = useState(null)
  const [resImage, setResImage] = useState(null)
  const handleChange = (event) => {
    let input = document.getElementById('input')
    var fReader = new FileReader()
    fReader.readAsDataURL(input.files[0])
    fReader.onloadend = (e) => {
      console.log(e.target.result)
      setImage(e.target.result)
    } 
  }
  const sendImage = async () => {
    try {
      const result = await axios.post('http://34.229.143.55:8081/process-image', {image: image, name: "KPUN", surname: "EIEI", numbers: [1,2]}, {
        'Access-Control-Allow-Origin': "*"
      })
      console.log(result.data)
    }
    catch(e){
      console.log(e)
    }
  }
  return (
    <div className={styles.container}>
      <div>
        <input id='input' type='file' onChange={() => handleChange()}/>
      </div>
      <button onClick={() => sendImage()}>Send</button>
      
      { image && (
        <div>
          <Image id='image'width={300} height={300} src={image} alt='eiei' style={{objectFit: 'cover'}}/>
        </div>
      )}
      <div>
        { resImage && (
          <Image id='image2' width={300} height={300} src={resImage} alt='hello'/>
        )}
      </div>
    </div>
  )
}
