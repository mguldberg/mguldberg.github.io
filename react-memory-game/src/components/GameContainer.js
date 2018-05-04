import React, { Component } from "react";
import Container from "./Container";
import Row from "./Row";
import Col from "./Col";
import Card from "./Card";
import Navbar from "./Navbar";
import SearchForm from "./SearchForm";
import ImageCard from "./ImageCard";
import API from "../utils/API";
import imageArray from "../images.json";


class GameContainer extends Component {
  state = {
    imageArray: imageArray,
    search: "",
    highScore: 0,
    currentScore: 0,
    imagesClicked: []
  };


  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  shufflePictures = () => {
    //Fisher-Yates shuffle - 1938 - how did they do random numbers in 1938??
    let j = 0
    let tempVar = null
    let tempArray = this.state.imageArray;


    for (let i = this.state.imageArray.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1))
      tempVar = tempArray[i]
      tempArray[i] = tempArray[j]
      tempArray[j] = tempVar
    }
    this.setState({ imageArray: tempArray })
  }


  handleImageClick = id => {
    console.log("on click", id);
    console.log(this.state.imagesClicked);


    // let found = false;

    // for (let i=0;i< this.state.imagesClicked.length;i++){
    //   if (id == this.state.imagesClicked[i])
    //     found= true;
    //   else
    //     found = false;
    // }
    let currentScoreVar = this.state.currentScore
    let highScoreVar = this.state.highScore;

    if (this.state.imagesClicked.indexOf(id) === -1) {
      console.log("inside indexOf")
      this.state.imagesClicked.push(id);
      currentScoreVar++

      if (this.state.currentScore >= this.state.highScore) {
        highScoreVar = currentScoreVar;
        // Set this.state.friends equal to the new friends array
      }

      this.setState({
        highScore: highScoreVar,
        currentScore: currentScoreVar,
        imagesClicked: this.state.imagesClicked
      });
    }
    else {
      alert("Nope you already picked that one.  Please try again.")
      this.setState({
        currentScore: 0,
        imagesClicked: []
      })
    }
    this.shufflePictures();

    console.log("imagesClicked", this.state.imagesClicked)
  };

  // When the form is submitted, search the Giphy API for `this.state.search`
  handleFormSubmit = event => {

    event.preventDefault();
    console.log("inside submit handler");

    API.searchGiphy(this.state.search).then(giphyResponse => {
      console.log(giphyResponse.data.data);

      let newImageArray = [];

      console.log(giphyResponse.data.data.length);
      for (var i = 0; i < giphyResponse.data.data.length; i++) {
        // if (res.data.status === "error") {
        //   throw new Error(res.data.message);
        // }
        let imgObj = {};

        imgObj.id = i;
        imgObj.src = giphyResponse.data.data[i].images.fixed_height_small.url;
        imgObj.alt = giphyResponse.data.data[i].title;
        newImageArray.push(imgObj);
      }
      console.log(newImageArray)

      this.setState({ imageArray: newImageArray })

    })
    // .catch(err => this.setState({ error: err.message }));
  };

  render() {
    return (
      <Container fluid="container">
        <Navbar
          currentScore={this.state.currentScore}
          highScore={this.state.highScore}
          value={this.state.search}
          handleInputChange={this.handleInputChange}
          handleFormSubmit={this.handleFormSubmit}
        />
        <Row>
          {this.state.imageArray.map(image => (
            <Col size="md-2">
              <ImageCard
                imageFn={this.handleImageClick}
                imageSrc={image.src}
                imageAlt={image.alt}
                imageId={image.id}
                key={image.id}
              />
            </Col>
          ))}

        </Row>
      </Container>
    );
  }
}

export default GameContainer;
