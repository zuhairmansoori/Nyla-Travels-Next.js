import {
  UserRound,
  Users,
  HeartHandshake,
  BriefcaseBusiness,
  Crown,
  Accessibility,
  GraduationCap,
  Map,
} from "lucide-react";
import HeadingMotion from "../HeadingMotion";

const travelers = [
  {
    title: "First Time Travelers",
    icon: UserRound,
    description:
      "Perfect guidance for passengers flying for the very first time.",
  },
  {
    title: "Families with Kids",
    icon: Users,
    description:
      "Hassle-free airport assistance for families traveling with children.",
  },
  {
    title: "Senior Citizens",
    icon: HeartHandshake,
    description:
      "Comfortable and dedicated support for elderly passengers.",
  },
  {
    title: "Business Travelers",
    icon: BriefcaseBusiness,
    description:
      "Fast, efficient service to save valuable business travel time.",
  },
  {
    title: "VIP Guests",
    icon: Crown,
    description:
      "Luxury meet & greet with premium airport assistance.",
  },
  {
    title: "Disabled Passengers",
    icon: Accessibility,
    description:
      "Special assistance for passengers with mobility needs.",
  },
  {
    title: "Students",
    icon: GraduationCap,
    description:
      "Guidance for international and domestic student travelers.",
  },
  {
    title: "Tourists",
    icon: Map,
    description:
      "Stress-free airport experience for leisure and holiday travelers.",
  },
];

export default function WhoCanUseService() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <HeadingMotion><span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
            Suitable For
          </span></HeadingMotion>
          
             <HeadingMotion> <h2 className="mt-4 text-4xl font-bold text-gray-900">
            Who Can Use This Service?
          </h2></HeadingMotion>
         
             <HeadingMotion> <p className="mt-4 text-gray-600">
            Our airport assistance services are designed for every type of
            traveler, ensuring a smooth, comfortable, and stress-free journey.
          </p></HeadingMotion>
         
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {travelers.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-xl"
              >
                 <HeadingMotion> <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white transition duration-300 group-hover:scale-110">
                  <Icon size={30} />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>

                <p className="text-sm leading-6 text-gray-600">
                  {item.description}
                </p></HeadingMotion>
               
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}