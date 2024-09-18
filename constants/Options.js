export const SelectTravelersList = [
  {
    id: 1,
    title: "Solo Adventure",
    desc: "Solo adventure with a focus on exploration and discovery",
    image: require("../assets/images/beach.png"),
    people: "1",
  },
  {
    id: 2,
    title: "Family",
    desc: "Travel with family members for a memorable experience",
    image: require("../assets/images/plane.png"),
    people: "3-5",
  },
  {
    id: 3,
    title: "Friends",
    desc: "A group of friends enjoying adventures together",
    image: require("../assets/images/boat.png"),
    people: "2-3",
  },
  {
    id: 4,
    title: "Couple",
    desc: "A romantic getaway for couples",
    image: require("../assets/images/hotel.png"),
    people: "2",
  },
  {
    id: 5,
    title: "Business",
    desc: "Traveling for work or professional meetings",
    image: require("../assets/images/hotel.png"),
    people: "3-6",
  },

  {
    id: 6,
    title: "Group Tour",
    desc: "Traveling as part of an organized group tour",
    image: require("../assets/images/park.png"),
    people: "5-10",
  },
  {
    id: 7,
    title: "Other",
    desc: "Other",
    image: require("../assets/images/swimmer.png"),
    people: "1-10",
  },
];

export const budget = [
  {
    id: 1,
    title: "$0 - $500",
    desc: "Budget-friendly",
    image: require("../assets/images/budgetFriendly.png"),
  },
  {
    id: 2,
    title: "$500 - $1000",
    desc: "Moderate budget",
    image: require("../assets/images/money.png"),
  },
  {
    id: 3,
    title: "$1000 - $1500",
    desc: "High budget",
    image: require("../assets/images/highBudget.png"),
  },
  {
    id: 4,
    title: "$1500+",
    desc: "Luxury",
    image: require("../assets/images/luxury.png"),
  },
];
export const AI_PROMPT = `
Generate a travel itinerary for a trip to {location} for {totalDays} days and {totalNights} nights with a budget of {budget}. 
The trip starts on {startDate} and is for {estimate} {travellers}.

Please include:
1. Transportation options (flight or bus with prices and booking links).
2. Hotel options (name, price, address, rating, nearby places).
3. Tourist attractions (name, description, image URL, ticket prices, best times to visit).
4. A daily schedule (places to visit each day with estimated travel times).

Note: Output in a clear JSON format and the links should be valid.
`;
