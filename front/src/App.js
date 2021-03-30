import './App.css';
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import mainReducer from './redux/index';
import Header from './components/header';
import Auth from './components/auth';
import Index from './components/index';
import Footer from './components/footer';
import Lol from './components/lol'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

const initial = {
    socket: null,
    user: null
}

const store = createStore(
    mainReducer,
    initial
)

function App() {
  return (
      <Provider store={store}>
          <Router>
              <Header/>
              <Switch>
                  <Route path="/auth">
                      <Auth/>
                  </Route>
                  <Route path="/lol">
                      <Lol/>
                  </Route>
                  <Route path="/">
                      <Index/>
                  </Route>
                  <Footer/>
              </Switch>
          </Router>
      </Provider>
  );
}

export default App;
