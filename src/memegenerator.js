import React, {Component} from "react"
import Form from './Form'
import './App.css'

class MemeGenerator extends Component{
  constructor(){
    super()
    this.state = {
      toptext:"",
      bottomtext:"",
      randomimage:"http://i.imgflip.com/1bij.jpg",
      allMemeImgs: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event){
    const {name,value} = event.target
    this.setState({[name]: value})

  }
  handleSubmit(event){
    event.preventDefault()
    const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
    const randMemeImg = this.state.allMemeImgs[randNum].url;
    this.setState({ randomimage: randMemeImg });

  }


  componentDidMount(){

    fetch("https://api.imgflip.com/get_memes")
    .then(response => response.json())
    .then(response => {
      const { memes }  = response.data

      this.setState({ allMemeImgs : memes })
    })
    }




  render(){
    return(
      <div>
      <form className ="meme-form" onSubmit = {this.handleSubmit}>

      <label> Top Text </label>
      <input
      type = "text"
      name = "toptext"
      value = {this.state.toptext}
      onChange = {this.handleChange}
      />

      <label> Bottom Text </label>
      <input
      type = "text"
      name = "bottomtext"
      value = {this.state.bottomtext}
      onChange = {this.handleChange}
      />

      <button type= "Submit"> Submit </button>

      <div className = "meme">
        <img src={this.state.randomimage} alt='' />
        <h2 className = "top">
         {this.state.toptext}
         </h2>

         <h2 className = "bottom">
          {this.state.bottomtext}
          </h2>


      </div>

      </form>

      </div>
    )
  }
}
export default MemeGenerator;
