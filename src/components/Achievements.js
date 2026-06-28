import { useEffect, useRef, useState } from "react";
import "./Achievements.css";

const ACHIEVEMENTS = [
  { competition: "ISDC'26, (SPROS)", position: "Top 10 Global Rank" },
  { competition: "RoboSoc, Invictus’26", position: "3rd Runner Up" },
  { competition: "Autonav Challenge, IGVC'25", position: "Top 15 Global Rank" },
  { competition: "UGVC, ICMTC'24", position: "3rd Runner Up" },
  { competition: "UGVC Presentation, ICMTC'24", position: "1st Position" },
  { competition: "Cyber Challenge, IGVC'23", position: "2nd Runner Up" },
  { competition: "Design Challenge, IGVC'23", position: "2nd Runner Up" },
  { competition: "Techfest'23 (IIT Bombay) – Mernifier", position: "1st Runner Up" },
  { competition: "Techfest'23 (IIT Bombay) – TIH-IoT", position: "1st Runner Up" },
  { competition: "MATLAB MiniDrone Competition", position: "Top 8 Global Rank" },
  { competition: "Techfest MicroMouse Competition", position: "3rd Runner Up" },
  { competition: "Line Following Competition", position: "1st Runner Up" },
  { competition: "Flipkart Grid", position: "University Finalist" },
  { competition: "Smart India Hackathon", position: "University Finalist" },
  { competition: "Sustainable Vehicle Design – Autodesk", position: "Runners Up" },
];

function Achievements() {
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="achievements"
      ref={ref}
      className={`achievements ${active ? "reveal" : ""}`}
    >
      <div className="achievements-viewport">
        <div className="achievements-glass">
          <h2 className="achievements-title">Achievements</h2>
          <p className="achievements-intro">
            Through rigorous engineering, system validation, and multidisciplinary coordination, the UGV-DTU team has achieved top positions at numerous prestigious national and international robotics competitions and hackathons.
          </p>

          <div className="table-container">
            <table className="achievements-table">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Competition</th>
                  <th>Position / Rank</th>
                </tr>
              </thead>
              <tbody>
                {ACHIEVEMENTS.map((ach, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td className="comp-name">{ach.competition}</td>
                    <td className="comp-pos">
                      <span className="badge">{ach.position}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Achievements;
