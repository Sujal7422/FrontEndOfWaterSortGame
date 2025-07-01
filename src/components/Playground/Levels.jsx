import { useEffect, useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../utils/baseURL"; // ✅ add this line

function Levels() {
  const { Difficulty, Levels: levelNumber } = useParams();
  const [rawLevelData, setRawLevelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTubes, setSelectedTubes] = useState([]);

  useEffect(() => {
    const fetchLevelData = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/level/${Difficulty}/${levelNumber}`, // ✅ updated here
          { withCredentials: true }
        );
        setRawLevelData(res.data.levelData);
      } catch (error) {
        console.error("Failed to fetch level data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLevelData();
  }, [Difficulty, levelNumber]);

  const tubes = useMemo(() => {
    return rawLevelData?.tubes || [];
  }, [rawLevelData]);

  const manipulateTubes = useCallback((fromIdx, toIdx) => {
    setRawLevelData(prev => {
      if (!prev) return prev;
      const newTubes = JSON.parse(JSON.stringify(prev.tubes));
      const fromTube = newTubes[fromIdx];
      const toTube = newTubes[toIdx];
      const colorToPour = fromTube.pop();
      if (colorToPour !== undefined && toTube.length < 4) {
        toTube.push(colorToPour);
      }
      return { ...prev, tubes: newTubes };
    });
  }, []);

  const handleTubeClick = (index) => {
    setSelectedTubes(prev => {
      const newSelection = [...prev, index];
      if (newSelection.length === 2) {
        const [fromIdx, toIdx] = newSelection;
        manipulateTubes(fromIdx, toIdx);
        return [];
      }
      return newSelection.slice(-2);
    });
  };

  if (loading) {
    return (
      <div className="text-center text-xl text-[rgb(180,180,210)] mt-10">
        Loading level data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[rgb(42,30,68)] text-white px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-[rgb(45,160,220)] mb-8">
        Level {levelNumber} - {Difficulty}
      </h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 justify-center">
        {tubes.map((tube, index) => (
          <div
            key={index}
            className={`bg-transparent border-2 rounded-xl p-2 h-40 flex flex-col-reverse justify-start items-center gap-1 cursor-pointer transition duration-300 ${
              selectedTubes.includes(index)
                ? "border-[rgb(255,159,64)] scale-105"
                : "border-[rgb(50,110,180)]"
            }`}
            onClick={() => handleTubeClick(index)}
          >
            {tube.map((color, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: getColor(color) }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function getColor(value) {
  const colors = [
    "transparent",          // 0 = transparent (empty background)
    "rgb(255, 99, 132)",    // 1
    "rgb(255, 159, 64)",    // 2
    "rgb(255, 205, 86)",    // 3
    "rgb(75, 192, 192)",    // 4
    "rgb(54, 162, 235)",    // 5
    "rgb(153, 102, 255)",   // 6
    "rgb(255, 102, 204)",   // 7
    "rgb(201, 203, 207)",   // 8
    "rgb(255, 153, 0)",     // 9
    "rgb(102, 255, 102)",   // 10
    "rgb(0, 204, 153)",     // 11
    "rgb(204, 102, 255)",   // 12
    "rgb(255, 204, 204)",   // 13
    "rgb(0, 204, 255)",     // 14
  ];
  return colors[value] || "#333";
}

export default Levels;
