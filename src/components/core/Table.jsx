import React, { useState } from "react";
import { Link } from "react-router-dom";

const DepartmentTable = () => {
  const [data, setData] = useState([
    {
      id: 1,
      department: "HR",
      category: "Admin",
      location: "New York",
      salary: "$50,000",
      employees: 10,
    },
    {
      id: 2,
      department: "IT",
      category: "Tech",
      location: "San Francisco",
      salary: "$90,000",
      employees: 25,
    },
    {
      id: 3,
      department: "Marketing",
      category: "Sales",
      location: "Chicago",
      salary: "$70,000",
      employees: 15,
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const handleEdit = (id) => {
    alert(`Edit department with ID: ${id}`);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };


  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Departments</h2>
        <Link to={"/create-department"}>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Add Department
        </button>
        </Link>
      </div>
      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Department</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Location</th>
            <th className="border border-gray-300 px-4 py-2">Salary</th>
            <th className="border border-gray-300 px-4 py-2">Employees</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id}>
              <td className="border border-gray-300 px-4 py-2">
                {item.department}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.category}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.location}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.salary}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.employees}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="mr-2 bg-blue-500 text-white px-3 py-1 rounded-md"
                  onClick={() => handleEdit(item.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          className="bg-gray-300 text-black px-4 py-2 rounded-md"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          ← Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="bg-gray-300 text-black px-4 py-2 rounded-md"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default DepartmentTable;
