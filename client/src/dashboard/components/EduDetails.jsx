import React from "react";
import EduRow from "./EduRow";

const EduDetails = () => {
  return (
    <>
      <table class="table">
        <thead>
          <tr>
            <th>School</th>
            <th class="hide-sm">Degree</th>
            <th class="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <EduRow />
        </tbody>
      </table>
    </>
  );
};

export default EduDetails;
