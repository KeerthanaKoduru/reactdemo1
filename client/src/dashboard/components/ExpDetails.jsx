import React from "react";
import ExpRow from "./ExpRow";

const ExpDetails = () => {
  return (
    <>
      <h2 class="my-2">Experience Credentials</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Company</th>
            <th class="hide-sm">Title</th>
            <th class="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <ExpRow />
        </tbody>
      </table>
    </>
  );
};

export default ExpDetails;
