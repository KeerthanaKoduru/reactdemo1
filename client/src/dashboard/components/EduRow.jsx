import React from "react";

const EduRow = ({ edu, onDelete }) => (
  <tr>
    <td>{edu.school}</td>
    <td className="hide-sm">{edu.degree}</td>
    <td className="hide-sm">
      {edu.from} - {edu.to}
    </td>
    <td>
      <button className="btn btn-danger" onClick={() => onDelete(edu._id)}>
        Delete
      </button>
    </td>
  </tr>
);

export default EduRow;

// import React from "react";

// const EduRow = () => {
//   return (
//     <>
//       <tr>
//         <td>Northern Essex</td>
//         <td class="hide-sm">Associates</td>
//         <td class="hide-sm">02-03-2007 - 01-02-2009</td>
//         <td>
//           <button class="btn btn-danger">Delete</button>
//         </td>
//       </tr>
//     </>
//   );
// };

// export default EduRow;
