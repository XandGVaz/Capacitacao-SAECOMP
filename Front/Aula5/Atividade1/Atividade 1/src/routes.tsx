import { createBrowserRouter } from "react-router";
import App from "./App";
import NavBar from "./components/NavBar";
import User from "./User";

const routes = createBrowserRouter([
    {
        path: '/home',
        element: <NavBar/>,
        children: [
            {
                path: "/",
                element: <App/>
            },
            {
                path: "/user/:id", // ex: /user/1
                element: <User/>
            }
        ]
    }   

]);


export default routes