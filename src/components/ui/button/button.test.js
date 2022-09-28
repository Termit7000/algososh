import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import { Button } from './button';

describe("Button", () => {


    it("Кнопка с текстом", () => {
        const button = <Button text='some text'/>;
        render(button);
        expect(screen.getByTestId('button')).toMatchSnapshot();
    })
    
    it("Кнопка без текста", () => {
        const button = <Button/>;
        render(button);
        expect(screen.getByTestId('button')).toMatchSnapshot();
    })

    it("Заблокированная кнопка", () => {
        const button = <Button disabled={true}/>;
        render(button);
        expect(screen.getByTestId('button')).toMatchSnapshot();
    })

    it("Кнопка с индикацией загрузки", () => {
        const button = <Button isLoader={true}/>;
        render(button);
        expect(screen.getByTestId('button')).toMatchSnapshot();
    })

    it('Корректность вызова колбека при клике на кнопку', ()=>{
        const callBack = jest.fn();

        const button = <Button onClick={callBack}/>;

        render(button);

        const element = screen.getByTestId('button');
        expect(element).toBeInTheDocument();
        
        fireEvent.click(element);
        expect(callBack).toBeCalled();
    })
})