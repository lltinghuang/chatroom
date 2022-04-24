import MessageItem from "./MessageItem";

export default class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: []
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.currentRoom.roomkey != prevProps.currentRoom.roomkey) {
      var Ref = firebase
        .database()
        .ref("chatroom/" + this.props.currentRoom.roomkey + "/message");
      Ref.on("value", (snapshot) => {
        let read = [];
        snapshot.forEach((childSnapshot) => {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          read.push({message: childData.message, poster: childData.email});
        });
        this.setState({ chats: [...read] });
      });
    }
  }
  render() {
    const { currentRoom, chats, user } = this.props;
    return (
      <div>
        {this.state.chats.map((item, index) => {
          return (
            <MessageItem key={index} idx={index} info={item.message} poster={item.poster} user={user.email}></MessageItem>
          );
        })}
      </div>
    );
  }
}
