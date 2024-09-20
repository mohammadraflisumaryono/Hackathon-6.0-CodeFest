import React from 'react';
import { useTable, usePagination } from 'react-table';

const ActivityTable = ({ activities }) => {
  const columns = React.useMemo(() => [
    { Header: 'Tanggal', accessor: 'tanggal' },
    { Header: 'Deskripsi', accessor: 'deskripsi' },
    { Header: 'Jumlah', accessor: 'jumlah', Cell: ({ value }) => `$${value}` },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ value }) => (
        <span className={`px-2 py-1 rounded-full text-xs ${value === 'success' ? 'bg-green-500' : 'bg-yellow-500'}`}>
          {value}
        </span>
      ),
    },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setPageSize,
    canPreviousPage,
    canNextPage,
    page,
    gotoPage,
    nextPage,
    previousPage,
    pageOptions,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: activities,
    },
    usePagination
  );

  return (
    <>
      <table {...getTableProps()} className="w-full bg-gray-800 rounded-lg">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className="text-left text-gray-400">
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className="pb-2">{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="border-t border-gray-700">
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="py-2">{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-4 flex text-sm justify-between items-center">
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <div>
        </div>
      </div>
    </>
  );
};

export default ActivityTable;
