export const selectedTravelersList = [
    {
        id:1,
        title:'Juts Me',
        desc:'A solo traveler embarking on a personal adventure',
        icon:'🥂',
        people:'1'
    },
    {
        id:2,
        title:'Couple',
        desc:'A romantic getaway or an exciting journey for two',
        icon:'👫',
        people:'2'
    },
    {
        id:3,
        title:'Family',
        desc:'A fun-filled trip for the whole family to enjoy',
        icon:'🏡',
        people:'3 to 5 people'
    },
    {
        id:4,
        title:'Friends',
        desc:'An adventure packed with laughter and memories for a group of friends',
        icon:'⛵',
        people:'5 to 10 people'
    },
]

export const selectedBudgetOptions = [
    {
        id:1,
        title:'Low-Cost',
        desc:'Affordable and cost-effective options.',
        icon:'💵',
    },
    {
        id:2,
        title:'Moderate',
        desc:'Moderate costs with a mix of comfort and savings',
        icon:'💰',
    },
    {
        id:3,
        title:'Luxury',
        desc:'Indulge in Premium experinces',
        icon:'💸',
    },
]

export const AI_PROMPT = 'Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget, Give me a Hotels  options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time to Travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.'