import { Button } from "@mui/material";
import React from "react";
import API from "../utils/axios";
import useRazorpay, { RazorpayOptions } from "react-razorpay";
import { useSelector } from "react-redux";
import { useAlert } from 'react-alert'

const Test = () => {
  // const [user, ]
  const alert = useAlert()
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const Razorpay = useRazorpay();
  const showWidget = () => {
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: `dx1ye2bro`,
        uploadPreset: `kp2gvmnk`,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log(result.info);
          console.log(result.info.url);
        }
      }
    );
    widget.open();
  };

  const createOrder = async (amount) => {
    const res = await API.post("/user/buyCourse/createorder", { amount });
    return res;
  };

  const handlePayment = async () => {
    let order = await createOrder(200 * 100);
    order = order.data.razorRes;

    console.log(order);
    var options = {
      key: "rzp_test_7o3KFikLV8ENjP", // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: order.currency,
      name: "Studify",
      description: "Test Transaction",
      // "image": "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      // callback_url: "http://localhost:3000/user/razor/callback",
      handler: async (res) => {
        // alert(res.razorpay_payment_id);
        // alert(res.razorpay_order_id);
        // alert(res.razorpay_signature) ;
        const payload = {
          payment_id: res.razorpay_payment_id,
          order_id: res.razorpay_order_id,
          razor_signature: res.razorpay_signature,
          user_id: user._id,
          course_id: "faksdkfjd",
        };
        API.post("/user/razor/callback", payload);
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phone,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#6c63ff",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", (response) => {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
    });
    rzp1.open();
    // document.getElementById('rzp-button1').onclick = function(e){
    //     rzp1.open();
    //     e.preventDefault();
    // }
  };

  const handleAlert = () => {
    alert.show('Oh look, an alert!')
  }
  return (
    <div>
      <Button onClick={showWidget}>UPLOAD FILES</Button>
      <Button onClick={handlePayment}>Buy Course</Button>
      <Button onClick={handleAlert}>SHOW ALERT</Button>
    </div>
  );
};

export default Test;
