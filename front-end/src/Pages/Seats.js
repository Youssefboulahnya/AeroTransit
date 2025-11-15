import seats1 from "../pictures/seats_iner1.png";
import seats2 from "../pictures/seats_inter2.png";
import seats_schema from "../pictures/seats-schema.jpg";
import seats_schemav2 from "../pictures/seats-schemav2.png";
import "./Seats.css";
export default function Seats() {
  return (
    <div className="seats-page">
      <header className="hero-section">
        <h1>Airbus A220-300 Seating Plan</h1>
        <p>
          Discover the comfort, efficiency, and intelligent cabin design of the
          airbus A220-300
        </p>
      </header>
      <section className="schema-section">
        <img
          src={seats_schema}
          alt="A220 seating plan"
          className="schema-pics"
        />
        <img
          src={seats_schemav2}
          alt="A220 seating plan"
          className="schema-pics"
        />
      </section>
      <section>
        <h2>Cabin Overview</h2>
        <p>
          The Airbus A220 seating plan can vary from airline to airline. This
          can include variations in row spacing, number of rows, and seat
          placement at gates and windows.
        </p>
      </section>
      <section>
        <h2>Cabin Overview</h2>
        <p>
          The Airbus A220-300 offers a refined cabin experience designed for
          modern air travel. Its 2+3 seating configuration optimizes comfort and
          accessibility while maximizing efficiency.
        </p>
      </section>

      <section className="pics-text">
        <div className="text-block">
          <p>
            Upon entering the cabin, the wide aisle immediately catches the eye,
            allowing passengers to move freely even during service. Overhead
            bins, inspired by the Boeing 737 MAX concept, can store up to 111
            carry-on bags.
          </p>
          <p>
            The standard two-class configuration offers 140 seats, but can be
            increased to 160 in a high-density layout. Spacing and comfort
            depend primarily on the airline’s specifications.
          </p>
        </div>
        <img src={seats2} alt="Cabin interior" className="picture" />
      </section>

      <section>
        <p>
          The A220 features wider seats than comparable narrow-body aircraft—18
          inches on average, with the middle seat offering an impressive 19
          inches. The layout ensures only one passenger per row lacks aisle or
          window access.
        </p>
      </section>

      <section className="pics-text reverse">
        <div className="text-block">
          <p>
            Two lavatories are strategically placed without removing passenger
            rows, maximizing capacity while maintaining comfort. Cabin lighting
            adjusts dynamically for a soothing ambiance during flight.
          </p>
          <p>
            A central information display above each row provides flight data,
            safety instructions, and connection information for transit
            passengers.
          </p>
        </div>
        <img src={seats1} alt="Seat layout" className="picture" />
      </section>

      <section>
        <h2>AeroTransit Configuration</h2>
        <p>
          The AeroTransit A220-300 features 12 Business Class seats (2+2) and
          125 Economy seats (2+3), for a total of 137 seats. Each seat includes
          an entertainment screen and in-flight Wi-Fi connectivity via
          satellite.
        </p>
      </section>
    </div>
  );
}
