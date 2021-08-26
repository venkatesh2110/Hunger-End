export interface Restaurants{
    _id:string,
    name:string,
    about:string,
    location:string,
    Items:[
        {
            id:string,
            foodName:string,
            price:number
        }
    ],
}