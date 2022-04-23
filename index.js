import './signin.css';
import './Home.css';
import SignInPage from "./SignIn";
import Home from "./Home";

export class Root extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          user: firebase.auth().currentUser,
          email: "",
          authenticated: false,
        };
      };

    handleSignIn = (email, password) => {
       firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                alert('signin success');
                //this.setState({unsign: false, email: email});
                this.setState({authenticated: true});
                // ...
             })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
                // ...
            });
    }
    handleLogOut = () => {
      firebase.auth().signOut()
                .then(() => {
                    console.log('logout success!');
                    this.setState({authenticated: false});
                    //this.setState({unsign: true, email: ""});
                }).catch((error) => {
                    // An error happened.
                    console.log(error.message);
                });
    }
    render() {
        return (
          this.state.authenticated == false ? (
          <SignInPage
            user={this.state.user}
            email={this.state.email}
            password={this.state.password}
            handleSignIn={this.handleSignIn}
          />
          ) : (
          <Home
            user={this.state.user}
            email={this.state.email}
            handleLogOut={this.handleLogOut}
          />
          )
        );
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));
