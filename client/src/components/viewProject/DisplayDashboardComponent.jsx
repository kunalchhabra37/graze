import Table from "react-bootstrap/Table";
export const DisplayDashboard = ({ projectId }) => {
  return (
    <>
      <Table className="tables" responsive>
        <thead>
          <tr>
            <th>User</th>
            <th>Id</th>
            <th>first visited</th>
            <th>last visited</th>
            <th>blades sent</th>
            <th>blades opened</th>
            <th>blade open rate</th>
            <th>blade subscription rate</th>
            <th>user score</th>
            <th>user star</th>
            <th>subscription status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>Owner1</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
