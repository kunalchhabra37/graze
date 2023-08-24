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
            <th>Minter Address</th>
            <th>bladeOpenRate</th>
            <th>bladeOpened</th>
            <th>bladeSent</th>
            <th>bladeSubscriptionRate</th>
            <th>firstVisited</th>
            <th>lastVisited</th>
            <th>userScore</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
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
                <td>{item.attributes.bladeOpenRate}</td>
                <td>{item.attributes.bladeOpened}</td>
                <td>{item.attributes.bladeSent}</td>
                <td>{item.attributes.bladeSubscriptionRate}</td>
                <td>{item.attributes.firstVisited}</td>
                <td>{item.attributes.lastVisited}</td>
                <td>{item.attributes.userScore}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
