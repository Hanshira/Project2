const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/easyDoctor");
const Doctor = require("../models/doctor");

const doctors = [
  {
    name: "Magdalene",
    familyName: "Degoix",
    imageUrl:
      "https://www.carwreckdoctor.com/hubfs/Car_Accident_Doctor.png?t=1517951780221",
    speciality: "Cardiology",
    email: "mdegoix0x@wsj.com",
    prices: {
      price: 115,
      paymentMethod: "Credit card"
    },
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
        floor: 3,
        lift: "No"
      }
    ],
    city: "Paris",
    telephone: "7845617474",
    presentation:
      "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    languages: "Hindi",
    website: "www.degoix.com",
    password: "1234567"
  },
  {
    name: "Mira",
    familyName: "Salanter",
    imageUrl:
      "http://floridasmedicalmarijuana.com/wp-content/uploads/2016/06/bb_florida-ent-doctor.png",
    speciality: "Cardiology",
    email: "msalanter560@wsj.com",
    prices: {
      price: 90,
      paymentMethod: "Credit card"
    },
    workingHours: [
      { day: "Mon", hours: "9.00-17.00" },
      { day: "Thu", hours: "9.00-13.00" },
      { day: "Wed", hours: "13.00-20.00" },
      { day: "Thur", hours: "9.00-17.00" },
      { day: "Fri", hours: "9.00-13.00" }
    ],
    address: [
      {
        street: "43 rue Vieille du temples",
        zipCode: "75004",
        floor: 3,
        lift: "No"
      }
    ],
    city: "Paris",
    telephone: "7845617474",
    presentation:
      "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.",
    languages: "Hindi",
    website: "www.degoix.com",
    password: "1234567"
  },
  {
    name: "Eziechiele",
    familyName: "Renbold",
    imageUrl:
      "http://www.resolvingdiscoverydisputes.com/wp-content/uploads/sites/95/2015/01/Doctor.jpg",
    email: "erenbold18@loc.gov",
    prices: {
      price: 100,
      paymentMethod: "Cash"
    },
    workingHours: [
      { day: "Mon", hours: "9.00-20.00" },
      { day: "Thu", hours: "9.00-20.00" }
    ],
    address: [
      {
        street: "3647 Cambridge Lane",
        zipCode: "600123",
        floor: 5,
        lift: "Yes"
      }
    ],
    city: "Paris",
    telephone: "9317501971",
    speciality: "Ophtalmology",
    presentation:
      "Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
    languages: "English, Spanish, Portuguese",
    password: "1gubjqjwfh"
  },
  {
    name: "Cayla",
    familyName: "Cazin",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShziYt6xgZPa1FJP-5MTIGbzeuge4jrqb9P4Wq60digp3YDSUT4g",
    email: "ccazin23@gov.uk",
    prices: {
      price: 80,
      paymentMethod: "Credit card"
    },
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
        floor: 1,
        lift: "No"
      }
    ],
    city: "Paris",
    telephone: "6237069820",
    speciality: "Ophtalmology",
    presentation:
      "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    languages: "Italian, English, Pashto",
    password: "123sfabf"
  },
  {
    name: "Keriann",
    familyName: "Penhalewick",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRyea-s-B2kC846220ZvVw-_pLikfuF72QL3C_E-zSc24TmYuRNA",
    email: "kpenhalewick3@live.com",
    prices: {
      price: 75,
      paymentMethod: "Cash"
    },
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
        floor: 2,
        lift: "Yes"
      }
    ],
    city: "Paris",
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
