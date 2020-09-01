import * as functions from 'firebase-functions';

import * as sgMail from '@sendgrid/mail';

const API_KEY = functions.config().sendgrid.key;
const TEMPLATE_ID = functions.config().sendgrid.template;
sgMail.setApiKey(API_KEY);


export const confirmBooking = functions.https.onCall(async (data) => {

  const msg = {
    to: data.email,
    from: 'ustpyb2020@gmail.com',
    templateId: TEMPLATE_ID,
    dynamic_template_data: {
      name: data.name,
      body: data.body
    }
  }

  await sgMail.send(msg);

  return { success: true };

});

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

