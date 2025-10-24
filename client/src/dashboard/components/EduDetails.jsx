import React from "react";
import EduRow from "./EduRow";

const EduDetails = ({ education, onDelete }) => {
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
          {/* <EduRow /> */}
          {education && education.length > 0 ? (
            education.map((edu) => (
              <EduRow key={edu._id} edu={edu} onDelete={onDelete} />
            ))
          ) : (
            <tr>
              <td colSpan="4">No education credentials found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default EduDetails;
