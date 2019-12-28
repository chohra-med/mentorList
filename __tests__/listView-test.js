import ListView from "../src/Components/ListView";
import React from "react";

import renderer from "react-test-renderer";


test('renders the ListView', () => {
    const listView = renderer.create(<ListView/>).toJSON();
    expect(listView).toMatchSnapshot();
});

test('Test First Data', () => {
    const listView = renderer.create(<ListView/>).getInstance();
    let firstData = listView.state.ourData;
    expect(firstData.length).toEqual(10);
});
test('Test Loading More', () => {
    const listView = renderer.create(<ListView/>).getInstance();
    let data = listView.state.ourData;
    listView.orderBy();
    let dataAfter = listView.state.ourData;
    let equal = JSON.stringify(dataAfter) === JSON.stringify(data);
    expect(equal).toBeFalsy();
});

describe('Sorting', () => {
    it('Array should be sortedby name , id', () => {
        const listView = renderer.create(<ListView/>).getInstance();
        let data = listView.state.ourData;
        listView.orderBy();
        let dataAfter = listView.state.ourData;

        data.sort((a, b) => {
            if (a.name > b.name) {
                return 1;
            }
            if (b.name > a.name) {
                return -1;
            }
            else {
                return a.id-b.id;
            }
        });
        let equal = JSON.stringify(dataAfter) === JSON.stringify(data);
        expect(equal).toBeTruthy();
    });
});

