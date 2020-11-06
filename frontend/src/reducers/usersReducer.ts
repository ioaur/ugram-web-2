import { Reducer } from "redux";
import { BaseAction } from "../common";
import User, { CurrentUser } from "../models/user";
import { USERS } from "../actions/users";
import { SetUpdatedUserAction } from "../actions/users/interfaces";

export interface UsersState {
    readonly currentUser: CurrentUser | undefined;
    readonly users: User[];
    readonly famousUsers: User[];
}

const initialState: UsersState = {
    currentUser: undefined,
    users: [],
    famousUsers: [],
};

const usersReducer: Reducer<UsersState> = (state = initialState, action: BaseAction) => {
    switch (action.type) {
        case USERS.SET_CURRENT_USER:
            return { ...state, currentUser: action.payload };
        case USERS.ADD_USER:
            return { ...state, users: [...state.users, action.payload] };
        case USERS.SET_ALL_USERS:
            return { ...state, users: action.payload };
        case USERS.SET_UPDATED_USER:
            return { ...state, users: updateUser(state.users, action as SetUpdatedUserAction) };
        case USERS.SET_FAMOUS_USER:
            return { ...state, famousUsers: action.payload };
        default:
            return state;
    }
};

function updateUser(array: User[], action: SetUpdatedUserAction) {
    return array.map((user, index) => {
        if (user.uuid !== action.payload.uuid) {
            return user;
        }
        return {
            ...user,
            ...action.payload,
        };
    });
}

export default usersReducer;
