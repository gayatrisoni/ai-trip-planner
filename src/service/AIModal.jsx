import { GoogleGenerativeAI } from "@google/generative-ai";
  
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  
    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels  options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time to Travel each of the location for 3 days with each day plan with best time to visit in JSON format."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"hotelOptions\": [\n    {\n      \"hotelName\": \"Circus Circus Hotel & Casino\",\n      \"hotelAddress\": \"2880 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"price\": {\n        \"min\": 30,\n        \"max\": 100 \n      },\n      \"hotelImageUrl\": \"https://example.com/circuscircus.jpg\", \n      \"geoCoordinates\": {\n        \"latitude\": 36.1215,\n        \"longitude\": -115.1739\n      },\n      \"rating\": 3.5,\n      \"description\": \"A budget-friendly option with a circus theme, offering various amenities.\"\n    },\n    {\n      \"hotelName\": \"The D Las Vegas\",\n      \"hotelAddress\": \"300 Fremont Street, Las Vegas, NV 89101\",\n      \"price\": {\n        \"min\": 40,\n        \"max\": 120\n      },\n      \"hotelImageUrl\": \"https://example.com/thed.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.1665,\n        \"longitude\": -115.1403\n      },\n      \"rating\": 4.0,\n      \"description\": \"Located in Downtown Las Vegas, offering a more vintage and less expensive experience.\"\n    },\n    {\n      \"hotelName\": \"Main Street Station Casino, Brewery & Hotel\",\n      \"hotelAddress\": \"200 S Main St, Las Vegas, NV 89101\",\n      \"price\": {\n        \"min\": 50,\n        \"max\": 150\n      },\n      \"hotelImageUrl\": \"https://example.com/mainstreetstation.jpg\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.1672,\n        \"longitude\": -115.1442\n      },\n      \"rating\": 3.8,\n      \"description\": \"Historic hotel in Downtown, featuring a brewery and affordable rooms.\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": [\n      {\n        \"placeName\": \"Fremont Street Experience\",\n        \"placeDetails\": \"Free outdoor pedestrian mall with light shows, live music, and street performers.\",\n        \"placeImageUrl\": \"https://example.com/fremontstreet.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.167,\n          \"longitude\": -115.142\n        },\n        \"ticketPricing\": \"Free\",\n        \"rating\": 4.5,\n        \"timeToTravel\": \"1-2 hours\",\n        \"bestTime\": \"Evening (for the light shows)\"\n      },\n      {\n        \"placeName\": \"Container Park\",\n        \"placeDetails\": \"Unique shopping and dining area with repurposed shipping containers.\",\n        \"placeImageUrl\": \"https://example.com/containerpark.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1667,\n          \"longitude\": -115.137\n        },\n        \"ticketPricing\": \"Free entry, prices vary for food/shopping\",\n        \"rating\": 4.0,\n        \"timeToTravel\": \"1-2 hours\",\n        \"bestTime\": \"Afternoon/Evening\"\n      }\n    ],\n    \"day2\": [\n      {\n        \"placeName\": \"The Strip (walking tour)\",\n        \"placeDetails\": \"Walk along the Las Vegas Strip, admiring the hotels and atmosphere.\",\n        \"placeImageUrl\": \"https://example.com/thestrip.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.11,\n          \"longitude\": -115.17\n        },\n        \"ticketPricing\": \"Free\",\n        \"rating\": 5.0,\n        \"timeToTravel\": \"3-4 hours\",\n        \"bestTime\": \"Day or Evening\"\n      },\n      {\n        \"placeName\": \"Bellagio Conservatory & Botanical Gardens\",\n        \"placeDetails\": \"Free stunning display of flowers and plants.\",\n        \"placeImageUrl\": \"https://example.com/bellagiogardens.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.11,\n          \"longitude\": -115.175\n        },\n        \"ticketPricing\": \"Free\",\n        \"rating\": 4.5,\n        \"timeToTravel\": \"1 hour\",\n        \"bestTime\": \"Anytime\"\n      }\n    ],\n    \"day3\": [\n      {\n        \"placeName\": \"Seven Magic Mountains\",\n        \"placeDetails\": \"Colorful art installation outside of Las Vegas (requires transportation).\",\n        \"placeImageUrl\": \"https://example.com/sevenmagicmountains.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.045,\n          \"longitude\": -114.98\n        },\n        \"ticketPricing\": \"Free\",\n        \"rating\": 4.2,\n        \"timeToTravel\": \"2-3 hours (including travel time)\",\n        \"bestTime\": \"Afternoon for good lighting\"\n      },          \n      {\n        \"placeName\": \"Neon Museum\",\n        \"placeDetails\": \"Museum of vintage Las Vegas signs (admission fee applies).\",\n        \"placeImageUrl\": \"https://example.com/neonmuseum.jpg\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1388,\n          \"longitude\": -115.118\n        },\n        \"ticketPricing\": \"Check their website for pricing\",\n        \"rating\": 4.3,\n        \"timeToTravel\": \"1-2 hours\",\n        \"bestTime\": \"Afternoon\"\n      }\n    ]\n  }\n}\n```\n\n**Note:**  Replace the `example.com` image URLs with actual image URLs.  Hotel prices are estimates and can vary greatly depending on the season and availability.  Travel times are estimates and may be affected by traffic.  Always check official websites for the most up-to-date pricing and information.  Consider using ride-sharing services or the bus system to get around cheaply instead of renting a car.\n"},
          ],
        },
      ],
    });
  
   
  
  
 