import React, { useEffect, useState } from "react";
let svgImageItem = require.context('../IQTestImages', true, /(item (\d|\d\d)\/(\d|\d\d)\.svg)$/)
let svgImageOptions = require.context('../IQTestImages', true, /item ((\d|\d\d)\/(\d|\d\d)\.\d\.svg)$/)

function IQTestApp(props) {

  return (
    <div>
      <TimeTakenSoFar onTimeChange={props.onTimeChange} elapsed={props.elapsed} nextItem={props.nextItem} itemNumber={props.itemNumber} />
      <IQTestItem nextItem={props.nextItem} itemNumber={props.itemNumber} handleCorrectAnswer={props.handleCorrectAnswer} correctAnswers={props.correctAnswers} />
      <ItemInformation elapsed={props.elapsed} itemNumber={props.itemNumber} timeForItem={props.timeForItem} measureItemTime={props.measureItemTime} />
    </div>
  );
}

function TimeTakenSoFar(props) {
  let [date] = useState(new Date())

  useEffect(() => {
    const timerID = setInterval(() => tick(), 50);
    return () => clearInterval(timerID);
  })

  function msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = (s % 60).toString().padStart(2, "0");
    s = (s - secs) / 60;
    var mins = (s % 60).toString().padStart(2, "0");
    var hrs = ((s - mins) / 60);

    //return hrs + ':' + mins + ':' + secs + '.' + ms;
    return hrs + ':' + mins + ':' + secs + '.' + ms;
  }

  const tick = () => {
    let start = date
    let end = new Date()
    let elapsed = 0
    elapsed = + (end - start);
    //elapsed = +  ((end - start) / 1000).toFixed(0)
    //setElapsed(elapsed)
    props.onTimeChange(elapsed)
  }

  return (
    <div className="container text-center mt-4 time">{msToTime(props.elapsed)}
      {/* Time taken so far: {Math.floor((props.elapsed) / 60)}:{((props.elapsed) % 60).toString().padStart(2, "0")} */}
      {/* <TimeLeftForItem elapsed={props.elapsed} nextItem={props.nextItem} itemNumber={props.itemNumber} /> */}
    </div>

  )
}

// function TimeLeftForItem(props) {
//   let [timeLeft, setTimeLeft] = useState(180)

//   useEffect(() => {
//     let time = timeLeft - 1
//     setTimeLeft(time)
//     if(timeLeft === 1 || timeLeft === 0) {
//       setTimeLeft(180)
//       props.nextItem()
//     }
//   }, [props.elapsed])


//   useEffect(() => {
//     setTimeLeft(180)
//   }, [props.itemNumber])

//   return (
//     <div>
//       <div>Time left for this item: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')} </div>
//       <div>timeLeft: {timeLeft}</div>
//     </div>
//   )
// }

function ItemInformation(props) {

  function msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = (s % 60).toString().padStart(2, "0");
    s = (s - secs) / 60;
    var mins = (s % 60).toString().padStart(2, "0");

    //return hrs + ':' + mins + ':' + secs + '.' + ms;
    return mins + ':' + secs + '.' + ms;
  }

  useEffect(() => {
    if (props.itemNumber >= 2) {
      props.measureItemTime();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.itemNumber])

  // let listItems = timeForItem.map((itemTime, index) => <li key={index}>{itemTime} milliseconds</li>)
  let listItems = props.timeForItem.map((itemTime, index) => <li className="pl-4" key={index}>{msToTime(itemTime)} mm:ss:ms</li>)

  return (
    <div className="grid-container mt-3 ml-3"><ol>{listItems.slice(1)}</ol></div>
  )
}

function IQTestItem(props) {
  return (

    <div className="container text-center">
      {/* <div className="mb-3">Number of correct Answers: {props.correctAnswers}</div> */}
      <img className="item rounded" src={svgImageItem(`./item ${props.itemNumber}/${props.itemNumber}.svg`).default} alt={`item ${ItemNumber}`} />
      <ItemNumber itemNumber={props.itemNumber} />
      <ItemOptions itemNumber={props.itemNumber} nextItem={props.nextItem} handleCorrectAnswer={props.handleCorrectAnswer} />
    </div>
  )

}

function ItemNumber(props) {
  return (
    <div className="mb-3 ml-4"> {props.itemNumber}/49 </div>
  )
}

function ItemOptions(props) {
  let itemNumber = props.itemNumber
  let [options, setOptions] = useState([])

  useEffect(() => {
    const option1 = <input type="image" src={svgImageOptions(`./item ${itemNumber}/${itemNumber}.1.svg`).default} alt={`Option 1`} onClick={props.handleCorrectAnswer} key={1} />
    const option2 = <input type="image" src={svgImageOptions(`./item ${itemNumber}/${itemNumber}.2.svg`).default} alt={`Option 2`} onClick={props.nextItem} key={2} />
    const option3 = <input type="image" src={svgImageOptions(`./item ${itemNumber}/${itemNumber}.3.svg`).default} alt={`Option 3`} onClick={props.nextItem} key={3} />
    const option4 = <input type="image" src={svgImageOptions(`./item ${itemNumber}/${itemNumber}.4.svg`).default} alt={`Option 4`} onClick={props.nextItem} key={4} />
    const option5 = <input type="image" src={svgImageOptions(`./item ${itemNumber}/${itemNumber}.5.svg`).default} alt={`Option 5`} onClick={props.nextItem} key={5} />
    const option6 = <input type="image" src={svgImageOptions(`./item ${itemNumber}/${itemNumber}.6.svg`).default} alt={`Option 6`} onClick={props.nextItem} key={6} />
    const option7 = <input type="image" src={svgImageOptions(`./item ${itemNumber}/${itemNumber}.7.svg`).default} alt={`Option 7`} onClick={props.nextItem} key={7} />
    const option8 = <input type="image" src={svgImageOptions(`./item ${itemNumber}/${itemNumber}.8.svg`).default} alt={`Option 8`} onClick={props.nextItem} key={8} />
    const newOptions = [option1, option2, option3, option4, option5, option6, option7, option8]
    let newArr = shuffle(newOptions)
    setOptions(newArr)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemNumber])

  return (
    <div className="grid-container mt-2 options">
      <div className="item1">
        {options[0]}
      </div>
      <div className="item2">
        {options[1]}
      </div>
      <div className="item3">
        {options[2]}
      </div>
      <div className="item4">
        {options[3]}
      </div>
      <div className="item5">
        {options[4]}
      </div>
      <div className="item6">
        {options[5]}
      </div>
      <div className="item7">
        {options[6]}
      </div>
      <div className="item8">
        {options[7]}
      </div>
    </div>
  )
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export default IQTestApp;