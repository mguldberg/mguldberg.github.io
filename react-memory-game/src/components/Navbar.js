import React from "react";

const Navbar = props => (
  <nav>
    <nav className="navbar navbar-light bg-light">
      <span className="navbar-text">
        <div className="card-body">
          <h2>1980..err...2018 Memory Game!!</h2>
        </div>
      </span>
    </nav>
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" href="https://www.ebay.com/b/Milton-Bradley-Memory-Board-Traditional-Games/2550/bn_1914568">
        <img src="./Memory1980.jpg" alt="Classic Memory Game circa 1980" />
      </a>
      <form className="form-inline">
        <input
          onChange={props.handleInputChange}
          value={props.value}
          name="search"
          type="search"
          className="form-control mr-sm-2"
          id="search"
          aria-label="Search"
          placeholder="Giphy Topic Search" />
        <button onClick={props.handleFormSubmit} class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </nav>
    <nav className="navbar navbar-light bg-light">
      <span className="navbar-text">
        <div className="card-body d-flex justify-content-around">
          <p className="card-text">Number Correct: {props.currentScore}</p>
          <p className="card-text">High Score: {props.highScore}</p>
        </div>
      </span>
    </nav>
  </nav>
);

export default Navbar;
