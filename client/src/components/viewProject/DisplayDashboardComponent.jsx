import Table from "react-bootstrap/Table";
export const DisplayDashboard = ({ data }) => {
  return (
    <>
      <Table className="tables" responsive>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Owner Address</th>
            <th>mintAddress</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.ownerAddress}</td>
                <td>{item.mintAddress}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
