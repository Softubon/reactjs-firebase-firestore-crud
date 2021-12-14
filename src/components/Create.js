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
          <br/>
            <h3 class="panel-title">
              เพิ่มผู้เอาประกันภัยรายใหม่
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-primary">ข้อมูลประกันภัยในระบบ</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">ทะเบียนรถ:</label>
                <input type="text" class="form-control" name="title" value={title} onChange={this.onChange} placeholder="ทะเบียนรถ" />
              </div>
              <div class="form-group">
                <label for="description">ผู้เอาประกัน:</label>
                <textArea class="form-control" name="description" onChange={this.onChange} placeholder="ผู้เอาประกัน" cols="80" rows="3">{description}</textArea>
              </div>
              <div class="form-group">
                <label for="author">เบี้ยประกันภัย:</label>
                <input type="text" class="form-control" name="author" value={author} onChange={this.onChange} placeholder="เบี้ยประกัน" />
              </div>
              <button type="submit" class="btn btn-success">เก็บเข้าแฟ้มประวัติ</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
