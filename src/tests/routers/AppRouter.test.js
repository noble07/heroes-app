import { mount } from "enzyme";
import { AuthContext } from "../../auth/AuthContext";
import { AppRouter } from "../../routers/AppRouter";


describe('Pruebas en <AppRouter />', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }
   
    test('debe de mostrar login si no está autenticado', () => {
        
        const wrapper = mount(
            <AuthContext.Provider value={ contextValue } >
                <AppRouter />
            </AuthContext.Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('LoginScreen').exists() ).toBeTruthy();

    });

    test('debe de mostrar el componente de marve si está autenticado', () => {

        const contextValue = {
            dispatch: jest.fn(),
            user: {
                logged: true,
                name: 'Juan'
            }
        }
       
        const wrapper = mount(
            <AuthContext.Provider value={ contextValue } >
                <AppRouter />
            </AuthContext.Provider>
        );

        // expect( wrapper ).toMatchSnapshot();
        // expect( wrapper.find('LoginScreen').exists() ).toBeTruthy();
        expect( wrapper.find('.navbar').exists() ).toBeTruthy();

    });
    
    
});
