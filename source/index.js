// const axios = require('axios');

// const auth0Domain = 'kpi.eu.auth0.com';
// const clientId = 'JIvCO5c2IBHlAe2patn6l6q5H35qxti0';
// const clientSecret = 'ZRF8Op0tWM36p1_hxXTU-B0K_Gq_-eAVtlrQpY24CasYiDmcXBhNS6IJMNcz1EgB';
// const audience = 'https://kpi.eu.auth0.com/api/v2/';

// axios.post(`https://${auth0Domain}/oauth/token/`, 
//   `audience=${encodeURIComponent(audience)}&grant_type=client_credentials&client_id=${clientId}&client_secret=${encodeURIComponent(clientSecret)}`,
//   {
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//   }
// )
// .then(response => {
//   const accessToken = response.data.access_token;
//   console.log('Access Token:', accessToken);

//   // Тут ви можете використовувати accessToken для виклику інших ресурсів API
// })
// .catch(error => {
//   console.error('Error obtaining access token:', error.response ? error.response.data : error.message);
// });



const axios = require('axios');

const auth0Domain = 'kpi.eu.auth0.com';
const clientId = 'JIvCO5c2IBHlAe2patn6l6q5H35qxti0';
const clientSecret = 'ZRF8Op0tWM36p1_hxXTU-B0K_Gq_-eAVtlrQpY24CasYiDmcXBhNS6IJMNcz1EgB';
const audience = 'https://kpi.eu.auth0.com/api/v2/';

const getManagementApiToken = async () => {
  try {
    const response = await axios.post(`https://${auth0Domain}/oauth/token/`, 
      `audience=${encodeURIComponent(audience)}&grant_type=client_credentials&client_id=${clientId}&client_secret=${encodeURIComponent(clientSecret)}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const accessToken = response.data.access_token;
    console.log('Access Token:', accessToken);
    return accessToken;
  } catch (error) {
    throw new Error(`Error obtaining access token: ${error.response ? error.response.data : error.message}`);
  }
};

const createAuth0User = async () => {
  try {
    const managementApiToken = await getManagementApiToken();

    const auth0ManagementApiUrl = `https://${auth0Domain}/api/v2/users`;
    const createUserData = {
      email: 'vitaliyyanysh@gmail.com',
      user_metadata: {},
      blocked: false,
      email_verified: false,
      app_metadata: {},
      given_name: 'Vitaliy',
      family_name: 'Yanyshyn',
      name: 'Vitaliy Yanyshyn',
      nickname: 'alkatel3',
      picture: 'https://avatars.githubusercontent.com/u/74428339?v=4',
      user_id: 'alkatel3',
      connection: 'Username-Password-Authentication',
      password: 'Hello123',
      verify_email: false,
    };

    const response = await axios.post(auth0ManagementApiUrl, createUserData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${managementApiToken}`
      },
    });

    const createdUser = response.data;
    console.log('Created User:', createdUser);
  } catch (error) {
    console.error('Error creating user:', error.response ? error.response.data : error.message);
  }
};

createAuth0User();
