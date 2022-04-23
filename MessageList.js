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
          console.log(childData.message);
          read.push(childData.message);
        });
    
      /*Ref.once("value", (snapshot) => {
          snapshot.child("message").on("value", (data)=>{
            read.push(data.val());
            console.log(data.val());
          })*/
      
        /*snapshot.forEach((element) => {
          read.push(element.val().message);
          console.log(element.val().message);
        });*/
        this.setState({ chats: [...read] });
      });
    }
  }
  render() {
    const { currentRoom, chats } = this.props;
    return (
      <div>
        {this.state.chats.map((item, index) => {
          return (
            <MessageItem key={index} idx={index} info={item}></MessageItem>
          );
        })}
      </div>
    );
  }
}
