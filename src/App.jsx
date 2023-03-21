import { useState } from 'react'
import './App.css'
import BanWords from './components/BanWords';

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const URL = `https://api.thedogapi.com/v1/images/search?api_key=${ACCESS_KEY}&has_breeds=${true}`;

  const [imageURL, setImageURL] = useState("");
  const [dogInfo, setDogInfo] = useState([]);
  const [bannedWords, setBannedWords] = useState([]);
  const [words, setWords] = useState([""]);
  const [counter, setCounter] = useState(1);

  const callAPI = async () => {
    const response = await fetch(URL);
    const json = await response.json();

    let dogName = json[0].breeds[0].name;
    let dogLifeSpan = json[0].breeds[0].life_span;
    let dogTemperament = json[0].breeds[0].temperament;

    if (words.includes(dogName) || words.includes(dogLifeSpan) || words.includes(dogTemperament)) {
      let newResponse;
      let newJson;

      while (words.includes(dogName) || words.includes(dogLifeSpan) || words.includes(dogTemperament)) {
        console.log("Getting new information");
        newResponse = await fetch(URL);
        newJson = await newResponse.json();
  
        dogName = newJson[0].breeds[0].name;
        dogLifeSpan = newJson[0].breeds[0].life_span;
        dogTemperament = newJson[0].breeds[0].temperament;
      }

      setImageURL(newJson[0].url);
      setDogInfo(newJson[0].breeds[0]);
    } else {
      console.log(dogName);
      console.log("Need image");
      console.log(json[0].url);

      setImageURL(json[0].url);
      setDogInfo(json[0].breeds[0]);

    }
  }

  function banDogName() {
    if (words.includes(dogInfo.name)) {
      console.log("Name already here")
      return;
    } else {
      setBannedWords(prev => [...prev, {id: counter, name: dogInfo.name}]);
      setWords(prev => [...prev, dogInfo.name]);
      setCounter(counter + 1);
    }
  }

  function banDogLifeSpan() {
    if (words.includes(dogInfo.life_span)) {
      console.log("Lifespan already here")
      return;
    } else {
      setBannedWords(prev => [...prev, {id: counter, name: dogInfo.life_span}]);
      setWords(prev => [...prev, dogInfo.life_span]);
      setCounter(counter + 1);
    }
  }

  function banDogTemperament() {

    if (words.includes(dogInfo.temperament)) {
      console.log("Temperant already here")
      return;
    } else {
      setBannedWords(prev => [...prev, {id: counter, name: dogInfo.temperament}]);
      setWords(prev => [...prev, dogInfo.temperament]);
      setCounter(counter + 1);
    }
  }



  return (
    <div className="App">
      <h1>Check This Dog Pic 🐶</h1>
      <div className="BanList">
        <h2 className="BanListTitle">Banned Word List</h2>
        <p className="BanListDes">Here are some words you banned:</p>
        {bannedWords.map((word) => <BanWords key={word.id} name={word.name}/>)}
      </div>

      <br></br>

      <button className="Button" onClick={callAPI}>Click here to see a dog picture!</button>
      <br></br>
      <br></br>

      <div className="DogInformation">
        <button className="DogButton" onClick={banDogName}>{dogInfo.name}</button>
        <button className="DogButton" onClick={banDogLifeSpan}>{dogInfo.life_span}</button>
        <button className="DogButton" onClick={banDogTemperament}>{dogInfo.temperament}</button>

        <br></br>
        <img className="Image" src={imageURL}></img>
      </div>
    </div>

  )
}

export default App
