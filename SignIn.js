import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
export default class SignInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      password: "",
      nickname: "",
      open: false,
    };
  }
  handleNewAccount = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        console.log("signup!");
        this.setState({ open: true });
      })
      .catch((error) => {
        alert(error.message);
        // ..
      });
  };
  handleSignwithGoogle () {
    this.props.handleSignwithGoogle();
    console.log('you did it');
  }
  handleSignIn = () => {
    console.log("Sign in ing...");
    this.props.handleSignIn(this.state.userEmail, this.state.password);
    console.log("sign in did");
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {handleSignwithGoogle} = this.props;
    return (
      <div>
        <header>
          <h1>Chat Room</h1>
        </header>
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
                id="btngoogle"
                onClick={this.handleSignwithGoogle}
              >
                Sign in with Google
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
            <Dialog open={this.state.open} onClose={this.handleClose}>
              <DialogTitle>NickName</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please enter your nickname here. And press "sign in" button to
                  enter the chat room.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Nick Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(e) => {
                    this.setState({ nickname: e.target.value });
                  }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose}>Cancel</Button>
                <Button onClick={this.handleSignIn}>Sign In</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
        <footer>
          <p>by Mandy Huang </p>
        </footer>
      </div>
    );
  }
}
