// "AE",
//           "AG",
//           "AL",
//           "AM",
//           "AR",
//           "AT",
//           "AU",
//           "BA",
//           "BE",
//           "BG",
//           "BH",
//           "BO",
//           "CA",
//           "CH",
//           "CI",
//           "CL",
//           "CO",
//           "CR",
//           "CY",
//           "CZ",
//           "DE",
//           "DK",
//           "DO",
//           "EC",
//           "EE",
//           "EG",
//           "ES",
//           "ET",
//           "FI",
//           "FR",
//           "GB",
//           "GH",
//           "GM",
//           "GR",
//           "GT",
//           "GY",
//           "HK",
//           "HR",
//           "HU",
//           "ID",
//           "IE",
//           "IL",
//           "IS",
//           "IT",
//           "JM",
//           "JO",
//           "JP",
//           "KE",
//           "KH",
//           "KR",
//           "KW",
//           "LC",
//           "LI",
//           "LK",
//           "LT",
//           "LU",
//           "LV",
//           "MA",
//           "MD",
//           "MG",
//           "MK",
//           "MN",
//           "MO",
//           "MT",
//           "MU",
//           "MX",
//           "MY",
//           "NA",
//           "NG",
//           "NL",
//           "NO",
//           "NZ",
//           "OM",
//           "PA",
//           "PE",
//           "PH",
//           "PL",
//           "PT",
//           "PY",
//           "QA",
//           "RO",
//           "RS",
//           "RW",
//           "SA",
//           "SE",
//           "SG",
//           "SI",
//           "SK",
//           "SN",
//           "SV",
//           "TH",
//           "TN",
//           "TR",
//           "TT",
//           "TZ",
//           "UY",
//           "UZ",
//           "VN",
//           "ZA",
//           "BD",
//           "BJ",
//           "MC",
//           "NE",
//           "SM",
//           "AZ",
//           "BN",
//           "BT",
//           "AO",
//           "DZ",
//           "TW",
//           "BS",
//           "BW",
//           "GA",
//           "LA",
//           "MZ",
//           "KZ",
//           "PK",

const fulfillOrder = async (session) => {
  const userDocPath = `users/${session.metadata.userEmail}/orders/${session.id}`;
  console.log(userDocPath);

  const imageIds = session.metadata.imageIds.split(",");
  const imageUrls = {};

  // Fetch image URLs from fakestoreapi.com
  for (const id of imageIds) {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const productData = await response.json();
    imageUrls[id] = productData.image; // Assuming the API returns the image URL in 'image'
  }

  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.userEmail)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: imageUrls, // Store the image URLs
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`Success! Added Order ${session.id} to DB`);
    })
    .catch((err) => {
      console.log(`Error! Error ${err.message}`);
    });
};
