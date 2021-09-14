import React from 'react';
import { mount } from "enzyme"
import {HeroScreen} from "../../../components/heroes/HeroScreen"
import { MemoryRouter, Route } from 'react-router';


describe('testing <HeroScreen/>', () => {
    
    const history = {
        length:10,
        push : jest.fn(),
        goBack: jest.fn()
    }

    
    test('should show the redirect component if there are no arguments in the URL', () => {
        
        const wrapper = mount(
        
        <MemoryRouter initialEntries={["/hero"]}>
            <HeroScreen history = { history }/>
        </MemoryRouter>
        )
        
        
        expect ( wrapper.find("Redirect").exists() ).toBe(true)

    })
    test('should show a hero if the param exists and it is found', () => {
        
        const wrapper = mount(
        <MemoryRouter initialEntries={["/hero/marvel-captain"]}>
            <Route path = "/hero/:heroeId" component={HeroScreen}/>
        </MemoryRouter>
        )
        expect(wrapper.find(".row").exists()).toBe(true)    

    })
    
    test('should return to previous screen with PUSH', () => {
        
        const history = {
            length:1,
            push : jest.fn(),
            goBack: jest.fn()
        }
        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero/marvel-iron"]}>
                <Route 
                    path = "/hero/:heroeId" 
                    component={ () => <HeroScreen history = {history}/>}
                />
            </MemoryRouter>
            )
        
        
        wrapper.find("button").prop("onClick")()
        
        expect(history.push).toHaveBeenCalledWith("/") 
        expect(history.goBack).not.toHaveBeenCalled() 
    })

    test('should return to previous screen', () => {
        

        
        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero/marvel-iron"]}> 
                <Route
                    path = "/hero/:heroeId"
                    component = { () => <HeroScreen history = {history}/>}
                    />
            </MemoryRouter>
        )
        
        wrapper.find("button").prop("onClick")();
        
        expect(history.push).toHaveBeenCalledTimes(0)
        expect(history.goBack).toHaveBeenCalled()
            
        
        
    
    })

    test('should call redirect if hero does not exist', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero/marvel-iron1231321"]}> 
                <Route
                    path = "/hero/:heroeId"
                    component = { () => <HeroScreen history = {history}/>}
                    />
            </MemoryRouter>
        )
        
        expect(wrapper.text()).toBe("")
        
        
        
    })
    

    
    
    
        
})
