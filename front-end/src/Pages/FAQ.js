import "./FAQ.css";
import { FaQuestionCircle } from "react-icons/fa";
import { PiAirplaneInFlightBold } from "react-icons/pi";
import { LuBaggageClaim } from "react-icons/lu";
import { MdPayment } from "react-icons/md";
import { MdModeOfTravel } from "react-icons/md";
import { PiSeat } from "react-icons/pi";
import { MdChildCare } from "react-icons/md";
import { MdOutlineFreeCancellation } from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";
import { AiOutlineSafety } from "react-icons/ai";
import { TbInfoSquareRounded } from "react-icons/tb";
import { GrUpdate } from "react-icons/gr";


export default function FAQ() {
  return (
    <div className="FAQ">
      <h1>
        <FaQuestionCircle className="faq_icon" />
        Frequently Asked Questions (FAQ)
      </h1>
      <div>
        <h2>Your travel questions, answered by AeroTransit</h2>
        <section>
          <h3>
            <PiAirplaneInFlightBold />
            1. Flight Booking and Reservations
          </h3>
          <p className="Q">Q1. How can I book a flight with AeroTransit?</p>
          <p>
            You can book directly through our official website, the AeroTransit
            mobile app, or one of our authorized travel partners. Booking
            directly on our site ensures you receive the best available fares
            and full access to our after-sales services.
          </p>
          <p className="Q">
            Q2. Can I modify or cancel my booking after purchase?
          </p>
          <p>
            Yes. You can modify or cancel your booking by logging into the
            “Manage My Flight” section on our website. Modification fees or fare
            differences may apply depending on your ticket type. Non-refundable
            tickets cannot be reimbursed but can sometimes be rebooked for a
            small fee.
          </p>
          <p className="Q">Q3. Will I receive a booking confirmation?</p>
          <p>
            Yes. Once your payment is completed, you’ll receive a confirmation
            email including your booking reference, flight details, and
            e-ticket. If you don’t receive it within 30 minutes, please check
            your spam folder or contact our support team.
          </p>
          <p className="Q">Q4. How can I check my booking status?</p>
          <p>
            You can track your flight status and booking details at any time in
            the “Manage Your Flight” section by entering your email and ticket
            serial number.
          </p>
        </section>

        <section>
          <h3>
            <LuBaggageClaim />
            2. Baggage Information
          </h3>
          <p className="Q">
            Q5. What is the baggage allowance for AeroTransit flights?
          </p>
          <p>
            Each passenger is allowed:
            <ul>
              <li>1 small cabin bag (under the seat, up to 40×25×20 cm).</li>
              <li>1 standard cabin bag (up to 55×40×20 cm, maximum 10 kg).</li>
            </ul>
            Checked baggage allowances vary depending on your ticket type and
            route.
          </p>
          <p className="Q">Q6. Can I purchase additional baggage?</p>
          <p>
            Yes. You can add extra checked bags during booking or later through
            “Manage My Flight.” Online rates are lower than airport prices.
          </p>
          <p className="Q">Q7. What items are prohibited in my baggage?</p>
          <p>
            For safety reasons, dangerous items such as flammable liquids,
            explosives, and sharp objects are strictly prohibited in both cabin
            and checked luggage. Please review our full list of restricted items
            before traveling.
          </p>
          <p className="Q">
            Q8. What should I do if my baggage is lost or delayed?
          </p>
          <p>
            Please report it immediately at the AeroTransit baggage counter in
            the arrivals area. You will receive a tracking number to monitor
            your baggage status online. Our team will do everything possible to
            reunite you with your belongings within 48 hours.
          </p>
        </section>

        <section>
          <h3>
            <MdPayment />
            3. Payments and Refunds
          </h3>
          <p className="Q">Q9. What payment methods does AeroTransit accept?</p>
          <p>
            We accept most major credit and debit cards (Visa, Mastercard,
            American Express), as well as PayPal and secure online transfers
            depending on your country.
          </p>
          <p className="Q">Q10. How are refunds processed?</p>
          <p>
            If eligible, refunds are processed through the original payment
            method within 7 to 14 business days after approval. Refund requests
            can be made through our “Contact Us” page or via your booking
            account.
          </p>
          <p className="Q">
            Q11. What if my flight is canceled by AeroTransit?
          </p>
          <p>
            In the rare event of a flight cancellation, you will be offered a
            choice between:
            <ul>
              <li>A full refund,</li>
              <li>A free rebooking to another AeroTransit flight,</li>
              <li>Or a travel voucher valid for 12 months.</li>
            </ul>
          </p>
        </section>

        <section>
          <h3>
            <MdModeOfTravel />
            4. Travel Documents and Check-in
          </h3>
          <p className="Q">Q12. What travel documents do I need?</p>
          <p>
            All passengers must carry a valid passport or national ID (for
            European routes). Depending on your destination, a visa or travel
            authorization may be required. It is your responsibility to verify
            entry requirements before traveling.
          </p>
          <p className="Q">Q13. When should I check in?</p>
          <p>
            Online check-in opens 48 hours before departure and closes 2 hours
            before takeoff. We recommend arriving at the airport at least 2
            hours before domestic flights and 3 hours before international
            flights.
          </p>
          <p className="Q">Q14. How do I check in online?</p>
          <p>
            You can check in online by entering your booking reference and email
            on the AeroTransit website or app. Once checked in, you can download
            or print your boarding pass.
          </p>
        </section>

        <section>
          <h3>
            <PiSeat />
            5. Seats and Special Services
          </h3>
          <p className="Q">Q15. Can I choose my seat?</p>
          <p>
            Yes. You can select your preferred seat (window, aisle, or extra
            legroom) during booking or later in “Manage My Flight.” Some seats
            may require a small additional fee.
          </p>
          <p className="Q">Q16. How can I request special assistance?</p>
          <p>
            If you need special assistance (reduced mobility, medical support,
            or traveling with service animals), please contact us at least 48
            hours before your flight so we can prepare the necessary
            arrangements.
          </p>
          <p className="Q">Q17. Does AeroTransit offer in-flight meals?</p>
          <p>
            Yes. Depending on the route and fare type, meals and snacks may be
            included or available for purchase onboard. You can pre-order
            special meals (vegetarian, vegan, halal, etc.) during booking.
          </p>
        </section>

        <section>
          <h3>
            <MdChildCare />
            6. Traveling with Children and Infants
          </h3>
          <p className="Q">Q18. Can children travel alone?</p>
          <p>
            Children under 12 years old must travel with an adult. AeroTransit
            offers an Unaccompanied Minor Service for children aged 12 to 16,
            available for an additional fee.
          </p>
          <p className="Q">Q19. What about infants (under 2 years)?</p>
          <p>
            Infants can travel on a parent’s lap for a small service fee. A
            collapsible stroller or baby car seat can be checked in free of
            charge.
          </p>
          <p className="Q">Q20. Are there discounts for children?</p>
          <p>
            Yes. AeroTransit offers reduced fares for children under 12 on most
            routes. Prices and availability depend on the destination.
          </p>
        </section>

        <section>
          <h3>
            <MdOutlineFreeCancellation />
            7. Delays, Cancellations, and Compensation
          </h3>
          <p className="Q">Q21. What happens if my flight is delayed?</p>
          <p>
            In the event of a delay, AeroTransit provides assistance in
            accordance with EU Regulation 261/2004, which may include meals,
            refreshments, or hotel accommodation depending on the duration of
            the delay.
          </p>
          <p className="Q">
            Q22. Am I entitled to compensation for delays or cancellations?
          </p>
          <p>
            If your flight is delayed by more than 3 hours or canceled without
            prior notice, you may be eligible for compensation under EU
            regulations. Please visit our “Passenger Rights” section for full
            details.
          </p>
        </section>

        <section>
          <h3>
            <RiCustomerService2Line />
            8. Contact and Support
          </h3>
          <p className="Q">Q23. How can I contact AeroTransit?</p>
          <p>
            You can reach our Customer Service team via:
            <ul>
              <li>The contact form on our website,</li>
              <li>Email: support@aerotransit.com ,</li>
              <li>Or through our social media channels.</li>
            </ul>
          </p>
          <p className="Q">
            Q24. What are AeroTransit’s customer service hours?
          </p>
          <p>
            Our team is available 24/7 to assist with urgent travel issues and
            Monday–Friday, 8:00 AM to 8:00 PM (local time) for general
            inquiries.
          </p>
          <p className="Q">
            Q25. How can I provide feedback about my flight experience?
          </p>
          <p>
            We welcome your feedback. You can submit comments or complaints
            through the “Contact Us” form on our website. Your opinion helps us
            improve our services for future travelers.
          </p>
        </section>

        <section>
          <h3>
            <AiOutlineSafety />
            9. Safety and Security
          </h3>
          <p className="Q">
            Q26. How does AeroTransit ensure passenger safety?
          </p>
          <p>
            Your safety is our top priority. All our aircraft undergo regular
            maintenance checks in compliance with EASA and international safety
            standards. Our crews receive continuous training to handle any
            situation calmly and professionally.
          </p>
          <p className="Q">Q27. Is my personal data secure on your website?</p>
          <p>
            Yes. AeroTransit uses SSL encryption and adheres strictly to GDPR
            standards to protect your data. Your personal information is never
            shared with third parties without your consent.
          </p>
        </section>

        <section>
          <h3>
            <TbInfoSquareRounded />
            10. About AeroTransit
          </h3>
          <p className="Q">Q28. Who owns AeroTransit?</p>
          <p>
            AeroTransit DAC is an independent airline group headquartered in
            Dublin, Ireland. We operate international routes across Europe, the
            Middle East, and Asia with a focus on affordable, reliable, and
            sustainable travel.
          </p>
          <p className="Q">Q29. What makes AeroTransit different?</p>
          <p>
            We believe air travel should be accessible, transparent, and
            pleasant. With flexible booking, fair pricing, and eco-efficient
            aircraft, AeroTransit combines innovation and comfort to make your
            journey smooth from start to finish.
          </p>
        </section>
      </div>
      <h3 className="FAQ_Update">
        <GrUpdate />
        Updated: November 2025
      </h3>
    </div>
  );
}
