export interface PeopleInterface {
  also_known_as: [],
  biography: string | null,
  birthday: string | null,
  deathday: string | null,
  id: number,
  images: {
    profiles: []
  },
  known_for_department: string,
  movie_credits: {
    cast: [],
    crew: []
  },
  name: string,
  place_of_birth: string,
  popularity?: number,
  profile_path?: string,
  success?: any
}