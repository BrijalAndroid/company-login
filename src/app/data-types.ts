export interface Login {
    UserName:string;
    UserPass:string;
}

export interface LoginResponse {
    status: string;
    message: string;
    error: string;
    data: {
      user: {
        id: number;
        // Other properties
      };
      token: string;
    };
    extraData: any[];    
}




https://stackoverflow.com/questions/63286355/getting-httperrorresponse-error-in-angular