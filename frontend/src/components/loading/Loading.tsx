import React from "react";
import SyncLoader from "react-spinners/SyncLoader";

import "./Loading.scss";

interface IProps {
  isLoading?: boolean;
}
const Loading = ({ isLoading = true }: IProps) => {
  return (
    <div className={`loading ${isLoading}`}>
      <div className="loading-content">
        <SyncLoader
          color="#d63636"
          cssOverride={{}}
          loading={isLoading}
          margin={5}
          size={11}
          speedMultiplier={0.8}
        />
      </div>
    </div>
  );
};

export default Loading;
