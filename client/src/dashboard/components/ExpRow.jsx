import React from "react";
const ExpRow = () => {
  return (
    <>
      <tr>
        <td>Tech Guy Web Solutions</td>
        <td class="hide-sm">Senior Developer</td>
        <td class="hide-sm">02-03-2009 - 01-02-2014</td>
        <td>
          <button class="btn btn-danger">Delete</button>
        </td>
      </tr>
      <tr>
        <td>Traversy Media</td>
        <td class="hide-sm">Instructor & Developer</td>
        <td class="hide-sm">02-03-2015 - Now</td>
        <td>
          <button class="btn btn-danger">Delete</button>
        </td>
      </tr>
    </>
  );
};

export default ExpRow;
