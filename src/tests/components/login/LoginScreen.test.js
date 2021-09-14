import React from 'react';
import { mount} from "enzyme"
import { AuthContext } from "../../../auth/AuthContext"
import { LoginScreen } from "../../../components/login/LoginScreen"
import { types } from '../../../types/types';



describe('testing <LoginScreen/>', () => {
    
    const history = {
        length:10,
        push : jest.fn(),
        goBack: jest.fn(),
        replace: jest.fn(),
        
    }
    const contextValue = {
        dispatch : jest.fn(),
        user: {
            logged:false
        }
    }
    const wrapper = mount(
    <AuthContext.Provider value = {contextValue}>
        <LoginScreen history = {history}/>
    </AuthContext.Provider>
    
    )

    test('should match snapshot', () => {
        

        expect(wrapper).toMatchSnapshot()

    })
    test('should carry out the dispatch and navigation', () => {
        
        const handleClick= wrapper.find("button").prop("onClick");
        
        handleClick();

        expect (contextValue.dispatch).toHaveBeenCalledWith({
            type: types.login,
            payload:{
                name:"Fausto"
            }
        })
        expect (history.replace).toHaveBeenCalledWith("/")

        localStorage.setItem("lastPath","/dc")

        handleClick();

        expect(history.replace).toHaveBeenCalledWith("/dc")

    })
    
    

})
