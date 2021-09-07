
// const state = {
//   name: "Fausto",
//   logged: true,
// };

import { authReducer } from "../../auth/authReducer"
import { types } from "../../types/types"

describe('Testing authReducer', () => {
    
    test('should return default state', () => {
        
        const state = authReducer({logged: false}, {})
        
        expect (state).toEqual({logged:false})

    })
    
    test('should authenticate and place the user name', () => {
        
        const action={
            type:types.login,
            payload:{
                name:"alets"
            }
        }
        const state = authReducer({logged: true},action)

        expect(state).toEqual({
            logged:true,
            name:"alets"
        })
    })

    test('should erase the username and logged in false', () => {
        const action={
            type:types.logout,
        }
        const state = authReducer({logged: false},action)

        expect(state).toEqual({
            logged:false,
            
        })
    })
    
    

})
