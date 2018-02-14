const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/easyDoctor");
const Doctor = require("../models/doctor");

const doctors = [
  {
    id: 1,
    name: "Magdalene",
    familyName: "Degoix",
    email: "mdegoix0@wsj.com",
    price: 115,
    workingHours: [
      { day: "Mon", hours: "9.00-17.00" },
      { day: "Thu", hours: "9.00-13.00" },
      { day: "Wed", hours: "13.00-20.00" },
      { day: "Thur", hours: "9.00-17.00" },
      { day: "Fri", hours: "9.00-13.00" }
    ],
    address: [
      {
        street: "0538 Bartillon Plaza",
        zipCode: "12345",
        city: "Fatumnasi",
        floor: 3,
        lift: "No"
      }
    ],
    telephone: "7845617474",
    speciality: "Cardiology",
    presentation:
      "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    languages: "Hindi",
    website: "www.degoix.com",
    password: "1234567"
  },
  {
    id: 2,
    name: "Eziechiele",
    familyName: "Renbold",
    email: "erenbold1@loc.gov",
    price: 117,
    workingHours: [
      { day: "Mon", hours: "9.00-20.00" },
      { day: "Thu", hours: "9.00-20.00" }
    ],
    address: [
      {
        street: "3647 Cambridge Lane",
        zipCode: "600123",
        city: "Grugul",
        floor: 5,
        lift: "Yes"
      }
    ],
    telephone: "9317501971",
    speciality: "Ophthalmology",
    presentation:
      "Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
    languages: "English, Spanish, Portuguese",
    password: "1gubjqjwfh"
  },
  {
    id: 3,
    name: "Cayla",
    familyName: "Cazin",
    email: "ccazin2@gov.uk",
    price: 86,
    workingHours: [
      { day: "Mon", hours: "9.00-19.00" },
      { day: "Thu", hours: "9.00-19.00" },
      { day: "Wed", hours: "13.00-20.00" },
      { day: "Thur", hours: "9.00-19.00" },
      { day: "Fri", hours: "9.00-13.00" }
    ],
    address: [
      {
        street: "6409 Westridge Trail",
        zipCode: "157780",
        city: "Bogovarovo",
        floor: 1,
        lift: "No"
      }
    ],
    telephone: "6237069820",
    speciality: "Ophthalmology",
    presentation:
      "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    languages: "Italian, English, Pashto",
    password: "123sfabf"
  },
  {
    id: 4,
    name: "Keriann",
    familyName: "Penhalewick",
    email: "kpenhalewick3@live.com",
    price: 124,
    workingHours: [
      { day: "Mon", hours: "9.00-17.00" },
      { day: "Thu", hours: "9.00-13.00" },
      { day: "Wed", hours: "13.00-20.00" },
      { day: "Thur", hours: "9.00-17.00" },
      { day: "Fri", hours: "9.00-13.00" }
    ],
    address: [
      {
        street: "1438 Waubesa Terrace",
        zipCode: "1243",
        city: "Xiping",
        floor: 2,
        lift: "Yes"
      }
    ],
    telephone: "1057084479",
    speciality: "Paediatrics",
    presentation:
      "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
    languages: "Italian, English",
    password: "ldgnakjerbg"
  }
];
Doctor.create(doctors, (err, docs) => {
  if (err) {
    throw err;
  }

  docs.forEach(doctor => {
    console.log(doctor.name);
  });
  mongoose.connection.close();
});
