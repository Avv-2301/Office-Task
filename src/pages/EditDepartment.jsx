import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDepartment, updateDepartment } from "../services/taskApi";
import { getAllEmployees } from "../services/taskApi";

const EditDepartment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [department, setDepartment] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  useEffect(() => {
    const fetchDepartment = async () => {
      const response = await getDepartment(token);
      //   console.log(response)
      const dept = response.find((d) => d._id === id);
      if (dept) {
        setDepartment(dept);
        setSelectedEmployees(dept.employees || []);
      }
    };

    const fetchEmployees = async () => {
      const empResponse = await getAllEmployees(token);
      if (empResponse) {
        setEmployees(empResponse);
      }
    };

    fetchDepartment();
    fetchEmployees();
  }, [id, token]);

  const handleEmployeeChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedEmployees(selectedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedDepartment = { employeesId: selectedEmployees };
    await updateDepartment(id, token, updatedDepartment);
    navigate("/dashboard");
  };

  return department ? (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Edit Department</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Assign Employees:</label>
        <select
          multiple
          value={selectedEmployees}
          onChange={handleEmployeeChange}
          className="w-full border px-3 py-2 rounded-md"
        >
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
        >
          Save
        </button>
      </form>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default EditDepartment;
