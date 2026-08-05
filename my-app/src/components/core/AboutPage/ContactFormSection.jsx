import React from "react";
import ContactUsForm from "../../ContactPage/ContactUsForm";

const ContactFormSection = () => {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-0">
      <h1 className="text-center text-3xl sm:text-4xl font-semibold">
        Get in Touch
      </h1>

      <p className="mt-3 mx-auto max-w-2xl text-center text-sm sm:text-base leading-7 text-richblack-300">
        We'd love to hear from you. Please fill out the form below and we'll
        get back to you as soon as possible.
      </p>

      <div className="mt-8 sm:mt-10 lg:mt-12 w-full">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactFormSection;