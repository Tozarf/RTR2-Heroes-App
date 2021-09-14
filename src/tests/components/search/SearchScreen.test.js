import { mount } from "enzyme"
import { MemoryRouter, Route } from "react-router"
import { SearchScreen } from "../../../components/search/SearchScreen"



describe('testing <SearchScreen />', () => {
    
    test('should be shown correctly with default values', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={["/search"]}>
                <Route path = "/search" component = {SearchScreen}/>
            </MemoryRouter>
        )
            
        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find(".alert-info").text().trim()).toBe("Search a hero")
    })
    
    test('should show Batman and the input with the query string in it', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={["/search?q=batman"]}>
                <Route path = "/search" component = {SearchScreen}/>
            </MemoryRouter>
        )
        
        expect(wrapper.find("input").prop("value")).toBe("batman")
        expect(wrapper.find(".alert-danger").exists()).not.toBe(true) //ignore this extra line
        expect(wrapper).toMatchSnapshot()
    })
    test('should show and error when hero is not found', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={["/search?q=batmanTestingError"]}>
                <Route path = "/search" component = {SearchScreen}/>
            </MemoryRouter>
        )

        expect(wrapper.find(".alert-danger").text().trim()).toBe("There is no hero with batmanTestingError");
        expect(wrapper).toMatchSnapshot();
        
    })
    
    test('should call the history push', () => {

        const history = {
            push: jest.fn()

        };

        const wrapper = mount(
            <MemoryRouter initialEntries={["/search?q=batman"]}>
                <Route 
                    path = "/search" 
                    component = {()=><SearchScreen history = {history}/>}/>
            </MemoryRouter>
        )
        wrapper.find("input").simulate("change",{
            target:{
                name:"searchText",
                value:"batman"
            }
        })
        wrapper.find("form").prop("onSubmit")({
            preventDefault(){}
        })
        expect(history.push).toHaveBeenCalledWith("?q=batman")
        
    })
    
})
