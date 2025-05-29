import Navbar from "./Navbar";
import Notes from "./Notes";

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
