
const data =  [
    {
      "id": "nov-dec-18-days-saudia",
      "name": "November–December Umrah Package",
      "category": "Umrah",
      "durationDays": 18,
      "travelPeriod": ["November", "December"],
      "price": 120000,
      "originalPrice": 115000,
      "pricePerPerson": true,
      "flight": {
        "airline": "Saudia Airlines",
        "type": "Flight included"
      },
      "destinations": ["Makkah", "Madinah"],
      "ziyarat": ["Taif", "Badr", "Joranah"],
      "hotels": {
        "makkah": {
          "name": "Makkah Hotel",
          "distanceFromHaramMeters": 300
        },
        "madinah": {
          "name": "Madinah Hotel",
          "area": "Markaziya",
          "distanceFromMasjidNabawiMeters": 250
        }
      },
      "includedServices": [
        "Return flight ticket",
        "Visa",
        "Travel insurance",
        "Transport",
        "Meals",
        "Makkah hotel accommodation",
        "Madinah hotel accommodation"
      ],
      "highlights": [
        "18-day Umrah package",
        "Saudia Airlines flight",
        "Ziyarat included"
      ],
      "status": "active"
    },
    {
      "id": "nov-dec-18-days-direct",
      "name": "November–December Special Umrah Package",
      "category": "Umrah",
      "durationDays": 18,
      "travelPeriod": ["November", "December"],
      "price": 100000,
      "originalPrice": 95000,
      "pricePerPerson": true,
      "flight": {
        "airline": null,
        "type": "Direct flight"
      },
      "destinations": ["Makkah", "Madinah"],
      "ziyarat": ["Taif", "Badr", "Joranah"],
      "hotels": {
        "makkah": {
          "name": "Makkah Hotel",
          "shuttleService": true
        },
        "madinah": {
          "name": "Madinah Hotel",
          "area": "Markaziya",
          "distanceFromMasjidNabawiMeters": 250
        }
      },
      "includedServices": [
        "Return flight ticket",
        "Visa",
        "Travel insurance",
        "Transport",
        "Meals",
        "Makkah hotel accommodation",
        "Makkah hotel shuttle service",
        "Madinah hotel accommodation"
      ],
      "highlights": [
        "18-day package",
        "Direct flight",
        "Special ziyarat"
      ],
      "status": "active"
    },
    {
      "id": "budget-umrah-16-days",
      "name": "Budget Umrah Package",
      "category": "Umrah",
      "durationDays": 16,
      "price": 80000,
      "originalPrice": 75000,
      "pricePerPerson": true,
      "flight": {
        "airline": null,
        "type": "Direct flight"
      },
      "destinations": ["Makkah", "Madinah"],
      "ziyarat": [],
      "hotels": {
        "makkah": {
          "name": "Makkah Hotel",
          "distanceFromHaramMeters": 300,
          "shuttleService": true
        },
        "madinah": {
          "name": "Madinah Hotel",
          "distanceFromMasjidNabawiMeters": 250,
          "shuttleService": true
        }
      },
      "includedServices": [
        "Direct flight",
        "Visa",
        "Travel insurance",
        "Transport",
        "Meals",
        "Makkah hotel accommodation",
        "Makkah hotel shuttle service",
        "Madinah hotel accommodation",
        "Madinah hotel shuttle service"
      ],
      "highlights": [
        "Budget-friendly package",
        "16-day Umrah",
        "Direct flight"
      ],
      "status": "active"
    },
    {
      "id": "ramadan-30-days",
      "name": "Ramadan Umrah Package - 30 Days",
      "category": "Ramadan Umrah",
      "durationDays": 30,
      "price": 150000,
      "originalPrice": 145000,
      "pricePerPerson": true,
      "flight": {
        "airline": "Saudia Airlines",
        "type": "Flight included"
      },
      "destinations": ["Makkah", "Madinah"],
      "ziyarat": ["Taif", "Badr", "Wadi-e-Jinn"],
      "hotels": {
        "makkah": {
          "name": "Makkah Hotel"
        },
        "madinah": {
          "name": "Madinah Hotel"
        }
      },
      "includedServices": [
        "Return flight ticket",
        "Visa",
        "Travel insurance",
        "Transport",
        "Meals",
        "Makkah hotel accommodation",
        "Madinah hotel accommodation",
        "Ziyarat"
      ],
      "highlights": [
        "30-day Ramadan package",
        "Saudia Airlines flight",
        "Ziyarat"
      ],
      "status": "active"
    },
    {
      "id": "ramadan-20-days",
      "name": "Ramadan Umrah Package - 20 Days",
      "category": "Ramadan Umrah",
      "durationDays": 20,
      "price": 135000,
      "originalPrice": 130000,
      "pricePerPerson": true,
      "flight": {
        "airline": "Saudia Airlines",
        "type": "Flight included"
      },
      "destinations": ["Makkah", "Madinah"],
      "ziyarat": ["Taif", "Badr", "Wadi-e-Jinn"],
      "hotels": {
        "makkah": {
          "name": "Makkah Hotel"
        },
        "madinah": {
          "name": "Madinah Hotel"
        }
      },
      "includedServices": [
        "Return flight ticket",
        "Visa",
        "Travel insurance",
        "Transport",
        "Meals",
        "Makkah hotel accommodation",
        "Madinah hotel accommodation",
        "Ziyarat"
      ],
      "highlights": [
        "20-day Ramadan package",
        "Saudia Airlines flight",
        "Special ziyarat"
      ],
      "status": "active"
    },
    {
      "id": "ramadan-15-days",
      "name": "Ramadan Umrah Package - 15 Days",
      "category": "Ramadan Umrah",
      "durationDays": 15,
      "price": 130000,
      "originalPrice": 125000,
      "pricePerPerson": true,
      "flight": {
        "airline": "Saudia Airlines",
        "type": "Flight included"
      },
      "destinations": ["Makkah", "Madinah"],
      "ziyarat": [],
      "hotels": {
        "makkah": {
          "name": "Makkah Hotel"
        },
        "madinah": {
          "name": "Madinah Hotel"
        }
      },
      "includedServices": [
        "Return flight ticket",
        "Visa",
        "Travel insurance",
        "Transport",
        "Meals",
        "Makkah hotel accommodation",
        "Madinah hotel accommodation"
      ],
      "highlights": [
        "15-day Ramadan package",
        "Saudia Airlines flight"
      ],
      "status": "active"
    }
  ]
 
  export default data