export interface IUser{
    id: string,
    name: string, 
    email: string,
    role: 'admin' | 'user',
    createdAt: Date
}

export interface IProperty{
    id: string,
    title: string,
    description: string,
    location: string,
    price: number,
    owner: IUser | string, 
    createdAt: Date
}

