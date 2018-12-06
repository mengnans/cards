import {shallow} from 'enzyme';
import Card from "../../src/js/presentational/Card";
import React from 'react';
import mockData from "../../src/js/data-fetch/mock-data";


describe('<Card/>', () => {
  it('while loading, contains .Card-loading-div class', () => {
    const wrapper = shallow(<Card isLoading={true} loadingInfo={"Loading"} progressBarColor={"primary"} noData={false}
    />);
    expect(wrapper.find('.Card-loading-div').exists()).toBeTruthy();
  });

  it('while is not loading, doesnt contains .Card-loading-div class', () => {
    const wrapper = shallow(<Card isLoading={false} loadingInfo={"Loading"} progressBarColor={"primary"} noData={false}
                                  coreData={mockData[0].coreData}/>);
    expect(wrapper.find('.Card-loading-div').exists()).toBeFalsy();
  });

  it('while is not loading, and no coreData', () => {
    const wrapper = shallow(<Card isLoading={false} loadingInfo={"Loading"} progressBarColor={"primary"} noData={false}
                                  coreData={mockData[0].coreData}/>);
    expect(wrapper.find('.Card-loading-div').exists()).toBeFalsy();
  });

  it('while no data, let user know theres no data in the backend for this card item', () => {
    const wrapper = shallow(<Card isLoading={false} loadingInfo={"Loading"} progressBarColor={"primary"} noData={true}
    />);
    expect(wrapper.find('.Card-loading-info').exists()).toBeTruthy();
  });
});