export default class SignInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      password: ""
    };

  }
  handleNewAccount = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        alert("create success!");
        this.props.handleSignIn(this.state.userEmail, this.state.password);
      })
      .catch((error) => {
        alert(error.message);
        // ..
      });
  };
 
  handleSignIn = () => {
    this.props.handleSignIn(this.state.userEmail, this.state.password);
  };

  render() {
    return (
      <div>
        <header>
          <h1>Chat Room</h1>
        </header>
          <div class="bird-container bird-container--one">
            <div class="bird bird--one"></div>
          </div>

          <div class="bird-container bird-container--two">
            <div class="bird bird--two"></div>
          </div>

          <div class="bird-container bird-container--three">
            <div class="bird bird--three"></div>
          </div>

        <div>
          <div id="login_form" class="form_class">
            <div class="form_div">
              <label for="inputEmail" class="sr-only">
                Email address
              </label>
              <input
                type="email"
                id="inputEmail"
                class="field_class"
                placeholder="Email address"
                required
                autofocus
                onChange={(e) => {
                  this.setState({ userEmail: e.target.value });
                }}
              />
              <label for="inputPassword" class="sr-only">
                Password
              </label>
              <input
                type="password"
                id="inputPassword"
                class="field_class"
                placeholder="Password"
                required
                onChange={(e) => {
                  this.setState({ password: e.target.value });
                }}
              />

              <button
                class="submit_class"
                id="btnLogin"
                onClick={this.handleSignIn}
              >
                Sign in
              </button>

              <button
                class="submit_class"
                id="btnSignUp"
                onClick={() => {
                  this.handleNewAccount(
                    this.state.userEmail,
                    this.state.password
                  );
                }}
              >
                New account
              </button>
            </div>
          </div>
        </div>
        <footer>
          <p>by Mandy Huang </p>
        </footer>
      </div>
    );
  }
}
