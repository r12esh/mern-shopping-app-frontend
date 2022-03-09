import React from "react";
import {API} from "../backend";
import Base from "./Base";

const Home = () => {
  return (
    <Base title="Home page" description="Welcome to Tshirt store">
      <div className="row">
        <div className="col-4">
          <button className="btn btn-success">Test button</button>
        </div>
        <div className="col-4">
          <button className="btn btn-success">Test button</button>
        </div>
        <div className="col-4">
          <button className="btn btn-success">Test button</button>
        </div>
      </div>
    </Base>
  );
};

export default Home;