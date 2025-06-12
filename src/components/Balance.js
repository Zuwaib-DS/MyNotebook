import { useDispatch } from "react-redux";
import { actionCreators } from "../state";
import { bindActionCreators } from "redux";

const Balance = () => {
const dispatch = useDispatch();
const {withdrawMoney, depositMoney} = bindActionCreators(actionCreators, dispatch);


  //let [balance, setBalance] = useState(0);
  // const handleBalanceChange = (amount = 50, isIncrement=true) => {
  //   setBalance(isIncrement ? balance+amount : balance-amount);
  // }

  return (
    <section className="bg-light py-3 py-md-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
            <div className="card border border-light-subtle rounded-3 shadow-sm">
              <div className="card-body p-3 p-md-4 p-xl-5">
                <h2 className="fs-6 fw-normal text-center text-secondary mb-4">
                  Manage Account Balance
                </h2>
                <h5 className=" text-center">Current Balance: </h5>
                <div className="d-flex justify-content-center mt-4">
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-primary" onClick={() => withdrawMoney(50)}>
                      -
                    </button>
                    <button type="button" className="btn btn-primary" onClick={() => depositMoney(50)}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Balance;
