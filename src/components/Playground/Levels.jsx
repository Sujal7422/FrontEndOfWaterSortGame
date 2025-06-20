   

function Levels() {
  const { Difficulty, Levels: levelNumber } = useParams();
  const [rawLevelData, setRawLevelData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch level data on mount
  useEffect(() => {
    const fetchLevelData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/level/${Difficulty}/${levelNumber}`,
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

  // Memoize tubes from API response to prevent re-computation
  const tubes = useMemo(() => {
    return rawLevelData?.tubes || [];
  }, [rawLevelData]);

  // Example manipulation function (e.g., pour from one tube to another)
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
            className="bg-[rgb(60,60,85)] border-2 border-[rgb(50,110,180)] rounded-xl p-2 h-40 flex flex-col-reverse justify-start items-center gap-1"
            onClick={() => console.log("Clicked tube", index)}
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

// Helper to map numeric values to colors (adjust as needed)
function getColor(value) {
  const colors = [
    "#FF0000", // 0 - red
    "#00FF00", // 1 - green
    "#0000FF", // 2 - blue
    "#FFFF00", // 3 - yellow
    "#FF00FF", // 4 - magenta
    "#00FFFF", // 5 - cyan
    "#FFA500", // 6 - orange
    "#A020F0", // 7 - purple
    "#A52A2A", // 8 - brown
    "#708090", // 9 - slate gray
  ];
  return colors[value] || "#333";
}

export default Levels;
