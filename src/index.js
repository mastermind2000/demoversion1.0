import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

// NAVIGATION
import Nav from "./components/Nav";
// PAGES
import Home from "./pages/Home/HomePage";
import About from "./pages/About/AboutPage";
import Contact from "./pages/Contact/ContactPage";
import sauvegarde from "./pages/Usage/sauvegarde";
import creategroup from "./pages/CreateGroup/creategroup";
import editgroup from "./pages/EditGroup/editgroup";
import Edituser from "./pages/EditUser/edituser";
import "./index.css";

const App = () => (
  <div>
    <Nav />
    <div className="container">
      <Route exact path="/createuser" component={Home} />
      <Route exaxt path="/about" component={About} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/edituser" component={Edituser} />
      <Route exact path="/sauvegarde" component={sauvegarde} />
      <Route exact path="/creategroup" component={creategroup} />
      <Route exact path="/editgroup" component={editgroup} />
    </div>
  </div>
);

render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
