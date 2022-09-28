import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { StringComponent } from './string';
import { MemoryRouter } from 'react-router-dom';

describe('Тестрование алгоритма разворота строки', () => {

    it('С четным количеством символов', async () => {

        const init = 'ab';
        const exp = ['b', 'a'];

        render(
            <MemoryRouter>
                <StringComponent DELAY={20} />
            </MemoryRouter>);

        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();

        let button = screen.getByTestId('button');
        expect(button).toBeInTheDocument();

        fireEvent.change(input, { target: { value: init } });
        fireEvent.click(button);

        button = await screen.findByText('Развернуть');

        expect(button).toBeInTheDocument();

        const res = screen.getAllByTestId('circle_value').map(i => i.innerHTML);

        expect(exp).toEqual(res);

    })

    it('С нечетным количеством символов', async () => {

        const init = 'abс';
        const exp = ['с', 'b', 'a'];

        render(
            <MemoryRouter>
                <StringComponent DELAY={20} />
            </MemoryRouter>);

        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();

        let button = screen.getByTestId('button');
        expect(button).toBeInTheDocument();

        fireEvent.change(input, { target: { value: init } });
        fireEvent.click(button);

        button = await screen.findByText('Развернуть');

        expect(button).toBeInTheDocument();

        const res = screen.getAllByTestId('circle_value').map(i => i.innerHTML);

        expect(exp).toEqual(res);

    })

    it('С одним символом', async () => {

        const init = 'a';
        const exp = ['a'];

        render(
            <MemoryRouter>
                <StringComponent DELAY={20} />
            </MemoryRouter>);

        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();

        let button = screen.getByTestId('button');
        expect(button).toBeInTheDocument();

        fireEvent.change(input, { target: { value: init } });
        fireEvent.click(button);

        button = await screen.findByText('Развернуть');

        expect(button).toBeInTheDocument();

        const res = screen.getAllByTestId('circle_value').map(i => i.innerHTML);

        expect(exp).toEqual(res);

    })

    it('С пустой строкой', async () => {

        const init = '';       

        render(
            <MemoryRouter>
                <StringComponent DELAY={20} />
            </MemoryRouter>);

        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();

        let button = screen.getByTestId('button');
        expect(button).toBeInTheDocument();

        fireEvent.change(input, { target: { value: init } });
        fireEvent.click(button);

        await screen.findByText('Развернуть');

        expect(screen.queryByTestId('circle_value')).not.toBeInTheDocument();
        
    })

})