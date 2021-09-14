import { mount } from "enzyme"
import { MemoryRouter } from "react-router"
import { PublicRoute } from "../../routers/PublicRoute"



describe('testing <PrivateRoute/>', () => {
    
    const props = {
        location:{
            pathname:"/marvel"
        }
    }
    
    

    test('should show the component if authenticated and save in local storage', () => {
        
        const wrapper = mount(
            
            <MemoryRouter>

                <PublicRoute
                isAuthenticated={false}
                component={()=> <span>Done!</span>}
                {...props}
                />
                
            </MemoryRouter>
            
            )
        expect(wrapper.find("span").exists()).toBe(true)
        
    })
})