//import App from "./App";
import './index.css';

export class Root extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
             <div class="form-signin">
        <img class="mb-4" src="img/pic2-01.png" alt="" height="108"/>
        <h1 class="h3 mb-3 font-weight-normal">Please sign in/register</h1>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus/>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required/>
        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me"/> Remember me
          </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" id="btnLogin">Sign in</button>
        <button class="btn btn-lg btn-info btn-block" id="btngoogle">Sign in with Google</button>
        <button class="btn btn-lg btn-secondary btn-block" id="btnSignUp">New account</button>
        <p class="mt-5 mb-3 text-muted">by Mandy Huang</p>
      </div>
        );
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));
//ReactDOM.render(<App />, document.getElementById("root"));