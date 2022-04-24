export default class MessageItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { content, info, poster, user } = this.props;
    return user == poster ? (
      <div>
        <div class="message-data align-right">
                  <span class="message-data-name">{poster}</span>{" "}
                  <i class="fa fa-circle me"></i>
                </div>
                <div class="message other-message float-right">
                  {info}
                </div>
      </div>
    ) : (
      <div>
        <div class="message-data">
          <span class="message-data-name">
            <i class="fa fa-circle online"></i> {poster}
          </span>
        </div>
        <div class="message my-message">
          {info}
        </div>
      </div>
    );
  }
}
