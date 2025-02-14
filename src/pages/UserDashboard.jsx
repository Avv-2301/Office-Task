import React, { useEffect, useState } from "react";
import { getAllEmployeesById } from "../services/taskApi";
import { useSelector } from "react-redux";

const UserDashboard = () => {
  const [data, setData] = useState([])
  const { token } = useSelector((state) => state.auth);

  const fetchUser = async() =>{
    const response = await getAllEmployeesById(token);
    console.log(response)
    if(response){
      setData(response)
    }
  }

  useEffect(() =>{
    fetchUser();
  },[])
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Assigned Department</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">Department</th>
              <th className="py-2 px-4 border">Category</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="text-center border">
                <td className="py-2 px-4 border">{item?.departmentName}</td>
                <td className="py-2 px-4 border">{item?.categoryName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;
