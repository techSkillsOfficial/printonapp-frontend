"use client";

import React from "react";
import { Menu, X, MapPin } from "lucide-react";

const menuItems = [
  {
    name: "Home",
    href: "#",
  },
  {
    name: "About",
    href: "#",
  },
  {
    name: "Contact",
    href: "#",
  },
];

const locations = [
  {
    title: "Meerut office",
    timings: "Mon-Sat 9am to 5pm.",
    address: "MIT & MIET,N.H. 58, Delhi-Roorkee Highway, Baghpat Bypass Road Crossing, Meerut, Uttar Pradesh 250005",
  },
  {
    title: "Ghaziabad office",
    timings: "Mon-Sat 9am to 5pm.",
    address: "IPEC,Plot No 63, Site IV, Surya Nagar, Flyover Road, Industrial Area, Sahibabad, Ghaziabad, Uttar Pradesh",
  },
  // {
  //   title: "Karnataka office",
  //   timings: "Mon-Sat 9am to 5pm.",
  //   address:
  //     "42, Residency Rd, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560025 IN",
  // },
];

const users = [
  {
    name: "Gabrielle Fernandez",
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=600&w=600&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
    position: "Marketing Lead",
  },
  {
    name: "Victória Silva",
    image:
      "https://images.generated.photos/vBRCiI_3UM4l40sU8s7fCwbJwzDwRTGpebzPkfHFsY4/rs:fit:512:512/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/ODgyMTAyLmpwZw.jpg",
    position: "Back-end developer",
  },
  {
    name: "Gabrielle Fernandez",
    image:
      "https://images.unsplash.com/photo-1549351512-c5e12b11e283?q=80&fm=jpg&crop=faces&fit=crop&h=600&w=600",
    position: "Sales",
  },
  {
    name: "Sadie Lewis",
    image:
      "https://images.unsplash.com/photo-1485960994840-902a67e187c8?q=80&fm=jpg&crop=faces&fit=crop&h=600&w=600",
    position: "Sales",
  },
  {
    name: "Thilde Olaisen",
    image:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&crop=faces&fit=crop&h=600&w=600",
    position: "Marketing Lead",
  },
  {
    name: "Deepika Ramesh",
    image:
      "https://images.generated.photos/lEhPUYYfYr9IOt13WZZGf2zbXZnCYdU1wUp7gcu_99c/rs:fit:512:512/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/Njg5NTQ5LmpwZw.jpg",
    position: "Front-end developer",
  },
  {
    name: "Jordi Santiago",
    image:
      "https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    position: "Front-end developer",
  },
  {
    name: "Kerim Fahri",
    image:
      "https://images.unsplash.com/photo-1456327102063-fb5054efe647?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=600&w=600",
    position: "Back-end developer",
  },
];

export default function About() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4">
        {/* Hero Map */}
        <div className="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
          <div className="max-w-max rounded-full border bg-gray-50 p-1 px-3">
            <p className="text-xs font-semibold leading-normal md:text-sm">
              About the company
            </p>
          </div>
          <p className="text-3xl font-bold text-gray-900 md:text-5xl md:leading-10">
            Made with love, right here in India
          </p>
        </div>
        <div className="w-full space-y-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13960.071516777454!2d77.6446783!3d28.9868412!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c6795ad9fdc3d%3A0xb233ce0ef61338ce!2sprintonapp!5e0!3m2!1sen!2sin!4v1708886559004!5m2!1sen!2sin"
            width="600"
            height="500px"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[200px] w-full rounded-xl object-cover md:h-full"
            alt=""
          ></iframe>
        </div>

        {/* locations */}
        <div className="my-8 flex flex-col gap-y-6 md:flex-row lg:justify-around">
          {locations.map((location) => (
            <div
              key={location.title}
              className="flex flex-col space-y-3 md:w-2/4 lg:w-1/5"
            >
              <MapPin className="h-5 w-5" />
              <p className="w-full text-xl font-semibold  text-gray-900">
                {location.title}
              </p>
              <p className="w-full text-base text-gray-700">
                {location.timings}
              </p>
              <p className="text-sm font-medium">{location.address}</p>
            </div>
          ))}
        </div>
        <hr className="mt-20" />
      </div>
    </div>
  );
}
