import React from "react";
import ExpRow from "./ExpRow";

const ExpDetails = ({ experience, onDelete }) => {
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
          {/* <ExpRow /> */}
          {experience && experience.length > 0 ? (
            experience.map((exp) => (
              <ExpRow key={exp._id} exp={exp} onDelete={onDelete} />
            ))
          ) : (
            <tr>
              <td colSpan="4">No experience credentials found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default ExpDetails;
