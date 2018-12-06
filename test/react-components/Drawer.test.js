import {shallow} from 'enzyme';
import Drawer from "../../src/js/presentational/Drawer";
import React from 'react';
import extractData from "../../src/js/data-fetch/data-extract";
import mockData from "../../src/js/data-fetch/mock-data";


describe('<Drawer/>', () => {
  it('while is not open, <Drawer> contains no .Drawer class', () => {
    const wrapper = shallow(<Drawer isOpen={false} closeDrawer={()=>{}}
    />
    );
    expect(wrapper.find('.Drawer').exists()).toBeFalsy();
  });

  it('while is open, <Drawer> contains .Drawer class', () => {
    const id = "471d4732a9fe198100affbf655e59172";
    const wrapper = shallow(<Drawer isOpen={true} closeDrawer={()=>{}}
                                    extractedData={extractData(mockData, id)}
      />
    );
    expect(wrapper.find('.Drawer').exists()).toBeTruthy();
  });

});