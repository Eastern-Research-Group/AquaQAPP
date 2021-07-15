import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { mount, createLocalVue } from '@vue/test-utils';
import mockStore from '@/testUtils/mockStore';
import Dashboard from '../Dashboard';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
const router = new VueRouter();

describe('Dashboard', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store(mockStore);
  });

  test('is a Vue instance', () => {
    const wrapper = mount(Dashboard, { store, router, localVue });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('table has rows for each QAPP', () => {
    const wrapper = mount(Dashboard, { store, router, localVue });
    const rows = wrapper.findAll('tbody tr');
    expect(rows.length).toBe(2);
    expect(
      rows
        .at(0)
        .find('td')
        .text()
    ).toBe('Test QAPP 1');
    expect(
      rows
        .at(1)
        .find('td')
        .text()
    ).toBe('Test QAPP 2');
  });
});
