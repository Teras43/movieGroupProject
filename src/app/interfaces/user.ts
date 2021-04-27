export interface User {
   uid: string;
   email: string;
   phoneNumber?: string;
   photoUrl?: string;
   providerId?: string;
   interested?: [
      {
        title: string,
        poster_path?: string,
        vote_count?: number,
      }
       
   
   ];
}
