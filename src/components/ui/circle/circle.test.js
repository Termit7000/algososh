import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';

describe("Circle", ()=>{

    it("Без буквы", ()=>{
        const circle = <Circle/>;        
        render(circle);
        expect(screen.getByTestId('circle')).toMatchSnapshot();
    })

    it("С буквой", ()=>{
        const circle = <Circle letter='BFG'/>;        
        render(circle);
        expect(screen.getByTestId('circle')).toMatchSnapshot();
    })

    it("С head", ()=>{
        const circle = <Circle head={'hdd'}/>;        
        render(circle);        
        expect(screen.getByTestId('circle')).toMatchSnapshot();
    })

    it("С react-элемент в head", ()=>{
        const head = <p data-testid='head'>head</p>;
        const circle = <Circle head={head}/>;        
        render(circle);        
        expect(screen.getByTestId('circle')).toMatchSnapshot();
    })

    it("С tail", ()=>{        
        const circle = <Circle tail={'TLL'}/>;        
        render(circle);        
        expect(screen.getByTestId('circle')).toMatchSnapshot();
    })

    it("С react-элемент в tail", ()=>{        
        const tail = <p data-testid='tail'>tail</p>;
        const circle = <Circle tail={tail}/>;        
        render(circle);        
        expect(screen.getByTestId('circle')).toMatchSnapshot();
    })

    it("С index", ()=>{        
        const circle = <Circle index={10200}/>;        
        render(circle);        
        expect(screen.getByTestId('circle')).toMatchSnapshot();
    })

    it("С пропом isSmall===true", ()=>{        
        const circle = <Circle isSmall={true}/>;        
        render(circle);        
        expect(screen.getByTestId('circle')).toMatchSnapshot();
    })

    it("В состоянии default", ()=>{        
        const circle = <Circle state={ElementStates.Default}/>;        
        render(circle);        
        expect(screen.getByTestId('circle')).toMatchSnapshot();
    })

    it("В состоянии Changing", ()=>{        
        const circle = <Circle state={ElementStates.Changing}/>;        
        render(circle);        
        expect(screen.getByTestId('circle')).toMatchSnapshot();
    })

    it("В состоянии Modified", ()=>{        
        const circle = <Circle state={ElementStates.Modified}/>;        
        render(circle);        
        expect(screen.getByTestId('circle')).toMatchSnapshot();
    })

})