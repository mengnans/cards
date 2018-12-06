import {shallow} from 'enzyme';
import CardsList from "../../src/js/presentational/CardsList";
import React from 'react';
import mockData from "../../src/js/data-fetch/mock-data";


describe('<CardsList/>', () => {
  it('while is not loading, <CardsList> contains no .Card-loading-div class', () => {
    const wrapper = shallow(<CardsList isLoading={false} loadingInfo={"Loading"} progressBarColor={"primary"}
                                       onCardClick={() => {}}
                                       pageData={mockData}
    />);
    expect(wrapper.find('.Card-loading-div').exists()).toBeFalsy();
  });

});