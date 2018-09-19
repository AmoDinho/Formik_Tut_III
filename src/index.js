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
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.email &&
        touched.email && (
          <div style={{ color: "red", marginTop: ".5rem" }}>{errors.email}</div>
        )}

      <MySelect
        value={values.topics}
        onChange={setFieldValue}
        onBlur={setFieldTouched}
        error={errors.topics}
        touched={touched.topics}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        style={{ marginTop: "1em" }}
      >
        Submit
      </button>
    </form>
  );
};

const options = [
  { value: "Abantu", label: "Abantu" },
  { value: "Isayensi", label: "Isayensi" },
  { value: "William Wilbourforce", label: "William Wilbourforce" },
  { value: "Ezempilo", label: "Ezempilo" }
];

class MySelect extends React.Component {
  //Calls setfieldvalue and manaually update values.topics
  handleChange = value => {
    this.props.onChange("topics", value);
  };

  handleBlur = () => {
    //Will Call setFieldTouched and manually update touched.topics
    this.props.onBlur("topics", true);
  };

  render() {
    return (
      <div style={{ marging: "1rem 0", marginTop: "1em" }}>
        <label htmlFor="color">Topics (select atleast 3)</label>
        <Select
          id="color"
          options={options}
          isMulti={true}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
        />
        {!!this.props.error &&
          this.props.touched && (
            <div style={{ color: "red", marginTop: ".5rem" }}>
              {this.props.error}
            </div>
          )}
      </div>
    );
  }
}

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
