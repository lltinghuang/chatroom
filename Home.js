import MessageList from "./MessageList";
import RoomItem from "./RoomItem";
//import Message from './Message';
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: firebase.auth().currentUser,
      currentRoom: [],
      roomList: [],
      content: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectRoom = this.selectRoom.bind(this);
  }
  componentDidMount() {
    //var userId = firebase.auth().currentUser.uid;
    let keyname = [];
    var Ref = firebase.database().ref("chatroom");
    Ref.once("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        keyname.push({name: childData.room, roomkey: childKey});
      });
      this.setState({roomList: [...keyname]});
    });
  }

  handleChange(event) {
    this.setState({ content: event.target.value });
  }
  handleSubmit(event) {
      var post_data = {
        poster: this.state.user.uid,
        message: this.state.content,
        email: this.state.user.email,
      };

      firebase.database().ref("chatroom/" + this.state.currentRoom.roomkey + "/message").push(post_data);
      this.setState({content: ""});
  }
  handleAddRoom() {
    let roomname = prompt("Room Name");
    if (roomname != null) {
      var key = firebase.database().ref("chatroom").push({
        permission: this.state.user.email,
        room: roomname,
        message: ""
      }).key;
      let newone = {name: roomname, roomkey: key};
      this.setState({roomList: [...this.state.roomList, newone]});
    }
  }
  selectRoom (name, roomkey){
    if (name != null) {
      let now = [];
      now = {name: name, roomkey: roomkey};
      this.setState({ currentRoom: now});
    }
  };
  handleAddMember() {
    let member = prompt("Enter the email to invite the new member");
    var Ref = firebase.database().ref("chatroom/" + this.state.currentRoom.roomkey);
     Ref.once("value", (snapshot) => {
       let origin = [];
       origin.push(snapshot.val().permission);
        origin.push(member);
        Ref.child("permission").set(origin);
     });
  }
  render() {
    const { classes, user, email, handleLogOut } = this.props;
    return (
      <div class="container clearfix">
        <div class="people-list" id="people-list">
          <div class="search">
            <input type="text" placeholder="search" />
            <i class="fa fa-search"></i>
          </div>
          <ul class="list">
            {this.state.roomList.map((item, index) => {
              return (
                <RoomItem
                  key={index}
                  idx={index}
                  name={item.name}
                  roomkey={item.roomkey}
                  selectRoom={this.selectRoom}
                />
              );
            })}
          </ul>
          <button
            class="logout"
            onClick={() => {
              handleLogOut();
            }}
          >
            Log Out
          </button>
          <button
            class="logout"
            onClick={() => {
              this.handleAddRoom();
            }}
          >
            Add a Room
          </button>
          <button
            class="logout"
            onClick={() => {
              this.handleAddMember();
            }}
          >
            Add a member
          </button>
        </div>

        <div class="chat">
          <div class="chat-header clearfix">
            <div class="chat-about">
              <div class="chat-with">{this.state.currentRoom.name}</div>
            </div>
          </div>

          <div class="chat-history">
            <ul>
              <li class="clearfix">
                <div class="message-data align-right">
                  <span class="message-data-time">10:10 AM, Today</span> &nbsp;
                  &nbsp;
                  <span class="message-data-name">Olia</span>{" "}
                  <i class="fa fa-circle me"></i>
                </div>
                <div class="message other-message float-right">
                  Hi Vincent, how are you? How is the project coming along?
                </div>
              </li>

              <li>
                <div class="message-data">
                  <span class="message-data-name">
                    <i class="fa fa-circle online"></i> Vincent
                  </span>
                  <span class="message-data-time">10:12 AM, Today</span>
                </div>
                <div class="message my-message">
                  Are we meeting today? Project has been already finished and I
                  have results to show you.
                </div>
              </li>

              <MessageList currentRoom={this.state.currentRoom}></MessageList>
            </ul>
          </div>

          <div class="chat-message clearfix">
            <textarea
              name="message-to-send"
              id="message-to-send"
              placeholder="Type your message"
              rows="3"
              onChange={this.handleChange}
              value={this.state.content}
            ></textarea>
            <button onClick={this.handleSubmit}>Send</button>
          </div>
        </div>
      </div>
    );
  }
}
