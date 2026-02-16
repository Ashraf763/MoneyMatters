import "./style.css";
import { ThreeDots } from "react-loader-spinner";

const LoadingView = () => (
  <div className="loader-container" data-testid="loader">
    <ThreeDots type="ThreeDots" color="black" height={50} width={50} />
  </div>
);

export default LoadingView;
