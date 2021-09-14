import { mount } from "enzyme"
import { MemoryRouter } from "react-router"
import { PrivateRoute } from "../../routers/PrivateRoute"


describe('testing <PrivateRoute/>', () => {
    
    const props = {
        location:{
            pathname:"/marvel"
        }
    }
    
    Storage.prototype.setItem = jest.fn()

    test('should show the component if authenticated and save in local storage', () => {
        
        const wrapper = mount(
            
            <MemoryRouter>

                <PrivateRoute
                isAuthenticated={true}
                component={()=> <span>Done!</span>}
                {...props}
                />
                
            </MemoryRouter>
            
            )
        expect(wrapper.find("span").exists()).toBe(true)
        expect ( localStorage.setItem).toHaveBeenCalledWith("lastPath", "/marvel" )
    })
    
    test('should block the component if not authenticated', () => {
        
        const wrapper = mount(
            
            <MemoryRouter>

                <PrivateRoute
                isAuthenticated={false}
                component={()=> <span>Done!</span>}
                {...props}
                />
                
            </MemoryRouter>
            
            )
        expect(wrapper.find("span").exists()).toBe(false)
        expect ( localStorage.setItem).toHaveBeenCalledWith("lastPath", "/marvel" )
    })
    
    
})
