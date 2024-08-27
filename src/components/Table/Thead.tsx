interface TableColmun {
  header: string;
  id: string;
}
interface TheadProps {
  colums: TableColmun[];
}

const Thead = ({ colums }: TheadProps) => {
  const renderThead = () => {
    return colums.map((col) => {
      return <th key={col.id}>{col.header}</th>;
    });
  };
  return <tr>{renderThead()}</tr>;
};

export default Thead;
