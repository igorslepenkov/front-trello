const MOCK_API_URL = "https://62a234e6cd2e8da9b004a0db.mockapi.io/";

async function getMockApiCards() {
  const response = await fetch(`${MOCK_API_URL}cards`);
  return response.json();
}

async function getMockApiCard(id) {
  const request = new Request(`${MOCK_API_URL}cards/${card.id}`);
  const response = await fetch(request);
  return response.json();
}

async function postMockApiCard(cardObject) {
  const cards = await getMockApiCards();
  if (!cards.find((card) => card.user.username === cardObject.user.username)) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cardObject),
    };
    const request = new Request(`${MOCK_API_URL}cards`, options);
    const response = await fetch(request);
    return response.json();
  } else {
    console.log("User allready exists");
    return cards.find(
      (card) => card.user.username === cardObject.user.username
    );
  }
}

async function updateMockApiCard(card) {
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(card),
  };
  const request = new Request(`${MOCK_API_URL}cards/${card.id}`, options);
  const response = await fetch(request);
  return response.json();
}

async function deleteMockApiCard(cardObj) {
  const options = {
    method: "DELETE",
  };
  const request = new Request(`${MOCK_API_URL}cards/${cardObj.id}`, options);
  return fetch(request);
}

export {
  getMockApiCards,
  getMockApiCard,
  postMockApiCard,
  updateMockApiCard,
  deleteMockApiCard,
};
