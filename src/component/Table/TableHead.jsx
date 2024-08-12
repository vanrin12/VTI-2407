function TableHead({ listTableHead }) {
  const renderTableHead = () => {
    return listTableHead.map((item) => {
      return <th key={item.id}>{item.label}</th>;
    });
  };
  return <tr>{renderTableHead()}</tr>;
}

export default TableHead;
