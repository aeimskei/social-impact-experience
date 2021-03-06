import React, { Component } from 'react';
import { 
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Jumbotron
 } from 'reactstrap';
 import Header from './Header';

class Login extends Component {

  state = {
    email: '',
    password: ''
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    console.log(this.state.email, this.state.password)
    if (!this.state.email || !this.state.password) {
      alert('All field must be filled')
    } else {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      })
      // const user = await response.json()
      // console.log('user id what: ', user);
      // console.log('user id what: ', user.headers.authorization);
      console.log('user id what: ', response.headers.get("Authorization"));

      // remembers for client-side the authorization header
      localStorage.setItem("user", response.headers.get("Authorization"));
      console.log('this.props.history is what: ', this.props.history);

      const responseExperience = await fetch(`${process.env.REACT_APP_API_URL}/experience`)
      // console.log('Whats response in componenWillMount: ', response)
      const experiences = await responseExperience.json()
      // this.props.history.push("/experiences", experiences)
      this.props.history.push("/experiences")
    }
  }

  render() {
    return (
      <div>
        <Header/>
        <Jumbotron fluid>
          <Container>
          <h1 className="display-4">Login</h1>
          <p className="lead">To contribute, post new locations and comment. </p>
          </Container>
        </Jumbotron>
        <Container>
          <Form onSubmit={this.handleSubmit}>  
            <FormGroup>
              <Label for="email">Email</Label>
              <Input onChange={e => this.setState({email: e.target.value})}type="email" name="email" id="email" placeholder="email" />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input onChange={e => this.setState({password: e.target.value})}type="password" name="password" id="password" placeholder="password" />
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </Container>
      </div>
    )
  }
}

export default Login;