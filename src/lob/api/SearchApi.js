const BASE_URL = "https://api.lob.com/v1/search";

const API_KEY = process.env.REACT_APP_LOB_API_KEY;

if (!API_KEY) {
  throw new Error(
    "No access key found! Please add a REACT_APP_LOB_API_KEY environment variable to your local environment.",
  );
}

const encodeUsernameAndPassword = (username, password) => btoa(`${username}:${password}`);

export async function getAddresses(params) {
  const url = new URL(BASE_URL);
  // TODO: _.pick only valid params from params, log unsupported params
  url.search = new URLSearchParams({ ...params, types: ["addresses"] }).toString();

  const authorizationHeader = `Basic ${encodeUsernameAndPassword(API_KEY, "")}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: authorizationHeader,
      },
    });

    if (response.ok) {
      return response.json();
    } else {
      // TODO: surface this more nicely
      console.error("Response failed", response);
    }
  } catch (e) {
    // TODO: surface this more nicely
    console.error(e);
  }
}
