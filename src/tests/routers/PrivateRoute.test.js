import { shallow } from "enzyme"
import { MemoryRouter } from "react-router"
import { PrivateRoute } from "../../routers/PrivateRoute"


describe('testing <PrivateRoute/>', () => {
    
    const props = {
        location:{
            pathname:"/marvel"
        }
    }

    test('should show the component if authenticated and save in local storage', () => {
        
        const wrapper = shallow(
            
            <MemoryRouter>

                <PrivateRoute
                isAuthenticated={true}
                component={()=> <span>Done!</span>}
                {...props}
                />
                
            </MemoryRouter>
            
            )
        console.log(wrapper.html())
    })
    
})
