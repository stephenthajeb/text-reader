import logo from './logo.svg'
import './App.css'
import { data } from './constant.js'
import Card from './Component/Card'
import CardContainer from './Component/CardContainer'

function App() {
  return (
    <div className="container">
      <section>
        <h1>Text Reader</h1>
        <button id="toggle" className="btn btn-toggle">
          Input Custom Text
        </button>
        <div id="text-box" className="text-box">
          <div id="close" className="close">
            X
          </div>
          <h3>Choose Voice</h3>
          <select id="voices"></select>
          <textarea id="text" placeholder="Enter text to read..."></textarea>
          <button className="btn" id="read">
            Read Text
          </button>
        </div>
      </section>
      <main>
        <CardContainer>
          {data.map((item) => (
            <Card item={item} key={item.text} />
          ))}
        </CardContainer>
      </main>
    </div>
  )
}

export default App
