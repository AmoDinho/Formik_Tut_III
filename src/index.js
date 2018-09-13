import React from "react";
import ReactDOM from "react-dom";
import Select from "react-select";
import * as Yup from "yup";
import "./styles.css";
import { withFormik } from "formik";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Invalid Email Address")
      .required("Email is required"),
    topics: Yup.array()
      .min(3, "Pick at least 3 tags")
      .of(
        Yup.object().shape({
          label: Yup.string().required(),
          value: Yup.string().required()
        })
      )
  }),

  mapPropsToValues: props => ({
    email: "",
    topics: []
  }),

  handleSubmit: (values, { setSubmtting }) => {
    const payload = {
      ...values,
      topics: values.topics.map(t => t.value)
    };

    setTimeout(() => {
      alert(JSON.stringify(payload, null, 2));
      setSubmtting(false);
    }, 1000);
  },
  displayName: "MyForm"
});

const MyForm = props => {
  const {
    values,
    touched,
    dirty,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    setFieldValue,
    setFieldTouched,
    isSubmitting
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email" style={{ display: "block" }}>
        Email
      </label>
      <input
        id="email"
        placeholder="Enter your Email"
        type="email"
        value={values.email}
      />
    </form>
  );
};

function App() {
  return (
    <div className="App">
      <h1>Formik with React-Select Example</h1>
      <MyEnhancedForm />
    </div>
  );
}

const MyEnhancedForm = formikEnhancer(MyForm);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
