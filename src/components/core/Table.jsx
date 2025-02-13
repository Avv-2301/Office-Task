import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { deleteDepartment, getDepartment } from "../../services/taskApi";

const DepartmentTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { token } = useSelector((state) => state.auth);
  const itemsPerPage = 2;

  const handleEdit = (id) => {
    alert(`Edit department with ID: ${id}`);
  };

  const handleDelete = async(id) => {
    console.log(id)
    const deleteResponse = await deleteDepartment(id, token);
    // console.log(deleteResponse);
  };

  const fetchDepartment = async () => {
    const response = await getDepartment(token);
    // console.log(response);
    if (response) {
      setData(response);
    }
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    fetchDepartment();
  }, []);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Departments</h2>
        <Link to={"/create-department"}>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md">
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
          {data.length === 0 ? (
            <>No Departments</>
          ) : (
            <>
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.departmentName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.categoryName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.location}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.salary}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.employees.length === 0 ? (<>No Employees</>) : (item.employees)}
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
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </>
          )}
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
