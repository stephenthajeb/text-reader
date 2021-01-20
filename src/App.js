import logo from './logo.svg'
import './App.css'
import { data } from './constant.js'
import Card from './Component/Card'
import CardContainer from './Component/CardContainer'
import { useEffect, useState } from 'react'
import Slider from './Component/Slider'
import { useRange } from './customHook'

function App() {
  const [languages, setLanguages] = useState([])
  const [speech, setSpeech] = useState(new SpeechSynthesisUtterance())
  const [customText, setCustomText] = useState('')
  const rangeController = useRange(1, 0.23, 4)

  useEffect(() => {
    setLanguages(speechSynthesis.getVoices())
  }, [])

  const onChangeHandler = (e) => {
    setCustomText(e.target.value)
  }

  const cardOnClick = (cardText, idx) => {
    const newSpeech = speech
    newSpeech.text = cardText
    setSpeech(newSpeech)
    speechSynthesis.speak(speech)
    const selectedCard = document.getElementById('card' + idx)
    if (selectedCard) {
      selectedCard.classList.add('active')
      setTimeout(() => {
        selectedCard.classList.remove('active')
      }, 800)
    }
  }

  const closeModal = () => {
    document.getElementById('text-box').classList.remove('show')
  }

  const toggleModal = () => {
    document.getElementById('text-box').classList.toggle('show')
  }

  const changeLanguage = (e) => {
    const newSpeech = speech
    newSpeech.lang = e.target.value
    setSpeech(newSpeech)
  }

  const startReading = () => {
    const newSpeech = speech
    newSpeech.text = customText
    setSpeech(newSpeech)
    speechSynthesis.speak(speech)
  }

  const changeRate = () => {
    const newSpeech = speech
    newSpeech.rate = rangeController.value
    setSpeech(newSpeech)
  }

  const readTxt = async (e) => {
    const file = e.target.files[0]
    const textarea = document.getElementById('text')
    console.log(file)
    if (!file || file.type !== 'text/plain') {
      alert('Upload in .txt format')
      return
    }
    try {
      const content = await getTxtContent(file)
      console.log(content)
      setCustomText(content)
      if (textarea) {
        textarea.innerHTML = content
      }
    } catch (e) {
      alert('Error')
    }
  }

  const getTxtContent = (file) => {
    const reader = new FileReader()
    return new Promise((resolve, reject) => {
      reader.onload = (event) => resolve(event.target.result)
      reader.onerror = (error) => reject(error)
      reader.readAsText(file)
    })
  }

  return (
    <div className="container">
      <section>
        <h1>Text Reader</h1>
        <button className="btn btn-toggle" onClick={toggleModal}>
          Input Custom Text
        </button>
        <div className="slider-wrapper">
          <Slider changeRate={changeRate} rangeController={rangeController} />
        </div>
        <div id="text-box" className="text-box">
          <div id="close" className="close" onClick={closeModal}>
            X
          </div>
          <h3>Choose Voice</h3>
          <select onChange={changeLanguage}>
            {languages &&
              languages.map((item) => (
                <option value={item.lang} key={item.name}>
                  {item.lang}
                </option>
              ))}
          </select>
          <textarea
            id="text"
            placeholder="Enter text to read..."
            value={customText}
            onChange={onChangeHandler}
          ></textarea>
          <input type="file" onChange={readTxt} />
          <button className="btn" onClick={startReading}>
            Read Text
          </button>
        </div>
      </section>
      <main>
        <CardContainer>
          {data.map((item, idx) => (
            <Card item={item} key={item.text} idx={idx} onClick={cardOnClick} />
          ))}
        </CardContainer>
      </main>
    </div>
  )
}

export default App
