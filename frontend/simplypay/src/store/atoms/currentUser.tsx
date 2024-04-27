import { atom, selector } from "recoil";
import axios from "axios";



export const currentUserSelector = atom({
    key:"currentUser",
    default:selector({
        key:"currentUserSelector",
        get:async ()=>{
            try{
                   const response = await axios.get("http://localhost:3000/api/v1/user/me",{
                        headers:{
                            Authorization:`Bearer ${localStorage.getItem('token')}`
                        }
                    })
                    if(response.status == 404){
                        return false;
                    }
                    else
                    return response.data;
                }
            catch{
                console.log(`error while fetching data from backend server`);
                return false;
            }
        }
    })
});

export const userImage = atom({
    key:"userImage",
    default: selector({
        key:"userImageSelector",
        get:async({get})=>{
            try{
            const currentUser = get(currentUserSelector);
            const username = currentUser.username;
            return username.charAt(0).toUpperCase();
            }
            catch{(err)=>{
                console.log(`error in setting userImage ${err}`);
                return false;
            }
            }
        }
    })

})

export const userBalance = atom({
    key:"userBalance",
    default:selector({
        key:"userBalanceSelector",
        get:async({get})=>{
            try{
                const currentUser = get(currentUserSelector);
                const balance = currentUser.account.balance;
                return balance;
            }
            catch{
                console.log(`error in fetching user balance`);
                return false;
            }
           
        }
    })
})


export const users = atom({
    key:"users",
    default:[]
})

