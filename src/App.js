import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import firebaseInitialize from './firebase/firebase.init';


firebaseInitialize();
function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [islogin, setIsLogin] = useState(false);

  const auth = getAuth();
  // --------------------
  const handleRegistred = e => {
    e.preventDefault()
    console.log(email, password);

    const regWithEmail = (email, password) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          setError('')
          const user = result.user;
          console.log(user);
        })
        .catch((error) => {
          setError("email-already-in-use try another");
        });
    }

    const login = (email, password) => {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          setError('');
          const user = result.user;
          console.log(user);
        })
        .catch((error) => {
          setError("email or password is not correct");
        });
    }

    if(islogin){
      setError('');
      login(email,password)
    }else{
      regWithEmail(email,password);
    }


  }
  // ------------------

  const toggle = e => {
    setIsLogin(e.target.checked);
  }

  const handleEmail = e => {
    setEmail(e.target.value);
  }
  const handlePassword = e => {
    setPassword(e.target.value);
  }
  return (
    <div className="App">

      <form onSubmit={handleRegistred} className='w-50 mx-auto bg-warning p-5 mt-5'>
        <h3>Please {islogin ? "login" : "Sign Up"}</h3>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input onBlur={handleEmail} type="email" className="form-control" id="inputEmail3" required />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-10">
            <input onBlur={handlePassword} type="password" className="form-control" id="inputPassword3" required />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-10 offset-sm-2">
            <div className="form-check">
              <input onChange={toggle} className="form-check-input" type="checkbox" id="gridCheck1" />
              <label className="form-check-label" htmlFor="gridCheck1">
                {islogin ? "First registred Please" : "all ready registred ?"}
              </label>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Sign in</button>
        <p className='text-danger fs-3 mt-3'>{error}</p>
      </form>

    
    </div>
  );
}

export default App;
