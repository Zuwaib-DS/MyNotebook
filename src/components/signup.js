import { Link, useNavigate } from "react-router-dom";
import authContext from "../context/auth/AuthContext";
import logo from "../logo.svg";
import { useContext } from "react";

function Signup() {
  const auth = useContext(authContext);
  const navigate = useNavigate();
  const SIGNUP_API_URL = process.env.REACT_APP_API_BASE_URL + "signup";

  const handleSubmit = (e) => {
    const formData = new FormData(e.target);
    let password = formData.get("password");
    let cpassword = formData.get("cpassword");
    if (password !== cpassword)
      auth.showAlert("Passwords do not match!", "danger");
    else {
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      };

      fetch(SIGNUP_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(async (response) => {
          const result = await response.json();
          return { status: response.status, result }; // Proceed to parse JSON only if response is OK
        })
        .then(({ status, result }) => {
          if (status === 201) {
            auth.showAlert(
              "Account created successfully! You can now log in.",
              "success"
            );
            navigate("/login");
          } else
            auth.showAlert(
              result.error
                ? result.error
                : "An error occurred. Please contact the admin!",
              "danger"
            );
        })
        .catch((error) => {
          auth.showAlert(error, "danger");
        });
    }
    e.preventDefault();
  };

  return (
    <section className="bg-light py-3 py-md-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
            <div className="card border border-light-subtle rounded-3 shadow-sm">
              <div className="card-body p-3 p-md-4 p-xl-5">
                <div className="text-center mb-3">
                  <Link to="/">
                    <img src={logo} className="App-logo" alt="logo" />
                  </Link>
                </div>
                <h2 className="fs-6 fw-normal text-center text-secondary mb-4">
                  Create a new account
                </h2>
                <form method="POST" onSubmit={handleSubmit}>
                  <div className="row gy-2 overflow-hidden">
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          autoComplete="username"
                          readOnly
                          onFocus={(e) => e.target.removeAttribute("readonly")}
                          onBlur={(e) => e.target.setAttribute("readonly", "")}
                          type="email"
                          className="form-control"
                          name="email"
                          id="email"
                          placeholder="name@example.com"
                          required
                        />
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          className="form-control"
                          name="name"
                          id="name"
                          placeholder="Mohd Zuwaib"
                          required
                        />
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          autoComplete="new-password"
                          type="password"
                          className="form-control"
                          name="password"
                          id="password"
                          placeholder="Password"
                          required
                        />
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          autoComplete="new-password"
                          type="password"
                          className="form-control"
                          name="cpassword"
                          id="cpassword"
                          placeholder="Retype Password"
                          required
                        />
                        <label htmlFor="cpassword" className="form-label">
                          Confirm Password
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-grid my-3">
                        <button
                          className="btn btn-primary btn-lg"
                          type="submit"
                        >
                          Sign up
                        </button>
                      </div>
                    </div>
                    <div className="col-12">
                      <p className="m-0 text-secondary text-center">
                        Already have an account?{" "}
                        <Link
                          to="/login"
                          className="link-primary text-decoration-none"
                        >
                          Log in
                        </Link>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
