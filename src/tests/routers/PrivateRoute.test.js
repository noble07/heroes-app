import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { PrivateRoute } from '../../routers/PrivateRoute';


describe('Prueba en <PrivateRoute />', () => {

    const props = {
        location: {
            pathname: '/marvel',
            search: ''
        }
    }

    Storage.prototype.setItem = jest.fn();
    
    test('debe de mostrar el componente si está autenticado y guardar localStorage', () => {
        
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute
                    isAuthenticated={ true }
                    component={ () => <span>Listo!</span> }
                    { ...props }
                />
            </MemoryRouter>
        );

        expect(wrapper.find('span').exists()).toBeTruthy();
        expect( localStorage.setItem ).toHaveBeenLastCalledWith('lastPath', '/marvel');

    });

    test('debe de blockear el componente si no está autenticado', () => {

        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute
                    isAuthenticated={ false }
                    component={ () => <span>Listo!</span> }
                    { ...props }
                />
            </MemoryRouter>
        );

        expect(wrapper.find('span').exists()).toBeFalsy();
        expect(wrapper.html()).toBe('');
        expect( localStorage.setItem ).toHaveBeenLastCalledWith('lastPath', '/marvel');

    });
    
    

});