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
        this.handleSignwithGoogle = this.handleSignwithGoogle.bind(this);
      };

    /*componentDidMount() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.setState({authenticated: true});
          console.log('there is an user');
      } else {
          //this.setState({authenticated: false});
          console.log('none');
        }
    });*/
   
    handleSignwithGoogle = () => {
      console.log('try with google');
       var provider = new firebase.auth.GoogleAuthProvider();
       firebase.auth().signInWithPopup(provider)
         .then(function (result) {
            //this.setState({unsign: false, email: email});
            this.setState({ authenticated: true });
         })
         .catch(function (error) {
           alert(error.message);
         });
    }
    handleSignIn = (email, password) => {
       firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                alert('success');
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
          this.state.authenticated == false? (
          <SignInPage
            user={this.state.user}
            email={this.state.email}
            password={this.state.password}
            handleSignIn={this.handleSignIn}
            handleSignwithGoogle={this.handleSignwithGoogle}
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
//ReactDOM.render(<App />, document.getElementById("root"));
