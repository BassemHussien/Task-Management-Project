import { ADMIN_LOGIN } from "./adminActions";
import { ADMIN_LOGOUT } from "./adminActions";

const intialState ={
    isLogined:true,
    adminName:"",
    adminPassword:"",
    adminEmail:"",
    isRoleAdmin:true,
}

const adminReducer = (state=intialState,action)=>{
    switch(action.type){
        case ADMIN_LOGIN:
            return{
                ...state,
                isLogined:true,
                adminName:action.payload.adminName,
                adminPassword:action.payload.adminPassword,
                adminEmail:action.payload.adminEmail,
                isRoleAdmin:action.payload.isRoleAdmin,
            }
        case ADMIN_LOGOUT:
            return{
                ...state,
                isLogined:false,
            }
        default:
            return state;
    }
}
export default adminReducer;