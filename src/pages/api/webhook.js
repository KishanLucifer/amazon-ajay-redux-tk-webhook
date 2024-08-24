import { buffer } from "micro";
import * as admin from "firebase-admin";

// Secure a connection to Firebase from the backend
// const serviceAccount = require("../../../permission-orignal.json");
// const app = !admin.apps.length
//   ? admin.initializeApp({
//       credential: admin.credential.cert(serviceAccount),
//     })
//   : admin.app();

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert({
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        private_key: process.env.FIREBASE_PRIVATE_KEY,
        project_id: "amzn-ajay",
      }),
    })
  : admin.app();

// Make connection to Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endPointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
  const userDocPath = `users/${session.metadata.userEmail}/orders/${session.id}`; // Construct the path
  console.log(userDocPath);

  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.userEmail)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100, // Corrected
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`Success! Added Order ${session.id} to DB`);
    })
    .catch((err) => {
      console.log(`Error! Error ${err.message()}`);
    });
  ``;
};

export default async (req, res) => {
  if (req.method === "POST") {
    //We need to gnereate the certificate using a buffer of information
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const signature = req.headers["stripe-signature"]; // Use square brackets
    let event;
    //Verify that the event posted came from stripe
    try {
      event = stripe.webhooks.constructEvent(
        payload,
        signature,
        endPointSecret
      );
    } catch (err) {
      console.error("Error:", err.message);
      return res.status(400).send(`Webhook error: ${err.message}`);
    }
    //Handle checkout session completed event
    if (event.type === "checkout.session.completed") {
      console.log("Checkout session completed event received");
      const session = event.data.object;
      // console.log(session);
      // console.log("Service Account data type", typeof serviceAccount);
      // console.log(
      //   "Service account value type",
      //   process.env.GOOGLE_APPLICATION_CREDENTIALS
      // );

      //fulfill the order
      try {
        await fulfillOrder(session);
        console.log("Order fulfilled.");
        return res.status(200).send("Webhook Received");
      } catch (err) {
        console.error("Fulfillment Error:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
//Here, we want the request to be like a stream than a parsed object.

//Body-parser parses an HTTP request body that usually helps when you need to know more than just the URL being hit.
// Using body-parser allows you to access req.body from within routes and use that data.
