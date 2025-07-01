import React, { useEffect, useState } from "react";
import axios from "axios";
import levelMeta from "../../levelData/levelMeta.json";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../utils/baseURL"; // ✅ centralized base URL

function Dashboard() {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // ✅ Redirect if not logged in (after loading finishes)
  useEffect(() => {
    if (!isLoggedIn && !loading) {
      navigate("/login");
    }
  }, [isLoggedIn, loading, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/level/getDifficultiesProgress`, {
          withCredentials: true,
        });
        setProgress(res.data.data);

        const userRes = await axios.get(`${BASE_URL}/api/user/current-user`, {
          withCredentials: true,
        });
        setUser(userRes.data.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) fetchData();
  }, [isLoggedIn]);

  // ✅ Loader
  if (loading) {
    return (
      <div className="text-center text-xl mt-10 text-[rgb(180,180,210)]">
        Loading dashboard...
      </div>
    );
  }

  // ⛔ In case redirected too late or somehow reached here unauthenticated
  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-[rgb(42,30,68)] text-[rgb(240,240,255)] px-4 py-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* User Info */}
        <div className="rounded-xl bg-[rgb(72,52,155)] px-6 py-4 shadow-lg flex justify-between items-center">
          <div>
            <div className="text-lg font-bold">
              Username:{" "}
              <span className="text-[rgb(180,180,210)]">{user?.Username}</span>
            </div>
            <div className="text-sm">
              Email:{" "}
              <span className="text-[rgb(180,180,210)]">{user?.Email}</span>
            </div>
          </div>
          <div className="text-sm bg-[rgb(50,110,180)] px-3 py-1 rounded-full text-[rgb(42,30,68)] font-semibold">
            Dashboard
          </div>
        </div>

        {/* Difficulty Progress Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Object.entries(levelMeta).map(([difficulty, max]) => {
            const completed = progress[difficulty] || 0;
            const percent = Math.min((completed / max) * 100, 100);

            let border = "rgb(180,180,210)";
            if (percent >= 100) border = "rgb(45,160,220)";
            else if (percent >= 75) border = "rgb(50,110,180)";
            else if (percent >= 50) border = "rgb(72,52,155)";

            return (
              <div
                key={difficulty}
                onClick={() => navigate(`/playground/${difficulty}`)}
                className="rounded-xl p-4 shadow-md hover:scale-105 transition-all cursor-pointer"
                style={{
                  backgroundColor: "rgb(60,60,85)",
                  border: `3px solid ${border}`,
                }}
              >
                <div className="text-lg font-bold">{difficulty}</div>
                <div className="text-sm text-[rgb(180,180,210)] mb-2">
                  {completed} / {max}
                </div>
                <div className="w-full h-3 rounded-full bg-[rgb(72,52,155)] overflow-hidden">
                  <div
                    className="h-3 rounded-full"
                    style={{
                      width: `${percent}%`,
                      backgroundColor: "rgb(45,160,220)",
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
