export default class MessageItem extends React.Component {
  constructor(props) {
        super(props);
  };

  render() {
    const { content, info} = this.props;
    return (
      <div class="clearfix">
        <div class="message my-message">
          {info}
        </div>
      </div>
    );
  }
}