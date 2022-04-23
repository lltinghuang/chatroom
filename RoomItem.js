export default class RoomItem extends React.Component {
  constructor(props) {
        super(props);
  };

  render() {
    const { name, roomkey, time, selectRoom } = this.props;
    return (
      <ui
        class="clearfix"
        onClick={()=>{selectRoom(name, roomkey)}}
      >
        
        <div class="about">
          <div class="name">{name}</div>
        </div>
      </ui>
    );
  }
}