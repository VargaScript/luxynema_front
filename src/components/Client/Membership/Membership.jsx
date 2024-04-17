import React from "react";
import { HomeNavbar } from "../HomeNavbar/HomeNavbar";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import "./Membership.css";

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-3 w-3"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

const MembershipPlanCard = ({ title, price, features, buttonText }) => {
  return (
    <Card color="gray" variant="gradient" className="w-full max-w-[20rem] p-8 mb-8">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
      >
        <Typography variant="small" color="white" className="font-normal uppercase">
          {title}
        </Typography>
        <Typography
          variant="h1"
          color="white"
          className="mt-6 flex justify-center gap-1 text-5xl font-normal"
        >
          <span className="mt-2 text-5xl">$</span> {price} <span className="self-end text-5xl">/mo</span>
        </Typography>
      </CardHeader>
      <CardBody className="p-0">
        <ul className="flex flex-col gap-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <CheckIcon />
              </span>
              <Typography className="font-normal">{feature}</Typography>
            </li>
          ))}
        </ul>
      </CardBody>
      <CardFooter className="mt-12 p-0">
        <div className="button-container">
          <Button
            size="lg"
            color="white"
            className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
            ripple={false}
            fullWidth={true}
          >
            {buttonText}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const Membership = () => {
  const plans = [
    {
      title: "Basic",
      price: "19.99",
      features: [
        "2 free tickets per month",
        "10% discount on concessions",
        "Exclusive events             ",
        "Free popcorn with every ticket",
        "Early access to movie premieres"
      ],
      buttonText: "Join Now",
    },
    {
      title: "Premium",
      price: "29.99",
      features: [
        "4 free tickets per month",
        "15% discount on concessions",
        "Access to exclusive member events",
        "Priority booking for blockbuster releases"
      ],
      buttonText: "Join Now",
    },
    {
      title: "VIP",
      price: "49.99",
      features: [
        "Unlimited free tickets    ",
        "20% discount on concessions",
        "Access to exclusive member events",
        "Personal concierge service",
      ],
      buttonText: "Join Now",
    },
    
  ];

  return (
    <div className="membership-container">
      <HomeNavbar />
      <div className="container">
        <div className="header">
          <p className="slogan">Unlock the Magic of Movies with Our Membership Plans</p>
        </div>

        <div className="membership-plans mt-navbar">
          {plans.map((plan, index) => (
            <MembershipPlanCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Membership;
