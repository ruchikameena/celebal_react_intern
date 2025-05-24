import { useState, useEffect } from "react";
//used to navigate to another page after successful submission
import { useNavigate } from "react-router-dom";

//used to set all the field black while initialization of form
const initialState = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  countryCode: "",
  phone: "",
  country: "",
  city: "",
  pan: "",
  aadhar: "",
};

const FormPage = () => {
  //these are used for controling and validating the form fields
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [onClick, setonClick] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  //used to select city based on selected country
  const cityOptions = {
    India: ["Jaipur", "Delhi", "Mumbai"],
    USA: ["New York", "Chicago", "Los Angeles"],
    Canada: ["Toronto", "Vancouver", "Montreal"],
  };

  //used to validate the form based on current user data
  const validate = (data) => {
    const errs = {};

    if (!data.firstName.trim()) errs.firstName = "First name is required.";
    else if (!/^[a-zA-Z]+$/.test(data.firstName))
      errs.firstName = "Must contain letters only.";

    if (!data.lastName.trim()) errs.lastName = "Last name is required.";
    else if (!/^[a-zA-Z]+$/.test(data.lastName))
      errs.lastName = "Must contain letters only.";

    if (!data.username.trim()) errs.username = "Username is required.";

    if (!data.email.trim()) errs.email = "Email is required.";
    else if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        data.email
      )
    )
      errs.email = "Please enter valid email Id";

    if (!data.password.trim()) errs.password = "Password is required.";
    else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(data.password)
    )
      errs.password =
        "Password must contain atleast 1 Capital letter, 1 small letter, 1 number, minimum of 8 character";

    if (!data.countryCode) errs.countryCode = "Country code is required.";

    if (!/^\d{10}$/.test(data.phone))
      errs.phone = "Phone must be exactly 10 digit number";

    if (!data.country) errs.country = "Please select country";

    if (!data.city) {
      if (!data.country) errs.city = "Please select the country first";
      else errs.city = "please select city";
    }

    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(data.pan.trim()))
      errs.pan =
        "Invalid PAN format use [LLLLLNNNNL] i.e. must contain 6 uppercase letters(L) and 4 numbers(N)";

    if (!/^\d{12}$/.test(data.aadhar))
      errs.aadhar =
        "Aadhar must be exactly 12 digits ONLY, no-space in between.";

    return errs;
  };
  //used to check & validating the errors in the form, recheck if any field value get changed
  useEffect(() => {
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setIsValid(Object.keys(validationErrors).length === 0);
  }, [formData]);

  //used to update the form field via. changing the old value with new value in the respective input name field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //get activated when the user click on any field, or filled wrong entry in the respective field
  const handleBlur = (e) => {
    const { name } = e.target;
    setonClick((prev) => ({ ...prev, [name]: true }));
  };

  //get activated once each entry is error free, link to another page if successful form filled,passing user data via state object and prevent from reloading the form while submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      navigate("/success", {
        state: formData,
      });
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>User Form</h2>

      {/* repetitive code is avoided and used map funtion to handle the feilds */}
      {[
        { label: "First Name", name: "firstName" },
        { label: "Last Name", name: "lastName" },
        { label: "Username", name: "username" },
        { label: "Email", name: "email", type: "email" },
        { label: "PAN No.", name: "pan" },
        { label: "Aadhar No.", name: "aadhar", type: "number" },
      ].map(
        // here we have passed label,name, default type to map the values
        ({ label, name, type = "text" }) => (
          //taken name as key value to map the values which must be unique to avoid any errors
          <div key={name}>
            <input
              type={type}
              name={name}
              placeholder={label}
              value={formData[name]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {/* used to check is user leave blank entry or wrong entry, hence show error for repective field*/}
            {onClick[name] && errors[name] && (
              <span className="error">{errors[name]}</span>
            )}
          </div>
        )
      )}
      <div className="passkey">
        <input
          // used to handle type of input field
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {/* used to handle the true/false for updating the type of input field, also to change the text of button*/}
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="toggle-btn"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      {/* to handle the error */}
      {onClick.password && errors.password && (
        <span className="error">{errors.password}</span>
      )}
      {/* used for country code and select via. dropdown */}
      <div>
        <div className="mobileNumber">
          <select
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">Select Country Code</option>
            <option value="+91">+91</option>
            <option value="+1">+1</option>
          </select>
          <input
            type="number"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {/* to handle error */}
        {/* handle the error  */}
        {onClick.countryCode && errors.countryCode && (
          <span className="error">{errors.countryCode}</span>
        )}
        {onClick.phone && errors.phone && (
          <span className="error">{errors.phone}</span>
        )}
      </div>
      {/* used to handle country */}
      <div>
        <select
          name="country"
          value={formData.country}
          onChange={(e) => {
            handleChange(e);
            setFormData((prev) => ({ ...prev, city: "" }));
          }}
          onBlur={handleBlur}
        >
          <option value="">Select Country</option>
          {/* taking country value form the cityOptions object we created earlier, taking key values as country using map function and put them in dropdown option*/}
          {Object.keys(cityOptions).map((country) => (
            <option key={country}>{country}</option>
          ))}
        </select>
        {/* to handle error  */}
        {onClick.country && errors.country && (
          <span className="error">{errors.country}</span>
        )}
      </div>
      {/* used for city field  */}
      <div>
        <select
          name="city"
          value={formData.city}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="">Select City</option>
          {(cityOptions[formData.country] || []).map((city) => (
            <option key={city}>{city}</option>
          ))}
        </select>
        {/* used to handle error */}
        {onClick.city && errors.city && (
          <span className="error">{errors.city}</span>
        )}
      </div>

      {/* only activated once the form is filled with correct entry */}
      <button type="submit" disabled={!isValid} className="submission">
        Submit
      </button>
    </form>
  );
};

export default FormPage;
