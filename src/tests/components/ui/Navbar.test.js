import { mount } from "enzyme"
import { MemoryRouter, Router } from "react-router"
import { AuthContext } from "../../../auth/AuthContext"
import { Navbar } from "../../../components/ui/Navbar"
import { types } from "../../../types/types"
import "@testing-library/jest-dom"

describe('testing <Navbar />', () => {

    const historyMock = {
        push: jest.fn(),
        replace: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn(),


    }
    
    const contextValue = {
        dispatch : jest.fn(),
        user: {
            logged:true,
            name:"Obama"
        }
    }
    const wrapper = mount(
    <AuthContext.Provider value= {contextValue}>
        <MemoryRouter>
            <Router history = {historyMock}>
                <Navbar />
            </Router>

        </MemoryRouter>

    </AuthContext.Provider>
    
    )
    
        afterEach(()=>{
            jest.clearAllMocks();
        })

    test('should match snapshot', () => {
        
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find(".text-info").text().trim()).toBe("Obama")

    })
    
    test('should call logout and use history', () => {
        
        wrapper.find("button").prop("onClick")()

        expect ( contextValue.dispatch ).toBeCalledWith({
            type: types.logout
        })
        expect ( historyMock.replace).toHaveBeenCalledWith("/login")

    })
    
    
})
