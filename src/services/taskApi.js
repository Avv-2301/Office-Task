import axios from "axios";
import { toast } from "react-hot-toast";
import { setLoading } from "../slices/authSlice";

export const createDepartment = async (formData, token, navigate) => {
  let result = [];
  const toastId = toast.loading("Loading...");
  const requestBody = { requestParams: formData };
  try {
    const response = await axios.post(
      "http://localhost:4000/api/v1/task/create-department",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response.data.data;

    toast.success("Department creation Successfully");
    navigate("/dashboard");
  } catch (error) {
    console.log("CREATE DEPARTMENT API ERROR............", error);
    toast.error("create Failed");
  }
  toast.dismiss(toastId);
  return result;
};

export const getDepartment = async (token) => {
  let result = [];
  const toastId = toast.loading("Loading...");
  try {
    const response = await axios.get(
      "http://localhost:4000/api/v1/task/get-department",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response.data.data;

    toast.success("Department fetched Successfully");
  } catch (error) {
    console.log("FETCH DEPARTMENT API ERROR............", error);
    toast.error("FETCH Failed");
  }
  toast.dismiss(toastId);
  return result;
};
