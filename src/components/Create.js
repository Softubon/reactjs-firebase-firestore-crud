import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('boards');
    this.state = {
      title: '',
      description: '',
      author: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, description, author } = this.state;

    this.ref.add({
      title,
      description,
      author
    }).then((docRef) => {
      this.setState({
        title: '',
        description: '',
        author: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { title, description, author } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              เพิ่มหนังสือเล่มใหม่
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-primary">ดูชั้นวางหนังสือ</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">หมวดหนังสือ:</label>
                <input type="text" class="form-control" name="title" value={title} onChange={this.onChange} placeholder="หมวดหนังสือ" />
              </div>
              <div class="form-group">
                <label for="description">ชื่อหนังสือ:</label>
                <textArea class="form-control" name="description" onChange={this.onChange} placeholder="ชื่อหนังสือ" cols="80" rows="3">{description}</textArea>
              </div>
              <div class="form-group">
                <label for="author">ผู้แต่งหนังสือ:</label>
                <input type="text" class="form-control" name="author" value={author} onChange={this.onChange} placeholder="ผู้แต่งหนังสือ" />
              </div>
              <button type="submit" class="btn btn-success">เก็บเข้าชั้นหนังสือ</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
