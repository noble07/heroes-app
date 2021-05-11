import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router";
import { HeroScreen } from "../../../components/heroes/HeroScreen";


describe('Pruebas en <HeroScreen />', () => {

    const historyMock = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn(),
    }

    
    test('debe de mostrar el componente redirect si no hay argumentos en el URL', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroScreen history={ historyMock } />
            </MemoryRouter>
        );
       
        expect(wrapper.find('Redirect').exists).toBeTruthy();

    });


    test('debe de mostrar un heroe si el parametro existe y se encuentra', () => {

       const wrapper = mount(
        <MemoryRouter initialEntries={['/hero/marvel-iron']}>
            <Route path="/hero/:heroId" component={ HeroScreen } />
        </MemoryRouter>
       );

       expect( wrapper.find('.row').exists() ).toBeTruthy();

    });

    test('debe de regresar a la pantalla anterior con PUSH', () => {
        
        const historyMock = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn(),
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-iron']}>
                <Route
                    path="/hero/:heroId"
                    component={ () => <HeroScreen history={ historyMock } /> }
                />
            </MemoryRouter>
        );
    
        wrapper.find('button').prop('onClick')();

        expect( historyMock.push ).toHaveBeenCalledWith('/');
        expect( historyMock.goBack ).not.toHaveBeenCalled();

    });

    test('debe de regresar a la pantalla anterior con GOBACK', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-iron']}>
                <Route
                    path="/hero/:heroId"
                    component={ () => <HeroScreen history={ historyMock } /> }
                />
            </MemoryRouter>
        );
    
        wrapper.find('button').prop('onClick')();

        expect( historyMock.goBack ).toHaveBeenCalled();
        expect( historyMock.push ).not.toHaveBeenCalled();
        
    });

    test('debe de llamar el redirect si el hero no existe', () => {
        
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-iron345asdasd']}>
                <Route
                    path="/hero/:heroId"
                    component={ () => <HeroScreen history={ historyMock } /> }
                />
            </MemoryRouter>
        );
    
        expect( wrapper.text() ).toBe('');

    });

});
