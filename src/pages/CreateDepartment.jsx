import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createDepartment } from "../services/taskApi";

export default function AddDepartmentForm() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Department Data:", data);
    const result = await createDepartment( {...data}, token, navigate);
    console.log(result);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Add Department</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Department Name</label>
          <select
            {...register("departmentName", {
              required: "Department Name is required",
            })}
            className="w-full mt-1 p-2 border rounded-md bg-white"
          >
            <option value="">Select Department</option>
            <option value="HR">Google IT Solutions</option>
            <option value="Finance">ipangram</option>
            <option value="Engineering">facebook</option>
            <option value="Marketing">wipro</option>
            <option value="Marketing">walmart</option>
          </select>
          {errors.departmentName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.departmentName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium">Category Name</label>
          <select
            {...register("categoryName", {
              required: "Category Name is required",
            })}
            className="w-full mt-1 p-2 border rounded-md bg-white"
          >
            <option value="">Select Category</option>
            <option value="Full-Time">HR</option>
            <option value="Part-Time">IT</option>
            <option value="sales">Sales</option>
            <option value="Product">Product</option>
            <option value="Marketing">Marketing</option>
          </select>
          {errors.categoryName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.categoryName.message}
            </p>
          )}
        </div>

        {/* Location (Text Input) */}
        <div>
          <label className="block font-medium">Location</label>
          <input
            {...register("location", { required: "Location is required" })}
            className="w-full mt-1 p-2 border rounded-md"
            placeholder="Enter location"
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Salary (Number Input) */}
        <div>
          <label className="block font-medium">Salary</label>
          <input
            type="number"
            {...register("salary", {
              required: "Salary is required",
              min: { value: 1, message: "Salary must be greater than 0" },
            })}
            className="w-full mt-1 p-2 border rounded-md"
            placeholder="Enter salary"
          />
          {errors.salary && (
            <p className="text-red-500 text-sm mt-1">{errors.salary.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add Department
        </button>
      </form>
    </div>
  );
}
