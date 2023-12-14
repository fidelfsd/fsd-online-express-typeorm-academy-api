export interface CreateStudentRequestBody {
   username: string;
   email: string;
   password: string;
   first_name: string;
   last_name: string;
   date_of_birth: string;
   address?: string;
   phone_number?: string;
   gender?: string;
   nationality?: string;
}

export interface LoginUserRequestBody {
   email: string;
   password: string;
}

export interface TokenData {
   userId: string;
   userRoles: string[];
}
