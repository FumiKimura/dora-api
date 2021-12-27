import React, { useState } from 'react';
import ReactJson from 'react-json-view';
import './App.css';
import Navigation from './navigation/navigation';
import Footer from './footer/footer'
import axios from 'axios';

function App() {

  //Hooks
  const [request, setRequest] = useState("GET");
  const [apiPath, setApiPath] = useState("");
  const [json, setJSON] = useState({});

  //Handler
  async function handleSubmit(event: React.MouseEvent<HTMLInputElement>){  
    event.preventDefault();
    let response;
    switch (request) {
      case "GET":
        response = await axios.get("https://doraemon-api.herokuapp.com/" + apiPath);
        setJSON(response.data);
        break;
      case "POST":
        response = await axios.post("https://doraemon-api.herokuapp.com/" + apiPath, json);
        setJSON(response.data);
        break;
      case "PATCH":
        response = await axios.patch("https://doraemon-api.herokuapp.com/" + apiPath, json);
        setJSON(response.data);
        break;
      case "DELETE":
        response = await axios.delete("https://doraemon-api.herokuapp.com/" + apiPath);
        setJSON(response.data);
        break;
    }
  }

  const handleRequestChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRequest(event.target.value);
  }

  const handlePathChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiPath(event.target.value);
  }

  const onEdit = (event: any) => {
    setJSON(event.updated_src);
  }
  
  const onAdd = (event: any) => {
    setJSON(event.updated_src);
  }

  const onDelete = (event: any) => {
    setJSON(event.updated_src);
  }

  const handleReset = (): void => {
    setJSON({});
  }

  //HTML
  return (
    <div className="App">
      <Navigation />
      <div className="doraemonBell">
      <div className="doraemonBell-horizontal-line"></div>
        <div className="doraemonBell-center">
          <div className="doraemonBell-vertical-line"></div>
        </div>
      </div>
      <h1 className="title">DORA API</h1>
      <h2>The RESTful Doraemon Gadget API</h2>
      <h4>All the Doraemon Gadget data you will need is here.<br />
      You can interact with database via CRUD endpoints
      </h4>
      <a className="docLink" href="https://github.com/FumiKimura/ccp2-sprint.solo-api" target="_blank"> API Documentations</a>
      <form className="form">
        <select className="dropdown-path" onChange={handleRequestChange}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PATCH">PATCH</option>
            <option value="DELETE">DELETE</option>
        </select>
        <input className="pathInput" type="text" id="path" onChange={handlePathChange}></input>
      </form>
      <div className="btn-container">
        <input onClick={handleSubmit} className="submitBtn" type="submit"></input>
        <input onClick={handleReset} className="resetBtn" type="reset"></input>
      </div>
      <div className="jsonViewContainer">
        <div className="jsonViewContainerChild">
          <ReactJson src={json} onEdit={onEdit} onAdd={onAdd} onDelete={onDelete}></ReactJson>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;