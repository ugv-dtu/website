import { useEffect, useRef, useState } from "react";
import "./IGVC.css";

function IGVC() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.25 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="igvc"
      className={`igvc ${active ? "reveal" : ""}`}
    >
      <div className="igvc-intro-section">
        <div className="igvc-content">
          <span className="igvc-tag">COMPETITION</span>
          <h1 className="igvc-title">Intelligent Ground Vehicle Competition</h1>
          <p>
            The <strong>Intelligent Ground Vehicle Competition (IGVC)</strong> is an annual international robotics arena hosted by <strong>Oakland University</strong> in Rochester, Michigan, USA, and co-founded by the <strong>U.S. Army's Combat Capabilities Development Command Ground Vehicle Systems Center (GVSC)</strong>, Oakland University, and the <strong>Association for Unmanned Vehicle Systems International (AUVSI)</strong>.
          </p>
          <p>
            The competition challenges collegiate engineering teams to build fully autonomous unmanned ground vehicles that navigate complex outdoor obstacle courses. Evaluating teams across autonomous navigation, design elegance, and system drive tests, IGVC acts as a key testbed for cutting-edge computer vision, sensor integration, LiDAR mapping, and path planning.
          </p>
        </div>
      </div>

      <div className="igvc-main">
        <div className="ashwini-grid">
          <div className="ashwini-text">
            <span className="ashwini-label">Introducing</span>
            <h2 className="ashwini-heading">Ashwini</h2>
            <div className="ashwini-underline" />

            <p>
              <strong>Ashwini</strong> is UGV-DTU’s flagship ground vehicle engineered for the Intelligent Ground Vehicle Competition (IGVC). Ashwini is built specifically for autonomous outdoor navigation on grass and varied terrain, utilizing a highly integrated sensor suite and processing stack to complete mission course profiles without human intervention.
            </p>
            <p>
              Its architecture highlights high-performance perception systems (cameras and LiDAR) coupled with sophisticated path planning algorithms (dynamic window approach, A* search, and trajectory optimization) to detect course lanes, bypass obstacles, and target global waypoints reliably.
            </p>
          </div>

          <div className="ashwini-visual">
            <img
              src="/blogs/images/open-house/ashwini.jpeg"
              alt="UGV Ashwini"
            />
            <div className="ashwini-glow" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default IGVC;
