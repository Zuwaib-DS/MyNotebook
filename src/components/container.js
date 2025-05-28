import Navbar from "./navbar";
import Notes from "./notes";

function Container() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Notes />
      </div>
    </>
  );
}

export default Container;
