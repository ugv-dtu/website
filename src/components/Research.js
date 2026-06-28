import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaFilePdf, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import "./Research.css";

gsap.registerPlugin(ScrollTrigger);

const PAPERS = [
  {
    title: "AGNI: Adaptive Sensor Fusion and Terrain-Aware Navigation for Autonomous Ground Vehicles",
    authors: "Lakshay, Vedant Singh, Yuvraj Gupta, Akshat Rajwansh, S Indu",
    venue: "2026 IEEE International Conference on Consumer Electronics (ICCE)",
    year: "2026",
    abstract: "AGNI (Autonomous Ground-Based Navigation Inspector) is an autonomous ground vehicle designed for reliable operation in unstructured and GPS-denied environments. The robot employs a custom inverted V suspension system inspired by rocker-bogie designs for superior terrain adaptability. To achieve robust localization and navigation, AGNI integrates a Hybrid Confidence Adaptive Sensor Fusion (HCAF) mechanism that dynamically prioritizes sensor data based on real-time reliability scores. The system combines LiDAR, stereo vision camera, GPS-IMU (Used together for position estimation), and wheel encoders. Real-time obstacle avoidance is handled using the Dynamic Window Approach (DWA) along with Hybrid Confidence Adaptive Sensor Fusion and YOLO-based object detection. This paper presents the mechanical design, sensor fusion strategy, path planning algorithms, and experimental validation of AGNI in challenging terrains.",
    link: "https://ieeexplore.ieee.org/document/11449757"
  },
  {
    title: "Power Distribution and Logic Control Board for Autonomous UGVs",
    authors: "UGV Tech Team, DTU",
    venue: "PCBWay Sponsor Project",
    year: "2026",
    abstract: "Modern autonomous robotic systems and unmanned ground vehicles (UGVs) demand an electronics architecture capable of handling two fundamentally different engineering requirements simultaneously: high-current power distribution for locomotion and stable, low-noise logic power for computational nodes. This board bridges that gap by integrating robust power distribution lines with precise logic control microelectronics to ensure safe, stable, and efficient operation of UGV systems in the field.",
    link: "https://www.pcbway.com/project/sponsor/Power_Distribution_and_Logic_Control_Board_a1d3eec6.html"
  }
];

function Research() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the heading
      gsap.from(".research-heading", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".research-heading",
          start: "top 85%",
        },
      });

      // Animate underline
      gsap.to(".research-underline", {
        width: "72px",
        duration: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".research-heading",
          start: "top 85%",
        },
      });

      // Animate cards
      gsap.from(".research-card", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".research-grid",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="research" className="research" ref={sectionRef}>
      <div className="research-glass-bg" />

      <div className="research-container">
        <div className="research-header">
          <h2 className="research-heading">
            Research
            <span className="research-underline" />
          </h2>
          <p className="research-sub">
            Academic papers and technical contributions to autonomous systems and robotics
          </p>
        </div>

        <div className="research-grid">
          {PAPERS.map((paper, index) => (
            <div key={index} className="research-card">
              <div className="research-card-header">
                <span className="paper-year">{paper.year}</span>
                <span className="paper-venue">{paper.venue}</span>
              </div>
              <h3 className="paper-title">{paper.title}</h3>
              <p className="paper-authors">{paper.authors}</p>
              <p className="paper-abstract">{paper.abstract}</p>
              <div className="paper-links">
                {paper.pdf && (
                  <a href={paper.pdf} target="_blank" rel="noopener noreferrer" className="paper-link pdf">
                    <FaFilePdf /> PDF
                  </a>
                )}
                {paper.code && (
                  <a href={paper.code} target="_blank" rel="noopener noreferrer" className="paper-link code">
                    <FaGithub /> Code
                  </a>
                )}
                {paper.link && (
                  <a href={paper.link} target="_blank" rel="noopener noreferrer" className="paper-link link">
                    <FaExternalLinkAlt /> Article
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Research;
