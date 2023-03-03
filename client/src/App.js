import Home from './Pages/Home.jsx'
import Tienda from './Pages/Restaurant.jsx'
import { Route, Routes } from "react-router-dom";

function App() {
        /*  const cookies = new Cookies()
        const token = cookies.get('TOKEN')
        const dispatch = useDispatch() */
        const cookies = new Cookies();
        const token = cookies.get("TOKEN");
        const dispatch = useDispatch();
      
        useEffect(() => {
          if (token) {
            dispatch(loginUser(token.user));
            // dispatch(getFavorites(token.user.id))
          }
        }, []);

    return (
        <div className="App">
            <Routes>
            <Route exact path="/home" component={Home} />
                <Route exact path="/" component={LandingPage} />
                <Route path="/tienda" component={Tienda} />
            </Routes>
        </div>
    )
}

export default App
