import React from "react";
import { useSelector } from "react-redux";
import "./loading.css";
export default function Loading() {
  const { isLoading } = useSelector((state) => state.projectReducer);
  return (
    <div style={{ display: isLoading ? "flex" : "none" }} className="loading">
      <img src="/assets/img/loading.gif" alt="loading" />
    </div>
  );
}
