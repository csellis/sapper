const fetch = require('node-fetch')

function ValidateEmail(email) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
  {
    return (true)
  }
    return (false)
}


export async function post(req, res, next) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  
  const { body } = req;

  const request = {
    api_key: process.env.email_octopus_api_key,
    email_address: body.email,
    status: "SUBSCRIBED",
  }


  const emailOctopusListId = process.env.email_octopus_list_id
  const emailOctopusRequest = `https://emailoctopus.com/api/1.5/lists/${emailOctopusListId}/contacts`;
  const emailOctopusParams = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
    }

  const result = await fetch(emailOctopusRequest, emailOctopusParams);
  const json = await result.json();

  if(json.status === "SUBSCRIBED") {
  }
  console.log(json)
  res.end(JSON.stringify(json));
}