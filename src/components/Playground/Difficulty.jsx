import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import levelMeta from "../../levelData/levelMeta.json";

function Difficulty() {
  const { Difficulty } = useParams();
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    return (
      <div className="text-center text-xl text-[rgb(180,180,210)] mt-10">
        Loading...
      </div>
    );
  }

  const completed = progress?.[Difficulty] ?? 0;
  const max = levelMeta[Difficulty] ?? 0;

  const isUnlocked = (level) => level <= completed;

  return (
    <div className="min-h-screen bg-[rgb(42,30,68)] text-[rgb(240,240,255)] px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2 text-[rgb(45,160,220)]">
            {Difficulty} Levels
          </h1>
          <p className="text-[rgb(180,180,210)] text-lg">
            Completed: {completed} / {max}
          </p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
          {Array.from({ length: max }, (_, i) => (
            <button
              key={i}
              onClick={() => {
                if (isUnlocked(i)) navigate(`/Playground/${Difficulty}/${i}`);
              }}
              disabled={!isUnlocked(i)}
              className={`text-sm font-bold rounded-md px-2 py-2 border-2 transition-all
                ${isUnlocked(i)
                  ? "bg-[rgb(50,110,180)] text-[rgb(240,240,255)] hover:bg-white hover:text-[rgb(72,52,155)]"
                  : "bg-[rgb(60,60,85)] text-[rgb(180,180,210)] border-[rgb(72,52,155)] cursor-not-allowed"}`}
            >
              {i}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Difficulty;
