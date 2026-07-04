'use client'
import CountUp from "react-countup";

export default function Stats() {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center text-center py-10 px-4 md:px-20 bg-gray-100">
      <div>
        <h2 className="text-5xl font-bold">
          <CountUp
            end={10000}
            duration={2}
            separator=","
            suffix="+"
            enableScrollSpy
            scrollSpyOnce
          />
        </h2>
        <p className="text-xl font-semibold">Happy Travelers</p>
      </div>

      <div>
        <h2 className="text-5xl font-bold">
          <CountUp
            end={50}
            duration={2}
            suffix="+"
            enableScrollSpy
            scrollSpyOnce
          />
        </h2>
        <p className="text-xl font-semibold">Destinations</p>
      </div>

      <div>
        <h2 className="text-5xl font-bold">
          <CountUp
            end={98}
            duration={2}
            suffix="%"
            enableScrollSpy
            scrollSpyOnce
          />
        </h2>
        <p className="text-xl font-semibold">Customer Satisfaction</p>
      </div>

      <div>
        <h2 className="text-5xl font-bold">
          <CountUp
            end={15}
            duration={2}
            suffix="+"
            enableScrollSpy
            scrollSpyOnce
          />
        </h2>
        <p className="text-xl font-semibold">Years Experience</p>
      </div>
    </section>
  );
}