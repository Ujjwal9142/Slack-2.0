import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Chat from "./components/Chat";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./features/actions";
import Login from "./components/Login";
import Spinner from "react-spinkit";
import SlackImage from "../src/assets/slackImage.jpg";

function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // Logged in
        dispatch(
          login({
            email: authUser.email,
            uid: authUser.uid,
            displayName: authUser.displayName,
            photoURL: authUser.photoURL,
          })
        );
      } else {
        // Logged Out
        dispatch(logout());
      }
    });
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="app">
      {loading ? (
        <AppLoading>
          <AppLoadingContent>
            <img src={SlackImage} alt="" />
            <Spinner
              name="ball-spin-fade-loader"
              color="purple"
              fadeIn="none"
            />
          </AppLoadingContent>
        </AppLoading>
      ) : (
        <Router>
          {!user ? (
            <Login />
          ) : (
            <>
              <Header />
              <AppBody>
                <Sidebar />
                <Routes>
                  <Route path="/" element={<Chat />} />
                </Routes>
              </AppBody>
            </>
          )}
        </Router>
      )}
    </div>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;

const AppLoadingContent = styled.div`
  text-align: center;
  padding-bottom: 100px;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;
