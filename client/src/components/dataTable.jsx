import React from 'react';
import { useTable, usePagination } from 'react-table';
import PropTypes from 'prop-types';

const ActivityTable = ({ activities, showPagination }) => {
  const columns = React.useMemo(() => [
    { Header: 'Tanggal', accessor: 'tanggal' },
    { Header: 'Deskripsi', accessor: 'deskripsi' },
    { Header: 'Jumlah', accessor: 'jumlah', Cell: ({ value }) => `$${value}` },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ value }) => (
        <span className={`px-2 py-1 rounded-full text-xs ${value === 'Sukses' ? 'bg-green-500' : value === 'Diproses' ? 'bg-yellow-500' : 'bg-blue-500'}`}>
          {value}
        </span>
      ),
    },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Current page rows
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    gotoPage,
    state: { pageIndex },
    setPageSize,
  } = useTable(
    {
      columns,
      data: activities,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  // Set page size to 6 entries per page
  React.useEffect(() => {
    setPageSize(6);
  }, [setPageSize]);

  return (
    <>
      <table {...getTableProps()} className="w-full bg-gray-800 rounded-lg">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className="text-left text-gray-400" key={headerGroup.id}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className="pb-2" key={column.id}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="border-t border-gray-700" key={row.id}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="py-2" key={cell.column.id}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {showPagination && (
        <div className="mt-4 flex justify-between items-center text-sm">
          <span>
            Menampilkan {pageIndex * 6 + 1} - {Math.min((pageIndex + 1) * 6, activities.length)} dari {activities.length} aktivitas
          </span>

          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 rounded-md ${!canPreviousPage ? 'bg-gray-500 cursor-not-allowed' : 'bg-gray-700 hover:bg-green-500'}`}
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              {'<'}
            </button>

            {pageOptions.map((pageNum, idx) => (
              <button
                key={idx}
                className={`px-3 py-1 rounded-md ${pageIndex === pageNum ? 'bg-green-500' : 'bg-gray-700 hover:bg-green-500'}`}
                onClick={() => gotoPage(pageNum)}
              >
                {pageNum + 1}
              </button>
            ))}

            <button
              className={`px-3 py-1 rounded-md ${!canNextPage ? 'bg-gray-500 cursor-not-allowed' : 'bg-gray-700 hover:bg-green-500'}`}
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              {'>'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

ActivityTable.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      tanggal: PropTypes.string.isRequired,
      deskripsi: PropTypes.string.isRequired,
      jumlah: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  showPagination: PropTypes.bool, // Tambahkan prop showPagination
};

ActivityTable.defaultProps = {
  showPagination: true, // Defaultnya pagination ditampilkan
};

export default ActivityTable;
