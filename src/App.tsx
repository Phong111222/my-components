import Datagrid, { EnhancedColumnDef } from "./components/table";

const data = [
  {
    name: "Frank Nguyen",
    age: 25,
    height: 174,
  },
  {
    name: "Logan Nguyen",
    age: 25,
    height: 169,
  },
];

const columns: EnhancedColumnDef<(typeof data)[number]>[] = [
  {
    id: "basic-info",
    header: "Basic Information",
    enableGrouping: true,

    columns: [
      {
        id: "name",
        header: "Name",
        accessorKey: "name",
      },
      {
        id: "age",
        header: "Age",
        accessorKey: "age",
        enableRowSpan: true,
      },
    ],
  },
  {
    id: "name-height",
    header: "Name & Height",
    accessorFn: (row) => `${row.name}-${row.height}`,
    cell: (props) => <strong>{props.getValue<string>()}</strong>,
  },
];

function App() {
  return (
    <div className="App">
      <h1>FNg - Components</h1>
      <Datagrid data={data} columns={columns} enableTableRowSpan />
    </div>
  );
}

export default App;
