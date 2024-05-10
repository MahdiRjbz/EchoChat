import { useContext } from "react";
import styles from "./Profile.module.css";
import { AuthContext } from "../../Contexts/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase";
import { Button } from "@mui/material";
import {
  Logout,
  VerifiedUserOutlined,
  QueryBuilder,
  LocalPhoneOutlined,
  EmailOutlined,
} from "@mui/icons-material";
import { useState } from "react";

const Profile = () => {
  const data = useContext(AuthContext);
  const [time, setTime] = useState(new Date().toLocaleTimeString())
  const navigate = useNavigate();
  const logoutHandler = async () => {
    await auth.signOut().then(() => {
      navigate("/");
    })
  };

  function getTime () {
    setTime(new Date().toLocaleTimeString())
  }
  setInterval(getTime, 1000)

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.titleDiv}>
          <h1>Profile</h1>
          <h4>Personal Information And Details</h4>
        </div>
        <div className={styles.Body}>
          <div className={styles.profileImageContainer}>
            <img src={data.photoURL} alt="" />
            <h4>{data.displayName}</h4>
            <Button
              sx={{ color: "red", borderColor: "red" }}
              variant="outlined"
              onClick={logoutHandler}
              startIcon={<Logout />}
            >
              Logout
            </Button>
          </div>

          <div className={styles.infoContainer}>
            <div className={styles.infoDiv}>
              <div>
                <QueryBuilder sx={{ color: "#665DFE" }} />
              </div>
              <div className={styles.infoTitleDiv}>
                <p>Local Time</p>
                <h6>{time}</h6>
              </div>
            </div>
            <div className={styles.infoDiv}>
              <div>
                <VerifiedUserOutlined sx={{ color: "#665DFE" }} />
              </div>
              <div className={styles.infoTitleDiv}>
                <p>Account State</p>
                <h6>{data.emailVerified ? "Verified" : "Not Verified"}</h6>
              </div>
            </div>
            <div className={styles.infoDiv}>
              <div>
                <LocalPhoneOutlined sx={{ color: "#665DFE" }} />
              </div>
              <div className={styles.infoTitleDiv}>
                <p>Phone</p>
                <h6>{data.phoneNumber ? data.phoneNumber : "Undefined"}</h6>
              </div>
            </div>
            <div className={styles.infoDiv}>
              <div>
                <EmailOutlined sx={{ color: "#665DFE" }} />
              </div>
              <div className={styles.infoTitleDiv}>
                <p>Email</p>
                <h6>{data.email}</h6>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
