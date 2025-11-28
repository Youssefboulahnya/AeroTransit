import { FaPlaneDeparture } from "react-icons/fa";
import "./About.css";

export default function About() {
  return (
    <section className="about container">
      <header className="about-header">
        <h1>
          <FaPlaneDeparture className="plane-icon" /> AeroTransit - More Than a
          Journey
        </h1>
        <p className="about-subtitle">
          Where every flight becomes the beginning of a story worth remembering.
        </p>
      </header>

      <div className="about-section">
        <hr />
        <h2>Our Mission</h2>
        <p>
          At <strong>AeroTransit</strong>, we believe travel should be more than
          a simple trip from point A to point B. It should be an experience —
          smooth, inspiring, and memorable.
        </p>
        <p>
          Our mission is to connect people, cultures, and dreams through
          reliable air travel built on comfort, safety, and excellence.
        </p>
        <p>
          We don’t just fly passengers — we carry stories, reunions, and first
          adventures.
        </p>
      </div>

      <div className="about-section">
        <h2>Our Story</h2>
        <p>
          Founded with a vision to redefine air travel, AeroTransit started with
          a single idea:
        </p>
        <blockquote>
          “Make every flight feel like the beginning of a story worth
          remembering.”
        </blockquote>
        <p>
          What began as a small regional service has grown into a dynamic
          airline connecting continents. From our golden aircraft livery to our
          intuitive booking system, every detail of AeroTransit reflects our
          dedication to elegance, innovation, and customer care.
        </p>
      </div>

      <div className="about-section values">
        <h2>Our Values</h2>
        <p>
          <ul >
            <li>
              <strong>✈ Safety First</strong> – Every aircraft, every flight,
              every moment is maintained to the highest international standards.
            </li>
            <li>
              <strong>✈ Customer-Centric Service</strong> – Our travelers are at
              the heart of every decision.
            </li>
            <li>
              <strong>✈ Sustainability</strong> – We’re investing in cleaner
              engines, greener fuels, and smarter operations.
            </li>
            <li>
              <strong>✈ Innovation</strong> – From digital booking to in-flight
              experience, AeroTransit is committed to pushing aviation forward.
            </li>
            <li>
              <strong>✈ Connection</strong> – We bridge distances, not just
              between places, but between people.
            </li>
          </ul>
        </p>
      </div>

      <div className="about-section">
        <h2>Our Promise</h2>
        <p>
          With AeroTransit, you don’t just reach your destination — you arrive
          inspired.
        </p>
        <p>
          Our award-winning cabins, attentive crew, and flexible booking options
          ensure peace of mind from takeoff to landing.
        </p>
        <blockquote>
          “Because your journey deserves more than miles — it deserves meaning.”
        </blockquote>
      </div>

      <div className="about-section">
        <h2>Our Network</h2>
        <p>
          AeroTransit connects you to <strong>more than 80 destinations</strong>{" "}
          across <strong>Europe, Africa, and the Middle East</strong>, with
          expanding routes to North America and Asia.
        </p>
        <p>
          Whether for business, leisure, or discovery — the world is within your
          reach.
        </p>
      </div>

      <div className="about-section">
        <h2>Join the Journey</h2>
        <p>
          We’re constantly evolving — exploring new routes, technologies, and
          ways to make flying simpler and more enjoyable.
        </p>
        <p>
          Follow us on social media, share your{" "}
          <strong>#AeroTransitMoments</strong>, and become part of our growing
          global family.
        </p>
      </div>
    </section>
  );
}
