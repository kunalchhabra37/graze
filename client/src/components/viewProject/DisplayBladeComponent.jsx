import Table from "react-bootstrap/Table";
export const DisplayBlade = ({ data }) => {
  return (
    <>
      <Table className="tables" responsive>
        <thead>
          <tr>
            <th>Id</th>
            <th>Description</th>
            <th>Image</th>
            <th>OwnerAddress</th>
            <th>MintAddress</th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 &&
            data.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.description}</td>
                  <td>
                    <img src={item.image}></img>
                  </td>
                  <td>{`${item.mintAddress.substring(
                    0,
                    4
                  )}....${item.mintAddress.substring(
                    item.mintAddress.length - 2
                  )}`}</td>
                  <td>{`${item.ownerAddress.substring(
                    0,
                    4
                  )}....${item.ownerAddress.substring(
                    item.ownerAddress.length - 2
                  )}`}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};
