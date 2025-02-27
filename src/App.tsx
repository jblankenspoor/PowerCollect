import React, { useState } from 'react';
import {
  ChevronDownIcon,
  AdjustmentsHorizontalIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
  SwatchIcon,
  ShareIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

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

function App() {
  const [tasks] = useState<Task[]>(initialTasks);

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
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                + Add or import
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 mr-3" />
                    Name
                    <ChevronDownIcon className="h-4 w-4 ml-1" />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                    <ChevronDownIcon className="h-4 w-4 ml-1 inline" />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                    <ChevronDownIcon className="h-4 w-4 ml-1 inline" />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start date
                    <ChevronDownIcon className="h-4 w-4 ml-1 inline" />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deadline
                    <ChevronDownIcon className="h-4 w-4 ml-1 inline" />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <PlusIcon className="h-4 w-4" />
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 mr-3" />
                        <div className="text-sm font-medium text-gray-900">{task.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {task.startDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {task.deadline}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
