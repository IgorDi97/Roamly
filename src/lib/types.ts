export interface TripDay {
  day: number
  title: string
  description: string
  highlights?: string[]
}

export interface TripPlan {
  destination: string
  tagline: string
  totalCost: number
  flightCost: number
  accommodationCost: number
  activitiesCost: number
  currency: string
  season?: string
  flightInfo: string
  accommodationInfo: string
  days: TripDay[]
  tips: string
  bestTimeToVisit?: string
  languages?: string
  timezone?: string
}

export interface SearchParams {
  budget: string
  duration: string
  dateFrom?: string
  dateTo?: string
  airport: string
  tripType: string
  hotelType: string
  destination?: string
  currency?: string
}
