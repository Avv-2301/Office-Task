import React from "react";

const UserDashboard = () => {
  const tasks = [
    { id: 1, name: "Complete Report", role: "Manager", status: "Pending" },
    { id: 2, name: "Fix Bug #101", role: "Developer", status: "In Progress" },
  ];

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
            {tasks.map((task) => (
              <tr key={task.id} className="text-center border">
                <td className="py-2 px-4 border">{task.name}</td>
                <td className="py-2 px-4 border">{task.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;
