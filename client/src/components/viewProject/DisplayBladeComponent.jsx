import Table from "react-bootstrap/Table";
import pic from "./image.jpeg";
export const DisplayBlade = ({ projectId }) => {
  return (
    <>
      <Table className="tables" responsive>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>URL</th>
            <th>Image</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>100</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>
              <img src={pic} alt="pic" height={70} />
            </td>
            <td>Owner1</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>
              <img src={pic} alt="pic" height={70} />
            </td>
            <td>Owner2</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
