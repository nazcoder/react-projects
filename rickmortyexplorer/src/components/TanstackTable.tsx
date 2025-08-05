import { useReactTable, getCoreRowModel, ColumnDef } from "@tanstack/react-table"

type Person = {
    id: number;
    name: string;
    gender: string
}

const columns: ColumnDef<Person>[] = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'gender', header: 'Gender' },
    { accessorKey: 'species', header: 'Species' },
    { accessorKey: 'status', header: 'Status' },
];

type TableProps = {
    data: Person[],
    handleRowClick: (id: number) => void;
}
function TanstackTable({ data, handleRowClick }: Readonly<TableProps>) {

    const table = useReactTable({
        data: data,
        columns: columns,
        getCoreRowModel: getCoreRowModel()
    })

    const renderHeader = (header) => {
        return header.column.columnDef.header
    }
    return (
        <div>
            <table className='tanstack-table'>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {header.isPlaceholder ? null : renderHeader(header)}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {
                        table.getRowModel().rows.length === 0 && (
                            <tr>
                                <td colSpan={columns.length}>No data available</td>
                            </tr>
                        )
                    }
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="tanstack-table-row" onClick={() => handleRowClick(row.original.id)}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {cell.getValue() as string}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TanstackTable