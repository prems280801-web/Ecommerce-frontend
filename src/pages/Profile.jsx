import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h4>Loading profile...</h4>;
  }

  if (!user) {
    return <h4>Unable to load profile.</h4>;
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">

        <div className="card p-4">
          <h2 className="mb-4">My Profile</h2>

          <p>
            <strong>Name:</strong> {user.name}
          </p>

          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <p>
            <strong>Role:</strong> {user.role}
          </p>
        </div>

      </div>
    </div>
  );
}

export default Profile;