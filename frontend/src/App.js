import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile/Profile";
import Image from "./pages/Image";

function App() {
  const { user } = useSelector((state) => state.userLogin);

  return (
    <div className="App">
      <Header />
      <main className=" mainApp">
        <Switch>
          {!user && <Route path="/signup" component={Signup} />}
          {!user && <Route path="/signin" component={Login} />}
          {user && <Route path="/profile" component={Profile} />}

          <Route path="/image/:imageId?" component={Image} />
          <Route path="/" component={Home} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
