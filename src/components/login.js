import { Link, useNavigate } from "react-router-dom";
import authContext from "../context/auth/AuthContext";
import logo from "../logo.svg";
import { useContext } from "react";
import UserAuth from "../helpers/UserAuth";

function Login() {
  const auth = useContext(authContext);
  const navigate = useNavigate();
  const AUTH_API_URL = process.env.REACT_APP_API_BASE_URL + "auth";

  const handleSubmit = (e) => {
    const formData = new FormData(e.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
      //rememberMe: formData.get("rememberMe") === "on"
    };

    fetch(AUTH_API_URL, {
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
        if (status === 200) {
            UserAuth.saveAuth(result);
            navigate("/");
        }
        else auth.showAlert(result.error ? result.error : "An error occurred. Please contact the admin!", "danger");
      })
      .catch((error) => {
        auth.showAlert(error, "danger");
      });
    e.preventDefault();
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <section className="bg-light py-3 py-md-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                <div className="card border border-light-subtle rounded-3 shadow-sm">
                  <div className="card-body p-3 p-md-4 p-xl-5">
                    <div className="text-center mb-3">
                      <a href="/">
                        <img src={logo} className="App-logo" alt="logo" />
                      </a>
                    </div>
                    <h2 className="fs-6 fw-normal text-center text-secondary mb-4">
                      Sign in to your account
                    </h2>
                    <form onSubmit={handleSubmit} method="POST">
                      <div className="row gy-2 overflow-hidden">
                        <div className="col-12">
                          <div className="form-floating mb-3">
                            <input
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
                          <div className="d-flex gap-2 justify-content-between d-none">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                name="rememberMe"
                                id="rememberMe"
                              />
                              <label
                                className="form-check-label text-secondary"
                                htmlFor="rememberMe"
                              >
                                Keep me logged in
                              </label>
                            </div>
                            <a
                              href="#!"
                              className="link-primary text-decoration-none"
                            >
                              Forgot password?
                            </a>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="d-grid my-3">
                            <button
                              className="btn btn-primary btn-lg"
                              type="submit"
                            >
                              Log in
                            </button>
                          </div>
                        </div>
                        <div className="col-12">
                          <p className="m-0 text-secondary text-center">
                            Don't have an account?{" "}
                            <Link
                              to="/signup"
                              className="link-primary text-decoration-none"
                            >
                              Sign up
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
      </div>
    </div>
  );
}

export default Login;
