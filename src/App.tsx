import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDownIcon,
  AdjustmentsHorizontalIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
  SwatchIcon,
  ShareIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

// Define types for our table data
interface Cell {
  id: string;
  value: string;
}

interface Row {
  id: string;
  cells: Cell[];
}

interface Column {
  id: string;
  header: string;
}

interface Task {
  id: number;
  name: string;
  status: 'Done' | 'In progress' | 'To do';
  priority: 'Low' | 'Medium' | 'High';
  startDate: string;
  deadline: string;
}

const initialTasks: Task[] = [
  {
    id: 1,
    name: 'Quarterly launch',
    status: 'Done',
    priority: 'Low',
    startDate: '17 februari 2025',
    deadline: '20 februari 2025',
  },
  {
    id: 2,
    name: 'Customer research',
    status: 'In progress',
    priority: 'Medium',
    startDate: '21 februari 2025',
    deadline: '24 februari 2025',
  },
  {
    id: 3,
    name: 'Campaign analysis',
    status: 'To do',
    priority: 'High',
    startDate: '25 februari 2025',
    deadline: '28 februari 2025',
  },
];

// Valid options for dropdowns
const statusOptions = ['Done', 'In progress', 'To do'];
const priorityOptions = ['Low', 'Medium', 'High'];

function App() {
  // Original task state
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  
  // New table builder state
  const [columns, setColumns] = useState<Column[]>([]);
  const [rows, setRows] = useState<Row[]>([]);
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [hoveredColumn, setHoveredColumn] = useState<string | null>(null);

  // Initialize table with default data
  useEffect(() => {
    const initialColumns: Column[] = Array.from({ length: 5 }, (_, i) => ({
      id: `col-${i}`,
      header: i === 0 ? 'Name' : 
             i === 1 ? 'Status' : 
             i === 2 ? 'Priority' : 
             i === 3 ? 'Start date' : 'Deadline',
    }));

    const initialRows: Row[] = Array.from({ length: 3 }, (_, rowIndex) => ({
      id: `row-${rowIndex}`,
      cells: initialColumns.map((col, colIndex) => {
        let value = '';
        if (rowIndex === 0) {
          if (colIndex === 0) value = 'Quarterly launch';
          if (colIndex === 1) value = 'Done';
          if (colIndex === 2) value = 'Low';
          if (colIndex === 3) value = '17 februari 2025';
          if (colIndex === 4) value = '20 februari 2025';
        } else if (rowIndex === 1) {
          if (colIndex === 0) value = 'Customer research';
          if (colIndex === 1) value = 'In progress';
          if (colIndex === 2) value = 'Medium';
          if (colIndex === 3) value = '21 februari 2025';
          if (colIndex === 4) value = '24 februari 2025';
        } else if (rowIndex === 2) {
          if (colIndex === 0) value = 'Campaign analysis';
          if (colIndex === 1) value = 'To do';
          if (colIndex === 2) value = 'High';
          if (colIndex === 3) value = '25 februari 2025';
          if (colIndex === 4) value = '28 februari 2025';
        }
        
        return {
          id: `${col.id}-row-${rowIndex}`,
          value,
        };
      }),
    }));

    setColumns(initialColumns);
    setRows(initialRows);
  }, []);

  // Generate a unique ID
  const generateId = () => {
    return Math.random().toString(36).substring(2, 9);
  };

  // Add a new column
  const addColumn = () => {
    const newColumnId = `col-${generateId()}`;
    const newColumn: Column = {
      id: newColumnId,
      header: `New Column`,
    };

    // Add the new column
    setColumns([...columns, newColumn]);

    // Add a cell for this column to each row
    setRows(
      rows.map((row) => ({
        ...row,
        cells: [
          ...row.cells,
          {
            id: `${newColumnId}-${row.id}`,
            value: '',
          },
        ],
      }))
    );
  };

  // Remove a column
  const removeColumn = (columnId: string) => {
    // Ensure we always have at least one column
    if (columns.length <= 1) return;

    // Remove the column
    setColumns(columns.filter((col) => col.id !== columnId));

    // Remove the corresponding cell from each row
    setRows(
      rows.map((row) => ({
        ...row,
        cells: row.cells.filter((cell) => !cell.id.startsWith(columnId)),
      }))
    );
  };

  // Add a new row
  const addRow = () => {
    const newRowId = `row-${generateId()}`;
    const newRow: Row = {
      id: newRowId,
      cells: columns.map((col) => ({
        id: `${col.id}-${newRowId}`,
        value: '',
      })),
    };

    setRows([...rows, newRow]);
  };

  // Remove a row
  const removeRow = (rowId: string) => {
    // Ensure we always have at least one row
    if (rows.length <= 1) return;

    setRows(rows.filter((row) => row.id !== rowId));
  };

  // Update a cell value
  const updateCellValue = (cellId: string, value: string) => {
    setRows(
      rows.map((row) => ({
        ...row,
        cells: row.cells.map((cell) =>
          cell.id === cellId ? { ...cell, value } : cell
        ),
      }))
    );
  };

  // Update a column header
  const updateColumnHeader = (columnId: string, header: string) => {
    setColumns(
      columns.map((col) =>
        col.id === columnId ? { ...col, header } : col
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'done': return 'bg-green-100 text-green-800';
      case 'in progress': return 'bg-yellow-100 text-yellow-800';
      case 'to do': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'low': return 'bg-yellow-100 text-yellow-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const [editingCell, setEditingCell] = useState<{id: number, field: string} | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [headers, setHeaders] = useState({
    name: 'Name',
    status: 'Status',
    priority: 'Priority',
    startDate: 'Start date',
    deadline: 'Deadline'
  });
  const [editingHeader, setEditingHeader] = useState<string | null>(null);
  const [headerEditValue, setHeaderEditValue] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);
  const headerInputRef = useRef<HTMLInputElement>(null);

  // Focus input when editing starts
  useEffect(() => {
    if (editingCell && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingCell]);

  useEffect(() => {
    if (editingHeader && headerInputRef.current) {
      headerInputRef.current.focus();
    }
  }, [editingHeader]);

  const startEditing = (id: number, field: string, value: string) => {
    setEditingCell({ id, field });
    setEditValue(value);
  };

  const saveEdit = () => {
    if (editingCell) {
      const { id, field } = editingCell;
      const updatedTasks = tasks.map(task => {
        if (task.id === id) {
          return { ...task, [field]: editValue };
        }
        return task;
      });
      setTasks(updatedTasks);
      setEditingCell(null);
    }
  };

  const startEditingHeader = (field: string) => {
    setEditingHeader(field);
    setHeaderEditValue(headers[field as keyof typeof headers]);
  };

  const saveHeaderEdit = () => {
    if (editingHeader) {
      setHeaders({
        ...headers,
        [editingHeader]: headerEditValue
      });
      setEditingHeader(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      setEditingCell(null);
    }
  };

  const handleHeaderKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveHeaderEdit();
    } else if (e.key === 'Escape') {
      setEditingHeader(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          {/* Header */}
          <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between">
            <div className="flex items-center space-x-3">
              <h1 className="text-lg font-medium text-gray-900">Projects</h1>
              <ChevronDownIcon className="h-5 w-5 text-gray-500" />
            </div>
            <div className="mt-3 sm:mt-0 sm:flex sm:items-center space-x-3">
              <button 
                onClick={addRow}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                + Add row
              </button>
            </div>
          </div>

          {/* Toolbar */}
          <div className="px-4 py-3 border-b border-gray-200 flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="text-sm text-gray-600">Views</span>
            </div>
            <button className="flex items-center space-x-1 text-sm text-gray-600">
              <AdjustmentsHorizontalIcon className="h-4 w-4" />
              <span>Grid view</span>
            </button>
            <button className="flex items-center space-x-1 text-sm text-gray-600">
              <FunnelIcon className="h-4 w-4" />
              <span>Hide fields</span>
            </button>
            <button className="flex items-center space-x-1 text-sm text-gray-600">
              <FunnelIcon className="h-4 w-4" />
              <span>Filter</span>
            </button>
            <button className="flex items-center space-x-1 text-sm text-gray-600">
              <ArrowsUpDownIcon className="h-4 w-4" />
              <span>Sort</span>
            </button>
            <button className="flex items-center space-x-1 text-sm text-gray-600">
              <SwatchIcon className="h-4 w-4" />
              <span>Color</span>
            </button>
            <button className="flex items-center space-x-1 text-sm text-gray-600">
              <ShareIcon className="h-4 w-4" />
              <span>Share and sync</span>
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  {columns.map((column, colIndex) => (
                    <th 
                      key={column.id}
                      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                        hoveredColumn === column.id ? 'bg-blue-50' : ''
                      } ${colIndex === 0 ? 'flex items-center' : ''}`}
                      onMouseEnter={() => setHoveredColumn(column.id)}
                      onMouseLeave={() => setHoveredColumn(null)}
                    >
                      {colIndex === 0 && (
                        <input type="checkbox" className="rounded border-gray-300 mr-3" />
                      )}
                      <div className="flex items-center justify-between w-full group">
                        <div 
                          className="cursor-pointer"
                          onClick={() => setSelectedCell(`header-${column.id}`)}
                        >
                          {selectedCell === `header-${column.id}` ? (
                            <input
                              type="text"
                              value={column.header}
                              onChange={(e) => updateColumnHeader(column.id, e.target.value)}
                              onBlur={() => setSelectedCell(null)}
                              autoFocus
                              className="bg-transparent border-b border-gray-400 focus:outline-none focus:border-blue-500 w-full"
                            />
                          ) : (
                            <span>
                              {column.header}
                              <ChevronDownIcon className="h-4 w-4 ml-1 inline" />
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => removeColumn(column.id)}
                          className="text-gray-400 hover:text-red-500 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </th>
                  ))}
                  
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={addColumn}
                      className="text-gray-400 hover:text-blue-500"
                      title="Add column"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </th>
                </tr>
              </thead>
              
              <tbody className="bg-white divide-y divide-gray-200">
                {rows.map((row, rowIndex) => (
                  <tr 
                    key={row.id}
                    className={`group ${hoveredRow === row.id ? 'bg-blue-50' : ''}`}
                    onMouseEnter={() => setHoveredRow(row.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    {row.cells.map((cell, cellIndex) => {
                      const column = columns[cellIndex];
                      const isFirstCell = cellIndex === 0;
                      const isStatusCell = cellIndex === 1;
                      const isPriorityCell = cellIndex === 2;
                      
                      return (
                        <td 
                          key={cell.id}
                          className={`px-6 py-4 whitespace-nowrap ${
                            hoveredColumn === column?.id && !isFirstCell ? 'bg-blue-50' : ''
                          }`}
                        >
                          {isFirstCell ? (
                            <div className="flex items-center">
                              <input type="checkbox" className="rounded border-gray-300 mr-3" />
                              <div 
                                className="cursor-pointer text-sm font-medium text-gray-900"
                                onClick={() => setSelectedCell(cell.id)}
                              >
                                {selectedCell === cell.id ? (
                                  <input
                                    type="text"
                                    value={cell.value}
                                    onChange={(e) => updateCellValue(cell.id, e.target.value)}
                                    onBlur={() => setSelectedCell(null)}
                                    autoFocus
                                    className="bg-transparent border-b border-gray-400 focus:outline-none focus:border-blue-500 w-full"
                                  />
                                ) : (
                                  cell.value
                                )}
                              </div>
                            </div>
                          ) : isStatusCell ? (
                            <div 
                              className="cursor-pointer"
                              onClick={() => setSelectedCell(cell.id)}
                            >
                              {selectedCell === cell.id ? (
                                <select
                                  value={cell.value}
                                  onChange={(e) => updateCellValue(cell.id, e.target.value)}
                                  onBlur={() => setSelectedCell(null)}
                                  autoFocus
                                  className="bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                  <option value="Done">Done</option>
                                  <option value="In progress">In progress</option>
                                  <option value="To do">To do</option>
                                </select>
                              ) : (
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(cell.value)}`}>
                                  {cell.value}
                                </span>
                              )}
                            </div>
                          ) : isPriorityCell ? (
                            <div 
                              className="cursor-pointer"
                              onClick={() => setSelectedCell(cell.id)}
                            >
                              {selectedCell === cell.id ? (
                                <select
                                  value={cell.value}
                                  onChange={(e) => updateCellValue(cell.id, e.target.value)}
                                  onBlur={() => setSelectedCell(null)}
                                  autoFocus
                                  className="bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                  <option value="Low">Low</option>
                                  <option value="Medium">Medium</option>
                                  <option value="High">High</option>
                                </select>
                              ) : (
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(cell.value)}`}>
                                  {cell.value}
                                </span>
                              )}
                            </div>
                          ) : (
                            <div 
                              className="cursor-pointer text-sm text-gray-500"
                              onClick={() => setSelectedCell(cell.id)}
                            >
                              {selectedCell === cell.id ? (
                                <input
                                  type="text"
                                  value={cell.value}
                                  onChange={(e) => updateCellValue(cell.id, e.target.value)}
                                  onBlur={() => setSelectedCell(null)}
                                  autoFocus
                                  className="bg-transparent border-b border-gray-400 focus:outline-none focus:border-blue-500 w-full"
                                />
                              ) : (
                                cell.value
                              )}
                            </div>
                          )}
                        </td>
                      );
                    })}
                    
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => removeRow(row.id)}
                        className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete row"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
