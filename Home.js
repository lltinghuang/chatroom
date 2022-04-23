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
        if (typeof childData.permission == "string") {
          if (childData.permission == this.state.user.email) {
            keyname.push({ name: childData.room, roomkey: childKey });
          }
        } else {
          for (let each in childData.permission) {
            if (childData.permission[each] == this.state.user.email) {
              keyname.push({ name: childData.room, roomkey: childKey });
              break;
            }
          }
        }
      });
      this.setState({ roomList: [...keyname] });
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

    firebase
      .database()
      .ref("chatroom/" + this.state.currentRoom.roomkey + "/message")
      .push(post_data);
    this.setState({ content: "" });
  }
  handleAddRoom() {
    let roomname = prompt("Room Name");
    if (roomname != null) {
      var key = firebase.database().ref("chatroom").push({
        permission: this.state.user.email,
        room: roomname,
        message: "",
      }).key;
      let newone = { name: roomname, roomkey: key };
      this.setState({ roomList: [...this.state.roomList, newone] });
    }
  }
  selectRoom(name, roomkey) {
    if (name != null) {
      let now = [];
      now = { name: name, roomkey: roomkey };
      this.setState({ currentRoom: now });
    }
  }
  handleAddMember() {
    if (this.state.currentRoom.roomkey == null) {
      alert("please choose a room first!");
    } else {
      let member = prompt("Enter the email to invite the new member");
      let origin = [];
      var Ref = firebase
        .database()
        .ref("chatroom/" + this.state.currentRoom.roomkey + "/permission");
      Ref.once("value", (snapshot) => {
        if (typeof snapshot.val() == "string") {
          origin.push(snapshot.val());
        } else {
          for (let each in snapshot.val()) {
            origin.push(snapshot.val()[each]);
          }
        }
      }).then(() => {
        origin.push(member);
        Ref.set(origin);
        alert("success!");
      });
    }
  }
  render() {
    const { classes, user, email, handleLogOut } = this.props;
    return (
      <div class="container clearfix">
        <div class="people-list" id="people-list">
          <div class="left-header">Chat Room</div>
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
          <div class="funct">
            <h4 class="user">{this.state.user.email}</h4>

            <button
              class="btn"
              onClick={() => {
                handleLogOut();
              }}
            >
              Log Out
            </button>

            <button
              class="btn"
              onClick={() => {
                this.handleAddRoom();
              }}
            >
              Add a Room
            </button>

            <button
              class="btn"
              onClick={() => {
                this.handleAddMember();
              }}
            >
              Add a member
            </button>
          </div>
        </div>

        <div class="chat">
          <div class="chat-header clearfix">
            <div class="chat-about">
              <div class="chat-with">{this.state.currentRoom.name}</div>
            </div>
          </div>

          <div class="chat-history">
            <ul>
              <MessageList
                user={this.state.user}
                currentRoom={this.state.currentRoom}
              ></MessageList>
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
