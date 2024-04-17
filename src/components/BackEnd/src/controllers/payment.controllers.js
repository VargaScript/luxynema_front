// import Stripe from "stripe";

// const stripe = new Stripe(
//   "sk_test_51OuImcFRD8Q6fnANP1dRRUmJbbSpjFR30tXz6IjcJR3cyDoq1BxrGhduDLbxZYXX2fEzvpU4j2NbXwk5tU03UKcl00fetcDRoN"
// );

// export const createSession = async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         price_data: {
//           product_data: {
//             name: "pelicula",
//             description: "ElPadrino",
//           },
//           currency: "mxn",
//           unit_amount: 2000, //20dlls
//         },
//         quantity: 1,
//       },
//       {
//         price_data: {
//           product_data: {
//             name: "pelicula2",
//             description: "TheGoodfellas",
//           },
//           currency: "mxn",
//           unit_amount: 1000, //20dlls
//         },
//         quantity: 1,
//       },
//     ],
//     mode: "payment",
//     success_url: "http://localhost:3000/success",
//     cancel_url: "http://localhost:3000/cancel",
//   });
//   return res.json(session);
// };

//-------------------------------------------

import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51OuImcFRD8Q6fnANP1dRRUmJbbSpjFR30tXz6IjcJR3cyDoq1BxrGhduDLbxZYXX2fEzvpU4j2NbXwk5tU03UKcl00fetcDRoN"
);

export const createSession = async (id, title, duration, price) => {
  // Aquí puedes utilizar los datos de la película seleccionada
  console.log("ID de la película:", id);
  console.log("Título de la película:", title);
  console.log("Duración de la película:", duration);
  console.log("Precio total:", price);

  // Lógica para crear la sesión de pago con Stripe
  // ...

  return await stripe.checkout.sessions.create({
    line_items: [
      // Aquí puedes usar los datos de la película seleccionada
      {
        price_data: {
          product_data: {
            name: title,
            description: title, // Puedes ajustar esto según sea necesario
          },
          currency: "mxn",
          unit_amount: parseInt(price), // Convierte el precio a entero
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:3000/success`,
    cancel_url: "http://localhost:3000/cancel",
  });
};
