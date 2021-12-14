import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      board: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('boards').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          board: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('boards').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <br/>
          <h4><Link to="/">ข้อมูลประกันภัยในระบบ</Link></h4>
            <h3 class="panel-title">
              ทะเบียน {this.state.board.title}
            </h3>
          </div>
          <div class="panel-body">
            <dl>
            <dt>ผู้เอาประกัน:</dt>
              <dd>{this.state.board.description}</dd>
              <dt>เบี้ยประกันภัย:</dt>
              <dd>{this.state.board.author}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} class="btn btn-success">แก้ไขแฟ้มประวัติ</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">ลบแฟ้มประวัติ</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
