export default function authReducer(state, action) {
    const { id } = action;
    switch (action.type) {
        case "loggedId":
            return id
            break;
            //return { user, role };
        case "logout":
            return -1
            break;
            //return { user: {}, role: '' };
        default:
            return state;
    }
    //return { user, role }
  }