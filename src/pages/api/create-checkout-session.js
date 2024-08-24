const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email, quantityList } = req.body;
  // make format of data that stripe understand(sending formated data to stripe and get back that data in the session)
  const transformedItems = items.map((item) => ({
    quantity: quantityList[item.id],
    price_data: {
      currency: "usd",
      unit_amount: (item.price * 100).toFixed(), // amount in cents, again!
      product_data: {
        name: item.title,
        description: item.description,
        images: [item.image],
      },
    },
  }));

  // This is the formated data from the stripe and show on the checkout(payment) page
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US"],
    },
    line_items: transformedItems,
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 300,
            currency: "usd",
          },
          display_name: "Next day air",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}`,
    metadata: {
      userEmail: email,
      images: JSON.stringify(items.map((item) => item.image)),
      // images: JSON.stringify(items.map((item) => item.id).join(",")),
    },
  });

  res.status(200).json({ id: session.id }); // this is the response part which is returned due to stripe API call from our endpoint created here.
};

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// export default async (req, res) => {
//   const { items, email, quantityList } = req.body;

//   const transformedItems = items.map((item) => ({
//     quantity: quantityList[item.id],
//     price_data: {
//       currency: "usd",
//       unit_amount: Math.round(item.price * 100), // Ensure amount is in cents
//       product_data: {
//         name: item.title,
//         description: item.description,
//         images: [item.image],
//       },
//     },
//   }));

//   // Create metadata with necessary information only
//   const metadata = {
//     userEmail: email,
//     // Pass a shorter representation of images
//     // Example: Using IDs or a shortened list of URLs
//     imageIds: items.map((item) => item.id).join(","), // Or any suitable identifier
//   };

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       shipping_address_collection: {
//         allowed_countries: [
//           // Add your allowed countries here
//           "US",
//
//         ],
//       },
//       line_items: transformedItems,
//       shipping_options: [
//         {
//           shipping_rate_data: {
//             type: "fixed_amount",
//             fixed_amount: {
//               amount: 300, // Example shipping amount in cents
//               currency: "usd",
//             },
//             display_name: "Next day air",
//             delivery_estimate: {
//               minimum: {
//                 unit: "business_day",
//                 value: 1,
//               },
//               maximum: {
//                 unit: "business_day",
//                 value: 1,
//               },
//             },
//           },
//         },
//       ],
//       mode: "payment",
//       success_url: `${process.env.HOST}/success`,
//       cancel_url: `${process.env.HOST}`,
//       metadata: metadata, // Use the adjusted metadata
//     });

//     res.status(200).json({ id: session.id });
//   } catch (error) {
//     console.error("Error creating checkout session:", error);
//     res.status(500).json({ error: "Failed to create checkout session" });
//   }
// };
