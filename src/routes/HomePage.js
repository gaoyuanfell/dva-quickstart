import React from "react";
import { connect } from "dva";
import styles from "./HomePage.css";

function HomePage({ dispatch }) {
  console.info(dispatch);
  console.info(styles);
  return <div></div>;
}

HomePage.propTypes = {};

export default connect()(HomePage);
