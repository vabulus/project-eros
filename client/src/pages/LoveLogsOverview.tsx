import { useProfileRedirect } from "../hooks/useProfileRedirect";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {resolveObjectURL} from "buffer";

export function LoveLogsOverview() {
  const { loading, data, authStatus } = useProfileRedirect();
  const navigate = useNavigate();
  const [loveLogData, setLoveLogData] = useState();

  useEffect(() => {
    if (!loading && authStatus === "unauthenticated") {
      navigate("/login");
    }
  }, [loading, authStatus, navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getLoveLogs = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/lovelog", {
          headers: {
            Authorization: `${token}`,
          },
        });
        setLoveLogData(response.data);
        alert(JSON.stringify(response.data));
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.error(error.response.data);
          alert(JSON.stringify(error.response.data));
        } else {
          console.error(error);
        }
      }
    };
    getLoveLogs();
  }, []); // Add dependencies if necessary

  const renderLoveLogData = () => {
    if (!loveLogData) return "fucker";
    // Assuming loveLogData is an array. Adjust if it's not.
    // return loveLogData.map((log, index) => (
    //   <div key={index}>
    //     {/* Render your log data here */}
    //   </div>
    // ));

    return loveLogData;
  };

  return <div>{renderLoveLogData()}</div>;
}

export default LoveLogsOverview;
