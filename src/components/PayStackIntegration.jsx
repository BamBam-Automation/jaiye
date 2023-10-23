import PaystackPop from "@paystack/inline-js";

const PayStackIntegration = (props) => {
  const paystack = new PaystackPop();
  paystack.newTransaction({
    key: "pk_test_b6dad8eb9616b4f29b0a2a4a3918636326e9870d",
    amoount: props.amoount,
    email: props.email,
    firstname: props.firstname,
    lastname: props.lastname,
    onSuccess(transaction) {
      let message = `Payment Complete!!! Referencce ${transaction.referennce}`;
      alert(message);
    },
    onCancel() {
      alert("Transanction Cancelled");
    },
  });

  //   return <div>PayStackIntegration</div>;
};

export default PayStackIntegration;
