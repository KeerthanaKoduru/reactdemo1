import React from "react";

const ExpRow = ({ exp, onDelete }) => (
  <tr>
    <td>{exp.company}</td>
    <td className="hide-sm">{exp.title}</td>
    <td className="hide-sm">
      {exp.from} - {exp.to}
    </td>
    <td>
      <button className="btn btn-danger" onClick={() => onDelete(exp._id)}>
        Delete
      </button>
    </td>
  </tr>
);

export default ExpRow;
