import {shallow} from 'enzyme';
import React from 'react';
import DrawerHeader from "../../src/js/presentational/DrawerHeader";


describe('<DrawerHeader/>', () => {
  it('<DrawerHeader> contains the number props', () => {
    const number = "INC0000040";
    const wrapper = shallow(<DrawerHeader number={number} onClickExit={()=>{}}
    />
    );
    expect(wrapper.find({number: number}).exists()).toBeTruthy();
  });

});