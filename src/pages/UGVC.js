import { useEffect, useRef, useState } from "react";
import CadViewer from "../components/CadViewer.js";
import "./UGVC.css";

function UGVC() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const [activeTab, setActiveTab] = useState("mech");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const specData = {
    mech: {
      title: "Mechanical Systems",
      desc: "Avni's mechanical chassis is built for extreme stability and terrain traversal.",
      features: [
        {
          title: "Terrain-Optimized Wheel Design",
          desc: "Custom-engineered beadlock wheels designed to conquer soft dirt, loose gravel, and steep grades. The wheel assembly secures tire beads mechanically to prevent bead-slippage at low inflations.",
          points: [
            "Double beadlock rim profile machined from aircraft-grade aluminum.",
            "Deep-lug high-traction rubber tread optimized for loose soil and mud.",
            "Custom splined steel hub couplers linking directly to heavy-duty gearbox shafts."
          ],
          modelUrl: "/avni_wheel.glb"
        },
        {
          title: "Passive Rocker Suspension",
          desc: "A high-mobility linkage system inspired by space rover kinematics that passively adjusts to large terrain changes, maintaining payload level and ensuring all wheels contact the ground continuously.",
          points: [
            "Differential linkage arm balancing chassis pitch rates during climbing.",
            "Independent rocker pivot joints with heavy-duty maintenance-free bearings.",
            "Reduces force variations on wheels, optimizing overall traction profiles."
          ],
          modelUrl: "/avni_drive_system.glb"
        }
      ]
    },
    elec: {
      title: "Electrical & Hardware Stack",
      desc: "A reliable, high-bandwidth communication and computation network.",
      features: [
        {
          title: "Integrated Power & Logic Control Board",
          desc: "Designed in-house to handle clean logic power rails and high-current locomotion rails simultaneously. Features robust electrical protection and isolated signal lanes to isolate motor feedback noise.",
          points: [
            "Quad-channel regulated rails (19V compute, 12V sensors, 5V microcontroller, 24V locomotion).",
            "Optoisolated digital signal lanes preventing sensor interference.",
            "Onboard CAN transceiver bus and RTK-GPS integration points."
          ],
          links: [
            { text: "View PCBWay Article", url: "https://www.pcbway.com/project/sponsor/Power_Distribution_and_Logic_Control_Board_a1d3eec6.html", target: "_blank" }
          ],
          modelUrl: "/avni_pcb.glb"
        },
        {
          title: "Sensor & Communication Suite",
          desc: "Integrated sensor array and communication modules enabling real-time data acquisition and remote telemetry.",
          points: [
            "High-bandwidth Ethernet backbone with redundant CAN bus architecture.",
            "GPS/RTK module with dual-frequency GNSS receiver for centimeter-level accuracy.",
            "Wireless telemetry link with 5 km range and low-latency video transmission."
          ]
        }
      ]
    },
    auto: {
      title: "Autonomy & Perception",
      desc: "Robust perception, path planning, and real-time obstacle avoidance.",
      features: [
        {
          title: "Real-Time Obstacle Avoidance",
          desc: "Fuses high-density 3D LiDAR point clouds and stereo-camera depth frames to detect, classify, and track static and dynamic obstacles inside the vehicle's path.",
          points: [
            "3D voxel grid filtering for rapid environment simplification.",
            "Real-time local path adaptation using a highly parallelized trajectory roll-out.",
            "Dynamic deceleration zones matching physical braking limits."
          ]
        },
        {
          title: "Autonomous Waypoint Navigation",
          desc: "Integrates IMU measurements, wheel odometry, and RTK-GPS base station feedback using an Extended Kalman Filter to target global coordinate coordinates with centimeter-level precision.",
          points: [
            "Reliable state estimation under GPS-degraded environment layers.",
            "Pre-planned globally-optimal route generation supporting multi-waypoint files.",
            "Heading stabilization using high-precision magnetic sensors."
          ]
        },
        {
          title: "Vision-Guided Autonomous Turret",
          desc: "Active vision payload that automatically sweeps, detects, targets, and tracks markers on the field using high-speed servo actuators controlled by custom AI detection pipelines.",
          points: [
            "Real-time target object classification utilizing onboard TensorRT optimizations.",
            "Closed-loop PID servo tracking minimizing orientation offset.",
            "Dynamic ranging utilizing camera focal calculations and depth sensors."
          ]
        },
        {
          title: "Adaptive Lane Guidance with Dynamic Short Goals",
          desc: "Perceives boundary structures and lane lines dynamically, setting transient short-term goal waypoints within the lane bounds to maintain continuous centering and high speeds.",
          points: [
            "Robust lane line extraction using color segmentation and inverse perspective mapping.",
            "Dynamic goal generation adjusting to line curvatures and obstacles.",
            "Prevents path oscillations on curves and uneven surfaces."
          ]
        }
      ]
    }
  };

  return (
    <section
      ref={ref}
      id="ugvc"
      className={`ugvc ${active ? "reveal" : ""}`}
    >
      <div className="ugvc-intro-section">
        <div className="ugvc-content">
          <span className="ugvc-tag">COMPETITION</span>
          <h1 className="ugvc-title">Unmanned Ground Vehicle Challenge</h1>
          <p>
            The <strong>Unmanned Ground Vehicle Challenge (UGVC)</strong> is part of the 8th International Competition of the Military Technical College (ICMTC), hosted by the Military Technical College in Cairo, Egypt. The competition runs from <strong>11th July to 16th July 2026</strong> and draws elite university teams from across the world.
          </p>
          <p>
            Participating vehicles must complete a series of outdoor autonomous tasks including GPS waypoint navigation, real-time obstacle avoidance, lane following, and an endurance run—all without any human intervention. Teams are also evaluated through a technical design review covering hardware design, software architecture, and safety systems.
          </p>
          <p>
            This will be UGV-DTU's second participation at ICMTC. The team is led by Team Captain <strong>Vedant Singh</strong>, with the immediate goal of delivering a strong performance with our flagship rover <strong>Avni</strong> under real-world, outdoor, international competition conditions.
          </p>
        </div>
      </div>

      <div className="ugvc-main">
        <div className="avni-grid">
          <div className="avni-text">
            <span className="avni-label">Introducing the Rover</span>
            <h2 className="avni-heading">AVNI</h2>
            <div className="avni-underline" />
            <p>
              <strong>Avni</strong> is UGV-DTU's flagship rover engineered specifically to conquer the UGVC challenge. Built from the ground up, Avni combines a rugged all-terrain physical layout with a state-of-the-art sensory and compute payload.
            </p>
            <p>
              Avni features high-precision sensor rigs, custom suspension kinematics, and a decentralized ROS 2-based autonomy architecture designed to execute complex search, rescue, and mapping tasks fully autonomously.
            </p>
          </div>

          <div className="avni-visual">
            <div className="cad-viewer-placeholder">
              <div className="cad-grid-pattern" />
              <CadViewer modelUrl="/avni.glb" />
            </div>
          </div>
        </div>

        {/* Technical Specifications Tabs */}
        <div className="spec-tabs-wrapper">
          <div className="spec-tabs">
            <button 
              className={`spec-tab-btn ${activeTab === "mech" ? "active" : ""}`}
              onClick={() => setActiveTab("mech")}
            >
              Mechanical
            </button>
            <button 
              className={`spec-tab-btn ${activeTab === "elec" ? "active" : ""}`}
              onClick={() => setActiveTab("elec")}
            >
              Electronics
            </button>
            <button 
              className={`spec-tab-btn ${activeTab === "auto" ? "active" : ""}`}
              onClick={() => setActiveTab("auto")}
            >
              Autonomy
            </button>
          </div>
        </div>

        {/* Specs Content - Full width with side-by-side layout */}
        <div className="specs-full-width">
          <div className="spec-display">
            <h4 className="spec-display-title">{specData[activeTab].title}</h4>
            <p className="spec-display-desc">{specData[activeTab].desc}</p>
            
            <div className="spec-features-container">
              {specData[activeTab].features.map((f, i) => (
                <div key={i} className="spec-feature-card">
                  <div className="spec-feature-content">
                    <h5 className="spec-feature-title">{f.title}</h5>
                    <p className="spec-feature-desc">{f.desc}</p>
                    {f.points && (
                      <ul className="spec-feature-points">
                        {f.points.map((pt, idx) => (
                          <li key={idx}>{pt}</li>
                        ))}
                      </ul>
                    )}
                    {f.links && (
                      <div className="spec-feature-links">
                        {f.links.map((lnk, idx) => (
                          <a
                            key={idx}
                            href={lnk.url}
                            download={lnk.download}
                            target={lnk.target}
                            rel={lnk.target ? "noopener noreferrer" : undefined}
                            className={`subsystem-link ${lnk.download ? "file" : "article"}`}
                          >
                            {lnk.text}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                  {f.modelUrl && (
                    <div className="spec-feature-cad">
                      <div className="cad-viewer-placeholder inline-spec-viewer">
                        <div className="cad-grid-pattern" />
                        <CadViewer modelUrl={f.modelUrl} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UGVC;