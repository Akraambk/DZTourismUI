import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Listroom from "./pages/list/Listroom";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import NewHotel from "./pages/newhotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { hotelInputs, roomInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { userColumns } from "./datatablesource";
import { hotelColumns } from "./datatablesource";
import { roomColumns } from "./datatablesource";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route index element={<List columns={userColumns} />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="hotels">
              <Route index element={<List columns={hotelColumns} />} />
              <Route path=":hotelId" element={<Single />} />
              <Route path="new" element={<NewHotel />} />
            </Route>
            <Route path="rooms">
              <Route index element={<Listroom columns={roomColumns} />} />
              <Route path=":roomId" element={<Single />} />
              <Route path="new" element={<NewRoom />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
