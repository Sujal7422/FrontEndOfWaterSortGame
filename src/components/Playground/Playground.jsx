import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import levelMeta from "../../levelData/levelMeta.json";

function Playground() {
  const { Difficulty } = useParams();
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/level/getDifficultiesProgress", {
          withCredentials: true,
        });
        setProgress(res.data.data);
      } catch (error) {
        console.error("Failed to fetch progress:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  if (loading) {
    return <div className="text-center text-xl text-[rgb(180,180,210)] mt-10">Loading...</div>;
  }

  const completed = progress?.[Difficulty] ?? 0;
  const max = levelMeta[Difficulty] ?? 0;
  const percent = Math.min((completed / max) * 100, 100);

  return (
    <div className="min-h-screen bg-[rgb(42,30,68)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md p-6 rounded-xl shadow-xl border-4 border-[rgb(50,110,180)] bg-[rgb(60,60,85)]">
        <h2 className="text-3xl font-bold mb-4 text-[rgb(240,240,255)] text-center">
          Difficulty: <span className="text-[rgb(45,160,220)]">{Difficulty}</span>
        </h2>

        <p className="text-lg mb-6 text-[rgb(180,180,210)] text-center">
          Progress: <span className="text-[rgb(240,240,255)] font-semibold">{completed} / {max}</span>
        </p>

        <div className="w-full h-4 rounded-full bg-[rgb(72,52,155)] overflow-hidden">
          <div
            className="h-4 rounded-full"
            style={{
              width: `${percent}%`,
              backgroundColor: "rgb(45,160,220)",
              transition: "width 0.4s ease-in-out",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Playground;
