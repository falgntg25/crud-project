//Here we define four actions for CRUD operations respectively

import { IData } from "../../interfaces/userData";

//Read
export class GetData{
    static readonly type = '[Users] Fetch';
}

//Create
export class AddData {
    static readonly type = '[Users] Add';
    constructor(public payload: { dataItem: IData }) { }
}

//Update
export class UpdateData {
    static readonly type = '[Users] Update';
    constructor(public payload: any,  public id: number) { }
}

//Delete
export class DeleteData {
    static readonly type = '[Users] Delete';
    constructor(public id: number) { }
}