import axios from "../utils/axios";
import { profileUpdate } from "../redux/slices/auth";
export const CreateProfileHook = async (data, dispatch, navigate) => {
  try {
    const body = JSON.stringify(data);
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const res = await axios.post("/user/uploadData", body, config);
    const user = res.data;
    dispatch(
      profileUpdate({
        user: user,
        isLoggedIn: true,
      })
    );
    console.log(res.data);
    if (user) {
      navigate("/dashboard");
    }
  } catch (e) {}
};
// const checkTeacher = (data, dispatch) => {
//   axios;
// };
