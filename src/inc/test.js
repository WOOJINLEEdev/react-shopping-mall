import React, { Component } from "react";
import queryString from "query-string";

class Test extends Component {
  constructor(props) {
    super(props);
    const qry = queryString.parse(this.props.location.search);
    console.log(this.props);
    console.log(qry);
  }

  render() {
    const qry = queryString.parse(this.props.location.search);

    return (
      <div>
        <h3 className="router_test"> This is {qry.name} page. </h3>
        <h3 className="router_test"> And {qry.age} year. </h3>
      </div>
    );
  }
}

export default Test;
