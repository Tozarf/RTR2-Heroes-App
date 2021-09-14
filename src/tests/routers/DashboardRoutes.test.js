import { mount } from "enzyme"
import { MemoryRouter } from "react-router"
import { AuthContext } from "../../auth/AuthContext"
import { DashboardRoutes } from "../../routers/DashboardRoutes"


describe('testing <DashboardRoutes/>', () => {
    
    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged:true,
            name: "anaisha"
        }
    }

    test('should show correctly', () => {
        
        const wrapper = mount(
        <AuthContext.Provider value ={contextValue}>
            <MemoryRouter>
            
                <DashboardRoutes/>
            </MemoryRouter>   
            
        </AuthContext.Provider>
        
        )
        
        expect( wrapper).toMatchSnapshot()
        expect(wrapper.find(".text-info").text().trim()).toBe("anaisha")
    })
    

})
