import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class RegistationService
{
    constructor(private httpClient :HttpClient){}

    register(fileData)
    {  
        console.log("file data at service ",fileData);
       return this.httpClient.post("http://localhost:3000/api/uploadFile",fileData);
    
    }
}