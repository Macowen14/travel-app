export const dataResponse = {
  trip_details: {
    destination: "Mombasa, Kenya",
    duration: "7 days and 7 nights",
    start_date: "2024-08-22",
    travelers: "2-3 friends",
    budget: "$500 - $1000",
  },
  transportation: {
    flights: {
      option_1: {
        airline: "Kenya Airways",
        route: "Your city - Mombasa Moi International Airport (MBA)",
        price: "$400 - $600 per person (round trip)",
        booking_link: "https://www.kenya-airways.com/",
      },
      option_2: {
        airline: "Ethiopian Airlines",
        route: "Your city - Mombasa Moi International Airport (MBA)",
        price: "$350 - $550 per person (round trip)",
        booking_link: "https://www.ethiopianairlines.com/",
      },
    },
    bus: {
      option: {
        bus_company: "Modern Coast Bus Services",
        route: "Nairobi - Mombasa",
        price: "$20 - $30 per person (one way)",
        booking_link: "https://www.moderncoast.co.ke/",
      },
    },
  },
  accommodation: {
    hotel_options: [
      {
        name: "The Sarova Whitesands Beach Resort & Spa",
        price: "$150 - $250 per night (for a double room)",
        address: "Nyali Beach, Mombasa, Kenya",
        rating: "4.5 stars",
        nearby_places: "Nyali Beach, Bamburi Beach, Haller Park",
      },
      {
        name: "The Mombasa Beach Hotel",
        price: "$100 - $200 per night (for a double room)",
        address: "Mombasa Beach, Mombasa, Kenya",
        rating: "4 stars",
        nearby_places: "Mombasa Beach, Fort Jesus, Old Town Mombasa",
      },
      {
        name: "Serena Beach Resort & Spa",
        price: "$200 - $300 per night (for a double room)",
        address: "North Coast, Mombasa, Kenya",
        rating: "5 stars",
        nearby_places: "North Coast Beach, Watamu Marine National Park",
      },
    ],
  },
  attractions: [
    {
      name: "Fort Jesus",
      description:
        "A 16th-century Portuguese fort, a UNESCO World Heritage Site, offering historical insights and panoramic views.",
      image_url:
        "https://www.lonelyplanet.com/media/images/w1200/hero/fort-jesus-mombasa-kenya-5193832-hero-650x400-1448123770.jpg",
      ticket_price: "$10 per person",
      best_time_to_visit: "Morning or late afternoon to avoid the midday heat",
    },
    {
      name: "Old Town Mombasa",
      description:
        "A historic district with narrow streets, traditional architecture, and bustling markets.",
      image_url:
        "https://www.lonelyplanet.com/media/images/w1200/hero/old-town-mombasa-kenya-1371186-hero-650x400-1460564079.jpg",
      ticket_price: "Free",
      best_time_to_visit: "Anytime, but mornings are best for photography",
    },
    {
      name: "Haller Park",
      description:
        "A wildlife sanctuary with rescued animals, including giraffes, elephants, and crocodiles, offering a unique nature experience.",
      image_url:
        "https://www.lonelyplanet.com/media/images/w1200/hero/haller-park-mombasa-kenya-1774894-hero-650x400-1457908281.jpg",
      ticket_price: "$15 per person",
      best_time_to_visit: "Morning or afternoon for wildlife viewing",
    },
    {
      name: "Nyali Beach",
      description:
        "A popular beach with white sand, clear water, and watersports opportunities.",
      image_url:
        "https://www.lonelyplanet.com/media/images/w1200/hero/nyali-beach-mombasa-kenya-2326834-hero-650x400-1463178046.jpg",
      ticket_price: "Free",
      best_time_to_visit: "Anytime, but mornings and evenings are less crowded",
    },
    {
      name: "Mombasa Marine National Park & Reserve",
      description:
        "A marine park with diverse coral reefs, colorful fish, and a chance to spot dolphins and whales.",
      image_url:
        "https://www.lonelyplanet.com/media/images/w1200/hero/mombasa-marine-national-park-and-reserve-mombasa-kenya-1762266-hero-650x400-1457907250.jpg",
      ticket_price: "$10 per person",
      best_time_to_visit: "Morning or afternoon for snorkeling and diving",
    },
    {
      name: "Shimba Hills National Reserve",
      description:
        "A forested reserve with hiking trails, wildlife viewing opportunities, and a chance to spot the rare Sable Antelope.",
      image_url:
        "https://www.lonelyplanet.com/media/images/w1200/hero/shimba-hills-national-reserve-mombasa-kenya-2439843-hero-650x400-1463947351.jpg",
      ticket_price: "$15 per person",
      best_time_to_visit: "Morning or afternoon for wildlife viewing",
    },
    {
      name: "Bamburi Beach",
      description:
        "A quieter beach with white sand and calm waters, perfect for relaxing and enjoying the sunset.",
      image_url:
        "https://www.lonelyplanet.com/media/images/w1200/hero/bamburi-beach-mombasa-kenya-508268-hero-650x400-1446787333.jpg",
      ticket_price: "Free",
      best_time_to_visit: "Anytime, but evenings are best for sunset views",
    },
  ],
  daily_schedule: [
    {
      day: "Day 1 (2024-08-22)",
      activities: [
        {
          time: "Morning (8:00 AM - 12:00 PM)",
          activity:
            "Arrival at Mombasa Moi International Airport (MBA) and check into your hotel.  Explore the nearby area.",
          estimated_travel_time: "1 hour (depending on traffic)",
        },
        {
          time: "Afternoon (1:00 PM - 4:00 PM)",
          activity: "Relax at the beach or by the pool.",
          estimated_travel_time: "N/A",
        },
        {
          time: "Evening (5:00 PM - 7:00 PM)",
          activity: "Dinner at a local restaurant.",
          estimated_travel_time: "N/A",
        },
      ],
    },
    {
      day: "Day 2 (2024-08-23)",
      activities: [
        {
          time: "Morning (9:00 AM - 12:00 PM)",
          activity: "Visit Fort Jesus, a UNESCO World Heritage Site.",
          estimated_travel_time: "30 minutes",
        },
        {
          time: "Afternoon (1:00 PM - 4:00 PM)",
          activity: "Explore the Old Town Mombasa.",
          estimated_travel_time: "N/A",
        },
        {
          time: "Evening (5:00 PM - 7:00 PM)",
          activity: "Dinner at a restaurant in the Old Town.",
          estimated_travel_time: "N/A",
        },
      ],
    },
    {
      day: "Day 3 (2024-08-24)",
      activities: [
        {
          time: "Morning (9:00 AM - 12:00 PM)",
          activity: "Visit Haller Park, a wildlife sanctuary.",
          estimated_travel_time: "45 minutes",
        },
        {
          time: "Afternoon (1:00 PM - 4:00 PM)",
          activity: "Enjoy the beach at Nyali Beach.",
          estimated_travel_time: "N/A",
        },
        {
          time: "Evening (5:00 PM - 7:00 PM)",
          activity: "Dinner at a restaurant in Nyali.",
          estimated_travel_time: "N/A",
        },
      ],
    },
    {
      day: "Day 4 (2024-08-25)",
      activities: [
        {
          time: "Morning (9:00 AM - 12:00 PM)",
          activity: "Take a boat trip to the Mombasa Marine National Park.",
          estimated_travel_time: "1 hour",
        },
        {
          time: "Afternoon (1:00 PM - 4:00 PM)",
          activity: "Snorkeling or diving in the marine park.",
          estimated_travel_time: "N/A",
        },
        {
          time: "Evening (5:00 PM - 7:00 PM)",
          activity: "Dinner at a seafood restaurant.",
          estimated_travel_time: "N/A",
        },
      ],
    },
    {
      day: "Day 5 (2024-08-26)",
      activities: [
        {
          time: "Morning (9:00 AM - 12:00 PM)",
          activity: "Visit Shimba Hills National Reserve for a nature hike.",
          estimated_travel_time: "1 hour 30 minutes",
        },
        {
          time: "Afternoon (1:00 PM - 4:00 PM)",
          activity: "Relax and enjoy the beach at Bamburi Beach.",
          estimated_travel_time: "N/A",
        },
        {
          time: "Evening (5:00 PM - 7:00 PM)",
          activity: "Dinner at a restaurant in Bamburi.",
          estimated_travel_time: "N/A",
        },
      ],
    },
    {
      day: "Day 6 (2024-08-27)",
      activities: [
        {
          time: "Morning (9:00 AM - 12:00 PM)",
          activity: "Shop for souvenirs at the local markets.",
          estimated_travel_time: "N/A",
        },
        {
          time: "Afternoon (1:00 PM - 4:00 PM)",
          activity: "Enjoy some time at a spa or relax by the pool.",
          estimated_travel_time: "N/A",
        },
        {
          time: "Evening (5:00 PM - 7:00 PM)",
          activity: "Farewell dinner at a restaurant with a view.",
          estimated_travel_time: "N/A",
        },
      ],
    },
    {
      day: "Day 7 (2024-08-28)",
      activities: [
        {
          time: "Morning (8:00 AM - 10:00 AM)",
          activity:
            "Check out of your hotel and head to the airport or bus station.",
          estimated_travel_time: "30 minutes to 1 hour",
        },
        {
          time: "Afternoon (12:00 PM onwards)",
          activity: "Departure from Mombasa.",
          estimated_travel_time: "N/A",
        },
      ],
    },
  ],
};
