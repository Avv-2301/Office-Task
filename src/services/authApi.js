import { toast } from "react-hot-toast";
import { setLoading, setToken, setUser } from "../slices/authSlice";
import axios from "axios";

export function signup(formData, navigate) {
  // console.log(formData);
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    const requestBody = { requestParams: formData };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/auth/sign-up",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error("Signup Failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function login(formData, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    const requestBody = { requestParams: formData };
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/auth/login",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("login api response", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Login successfull");
      dispatch(setToken(response.data.user.token));
      dispatch(setUser({ ...response.data.user }));

      localStorage.setItem("token", JSON.stringify(response.data.user.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error("Login Failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
