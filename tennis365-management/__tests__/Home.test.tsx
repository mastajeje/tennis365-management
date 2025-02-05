import React from 'react';
import {render,screen}  from '@testing-library/react';
import Home from '../src/app/(home)/page';

it('should have a h1',async () => {
    render(<Home />); //Arrange
    const myElement = screen.getByText('Main Page'); //Action
    expect(myElement).toBeInTheDocument(); //Assert

});