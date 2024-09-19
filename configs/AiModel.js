const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI({ apiKey });

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,

  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate a travel itinerary for a trip to Montevideo, Montevideo, Uruguay for 1 days and 1 nights with a budget of $0 - $500.\n\nThe trip starts on 2024-08-23 and is for 2-3 Friends.\n\nPlease include:\n1. Transportation options (flight or bus with prices and booking links).\n2. Hotel options (name, price, address, rating, nearby places).\n3. Tourist attractions (name, description, image URL, ticket prices, best times to visit).\n4. A daily schedule (places to visit each day with estimated travel times).\n\nOutput in a clear JSON format.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "trip": {\n    "start_date": "2024-08-23",\n    "duration": "1 day",\n    "budget": "$0 - $500",\n    "group_size": "2-3 friends",\n    "destination": "Montevideo, Uruguay"\n  },\n  "transportation": {\n    "options": [\n      {\n        "type": "Flight",\n        "provider": "Example Airline",\n        "price": "$300 - $500 (roundtrip)",\n        "booking_link": "https://www.exampleairline.com/"\n      },\n      {\n        "type": "Bus",\n        "provider": "Example Bus Company",\n        "price": "$100 - $200 (roundtrip)",\n        "booking_link": "https://www.examplebuscompany.com/"\n      }\n    ]\n  },\n  "accommodation": {\n    "options": [\n      {\n        "name": "Hotel Boutique 1821",\n        "price": "$50 - $100 per night",\n        "address": "18 de Julio 1821, Montevideo",\n        "rating": "4.5 stars",\n        "nearby_places": "Plaza Independencia, Teatro Solís, Ciudad Vieja"\n      },\n      {\n        "name": "Hotel America",\n        "price": "$40 - $80 per night",\n        "address": "Sarandí 592, Montevideo",\n        "rating": "4 stars",\n        "nearby_places": "Mercado del Puerto, Rambla, Palacio Salvo"\n      }\n    ]\n  },\n  "attractions": [\n    {\n      "name": "Plaza Independencia",\n      "description": "A historic square in the heart of Montevideo, featuring the iconic Independence Gate and the Palacio Salvo.",\n      "image_url": "https://www.example.com/plaza-independencia.jpg",\n      "ticket_price": "Free",\n      "best_time_to_visit": "Anytime, but especially during the day for its vibrant atmosphere."\n    },\n    {\n      "name": "Teatro Solís",\n      "description": "A beautiful opera house with stunning architecture and regular performances. ",\n      "image_url": "https://www.example.com/teatro-solis.jpg",\n      "ticket_price": "Varies depending on performance",\n      "best_time_to_visit": "Check the website for showtimes and purchase tickets in advance."\n    },\n    {\n      "name": "Mercado del Puerto",\n      "description": "A historic market featuring a variety of food stalls, restaurants, and shops.",\n      "image_url": "https://www.example.com/mercado-del-puerto.jpg",\n      "ticket_price": "Free",\n      "best_time_to_visit": "Lunchtime or dinner for a delicious and authentic experience."\n    },\n    {\n      "name": "Rambla",\n      "description": "Montevideo\'s iconic waterfront promenade, perfect for a leisurely stroll, enjoying the views, or having a picnic.",\n      "image_url": "https://www.example.com/rambla.jpg",\n      "ticket_price": "Free",\n      "best_time_to_visit": "Anytime, but especially during sunset for stunning views."\n    },\n    {\n      "name": "Museo Nacional de Artes Visuales",\n      "description": "A museum showcasing Uruguayan and international contemporary art.",\n      "image_url": "https://www.example.com/museo-nacional-de-artes-visuales.jpg",\n      "ticket_price": "$5",\n      "best_time_to_visit": "Tuesday - Sunday, 11 AM - 7 PM"\n    }\n  ],\n  "daily_schedule": {\n    "day_1": [\n      {\n        "time": "9:00 AM",\n        "activity": "Arrive at Montevideo airport or bus station and check into your hotel."\n      },\n      {\n        "time": "10:00 AM",\n        "activity": "Explore Plaza Independencia, including the Independence Gate and Palacio Salvo.",\n        "estimated_travel_time": "15 minutes"\n      },\n      {\n        "time": "11:00 AM",\n        "activity": "Visit Teatro Solís and admire its architecture (if open for tours or a show)."\n        "estimated_travel_time": "10 minutes"\n      },\n      {\n        "time": "12:00 PM",\n        "activity": "Lunch at Mercado del Puerto for a traditional Uruguayan experience."\n        "estimated_travel_time": "10 minutes"\n      },\n      {\n        "time": "2:00 PM",\n        "activity": "Walk along Rambla, enjoying the views and the sea breeze."\n        "estimated_travel_time": "10 minutes"\n      },\n      {\n        "time": "4:00 PM",\n        "activity": "Visit Museo Nacional de Artes Visuales to explore contemporary art."\n        "estimated_travel_time": "20 minutes"\n      },\n      {\n        "time": "6:00 PM",\n        "activity": "Dinner at a local restaurant in the Ciudad Vieja district."\n        "estimated_travel_time": "15 minutes"\n      },\n      {\n        "time": "8:00 PM",\n        "activity": "Enjoy a nightcap at a bar in the Ciudad Vieja or Pocitos neighborhood."\n        "estimated_travel_time": "10 minutes"\n      },\n      {\n        "time": "10:00 PM",\n        "activity": "Return to your hotel and relax."\n      }\n    ]\n  }\n}\n```\n\n**Note:** This itinerary is a suggestion and can be customized based on your interests and preferences. You can choose to visit different attractions, try different restaurants, or spend more time in any particular area. Prices for transportation, accommodation, and attractions are estimates and may vary depending on the time of year and availability. \n\n**Important Tips:**\n\n* **Book flights and accommodation in advance:** This is especially important if traveling during peak season.\n* **Consider purchasing a Montevideo Card:** This provides free admission to many attractions and discounts on public transportation.\n* **Learn some basic Spanish:** While English is spoken in tourist areas, knowing some basic Spanish will help you communicate better with locals.\n* **Enjoy the local culture:** Uruguay has a rich culture with a vibrant nightlife and delicious food. \n* **Be prepared for the weather:** Montevideo can experience four distinct seasons. Pack accordingly!\n* **Be safe:** As with any travel destination, it\'s important to be aware of your surroundings and take precautions against theft.\n',
        },
      ],
    },
  ],
});
