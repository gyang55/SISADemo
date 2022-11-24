import { render } from "@testing-library/react"
import TabNavItem from "../../components/user-profile-component/TabNavItem"

describe("Nav Component", () => {
    test("Rendered tab element", () => {
        const {
            getByTestId
        } = render(<TabNavItem id="tab1" item = "" title="Test" activeTab="tab3" setActiveTab="tab4"/>);
        const tabItem = getByTestId("tabItem");
        const iconBox = getByTestId("tabIcon");
        const tabName = getByTestId("tabName");
        
        expect(tabItem).toBeTruthy();
        expect(iconBox).toBeTruthy();
        expect(tabName).toBeTruthy();

    });

   
    // const mockSetState = jest.fn();

    // jest.mock('react', () => ({
    // useState: initial => [initial, mockSetState]
    // }));

    // test('Can change state', () => {
    // const [_, increment] = handleClick();
    // increment();
    // expect(mockSetState).toHaveBeenCalledWith(1);
    // });
    
    
});