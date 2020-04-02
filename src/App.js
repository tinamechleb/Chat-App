import React, { Component } from 'react';
import io from 'socket.io-client';


class App extends Component {

  state = {
    isConnected: false,
    id: null,
    username: 'Tina',
    friends: [],
    numOfFriends: 0,
    msgs: [],
    mymsgval: '',
    classnameofemojis: 'showEmojis',
    classnameofemojisshow: 'showEmojis showNow'
  }
  socket = null

  listOfStuff() {
    return this.state.msgs.map((data, i) => {
      return (
        <div className="wholeMsg">
          <li className="nameOfSender" key={i}>{data.name} </li>
          <li className="msgOfSender">{data.text}</li>
          <li className="dateOfSender">{data.date}</li>
        </div>
      );
    });
  }


  componentWillMount() {

    this.socket = io('https://codi-server.herokuapp.com');

    this.socket.on('connect', () => {
      this.setState({ isConnected: true })
    })

    this.socket.on('youare', (answer) => {
      this.setState({ id: answer.id })
    })

    this.socket.on('peeps', (arrayOfPeeps) => {
      this.setState({ friends: arrayOfPeeps, numOfFriends: arrayOfPeeps.length })
    })

    this.socket.on('new connection', (newID) => {
      this.state.friends.push(newID);
      this.state.numOfFriends++;
    })

    this.socket.on('new disconnection', (id) => {
      let index = this.state.friends.indexOf(id);
      if (index > -1) {
        this.state.friends.splice(index, 1);
      }
      this.state.numOfFriends--;
    })

    this.socket.on('next', (message_from_server) => console.log(message_from_server))

    this.socket.on('disconnect', () => {
      this.setState({ isConnected: false })
    })

    this.socket.on('room', old_messages => {
      this.setState({ msgs: old_messages });
    })
  }

  componentDidMount() {
    this.socket.emit('whoami');
  }

  componentWillUnmount() {
    this.socket.close()
    this.socket = null
  }

  inputNum = e => {
    e.preventDefault();
    this.setState({ mymsgval: e.target.value });
  };

  render() {

    this.friendss = this.state.friends.map((friend, key) => {
      return <div key={friend}>{friend}</div>
    })

    function enterMePLS(event) {
      if (event.keyCode === 13) {
        document.getElementById("sendButton").click();
      }
    }

    return (
      <div className="App">
        <div className="info">
          <div>status: {this.state.isConnected ? 'connected' : 'disconnected'}</div>
          <div>id: {this.state.id}</div>
          <div>username: {this.state.username}</div>
          {/* <button className="whoAmI" onClick={() => { this.socket.emit('whoami'); }}>Who am I?</button> */}
        </div>
        <div className="card">
          <div>
            <span><div>Online</div><div>{this.state.numOfFriends}</div></span><div className="listOfFriends"><div className="friends">{this.friendss}</div></div>
          </div>
          <div className="partTwo">
            <div className="old-messages">{this.listOfStuff()}</div>
            <div className="forSending">
              <input type="text" id="myMessage" placeholder="write a message..." name="input" onKeyUp={enterMePLS} onChange={e => this.inputNum(e)} value={this.state.mymsgval}></input>
              <div className="emojis" onClick={() => { this.setState({ classnameofemojis: this.state.classnameofemojisshow, classnameofemojisshow: this.state.classnameofemojis }) }}></div>
              <div className="sendButt" id="sendButton" onClick={() => {
                let msg = document.getElementById("myMessage").value;
                this.setState({ mymsgval: '' });
                return this.socket.emit('message', { 'text': msg, 'id': this.state.id, 'name': this.state.username });
              }}></div>
            </div>
          </div>
          <div className={this.state.classnameofemojis}>
            <div className="hi">
              <div className="emoji" onClick={() => { this.setState({ mymsgval: this.state.mymsgval + "👌🏻" }) }} >👌🏻</div>
              <div className="emoji" onClick={() => { this.setState({ mymsgval: this.state.mymsgval + "👍🏻" }) }} >👍🏻</div>
              <div className="emoji" onClick={() => { this.setState({ mymsgval: this.state.mymsgval + "👎🏻" }) }} >👎🏻</div>
              <div className="emoji" onClick={() => { this.setState({ mymsgval: this.state.mymsgval + "🤘🏻" }) }} >🤘🏻</div>
              <div className="emoji" onClick={() => { this.setState({ mymsgval: this.state.mymsgval + "🤣" }) }} >🤣</div>
              <div className="emoji" onClick={() => { this.setState({ mymsgval: this.state.mymsgval + "🥺" }) }} >🥺</div>
              <div className="emoji" onClick={() => { this.setState({ mymsgval: this.state.mymsgval + "🥰" }) }} >🥰</div>
              <div className="emoji" onClick={() => { this.setState({ mymsgval: this.state.mymsgval + "👻" }) }} >👻</div>
              <div className="emoji" onClick={() => { this.setState({ mymsgval: this.state.mymsgval + "🤔" }) }} >🤔</div>
            </div>
            <div className="hi">
              <div className="emoji" onClick={() => { this.setState({ mymsgval: this.state.mymsgval + "❤️" }) }} >❤️</div>
              <div className="emoji" onClick={() => { this.setState({ mymsgval: this.state.mymsgval + "🧡" }) }} >🧡</div>
              <div className="emoji" onClick={() => { this.setState({ mymsgval: this.state.mymsgval + "💛" }) }} >💛</div>
              <div className="emoji" onClick={() => { this.setState({ mymsgval: this.state.mymsgval + "💚" }) }} >💚</div>
              <div className="emoji" onClick={() => { this.setState({ mymsgval: this.state.mymsgval + "💙" }) }} >💙</div>
              <div className="emoji" onClick={() => { this.setState({ mymsgval: this.state.mymsgval + "💜" }) }} >💜</div>
              <div className="emoji" onClick={() => { this.setState({ mymsgval: this.state.mymsgval + "🖤" }) }} >🖤</div>
              <div className="emoji" onClick={() => { this.setState({ mymsgval: this.state.mymsgval + "💔" }) }} >💔</div>
              <div className="emoji" onClick={() => { this.setState({ mymsgval: this.state.mymsgval + "💕" }) }} >💕</div>
            </div>

            <div className="hi">
              <div className="emoji" onClick={() => { this.setState({ mymsgval: this.state.mymsgval + "😡" }) }} >😡</div>
              <div className="emoji" onClick={() => { this.setState({ mymsgval: this.state.mymsgval + "😍" }) }} >😍</div>
              <div className="emoji" onClick={() => { this.setState({ mymsgval: this.state.mymsgval + "😚" }) }} >😚</div>
              <div className="emoji" onClick={() => { this.setState({ mymsgval: this.state.mymsgval + "😋" }) }} >😋</div>
              <div className="emoji" onClick={() => { this.setState({ mymsgval: this.state.mymsgval + "😎" }) }} >😎</div>
              <div className="emoji" onClick={() => { this.setState({ mymsgval: this.state.mymsgval + "☹️" }) }} >☹️</div>
              <div className="emoji" onClick={() => { this.setState({ mymsgval: this.state.mymsgval + "😃" }) }} >😃</div>
              <div className="emoji" onClick={() => { this.setState({ mymsgval: this.state.mymsgval + "😂" }) }} >😂</div>
              <div className="emoji" onClick={() => { this.setState({ mymsgval: this.state.mymsgval + "😻" }) }} >😻</div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default App;
