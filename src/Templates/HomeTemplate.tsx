import React from "react";
import Header from "../Components/Header/Header";
import { Outlet } from "react-router-dom";

type Props = {};

export default function HomeTemplate({}: Props) {
  return (
    <>
      <Header></Header>
      <div className="conten-layout" style={{ minHeight: "80vh" }}>
        <Outlet></Outlet>
      </div>
      <footer className="bg-dark text-white text-center p-3">footer</footer>
    </>
  );
}
