import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";

import { IData } from "../../interfaces/userData";
import {  AddData, DeleteData, GetData, UpdateData } from "../actions/app.action";
import { patch, append, removeItem, insertItem, updateItem } from '@ngxs/store/operators';

export class UserStateModel  {
    users:IData[]
}

@State<UserStateModel>({
    name: 'appstate',
    defaults: {
        users: []
    }
})

@Injectable()
export class AppState {
    constructor() { }

    @Selector()
    static selectStateData(state:UserStateModel){
        return state.users;
    }

    @Action(GetData)
    getDataFromState(ctx: StateContext<any>) {
        return ctx.getState();
    }

    @Action(AddData)
    addDataToState(ctx: StateContext<UserStateModel>, { payload }: AddData) {
        ctx.setState(
            patch<UserStateModel>({
              users: append<any>([payload])
            })
          );
    }

 @Action(UpdateData)
    updateDataOfState(ctx: StateContext<UserStateModel>, { payload, id }: UpdateData) {  
        ctx.setState(
            patch<UserStateModel>({
              users: updateItem<any>(
                data => data.id === id,
                payload
              )
            })
          );
    }

    @Action(DeleteData)
    deleteDataFromState(ctx: StateContext<UserStateModel>, { id }: DeleteData) {
        ctx.setState(
            patch<UserStateModel>({
              users: removeItem<any>(data => data.id === id)
            })
          );
    }


   
}