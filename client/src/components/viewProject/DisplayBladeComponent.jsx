import Table from "react-bootstrap/Table";
export const DisplayBlade = ({ data }) => {
  return (
    <>
      <Table className="tables" responsive>
        <thead>
          <tr>
            <th>Id</th>
            <th>Status</th>
            <th>Transferable</th>
            <th>mintAddress</th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 &&
            data.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.status}</td>
                  <td>{item.transferable ? "Yes" : "No"}</td>
                  <td>{item.mintAddress}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};
