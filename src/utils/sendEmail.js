export const sendEmail = data =>
  new Promise(resolve => {
    console.log('Data recieved for email notification', data);
    // Added api for email notification
    setTimeout(() => {
      resolve({result: true, message: 'Email Sent'});
    }, 1000);
  });
