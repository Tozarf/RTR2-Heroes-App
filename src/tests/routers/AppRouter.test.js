import { mount } from "enzyme"
import { AuthContext } from "../../auth/AuthContext"
import { AppRouter } from "../../routers/AppRouter"




describe('testing <AppRouter/>', () => {
    
    const contextValue = {
        dispatch : jest.fn(),
        user: {
            logged:false
        }
    }

    test('should show login if not authenticated', () => {
        
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}> 

                <AppRouter/>

            </AuthContext.Provider>
        )
        

        expect(wrapper).toMatchSnapshot()
    })
    
    test('should show <Marvel/> if authenticated', () => {
        
        const contextValue = {
            dispatch : jest.fn(),
            user: {
                logged:true,
                name:"anaisha"
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}> 

                <AppRouter/>

            </AuthContext.Provider>
        )

        // console.log(wrapper.html())

        expect ( wrapper.find(".navbar").exists()).toBe(true)

    })
    
})
