const CONSTANTS = {
  BASE_URL: "https://62a234e6cd2e8da9b004a0db.mockapi.io",
  ENDPOINTS: {
    CARDS: "/cards",
  },
};

const getMockApiCards = async () => {
  const request = new Request(CONSTANTS.BASE_URL + CONSTANTS.ENDPOINTS.CARDS);
  const response = await fetch(request);
  return response.json();
};

const getMockApiCard = async (id) => {
  const request = new Request(
    CONSTANTS.BASE_URL + CONSTANTS.ENDPOINTS.CARDS + `/${id}`
  );
  const response = await fetch(request);
  if (response) {
    return response.json();
  } else {
    throw new Error(`${response.status}`);
  }
};

const postMockApiCard = async (cardObject) => {
  const cards = await getMockApiCards();
  if (!cards.find((card) => card.title === cardObject.title)) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cardObject),
    };
    const request = new Request(
      CONSTANTS.BASE_URL + CONSTANTS.ENDPOINTS.CARDS,
      options
    );
    const response = await fetch(request);
    if (response) {
      return response.json();
    } else {
      throw new Error(`${response.status}`);
    }
  } else {
    return cards.find((card) => card.title === cardObject.title);
  }
};

const updateMockApiCard = async (card) => {
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(card),
  };
  const request = new Request(
    CONSTANTS.BASE_URL + CONSTANTS.ENDPOINTS.CARDS + `/${card.id}`,
    options
  );
  const response = await fetch(request);
  if (response) {
    return response.json();
  } else {
    throw new Error(`${response.status}`);
  }
};

const deleteMockApiCard = async (card) => {
  const options = {
    method: "DELETE",
  };
  const request = new Request(
    CONSTANTS.BASE_URL + CONSTANTS.ENDPOINTS.CARDS + `/${card.id}`,
    options
  );
  const response = await fetch(request);
  if (response.status === 200) {
    return;
  } else {
    throw new Error(response.status);
  }
};

export {
  getMockApiCards,
  getMockApiCard,
  postMockApiCard,
  updateMockApiCard,
  deleteMockApiCard,
};
